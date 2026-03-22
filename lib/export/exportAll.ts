import { db } from '../db';
import type { LifeForgeExport } from '../db/schema';

export async function exportAll(): Promise<Blob> {
  const [user, curricula, nodes, sessions, streaks, achievements] = await Promise.all([
    db.user.toCollection().first(),
    db.curriculum.toArray(),
    db.curriculumNode.toArray(),
    db.learningSession.toArray(),
    db.streakEvent.toArray(),
    db.achievement.toArray(),
  ]);

  const payload: LifeForgeExport = {
    version: 1,
    exportedAt: new Date().toISOString(),
    user: user ?? null,
    curricula,
    nodes,
    sessions,
    streaks,
    achievements,
  };

  return new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json',
  });
}

export function downloadExport(blob: Blob, filename = 'lifeforge-backup.json') {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
