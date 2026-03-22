'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import type { Curriculum, CurriculumNode } from '@/lib/db/schema';
import styles from './page.module.css';

interface Props {
  params: Promise<{ id: string }>;
}

export default function CurriculumPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();

  const curriculum = useLiveQuery(
    () => db.curriculum.where('id').equals(id).first(),
    [id],
  );

  const nodes = useLiveQuery(
    () => db.curriculumNode.where('curriculumId').equals(id).sortBy('order'),
    [id],
  );

  if (!curriculum) {
    return (
      <div className="page-content">
        <p>Loading...</p>
      </div>
    );
  }

  const completed = nodes?.filter(n => n.status === 'completed').length ?? 0;
  const total = nodes?.length ?? 0;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="page-content">
      <button className={styles.backBtn} onClick={() => router.back()}>
        ← Back
      </button>

      <div className={styles.header}>
        <div>
          <div className={styles.source}>{curriculum.source}</div>
          <h1>{curriculum.title}</h1>
          <p>{curriculum.description}</p>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>{pct}%</span>
            <span className={styles.statLabel}>Complete</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>{completed}/{total}</span>
            <span className={styles.statLabel}>Nodes</span>
          </div>
        </div>
      </div>

      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${pct}%` }} />
      </div>

      <div className={styles.nodeList}>
        {nodes?.map((node, i) => (
          <div
            key={node.id}
            className={`${styles.nodeCard} ${styles[node.status]}`}
          >
            <div className={styles.nodeLeft}>
              <div className={styles.nodeOrder}>{i + 1}</div>
              <div className={styles.nodeInfo}>
                <h3>{node.title}</h3>
                {node.status === 'completed' && (
                  <span className={styles.completed}>✓ Completed</span>
                )}
                {node.status === 'in_progress' && (
                  <span className={styles.inProgress}>In Progress</span>
                )}
                {node.status === 'locked' && (
                  <span className={styles.locked}>🔒 Locked</span>
                )}
                {node.status === 'available' && (
                  <span className={styles.available}>▶ Start</span>
                )}
              </div>
            </div>
            <div className={styles.nodeRight}>
              {node.status !== 'locked' ? (
                <a
                  href={`/session/${node.id}`}
                  className={styles.startBtn}
                >
                  {node.status === 'completed' ? 'Review' : 'Start'}
                </a>
              ) : (
                <span className={styles.xpBadge}>+{node.xpReward} XP</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
