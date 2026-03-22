'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { LEVELS, getLevelTitle, getLevelProgress } from '@/lib/xp/engine';
import styles from './page.module.css';

export default function ProgressPage() {
  const user = useLiveQuery(() => db.user.toCollection().first());
  const sessions = useLiveQuery(() => db.learningSession.toArray());
  const achievements = useLiveQuery(() => db.achievement.toArray());

  if (!user) return <div className="page-content"><p>Loading...</p></div>;

  const progress = getLevelProgress(user.xp);
  const nextLevel = LEVELS.find(l => l.level === user.level + 1);
  const feynmanCount = sessions?.filter(s => s.feynmanCompleted).length ?? 0;

  return (
    <div className="page-content">
      <h1 style={{ marginBottom: 'var(--space-8)' }}>Progress</h1>

      {/* Level Card */}
      <div className={styles.levelCard}>
        <div className={styles.levelBadge}>
          ⚒️ {getLevelTitle(user.level)}
        </div>
        <div className={styles.levelDetails}>
          <div className={styles.xpDisplay}>
            <span className={styles.xpNum}>{user.xp.toLocaleString()}</span>
            <span className={styles.xpLabel}>XP total</span>
          </div>
          {nextLevel && (
            <div className={styles.xpNext}>
              <span>{progress.next - progress.current} XP to {getLevelTitle(user.level + 1)}</span>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progress.percent}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.stat}>
          <span className={styles.statNum}>{user.level}</span>
          <span className={styles.statLabel}>Current Level</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>{user.currentStreak}</span>
          <span className={styles.statLabel}>Day Streak 🔥</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>{user.longestStreak}</span>
          <span className={styles.statLabel}>Best Streak</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>{sessions?.length ?? 0}</span>
          <span className={styles.statLabel}>Sessions</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>{feynmanCount}</span>
          <span className={styles.statLabel}>Feynman Checks</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>{user.coins}</span>
          <span className={styles.statLabel}>Coins 🪙</span>
        </div>
      </div>

      {/* Level Progression */}
      <h2 style={{ marginTop: 'var(--space-10)', marginBottom: 'var(--space-4)' }}>Level Progression</h2>
      <div className={styles.levelList}>
        {LEVELS.map(l => (
          <div
            key={l.level}
            className={`${styles.levelRow} ${l.level === user.level ? styles.levelCurrent : ''} ${l.level < user.level ? styles.levelDone : ''}`}
          >
            <span className={styles.levelTitle}>{l.title}</span>
            <span className={styles.levelXP}>{l.xpRequired.toLocaleString()} XP</span>
            {l.level < user.level && <span className={styles.check}>✓</span>}
            {l.level === user.level && <span className={styles.currentBadge}>→</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
