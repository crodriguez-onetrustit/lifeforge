// ─── User ─────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  displayName: string;
  createdAt: number;
  xp: number;
  level: number;
  coins: number;
  currentStreak: number;
  longestStreak: number;
  lastSessionDate: string; // YYYY-MM-DD
  preferences: {
    theme?: 'dark' | 'light';
    dailyGoalMinutes?: number;
  };
}

// ─── Curriculum ───────────────────────────────────────────────────────────────

export type CurriculumSource = 'starter' | 'epub' | 'community';

export interface Curriculum {
  id: string;
  title: string;
  description: string;
  source: CurriculumSource;
  createdAt: number;
  updatedAt: number;
  isPublished: boolean;
}

// ─── CurriculumNode ───────────────────────────────────────────────────────────

export type NodeStatus = 'locked' | 'available' | 'in_progress' | 'completed';

export interface CurriculumNode {
  id: string;
  curriculumId: string;
  title: string;
  content: string;
  order: number;
  status: NodeStatus;
  xpReward: number;
  createdAt: number;
  completedAt: number | null;
}

// ─── LearningSession ──────────────────────────────────────────────────────────

export interface LearningSession {
  id: string;
  nodeId: string;
  userId: string;
  q1Answer: string;
  q2Answer: string;
  q3Answer: string;
  q4Deadline: string; // YYYY-MM-DD
  feynmanAnswer: string | null;
  feynmanCompleted: boolean;
  xpEarned: number;
  coinsEarned: number;
  startedAt: number;
  completedAt: number | null;
}

// ─── StreakEvent ─────────────────────────────────────────────────────────────

export interface StreakEvent {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  sessionsCompleted: number;
  streakBonusXp: number;
}

// ─── Achievement ─────────────────────────────────────────────────────────────

export const ACHIEVEMENT_DEFINITIONS = {
  first_session:  { name: 'First Forge',      condition: 'Complete 1 session' },
  week_streak:   { name: 'On Fire',          condition: 'Hit 7-day streak' },
  month_streak:  { name: 'Blazing',          condition: 'Hit 30-day streak' },
  path_complete: { name: 'Path Walker',       condition: 'Complete 1 curriculum' },
  feynman_master:{ name: 'Simple Speaker',    condition: 'Complete 10 Feynman checks' },
  all_starter:   { name: 'Scholar',          condition: 'Complete all 3 starter curricula' },
} as const;

export type AchievementId = keyof typeof ACHIEVEMENT_DEFINITIONS;

export interface Achievement {
  id: string;
  userId: string;
  achievementId: AchievementId;
  unlockedAt: number;
  notified: boolean;
}

// ─── Export Schema ────────────────────────────────────────────────────────────

export interface LifeForgeExport {
  version: 1;
  exportedAt: string;
  user: User | null;
  curricula: Curriculum[];
  nodes: CurriculumNode[];
  sessions: LearningSession[];
  streaks: StreakEvent[];
  achievements: Achievement[];
}
