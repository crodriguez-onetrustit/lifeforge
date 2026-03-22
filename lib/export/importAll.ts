import { db } from '../db';
import type { LifeForgeExport } from '../db/schema';

export async function importAll(blob: Blob): Promise<void> {
  const text = await blob.text();
  const data = JSON.parse(text) as LifeForgeExport;

  if (!data.version || data.version !== 1) {
    throw new Error('Unsupported export version');
  }

  await db.transaction('rw', [
    db.user,
    db.curriculum,
    db.curriculumNode,
    db.learningSession,
    db.streakEvent,
    db.achievement,
  ], async () => {
    await db.user.clear();
    await db.curriculum.clear();
    await db.curriculumNode.clear();
    await db.learningSession.clear();
    await db.streakEvent.clear();
    await db.achievement.clear();

    if (data.user)          await db.user.add(data.user);
    if (data.curricula)     await db.curriculum.bulkAdd(data.curricula);
    if (data.nodes)         await db.curriculumNode.bulkAdd(data.nodes);
    if (data.sessions)      await db.learningSession.bulkAdd(data.sessions);
    if (data.streaks)       await db.streakEvent.bulkAdd(data.streaks);
    if (data.achievements)  await db.achievement.bulkAdd(data.achievements);
  });

  // Reload to pick up new state
  window.location.reload();
}
