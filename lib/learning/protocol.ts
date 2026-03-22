// ─── Learning Protocol State Machine ─────────────────────────────────────────
// Implements the 4-question protocol + Feynman check per SPEC US-02

export type ProtocolStep = 'q1' | 'q2' | 'q3' | 'q4' | 'feynman' | 'done';

export const PROTOCOL_ORDER: ProtocolStep[] = ['q1', 'q2', 'q3', 'q4', 'feynman', 'done'];

export const STEP_CONFIG: Record<ProtocolStep, {
  question: string;
  subtext?: string;
  minLength: number;
  xpAward: number;
  field: keyof {
    q1Answer: string;
    q2Answer: string;
    q3Answer: string;
    q4Deadline: string;
    feynmanAnswer: string;
  } | null;
}> = {
  q1: {
    question: 'Where is this used or applied?',
    subtext: 'Give at least one real-world context where this concept appears.',
    minLength: 20,
    xpAward: 0,
    field: 'q1Answer',
  },
  q2: {
    question: 'What is this in your own words?',
    subtext: 'Explain it as if you were teaching someone who has never seen it before.',
    minLength: 50,
    xpAward: 0,
    field: 'q2Answer',
  },
  q3: {
    question: 'How would you implement or practice this?',
    subtext: 'Describe a concrete action you could take to apply what you learned.',
    minLength: 0,
    xpAward: 0,
    field: 'q3Answer',
  },
  q4: {
    question: 'By when will you complete your practice?',
    subtext: 'Set a realistic deadline — the system will follow up.',
    minLength: 0,
    xpAward: 0,
    field: 'q4Deadline',
  },
  feynman: {
    question: 'Explain this as if to a 10-year-old:',
    subtext: 'If you can explain it simply, you\'ve truly understood it.',
    minLength: 30,
    xpAward: 10,
    field: 'feynmanAnswer',
  },
  done: {
    question: '',
    minLength: 0,
    xpAward: 0,
    field: null,
  },
};

export function getNextStep(current: ProtocolStep): ProtocolStep {
  const idx = PROTOCOL_ORDER.indexOf(current);
  if (idx === -1 || idx === PROTOCOL_ORDER.length - 1) return 'done';
  return PROTOCOL_ORDER[idx + 1];
}

export function canProceed(step: ProtocolStep, value: string): boolean {
  if (step === 'done') return false;
  return value.trim().length >= STEP_CONFIG[step].minLength;
}
