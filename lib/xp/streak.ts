import { XP } from './engine';

export interface StreakResult {
  newStreak: number;
  bonusXP: number;
  streakBroken: boolean;
  sameDay: boolean;
}

/**
 * Calculate new streak state given the last session date and today.
 * Callers must track currentStreak separately.
 */
export function calculateStreak(
  lastSessionDate: string | null,
  today: string,
  currentStreak: number,
): StreakResult {
  if (!lastSessionDate) {
    return { newStreak: 1, bonusXP: 0, streakBroken: false, sameDay: false };
  }

  const last = new Date(lastSessionDate);
  const today_ = new Date(today);
  const diffDays = Math.round((today_.getTime() - last.getTime()) / 86_400_000);

  if (diffDays === 0) {
    return { newStreak: currentStreak, bonusXP: 0, streakBroken: false, sameDay: true };
  }

  if (diffDays === 1) {
    const newStreak = currentStreak + 1;
    const milestoneBonus =
      newStreak === 7  ? XP.STREAK_7DAY_BONUS  :
      newStreak === 30 ? XP.STREAK_30DAY_BONUS :
      0;
    return { newStreak, bonusXP: milestoneBonus, streakBroken: false, sameDay: false };
  }

  // Gap > 1 day — streak broken
  return { newStreak: 1, bonusXP: 0, streakBroken: true, sameDay: false };
}

export function formatStreak(days: number): string {
  if (days === 0) return 'No streak';
  if (days === 1) return '1 day';
  return `${days} days`;
}
