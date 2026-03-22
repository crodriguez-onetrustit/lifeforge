'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/db';
import { calculateLevel } from '@/lib/xp/engine';
import { seedStarterCurricula } from '@/lib/db/seed';
import styles from './page.module.css';

const SCREENS = [
  {
    title: 'Stop watching. Start learning.',
    body: 'Most apps reward you for opening them. LifeForge rewards you for understanding. Every session follows a proven protocol — the same one used by top learners worldwide.',
  },
  {
    title: 'The 4-Question Protocol',
    body: 'For every topic: Where is it used? → Explain in your own words → How would you practice it? → By when? Then the Feynman check: explain it like you\'re 10.',
  },
  {
    title: 'Your data is yours. Always.',
    body: 'Everything is stored locally in your browser. No accounts. No cloud required. Export anytime.',
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const handleFinish = async () => {
    // Create the default user
    const { v4: uuidv4 } = await import('uuid');

    await db.user.add({
      id: uuidv4(),
      displayName: 'Learner',
      createdAt: Date.now(),
      xp: 0,
      level: 1,
      coins: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastSessionDate: '',
      preferences: {},
    });

    // Seed starter curricula
    await seedStarterCurricula();

    router.push('/dashboard');
  };

  const s = SCREENS[step];

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.progress}>
          {SCREENS.map((_, i) => (
            <div
              key={i}
              className={`${styles.dot} ${i === step ? styles.dotActive : ''} ${i < step ? styles.dotDone : ''}`}
            />
          ))}
        </div>

        <div className={styles.content}>
          <h1>{s.title}</h1>
          <p>{s.body}</p>
        </div>

        <div className={styles.actions}>
          {step < SCREENS.length - 1 ? (
            <>
              <button
                className={styles.skipBtn}
                onClick={() => setStep(steps => Math.min(steps + 1, SCREENS.length - 1))}
              >
                Continue →
              </button>
            </>
          ) : (
            <button className={styles.ctaButton} onClick={handleFinish}>
              Get Started →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
