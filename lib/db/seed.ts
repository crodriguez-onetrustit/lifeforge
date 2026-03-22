import { db } from './index';
import { v4 as uuidv4 } from 'uuid';
import type { Curriculum, CurriculumNode } from './schema';

// ─── Curriculum 1: Learn LifeForge First ─────────────────────────────────────

const CURRICULUM_1_NODES: Omit<CurriculumNode, 'id' | 'curriculumId' | 'createdAt' | 'completedAt'>[] = [
  {
    title: 'What is strategic learning?',
    content: 'Strategic learning is the deliberate practice of acquiring knowledge with a system — not just consuming content. It means having a method, a path, and a way to measure whether you actually understood something. Most people "learn" by watching videos. They forget everything within 48 hours. Strategic learners build lasting understanding.',
    order: 1, status: 'available', xpReward: 25,
  },
  {
    title: 'The 4-Question Protocol',
    content: 'Before you dive into any topic, ask: (1) Where is this used or applied in the real world? (2) What is this in my own words? (3) How would I practice or implement it? (4) By when will I complete that practice? These four questions are your learning engine.',
    order: 2, status: 'locked', xpReward: 25,
  },
  {
    title: 'The Feynman Technique',
    content: 'If you can\'t explain it simply, you don\'t understand it yet. The Feynman Technique: pick a concept, write down everything you know about it in plain language as if explaining to a 10-year-old. Where you get stuck — that\'s the gap in your understanding. Go fill it.',
    order: 3, status: 'locked', xpReward: 25,
  },
  {
    title: 'Focused vs. Diffused Thinking',
    content: 'Your brain learns in two modes. Focused mode: active concentration on a specific problem — like reading this. Diffused mode: relaxed, default-state thinking that makes connections. Sleep, walks, and showers are diffused-mode activities. Neither mode alone is sufficient. Alternating between them is how real learning happens.',
    order: 4, status: 'locked', xpReward: 25,
  },
  {
    title: 'Build your first learning path',
    content: 'You\'re ready. Go to the Library, pick a curriculum that interests you, and start with the first available node. Follow the 4-Question Protocol for each node. After each session, complete the Feynman check. Your streak starts when you complete your first session.',
    order: 5, status: 'locked', xpReward: 25,
  },
];

// ─── Curriculum 3: AI & Machine Learning Basics (Stanford CS229) ──────────────

const CURRICULUM_3_NODES: Omit<CurriculumNode, 'id' | 'curriculumId' | 'createdAt' | 'completedAt'>[] = [
  {
    title: 'Supervised Learning: Parametric & Non-Parametric Methods',
    content: 'CS229 Topic 1: In supervised learning, we learn a mapping from inputs to outputs from labeled training data. Parametric methods (e.g., linear/logistic regression) make strong assumptions about the form of the function. Non-parametric methods (e.g., k-NN, decision trees) make fewer assumptions and can fit arbitrarily complex patterns. Karpathy: Neural Networks playlist covers the intuition behind why this matters.',
    order: 1, status: 'available', xpReward: 25,
  },
  {
    title: 'Neural Networks',
    content: 'CS229 Topic: Artificial neural networks are function approximators inspired loosely by biological neurons. A network layers simple computational units (neurons) to learn complex patterns. Key concepts: weights, biases, activation functions (ReLU, sigmoid, tanh), backpropagation, gradient descent. Karpathy\'s "Neural Networks" YouTube series is the definitive visual introduction.',
    order: 2, status: 'locked', xpReward: 25,
  },
  {
    title: 'Generative Learning Algorithms',
    content: 'CS229 Topic: Instead of modeling p(y|x) directly (discriminative), generative algorithms model p(x|y) and p(y), then use Bayes\' theorem. Examples: Gaussian Discriminant Analysis (GDA), Naive Bayes. These can work with smaller datasets and allow sampling from the learned distribution.',
    order: 3, status: 'locked', xpReward: 25,
  },
  {
    title: 'Learning Theory: Bias-Variance Tradeoff',
    content: 'CS229 Topic: Bias = error from overly simplifying the model (underfitting). Variance = error from the model being too sensitive to training data (overfitting). As model complexity increases, bias decreases but variance increases. The optimal model balances both. This tradeoff is fundamental to all of ML.',
    order: 4, status: 'locked', xpReward: 25,
  },
  {
    title: 'Learning Theory: Practical Advice',
    content: 'CS229 Topic: How to actually evaluate and improve models. Train/dev/test splits. Diagnostic: high bias → more features, more layers. High variance → more data, regularization. Never test on training data. Use validation sets to tune hyperparameters before final evaluation.',
    order: 5, status: 'locked', xpReward: 25,
  },
  {
    title: 'Regularization and Model Selection',
    content: 'Techniques to prevent overfitting: L1 (Lasso) and L2 (Ridge) penalties, dropout for neural networks, early stopping. Model selection via cross-validation: k-fold CV. AIC/BIC for model comparison. The bias-variance tradeoff is managed through these tools.',
    order: 6, status: 'locked', xpReward: 25,
  },
  {
    title: 'Unsupervised Learning: Clustering',
    content: 'CS229 Topic: Learning patterns from unlabeled data. K-means: iteratively assign points to nearest centroid and update centroids. Hierarchical clustering: build dendrograms of nested clusters. Gaussian Mixture Models (GMM): probabilistic soft clustering. Applications: market segmentation, anomaly detection, organization.',
    order: 7, status: 'locked', xpReward: 25,
  },
  {
    title: 'Unsupervised Learning: Dimensionality Reduction',
    content: 'CS229 Topic: PCA (Principal Component Analysis) finds orthogonal axes of maximum variance in data — the best linear compression. ICA (Independent Component Analysis) separates mixed signals into independent components. t-SNE is a non-linear technique for visualization. Used for visualization, compression, and as preprocessing for downstream models.',
    order: 8, status: 'locked', xpReward: 25,
  },
  {
    title: 'Reinforcement Learning and Adaptive Control',
    content: 'CS229 Topic: Learning from rewards instead of labels. An agent takes actions in an environment, receives scalar rewards, and learns a policy (mapping states to actions) that maximizes cumulative reward. Key algorithms: Q-learning, policy gradient, actor-critic. Applications: game AI, robotics, recommendation systems, autonomous vehicles.',
    order: 9, status: 'locked', xpReward: 25,
  },
  {
    title: 'Applications: Robotics, Data Mining, Speech, Text',
    content: 'ML applied to real-world domains: (1) Robotics — using RL and imitation learning for motor control. (2) Data mining — finding patterns in large-scale data. (3) Speech recognition — HMMs, seq2seq models, transformers. (4) NLP — text classification, language models, transformers (the basis of GPT/BERT). These are the domains where the theory becomes real.',
    order: 10, status: 'locked', xpReward: 25,
  },
  {
    title: 'Large Language Models and Transformers',
    content: 'The architecture behind modern AI: the Transformer (Vaswani et al., 2017) uses self-attention to process sequences in parallel. LLMs like GPT are transformers trained on vast text corpora to predict the next token. Key concepts: attention mechanism, pre-training vs. fine-tuning, few-shot prompting, RLHF. Karpathy\'s GPT video is the best visual explanation available.',
    order: 11, status: 'locked', xpReward: 25,
  },
  {
    title: 'The ML Pipeline: From Problem to Deployment',
    content: 'End-to-end ML workflow: (1) Define the problem and metrics. (2) Collect and clean data. (3) Feature engineering. (4) Train and validate models. (5) Error analysis. (6) Deploy and monitor. Most real-world ML is 80% data work. Deployment brings unique challenges: drift detection, retraining pipelines, serving infrastructure.',
    order: 12, status: 'locked', xpReward: 25,
  },
];

// ─── Seed Function ────────────────────────────────────────────────────────────

export async function seedStarterCurricula(): Promise<void> {
  const now = Date.now();

  // Check if already seeded
  const existing = await db.curriculum.where('source').equals('starter').count();
  if (existing > 0) return;

  const id1 = uuidv4();
  const id3 = uuidv4();

  await db.curriculum.bulkAdd([
    {
      id: id1,
      title: 'Learn LifeForge First',
      description: 'The meta-curriculum. Learn how to learn before you learn anything else.',
      source: 'starter',
      createdAt: now,
      updatedAt: now,
      isPublished: true,
    },
    {
      id: id3,
      title: 'AI & Machine Learning Basics',
      description: 'Based on Stanford CS229 official topics + Andrej Karpathy YouTube. Build real understanding of ML from the ground up.',
      source: 'starter',
      createdAt: now,
      updatedAt: now,
      isPublished: true,
    },
    // NOTE: Finance Fundamentals curriculum (id2) pending — Charlie to source CC-licensed content
  ] as Curriculum[]);

  await db.curriculumNode.bulkAdd([
    ...CURRICULUM_1_NODES.map((n, i) => ({
      ...n,
      id: uuidv4(),
      curriculumId: id1,
      createdAt: now,
      completedAt: null,
    })),
    ...CURRICULUM_3_NODES.map((n, i) => ({
      ...n,
      id: uuidv4(),
      curriculumId: id3,
      createdAt: now,
      completedAt: null,
    })),
  ] as CurriculumNode[]);
}
