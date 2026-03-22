'use client';

import styles from './StreakCounter.module.css';

interface StreakCounterProps {
  streak: number;
}

export default function StreakCounter({ streak }: StreakCounterProps) {
  if (streak === 0) {
    return (
      <div className={styles.wrapper}>
        <span className={styles.fire}>🔥</span>
        <span className={styles.count}>0</span>
        <span className={styles.label}>day streak</span>
      </div>
    );
  }

  const intense = streak >= 30;
  const active = streak >= 7;

  return (
    <div className={`${styles.wrapper} ${active ? styles.active : ''} ${intense ? styles.intense : ''}`}>
      <span className={styles.fire}>🔥</span>
      <span className={styles.count}>{streak}</span>
      <span className={styles.label}>day streak</span>
      {intense && <span className={styles.badge}>LEGENDARY</span>}
    </div>
  );
}
