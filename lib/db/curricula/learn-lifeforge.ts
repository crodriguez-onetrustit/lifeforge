// ─── Learn LifeForge First (Meta-Curriculum) ───────────────────────────────────
// This curriculum teaches users HOW to use LifeForge before diving into subject content.
// It should be the first thing users complete when starting.

import type { Curriculum, CurriculumNode } from '../schema';

export const LEARN_LIFEFORGE_NODES: Omit<CurriculumNode, 'id' | 'curriculumId' | 'createdAt' | 'completedAt'>[] = [
  {
    title: 'What Is Strategic Learning? (And Why Passive Watching Fails)',
    content: `Most people "learn" by watching videos, reading articles, and telling themselves they're making progress. They're not. This is the most important thing you'll learn in LifeForge.

Why passive watching fails:

The Illusion of Fluency: After watching a 20-minute video on quantum physics, you feel like you understand it. You don't. You understood the narrator's explanation — reproducing it is an entirely different cognitive task.

The Forgetting Curve (Ebbinghaus): Without active review, you forget ~50% of new information within 1 hour, ~70% within 24 hours, and ~90% within 1 week. Passive review is why you "learned" Spanish in high school and can't order coffee.

The Competence Gap: Anyone can watch. Actually being able to do something requires practice, failure, and iteration. Learning is a skill — like playing piano or lifting weights. Watching someone else do it doesn't build your muscles.

What strategic learning actually looks like:
• You have a specific gap you're closing (not "I want to learn AI" — "I want to understand how neural networks learn")
• You actively recall information (not just re-reading)
• You apply concepts immediately or set a specific practice deadline
• You explain things in your own words, without the source material
• You return to material at spaced intervals (spaced repetition)

The proof: Barbara Oakley's "Learning How to Learn" course (free on Coursera) — 3 million+ enrolled, strong learning science backing — teaches these exact techniques. The students who outperform their peers aren't smarter. They use better methods.

Your first action: pick ONE thing you "learned passively" recently. Ask yourself: can I explain it without the source material? If not, you didn't learn it. You just recognized it.

Feynman quote: "You don't understand something if you can't explain it to a child." That's not motivational — it's a diagnostic test. Try it.`,
    order: 1, status: 'available', xpReward: 30,
  },
  {
    title: 'The 4-Question Protocol — The Core Loop of LifeForge',
    content: `Every learning session in LifeForge follows this loop. It transforms passive reading into active learning. Here's how it works:

Question 1: Where is this used or applied?
Before you learn a concept, you need context. Where does this appear in the real world? What problems does it solve? If you don't know what a concept is FOR, you can't understand WHY it works the way it does.

Example — learning compound interest:
Wrong approach: memorize A=P(1+r/n)^nt
Right approach: Where is compound interest used? (Bank accounts, retirement accounts, debt — it's everywhere) — now the formula makes sense.

Question 2: What is this in your own words?
Close the source material. Write what you understand in your own language. This is active recall — it forces your brain to reconstruct the concept, which strengthens memory pathways.

Why this works: re-reading feels productive because you're processing familiar words. But actual retrieval practice — trying to recall without looking — is what builds long-term memory. The struggle is the learning.

Question 3: How would you implement or practice this?
Theory is useless without practice. This question forces you to design a concrete action. Not "I'll study more" — but "I'll calculate compound interest on my own savings for 3 different scenarios."

Question 4: By when will you complete your practice?
A goal without a deadline is a wish. This question makes your learning actionable. Set a specific date. LifeForge will follow up.

The full loop:
Learn → Apply → Review → Teach someone → If gap → Learn again

You run this loop on every concept. That's the entire system.`,
    order: 2, status: 'locked', xpReward: 30,
  },
  {
    title: 'The Feynman Technique — Test Before You Move On',
    content: `The Feynman Technique is your reality check. You do NOT understand a concept until you can explain it simply.

The process:
1. Pick a concept you've just "learned"
2. Without looking at your notes, write an explanation as if teaching a 10-year-old
3. If you get stuck, go back and re-learn that specific gap
4. Simplify further until anyone could understand it

Why this works:
Explaining forces you to identify the gaps in your understanding. When you write "electrons flow through a circuit" you're using words without understanding. But when you try to explain WHY a light turns on, you hit the wall — and that's exactly where learning happens.

The gap-filling loop:
Gap in explanation → Go back to source → Learn specific gap → Explain again → Still stuck? → Learn again

Key rule: simple words only. If your explanation uses jargon the person doesn't know, you haven't explained it — you've translated it.

Real example — the Feynman technique for "probability":
Bad (jargon): "Probability is a measure of the likelihood of an event occurring, expressed as a number between 0 and 1."
Good (10-year-old): "If you flip a coin, probability tells you how likely it is to land on heads. Out of 10 flips, it usually lands on heads about 5 times — that's what we call 50% probability."

The second version means you actually GET probability. The first means you can repeat it.

LifeForge practice: after completing the 4-question protocol for any node, write your Feynman explanation. It's not optional — it's how you know you're done.`,
    order: 3, status: 'locked', xpReward: 30,
  },
  {
    title: 'Focused vs. Diffused Thinking — Work AND Rest',
    content: `Your brain has two modes of thinking. Using only one makes you worse at learning.

Focused Mode:
• When you're concentrating intensely on a problem
• The prefrontal cortex (logic center) is highly active
• Linear, analytical thinking — following a known path
• What you use when solving a math problem you already understand
• Where new information gets processed and temporarily stored

Diffused Mode:
• Your brain's "default mode network" — active when you're NOT concentrating
• The "scatterbrain" state — connections form loosely between ideas
• Non-linear, creative — making unexpected connections
• Where insights happen ("I figured it out in the shower")
• Critical for consolidating learning and making meaning from new information

Why this matters:
• If you study for 4 hours straight in focused mode only, you hit diminishing returns — the brain has no time to consolidate
• Rest is not wasted time — it's when your brain processes and integrates new information
• Diffused thinking is why "sleep on it" actually works

The Learning Loop:
1. Focused: study material, try problems, make mistakes
2. Diffused: take a break — walk, shower, sleep, do something unrelated
3. Focused: return — often with new insight or better understanding

Specific techniques:
• Pomodoro: 25 min focused, 5 min break (light rest)
• Deep rest: after 90 min focused, 20-30 min full break (theatrical walk, nap, exercise)
• Sleep: 7-9 hours — the most powerful diffused learning window
  Sleep consolidates memories, does "offline replay" of what you learned (synaptic pruning and strengthening)

The mistake most learners make: grind for hours without breaks. It feels productive. It isn't. The most productive learning sessions are intense focused blocks followed by genuine rest. Quality over quantity — always.`,
    order: 4, status: 'locked', xpReward: 30,
  },
  {
    title: 'Build Your First Learning Path — Putting It Together',
    content: `You now know HOW to learn strategically. This node is about applying it: building your first real learning path in LifeForge.

The process:

Step 1: Pick ONE domain to start
You have 6 curricula to choose from in LifeForge. Don't try to do all of them at once. Pick the one most relevant to your current goals.

Finance Fundamentals — if you want to understand money, investing, or your career
AI & Machine Learning — if you want to understand modern AI systems
Crypto & DeFi — if you want to understand decentralized finance and blockchain
Trading & Markets — if you want to understand how markets work and trading strategies
Statistics & Probability — if you want to build quantitative reasoning skills
Learn LifeForge First — you're doing this one now

Step 2: Set your pace
LifeForge isn't a sprint. It's a daily practice.
• Minimum: 1 session per day (20-30 min)
• Realistic for busy people: 3-4 sessions per week
• Aggressive: 2 sessions per day

Track your streak. Streaks are momentum. Momentum is the single biggest predictor of long-term learning.

Step 3: Set your first deadline
By when do you want to complete your chosen curriculum?
• 15-node curriculum at 1 session/day ≈ 3 weeks
• 15-node curriculum at 3 sessions/week ≈ 5 weeks

Step 4: Execute the protocol
Every session:
1. Open the next available node
2. Read the content carefully
3. Answer the 4 questions (in your own words — actually write them)
4. Complete the Feynman check
5. Celebrate — you've done the work

The secret no one tells you:
Consistency beats intensity. Studying 30 minutes every day for 6 months will make you an expert. Studying 6 hours in one day once will make you tired.

Your first curriculum is your foundation. Complete it before starting a second. Breadth without depth is the trap LifeForge was built to escape.`,
    order: 5, status: 'locked', xpReward: 50,
  },
];

export function buildLearnLifeForgeCurriculum(id: string, now: number): { curriculum: Curriculum; nodes: CurriculumNode[] } {
  return {
    curriculum: {
      id,
      title: 'Learn LifeForge First',
      description: 'The meta-curriculum — teaches the learning methodology that makes all other curricula more effective. 5 nodes covering strategic learning, the 4-question protocol, Feynman technique, focused/diffused thinking, and building your first path.',
      source: 'starter',
      createdAt: now,
      updatedAt: now,
      isPublished: true,
    },
    nodes: LEARN_LIFEFORGE_NODES.map(n => ({ ...n, id: '', curriculumId: id, createdAt: now, completedAt: null })),
  };
}
