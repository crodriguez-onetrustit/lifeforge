import { db } from './index';
import { v4 as uuidv4 } from 'uuid';
import type { Curriculum, CurriculumNode } from './schema';
import { buildLearnLifeForgeCurriculum } from './curricula/learn-lifeforge';
import { buildFinanceCurriculum } from './curricula/finance';
import { buildAIMLCurriculum } from './curricula/ai-ml';
import { buildCryptoCurriculum } from './curricula/crypto';
import { buildTradingCurriculum } from './curricula/trading';
import { buildStatsCurriculum } from './curricula/stats';

// ─── Seed All Starter Curricula ────────────────────────────────────────────────
// Order matters: Learn LifeForge First first (it's the meta-curriculum)

export async function seedStarterCurricula(): Promise<void> {
  const now = Date.now();

  const existing = await db.curriculum.where('source').equals('starter').count();
  if (existing > 0) return;

  const [
    learnLFResult,
    financeResult,
    aiMLResult,
    cryptoResult,
    tradingResult,
    statsResult,
  ] = await Promise.all([
    Promise.resolve(buildLearnLifeForgeCurriculum(uuidv4(), now)),
    Promise.resolve(buildFinanceCurriculum(uuidv4(), now)),
    Promise.resolve(buildAIMLCurriculum(uuidv4(), now)),
    Promise.resolve(buildCryptoCurriculum(uuidv4(), now)),
    Promise.resolve(buildTradingCurriculum(uuidv4(), now)),
    Promise.resolve(buildStatsCurriculum(uuidv4(), now)),
  ]);

  await db.curriculum.bulkAdd([
    learnLFResult.curriculum,
    financeResult.curriculum,
    aiMLResult.curriculum,
    cryptoResult.curriculum,
    tradingResult.curriculum,
    statsResult.curriculum,
  ] as Curriculum[]);

  await db.curriculumNode.bulkAdd([
    ...learnLFResult.nodes.map(n => ({ ...n, id: uuidv4() })),
    ...financeResult.nodes.map(n => ({ ...n, id: uuidv4() })),
    ...aiMLResult.nodes.map(n => ({ ...n, id: uuidv4() })),
    ...cryptoResult.nodes.map(n => ({ ...n, id: uuidv4() })),
    ...tradingResult.nodes.map(n => ({ ...n, id: uuidv4() })),
    ...statsResult.nodes.map(n => ({ ...n, id: uuidv4() })),
  ] as CurriculumNode[]);
}
