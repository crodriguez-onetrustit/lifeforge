/**
 * Achievement engine — checks conditions and unlocks achievements after sessions.
 */

import { db } from '../db';
import type { Achievement, AchievementId } from '../db/schema';
import { v4 as uuidv4 } from 'uuid';

export async function checkAchievements(userId: string): Promise<AchievementId[]> {
  const unlocked: AchievementId[] = [];
  const existing = await db.achievement.where('userId').equals(userId).toArray();
  const unlockedIds = new Set(existing.map(a => a.achievementId));

  const user = await db.user.toCollection().first();
  if (!user) return [];

  const sessions = await db.learningSession.where('userId').equals(userId).toArray();
  const nodes = await db.curriculumNode.toArray();
  const curricula = await db.curriculum.toArray();

  const sessionCount = sessions.length;
  const feynmanCount = sessions.filter(s => s.feynmanCompleted).length;
  const completedCurricula = curricula.filter(c =>
    c.source === 'starter' &&
    nodes.filter(n => n.curriculumId === c.id).every(n => n.status === 'completed')
  ).length;

  const checks: Array<{ id: AchievementId; condition: boolean }> = [
    { id: 'first_session',  condition: sessionCount >= 1 },
    { id: 'week_streak',    condition: user.currentStreak >= 7 },
    { id: 'month_streak',   condition: user.currentStreak >= 30 },
    { id: 'feynman_master', condition: feynmanCount >= 10 },
    { id: 'path_complete',  condition: completedCurricula >= 1 },
    { id: 'all_starter',    condition: completedCurricula >= 3 },
  ];

  for (const check of checks) {
    if (check.condition && !unlockedIds.has(check.id)) {
      const achievement: Achievement = {
        id: uuidv4(),
        userId,
        achievementId: check.id,
        unlockedAt: Date.now(),
        notified: false,
      };
      await db.achievement.add(achievement);
      unlocked.push(check.id);
    }
  }

  return unlocked;
}

export const ACHIEVEMENT_DISPLAY: Record<AchievementId, { emoji: string; title: string; color: string }> = {
  first_session:  { emoji: '⚒️', title: 'First Forge',       color: '#F59E0B' },
  week_streak:    { emoji: '🔥', title: 'On Fire',          color: '#EF4444' },
  month_streak:   { emoji: '💎', title: 'Blazing',          color: '#8B5CF6' },
  path_complete:  { emoji: '🗺️', title: 'Path Walker',      color: '#10B981' },
  feynman_master: { emoji: '🧠', title: 'Simple Speaker',    color: '#06B6D4' },
  all_starter:    { emoji: '🏆', title: 'Scholar',           color: '#F59E0B' },
};
