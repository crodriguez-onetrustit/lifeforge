'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { calculateStreak } from '@/lib/xp/streak';
import { awardSessionXP, XP } from '@/lib/xp/engine';
import { calculateLevel } from '@/lib/xp/engine';
import { PROTOCOL_ORDER, STEP_CONFIG, canProceed, getNextStep, type ProtocolStep } from '@/lib/learning/protocol';
import type { CurriculumNode } from '@/lib/db/schema';
import styles from './page.module.css';

interface Props {
  params: Promise<{ nodeId: string }>;
}

export default function SessionPage({ params }: Props) {
  const { nodeId } = use(params);
  const router = useRouter();

  const [step, setStep] = useState<ProtocolStep>('q1');
  const [input, setInput] = useState('');
  const [sessionData, setSessionData] = useState({
    q1Answer: '',
    q2Answer: '',
    q3Answer: '',
    q4Deadline: '',
    feynmanAnswer: '',
  });
  const [savedSessionId, setSavedSessionId] = useState<string | null>(null);
  const [xpGained, setXpGained] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const node = useLiveQuery(() => db.curriculumNode.where('id').equals(nodeId).first(), [nodeId]);
  const user = useLiveQuery(() => db.user.toCollection().first());

  useEffect(() => {
    if (!mounted || !node || !user) return;

    // Create session record on mount
    const initSession = async () => {
      const { v4: uuidv4 } = await import('uuid');
      const id = uuidv4();
      await db.learningSession.add({
        id,
        nodeId: node.id,
        userId: user.id,
        q1Answer: '',
        q2Answer: '',
        q3Answer: '',
        q4Deadline: '',
        feynmanAnswer: '',
        feynmanCompleted: false,
        xpEarned: 0,
        coinsEarned: 0,
        startedAt: Date.now(),
        completedAt: null,
      });
      setSavedSessionId(id);
    };
    initSession();
  }, [mounted, node, user]);

  if (!mounted || !node || !user) return <div className={styles.loading}>Loading session...</div>;

  const config = STEP_CONFIG[step];
  const canContinue = canProceed(step, input);

  const handleContinue = async () => {
    const today = new Date().toISOString().split('T')[0];
    const newData = { ...sessionData, [step + 'Answer' as keyof typeof sessionData]: input };

    if (step === 'q4') {
      // q4Deadline is a date string
      (newData as typeof sessionData & { q4Deadline: string }).q4Deadline = input;
    }

    setSessionData(newData);

    if (step === 'feynman') {
      // Session complete
      const { xpGained: baseXP, coinsGained } = awardSessionXP();
      const streakResult = calculateStreak(user.lastSessionDate, today, user.currentStreak);
      const totalXP = baseXP + streakResult.bonusXP;
      const newLevel = calculateLevel(user.xp + totalXP);

      await db.curriculumNode.update(node.id, {
        status: 'completed',
        completedAt: Date.now(),
      });

      await db.learningSession.update(savedSessionId!, {
        ...newData,
        q4Deadline: input,
        feynmanAnswer: input,
        feynmanCompleted: true,
        xpEarned: totalXP,
        coinsEarned,
        completedAt: Date.now(),
      });

      await db.user.update(user.id, {
        xp: user.xp + totalXP,
        level: newLevel,
        coins: user.coins + coinsGained,
        currentStreak: streakResult.sameDay ? user.currentStreak : streakResult.newStreak,
        longestStreak: Math.max(user.longestStreak, streakResult.sameDay ? user.currentStreak : streakResult.newStreak),
        lastSessionDate: today,
      });

      setXpGained(totalXP);
      if (newLevel > user.level) setShowLevelUp(true);

      setSessionData(newData as typeof sessionData & { q4Deadline: string });
      setStep('done');
    } else {
      setSessionData(newData as typeof sessionData & { q4Deadline: string });
      setStep(getNextStep(step));
      setInput('');
    }
  };

  if (step === 'done') {
    return (
      <div className="page-content">
        <div className={styles.doneCard}>
          <div className={styles.doneIcon}>⚒️</div>
          <h1>Node Complete!</h1>
          <p>You've finished <strong>{node.title}</strong></p>
          <div className={styles.xpAward}>+{xpGained} XP earned</div>
          {showLevelUp && (
            <div className={styles.levelUp}>🎉 Level Up! Keep forging!</div>
          )}
          <a href={`/curriculum/${node.curriculumId}`} className={styles.doneBtn}>
            Back to Curriculum →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <button className={styles.backBtn} onClick={() => router.back()}>← Exit Session</button>

      <div className={styles.stepIndicator}>
        {PROTOCOL_ORDER.slice(0, -1).map((s, i) => (
          <div
            key={s}
            className={`${styles.stepDot} ${s === step ? styles.stepActive : ''} ${PROTOCOL_ORDER.indexOf(step) > i ? styles.stepDone : ''}`}
          />
        ))}
      </div>

      <div className={styles.nodeTitle}>{node.title}</div>
      <h2 className={styles.question}>{config.question}</h2>
      {config.subtext && <p className={styles.subtext}>{config.subtext}</p>}

      {step === 'q4' ? (
        <input
          type="date"
          className={styles.dateInput}
          value={input}
          min={new Date().toISOString().split('T')[0]}
          onChange={e => setInput(e.target.value)}
          autoFocus
        />
      ) : (
        <textarea
          className={styles.textarea}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Write your answer here..."
          rows={6}
          autoFocus
        />
      )}

      {config.minLength > 0 && (
        <div className={styles.charCount}>
          {input.length < config.minLength
            ? `${config.minLength - input.length} more characters needed`
            : '✓ Ready'}
        </div>
      )}

      <button
        className={styles.continueBtn}
        onClick={handleContinue}
        disabled={!canContinue && step !== 'q3'}
      >
        {step === 'feynman' ? 'Complete Session (+10 XP)' : 'Continue →'}
      </button>
    </div>
  );
}
