'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import type { User, Curriculum, CurriculumNode } from '@/lib/db/schema';
import { getLevelTitle, getLevelProgress } from '@/lib/xp/engine';
import styles from './page.module.css';

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const user = useLiveQuery(() => db.user.toCollection().first());
  const curricula = useLiveQuery(() => db.curriculum.toArray());
  const nodes = useLiveQuery(() => db.curriculumNode.toArray());

  if (!mounted) return null;

  return (
    <div className="page-content">
      <div className={styles.hero}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>⚒️</span>
          <h1>LifeForge</h1>
        </div>
        <p className={styles.tagline}>Forge your intellect. Sequentially.</p>
      </div>

      {user ? (
        <div className={styles.userStats}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Level</span>
            <span className={styles.statValue}>
              {getLevelTitle(user.level)} ({user.level})
            </span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>XP</span>
            <span className={styles.statValue}>{user.xp.toLocaleString()}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Streak</span>
            <span className={styles.statValue}>🔥 {user.currentStreak} day{user.currentStreak !== 1 ? 's' : ''}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Coins</span>
            <span className={styles.statValue}>🪙 {user.coins}</span>
          </div>
        </div>
      ) : (
        <div className={styles.welcome}>
          <h2>Welcome to LifeForge</h2>
          <p>Your learning journey starts here.</p>
          <a href="/onboarding" className={styles.ctaButton}>Begin Onboarding →</a>
        </div>
      )}

      {curricula && curricula.length > 0 && (
        <section className={styles.section}>
          <h2>Your Curricula</h2>
          <div className={styles.grid}>
            {curricula.map(c => {
              const curriculumNodes = nodes?.filter(n => n.curriculumId === c.id) ?? [];
              const completed = curriculumNodes.filter(n => n.status === 'completed').length;
              const total = curriculumNodes.length;
              const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

              return (
                <a key={c.id} href={`/curriculum/${c.id}`} className={styles.curriculumCard}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardSource}>{c.source}</span>
                    {pct === 100 && <span className={styles.complete}>✓ Complete</span>}
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${pct}%` }} />
                  </div>
                  <span className={styles.progressLabel}>{completed}/{total} nodes</span>
                </a>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
