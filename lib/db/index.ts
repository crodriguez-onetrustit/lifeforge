import Dexie, { type Table } from 'dexie';
import type {
  User,
  Curriculum,
  CurriculumNode,
  LearningSession,
  StreakEvent,
  Achievement,
} from './schema';

export class LifeForgeDB extends Dexie {
  user!: Table<User>;
  curriculum!: Table<Curriculum>;
  curriculumNode!: Table<CurriculumNode>;
  learningSession!: Table<LearningSession>;
  streakEvent!: Table<StreakEvent>;
  achievement!: Table<Achievement>;

  constructor() {
    super('lifeforge');

    this.version(1).stores({
      user:             'id, displayName, createdAt',
      curriculum:       'id, title, source, createdAt, isPublished',
      curriculumNode:   'id, curriculumId, order, status, [curriculumId+order]',
      learningSession: 'id, nodeId, userId, startedAt, completedAt',
      streakEvent:      'id, userId, date, sessionsCompleted',
      achievement:     'id, userId, achievementId, unlockedAt',
    });
  }
}

export const db = new LifeForgeDB();
