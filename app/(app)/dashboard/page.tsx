'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { getLevelTitle } from '@/lib/xp/engine';
import type { Curriculum, CurriculumNode } from '@/lib/db/schema';
import styles from './page.module.css';

interface DailyQuest {
  nodeId: string;
  nodeTitle: string;
  curriculumTitle: string;
  xpReward: number;
  completed: boolean;
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>([]);
  const [todayStr] = useState(() => new Date().toISOString().split('T')[0]);

  useEffect(() => { setMounted(true); }, []);

  const user = useLiveQuery(() => db.user.toCollection().first());
  const curricula = useLiveQuery(() => db.curriculum.orderBy('createdAt').toArray());
  const nodes = useLiveQuery(() => db.curriculumNode.toArray());
  const sessions = useLiveQuery(() => db.learningSession.toArray());

  // Generate daily quests from available nodes
  useEffect(() => {
    if (!nodes || !curricula) return;
    const available = nodes
      .filter(n => n.status === 'available' || n.status === 'in_progress')
      .slice(0, 12);
    const shuffled = available.sort(() => Math.random() - 0.5);
    const picks = shuffled.slice(0, 3);
    const quests: DailyQuest[] = picks.map(n => {
      const c = curricula.find(curr => curr.id === n.curriculumId);
      return {
        nodeId: n.id,
        nodeTitle: n.title,
        curriculumTitle: c?.title ?? 'Unknown',
        xpReward: n.xpReward,
        completed: n.status === 'completed',
      };
    });
    setDailyQuests(quests);
  }, [nodes, curricula]);

  if (!mounted) return null;

  // Calculate domain progress
  const domainProgress = curricula?.map(c => {
    const cNodes = nodes?.filter(n => n.curriculumId === c.id) ?? [];
    const completed = cNodes.filter(n => n.status === 'completed').length;
    const total = cNodes.length;
    return {
      title: c.title,
      completed,
      total,
      pct: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }) ?? [];

  // Today's sessions
  const todaySessions = sessions?.filter(
    s => new Date(s.startedAt).toISOString().split('T')[0] === todayStr
  ) ?? [];

  const progress = user
    ? Math.round(
        (domainProgress.reduce((sum, d) => sum + d.pct, 0) /
          Math.max(domainProgress.length, 1))
      )
    : 0;

  if (!user) {
    return (
      <div className="page-content">
        <div className={styles.welcome}>
          <div className={styles.welcomeIcon}>⚒️</div>
          <h1>Welcome to LifeForge</h1>
          <p>Your strategic learning journey starts here.</p>
          <a href="/onboarding" className={styles.ctaButton}>Begin Onboarding →</a>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.logoRow}>
            <span className={styles.logoIcon}>⚒️</span>
            <h1>LifeForge</h1>
          </div>
          <p className={styles.tagline}>Forge your intellect. Sequentially.</p>
          <div className={styles.levelPill}>
            ⚒️ Level {user.level} — {getLevelTitle(user.level)}
          </div>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.bigXp}>{user.xp.toLocaleString()}</div>
          <div className={styles.bigXpLabel}>XP Total</div>
        </div>
      </div>

      {/* Streak Banner */}
      <div className={styles.streakBanner}>
        <div className={styles.streakLeft}>
          <span className={styles.streakEmoji}>
            {user.currentStreak >= 30 ? '🔥🔥🔥' : user.currentStreak >= 7 ? '🔥🔥' : user.currentStreak >= 1 ? '🔥' : '💤'}
          </span>
          <span className={styles.streakText}>
            {user.currentStreak >= 1
              ? `${user.currentStreak}-day streak! ${user.currentStreak >= 7 ? 'You\'re on fire! ⚒️' : 'Keep it going!'}`
              : 'Start your streak today — complete a node to light the fire.'}
          </span>
        </div>
        <div className={styles.streakRight}>
          {todaySessions.length === 0 ? (
            <span className={styles.noSession}>⚠️ No sessions today</span>
          ) : (
            <span className={styles.sessionCount}>✅ {todaySessions.length} session{todaySessions.length !== 1 ? 's' : ''} today</span>
          )}
        </div>
      </div>

      {/* LifeSkills Radar + Stats */}
      <div className={styles.skillsRow}>
        {/* Radar */}
        <div className={styles.radarCard}>
          <h2 className={styles.sectionTitle}>⚒️ LifeSkills</h2>
          <div className={styles.radar}>
            <svg viewBox="0 0 200 200" className={styles.radarSvg}>
              {/* Grid rings */}
              {[25, 50, 75, 100].map(r => (
                <polygon
                  key={r}
                  points={domainProgress.length > 0
                    ? domainProgress.map((_, i) => {
                        const angle = (Math.PI * 2 * i / domainProgress.length) - Math.PI / 2;
                        const x = 100 + 70 * (r / 100) * Math.cos(angle);
                        const y = 100 + 70 * (r / 100) * Math.sin(angle);
                        return `${x},${y}`;
                      }).join(' ')
                    : '100,30 170,100 100,170 30,100'}
                  fill="none"
                  stroke={r === 100 ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.06)'}
                  strokeWidth={r === 100 ? 1.5 : 1}
                />
              ))}
              {/* Axis lines */}
              {domainProgress.length > 0 && domainProgress.map((_, i) => {
                const angle = (Math.PI * 2 * i / domainProgress.length) - Math.PI / 2;
                const x = 100 + 70 * Math.cos(angle);
                const y = 100 + 70 * Math.sin(angle);
                return (
                  <line key={i} x1="100" y1="100" x2={x} y2={y}
                    stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                );
              })}
              {/* Data polygon */}
              {domainProgress.length > 0 && (
                <polygon
                  points={domainProgress.map((d, i) => {
                    const angle = (Math.PI * 2 * i / domainProgress.length) - Math.PI / 2;
                    const r = (d.pct / 100) * 70;
                    const x = 100 + r * Math.cos(angle);
                    const y = 100 + r * Math.sin(angle);
                    return `${x},${y}`;
                  }).join(' ')}
                  fill="rgba(245,158,11,0.25)"
                  stroke="rgba(245,158,11,0.8)"
                  strokeWidth="2"
                />
              )}
              {/* Domain labels */}
              {domainProgress.length > 0 && domainProgress.map((d, i) => {
                const angle = (Math.PI * 2 * i / domainProgress.length) - Math.PI / 2;
                const labelR = 82;
                const x = 100 + labelR * Math.cos(angle);
                const y = 100 + labelR * Math.sin(angle);
                const shortTitle = d.title.length > 12 ? d.title.slice(0, 11) + '…' : d.title;
                return (
                  <text
                    key={i}
                    x={x} y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="rgba(245,158,11,0.9)"
                    fontSize="7"
                    fontWeight="600"
                  >
                    {shortTitle}
                  </text>
                );
              })}
              {/* Data points */}
              {domainProgress.length > 0 && domainProgress.map((d, i) => {
                const angle = (Math.PI * 2 * i / domainProgress.length) - Math.PI / 2;
                const r = (d.pct / 100) * 70;
                const x = 100 + r * Math.cos(angle);
                const y = 100 + r * Math.sin(angle);
                return (
                  <circle key={i} cx={x} cy={y} r="4"
                    fill="#F59E0B" stroke="#0F0F0F" strokeWidth="2" />
                );
              })}
              {/* Empty state */}
              {domainProgress.length === 0 && (
                <text x="100" y="100" textAnchor="middle" fill="#525252" fontSize="10">
                  No curricula yet
                </text>
              )}
            </svg>
          </div>
          <div className={styles.overallProgress}>
            <span>Overall Progress: </span>
            <strong>{progress}%</strong>
          </div>
        </div>

        {/* Quick Stats */}
        <div className={styles.quickStats}>
          <div className={styles.qsHeader}>
            <h2>📊 Your Stats</h2>
          </div>
          <div className={styles.qsGrid}>
            <div className={styles.qsStat}>
              <span className={styles.qsNum}>{user.currentStreak}</span>
              <span className={styles.qsLabel}>Day Streak 🔥</span>
            </div>
            <div className={styles.qsStat}>
              <span className={styles.qsNum}>{user.longestStreak}</span>
              <span className={styles.qsLabel}>Best Streak</span>
            </div>
            <div className={styles.qsStat}>
              <span className={styles.qsNum}>{sessions?.length ?? 0}</span>
              <span className={styles.qsLabel}>Total Sessions</span>
            </div>
            <div className={styles.qsStat}>
              <span className={styles.qsNum}>{domainProgress.length}</span>
              <span className={styles.qsLabel}>Active Tracks</span>
            </div>
            <div className={styles.qsStat}>
              <span className={styles.qsNum}>{user.coins}</span>
              <span className={styles.qsLabel}>Coins 🪙</span>
            </div>
            <div className={styles.qsStat}>
              <span className={styles.qsNum}>{user.xp}</span>
              <span className={styles.qsLabel}>Total XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Forge Quests */}
      {dailyQuests.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>⚔️ Daily Forge Quests</h2>
          <p className={styles.sectionSub}>Complete these 3 quests today. Resets at midnight.</p>
          <div className={styles.questList}>
            {dailyQuests.map((q, i) => (
              <a key={q.nodeId} href={`/session/${q.nodeId}`} className={`${styles.questCard} ${q.completed ? styles.questDone : ''}`}>
                <div className={styles.questLeft}>
                  <div className={styles.questNum}>{i + 1}</div>
                  <div className={styles.questInfo}>
                    <div className={styles.questTitle}>{q.nodeTitle}</div>
                    <div className={styles.questSource}>{q.curriculumTitle}</div>
                  </div>
                </div>
                <div className={styles.questRight}>
                  {q.completed ? (
                    <span className={styles.questComplete}>✓ Done</span>
                  ) : (
                    <span className={styles.questXp}>+{q.xpReward} XP</span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Curricula Grid */}
      {curricula && curricula.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>📚 Your Curricula</h2>
          <div className={styles.grid}>
            {curricula.map(c => {
              const cNodes = nodes?.filter(n => n.curriculumId === c.id) ?? [];
              const completed = cNodes.filter(n => n.status === 'completed').length;
              const total = cNodes.length;
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
