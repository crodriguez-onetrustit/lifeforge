// ─── XP Awards (per SPEC US-03) ───────────────────────────────────────────────

export const XP = {
  SESSION_COMPLETE:     25,
  FEYNMAN_COMPLETE:     10,
  FIRST_SESSION_BONUS:   5,
  STREAK_7DAY_BONUS:    25,
  STREAK_30DAY_BONUS:  100,
  PATH_COMPLETE:       200,
} as const;

// ─── Level Thresholds (per SPEC US-03) ───────────────────────────────────────

export const LEVELS = [
  { level: 1, title: 'Learner',     xpRequired:    0 },
  { level: 2, title: 'Apprentice',  xpRequired:  100 },
  { level: 3, title: 'Scholar',     xpRequired:  300 },
  { level: 4, title: 'Sage',       xpRequired:  700 },
  { level: 5, title: 'Master',     xpRequired: 1500 },
  { level: 6, title: 'Grandmaster',xpRequired: 3000 },
] as const;

// ─── Engine ───────────────────────────────────────────────────────────────────

export function calculateLevel(totalXP: number): number {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVELS[i].xpRequired) return LEVELS[i].level;
  }
  return 1;
}

export function getLevelTitle(level: number): string {
  return LEVELS.find(l => l.level === level)?.title ?? 'Learner';
}

export function getXPForNextLevel(level: number): number | null {
  const next = LEVELS.find(l => l.level === level + 1);
  return next?.xpRequired ?? null;
}

export function getLevelProgress(totalXP: number): { current: number; next: number; percent: number } {
  const level = calculateLevel(totalXP);
  const current = LEVELS.find(l => l.level === level)!;
  const next = LEVELS.find(l => l.level === level + 1);

  if (!next) {
    return { current: totalXP, next: current.xpRequired, percent: 100 };
  }

  const xpIntoLevel = totalXP - current.xpRequired;
  const xpNeeded = next.xpRequired - current.xpRequired;
  return {
    current: xpIntoLevel,
    next: xpNeeded,
    percent: Math.round((xpIntoLevel / xpNeeded) * 100),
  };
}

export function awardSessionXP(): { xpGained: number; coinsGained: number } {
  const xpGained = XP.SESSION_COMPLETE + XP.FIRST_SESSION_BONUS;
  const coinsGained = Math.floor(xpGained / 10);
  return { xpGained, coinsGained };
}
