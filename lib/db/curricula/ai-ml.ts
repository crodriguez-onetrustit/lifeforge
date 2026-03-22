// ─── AI & Machine Learning Basics ─────────────────────────────────────────────
// Sources: Stanford CS229 (Machine Learning) by Andrew Ng + Andrej Karpathy YouTube lectures
// URL: https://cs229.stanford.edu/
// License: Stanford OpenCourseWare (free to use for learning)

import type { Curriculum, CurriculumNode } from '../schema';

export const AIML_NODES: Omit<CurriculumNode, 'id' | 'curriculumId' | 'createdAt' | 'completedAt'>[] = [
  {
    title: 'What Is Machine Learning? The Big Picture',
    content: `Machine learning (ML) is the science of getting computers to learn from data without being explicitly programmed. Instead of writing rules by hand ("if x, then y"), you give the computer examples and let it figure out the rules.

Traditional programming:
Input + Rules → Output

Machine learning:
Input + Output → Rules (the algorithm discovers the rules)

Why ML matters now:
• Data is everywhere — 2.5 quintillion bytes created daily
• Compute is cheap — the same GPU that cost $1M in 2012 costs $1 today
• Algorithms have matured — decades of research now practical

Types of ML:

1. Supervised Learning (most common):
You have labeled data (input + correct output). The algorithm learns from examples.
• Email: spam or not spam? (labeled examples)
• Photo: cat or dog?
• Predict house prices from features
The algorithm sees many (input, correct_output) pairs and learns the mapping.

2. Unsupervised Learning:
You have data but no labels. The algorithm finds structure.
• Cluster customers by behavior (without telling it the categories)
• Dimensionality reduction (compress data while keeping the important parts)
• Anomaly detection (find unusual patterns — fraud, rare events)

3. Reinforcement Learning:
An agent takes actions in an environment, gets rewards or penalties, learns a strategy to maximize rewards.
• Teaching a robot to walk
• AlphaGo (beating Go champions)
• Game-playing AI (Atari, StarCraft)

Real-world: Every time YouTube recommends a video, Netflix suggests a show, or your phone recognizes your face — ML is at work.`,
    order: 1, status: 'available', xpReward: 25,
  },
  {
    title: 'Supervised Learning — Parametric & Non-Parametric Methods',
    content: `Supervised learning is the most widely used type of ML. You train a model on labeled data, then use it to predict on new, unseen data.

Parametric methods:
These methods have a fixed number of parameters that don't grow with the size of your data. Once fit, they're compact and fast.

Linear Regression (parametric):
• Model: y = wx + b (a straight line through data)
• You find the best w (weight) and b (bias) that minimize prediction error
• Simple, interpretable, fast — the workhorse baseline
• When to use: when the relationship between input and output is roughly linear

Logistic Regression (parametric):
• Despite the name "regression," it's a classification algorithm
• Outputs a probability (0 to 1) — "what's the chance this email is spam?"
• The sigmoid function squashes any number to a probability

Non-parametric methods:
These grow with data — more data means more parameters. More flexible, but slower and can overfit.

k-Nearest Neighbors (k-NN):
• To classify a new point: find its k closest neighbors, let them vote
• k=3: look at 3 nearest neighbors, majority class wins
• Simple, no training required (lazy learning), but slow at prediction time
• Works well when the decision boundary is complex and data is not too high-dimensional

Key question: How do you choose between parametric and non-parametric?
Parametric → fast, interpretable, works well when you have limited data and linear assumptions hold
Non-parametric → works well with lots of data and complex, non-linear patterns`,
    order: 2, status: 'locked', xpReward: 25,
  },
  {
    title: 'Neural Networks — How They Work',
    content: `Neural networks are the engine behind modern AI — GPT-4, image generators, AlphaFold, voice assistants. Understanding them starts with a single neuron.

The artificial neuron (perceptron):
• Takes multiple inputs (x₁, x₂, ... xₙ)
• Each input has a weight (w₁, w₂, ... wₙ)
• Compute: z = w₁x₁ + w₂x₂ + ... + wₙxₙ + b (weighted sum + bias)
• Pass through activation function: a = activation(z)
• Output: a

Why activation functions matter:
Without non-linear activations, stacking layers is no better than a single layer — everything collapses to linear. Non-linear activations (ReLU, sigmoid, tanh) let the network learn complex, non-linear patterns.

Activation functions:
• ReLU (Rectified Linear Unit): max(0, z) — simplest, most used, fast
• Sigmoid: 1/(1+e⁻ᶻ) — outputs between 0 and 1, used historically, vanishing gradient problem
• Tanh: (eᶻ-e⁻ᶻ)/(eᶻ+e⁻ᶻ) — outputs between -1 and 1, zero-centered

Network architecture:
• Input layer → hidden layers → output layer
• "Deep" learning = many hidden layers (that's the "deep" in deep learning)
• Each layer learns increasingly abstract features
  - Layer 1: edges and textures
  - Layer 2: shapes and patterns
  - Layer 3: high-level concepts ("cat", "door", "fraud pattern")

Real example: recognizing a cat in an image
Pixels → layer 1 (edges) → layer 2 (textures, curves) → layer 3 (ears, eyes) → layer 4 ("cat" neuron fires)`,
    order: 3, status: 'locked', xpReward: 25,
  },
  {
    title: 'Training Neural Networks — Backpropagation and Gradient Descent',
    content: `You have a neural network architecture. Now: how does it learn? Two concepts: forward propagation (make a prediction) and backpropagation (update weights to improve).

Forward propagation:
Input flows through each layer, producing a prediction at the output.
Loss = how wrong was the prediction? (e.g., mean squared error: (prediction - actual)²)

Gradient descent — the learning rule:
The gradient of the loss tells you which direction to move each weight.
• If loss increases when you increase a weight → decrease that weight
• If loss decreases when you increase a weight → increase that weight
• Take small steps in the direction that reduces loss most rapidly

Learning rate: how big a step to take. Too large = overshooting, unstable. Too small = glacially slow. Usually 0.001 to 0.1.

Backpropagation:
• Computes the gradient of the loss with respect to each weight
• Uses the chain rule from calculus (dL/dw = dL/da × da/dz × dz/dw)
• Goes backward through the network, layer by layer
• This is why deep networks were impractical before GPUs — backprop requires matrix multiplications at scale

Epochs and batches:
• One epoch = one pass through the entire training dataset
• With millions of examples, you can't compute the gradient on all of them at once
• Mini-batch: compute gradient on a small batch (32, 64, 128 examples), update weights
• Stochastic gradient descent (SGD): batch size = 1 (noisy but works)

Modern optimizers (improvements on vanilla SGD):
• Adam: adapts learning rate per-parameter, momentum-based, most widely used
• RMSprop: per-parameter learning rates based on recent gradients
• These typically converge faster and more reliably than vanilla SGD`,
    order: 4, status: 'locked', xpReward: 25,
  },
  {
    title: 'Generative AI — How LLMs Create Text',
    content: `Large Language Models (LLMs) like GPT-4, Claude, and Gemini are the most powerful AI systems accessible today. Here's how they work.

Core idea: next-token prediction
An LLM is trained to predict the next word given all previous words.
• Input: "The capital of France is"
• LLM predicts: "Paris" (probability 0.97), "Lyon" (0.01), etc.
• You sample from the probability distribution, add "Paris" to the text
• Repeat: now input is "The capital of France is Paris"
• Predict: "." (the most likely next token)

This simple mechanism (predict the next token, repeat) at massive scale produces systems that can write essays, code, analyze data, have conversations, and more.

How is an LLM different from a normal neural network?
• Scale: GPT-3 had 175 billion parameters. GPT-4 is estimated at 1+ trillion.
• Trained on essentially all text on the internet (trillions of tokens)
• The emergent behaviors: at a certain scale, abilities appear that weren't present at smaller scales (reasoning, translation, coding)
• This is called "emergent capability" — not explicitly programmed, appears from scale

Transformer architecture:
• The fundamental breakthrough behind modern LLMs (Vaswani et al., 2017, "Attention Is All You Need")
• "Attention" mechanism: the model learns which parts of the input to pay most attention to when producing each output token
• Self-attention: each token attends to all other tokens to understand context
• This is why LLMs can handle long-range dependencies ("in Chapter 3, the character mentioned X...")

Key concept — tokens:
• Text is split into "tokens" (sub-word units: ~4 chars = 1 token typically)
• A sentence = 10-20 tokens. This book = ~500,000 tokens.
• LLMs have a context window measured in tokens. GPT-4 Turbo: 128K tokens (~100,000 words).`,
    order: 5, status: 'locked', xpReward: 25,
  },
  {
    title: 'Prompt Engineering — How to Talk to an LLM',
    content: `Prompt engineering = the skill of writing inputs that get the best outputs from LLMs. It's not about tricking the AI — it's about clear communication.

The four principles:

1. Write clear, specific instructions
Bad: "Write about dogs."
Better: "Write a 300-word informative article about the German Shepherd breed, covering: origin/history, temperament, common health issues, and ideal living situation. Tone: educational, for a prospective owner."

2. Provide reference material (RAG pattern)
Give the model documents to base its answer on: "Based on the following passage [paste text], answer: [question]"
This reduces hallucination and grounds responses in facts.

3. Use few-shot examples
Show the model what you want:
"Convert this sentence to passive voice.
Active: The dog bit the man.
Passive: The man was bitten by the dog.
Active: She wrote the report.
Passive:"

4. Break complex tasks into steps (chain-of-thought)
"Before answering, identify: (1) what the user is asking, (2) what information you need, (3) any assumptions. Then provide your answer."

Chain-of-thought prompting:
Ask the model to reason step by step — this often produces better answers than jumping to conclusions. The reasoning process itself improves the final answer.

Zero-shot chain-of-thought: "Solve this step by step, showing your reasoning."

Common mistakes:
• Being too vague → outputs are generic
• Asking multiple things at once → model loses focus
• Not specifying format → you get prose when you wanted JSON
• Assuming the model knows your context → it has no memory of previous conversations unless you provide it

Real-world: writing a great prompt takes practice. Iterate. The first prompt is rarely the best.`,
    order: 6, status: 'locked', xpReward: 25,
  },
  {
    title: 'Bias and Variance — The Fundamental Tradeoff',
    content: `Every ML model makes two kinds of errors. Understanding them is essential to building models that generalize — not just fit your training data.

Bias: systematic error from wrong assumptions.
• High bias = the model is too simple to capture the true pattern
• Symptoms: training error is high AND test error is high
• Problem: underfitting — the model didn't learn enough

Variance: sensitivity to small fluctuations in training data.
• High variance = the model is too complex, memorizing training data instead of learning patterns
• Symptoms: training error is very low but test error is high
• Problem: overfitting — the model learned the training data perfectly but fails on new data

The tradeoff:
• Simple model (high bias) → low variance (stable but wrong)
• Complex model (low bias) → high variance (accurate on training but fails on new data)
• Goal: low bias AND low variance (both training and test error are low)

How to detect bias vs. variance:
Training error high, test error high → high bias (underfitting)
Training error low, test error high → high variance (overfitting)
Both low → you have a good model

How to fix:
High bias (underfitting):
• Make model more complex (more features, deeper network, higher-degree polynomial)
• Add more relevant features
• Train longer

High variance (overfitting):
• Get more training data (often the best solution)
• Regularization (penalize model complexity — more on this in the next node)
• Reduce model complexity
• Data augmentation (slightly modify existing data to create more variety)
• Early stopping (stop training before it memorizes)`,
    order: 7, status: 'locked', xpReward: 25,
  },
  {
    title: 'Regularization — Preventing Overfitting',
    content: `Regularization = any technique that prevents overfitting by adding a penalty for model complexity. The goal: a model that generalizes to new data, not just memorized training data.

L1 Regularization (Lasso):
• Adds penalty = λ × Σ|w| (sum of absolute values of weights)
• Tends to drive weights to exactly zero → model uses fewer features
• Result: sparse model (automatic feature selection)
• Use when: you suspect many irrelevant features

L2 Regularization (Ridge):
• Adds penalty = λ × Σw² (sum of squared weights)
• Drives weights toward zero but not exactly to zero
• Tends to keep all features but with smaller weights
• Use when: you have many relevant features that should all contribute

Dropout (neural networks):
• During training, randomly "drop" neurons (set their output to zero) with probability p (e.g., 0.2)
• Each training step sees a slightly different network
• Forces the network to not rely on any single neuron
• Result: network learns more robust features, doesn't overfit to specific neurons
• Dropout rate: 0.2 = too little regularization. 0.5 = aggressive. 0.8 = destructive.

Early stopping:
• Monitor validation error (error on data the model hasn't trained on)
• Stop training when validation error stops improving
• Simple, effective, often underrated

Data augmentation (especially for images):
• Rotate, flip, crop, color-jitter images
• Creates "new" training examples from existing ones
• Very effective for image classification
• For text: back-translation (translate to French, back to English = slightly different text)

The key insight: the best regularization is usually more data. If you can get more real data, that's often better than any regularization technique.`,
    order: 8, status: 'locked', xpReward: 25,
  },
  {
    title: 'Model Evaluation — Knowing If Your Model Is Good',
    content: `You trained a model. Now: how good is it? Accuracy alone is not enough — a model that predicts 99% of emails are not-spam is 99% accurate but useless.

Split your data:
• Training set (60-80%): used to fit the model
• Validation set (10-20%): used to tune hyperparameters (learning rate, model complexity)
• Test set (10-20%): used to evaluate the final model ONCE — never touch during training

Rule: test data must never be seen during training or tuning. If you tune on your test set, you've cheated and your model will fail in the real world.

Metrics for classification:

Accuracy = correct predictions / total predictions
• Use when: classes are roughly balanced and false positive/negative costs are equal

Precision = TP / (TP + FP)
• Of all the things I said were positive, how many actually were?
• High precision = low false positive rate
• Use when: false positives are expensive (e.g., spam filter — you don't want to lose real emails)

Recall (Sensitivity) = TP / (TP + FN)
• Of all the things that were actually positive, how many did I catch?
• High recall = low false negative rate
• Use when: false negatives are dangerous (e.g., cancer detection — you don't want to miss a tumor)

F1 Score = 2 × (Precision × Recall) / (Precision + Recall)
• The harmonic mean of precision and recall
• Use when: you care about both and they're in tension

Confusion matrix:
A table showing correct and incorrect predictions by class — gives the complete picture of where your model is confused.

Real-world example:
A fraud detection model with 99% precision might only catch 30% of actual fraud — useless as a fraud detector. You need recall too.`,
    order: 9, status: 'locked', xpReward: 25,
  },
  {
    title: 'Unsupervised Learning — Clustering',
    content: `Unsupervised learning = finding structure in data without labels. You don't tell the algorithm what you're looking for — it discovers patterns on its own.

Clustering = the most common unsupervised task: group similar data points together.

k-Means clustering algorithm:
1. Choose k (number of clusters — you decide this)
2. Randomly initialize k "centroids" (cluster centers)
3. Assign each data point to the nearest centroid
4. Update each centroid to be the mean of its assigned points
5. Repeat 3-4 until centroids stop moving (convergence)

Choosing k:
• Elbow method: plot sum of squared distances (inertia) vs. k. Look for the "elbow" where adding more clusters doesn't help much.
• Silhouette score: how well-separated are the clusters? (-1 to 1, higher is better)
• Domain knowledge: sometimes you know how many natural groups exist

Applications:
• Customer segmentation: group customers by purchasing behavior for targeted marketing
• Image compression: reduce colors in an image to k colors (k-means on pixel values)
• Anomaly detection: points that don't fit any cluster are anomalies
• Document clustering: group similar documents (news articles by topic)

Limitations:
• k-Means assumes clusters are spherical (circular in 2D, spherical in higher dimensions)
• Doesn't handle well: elongated clusters, clusters of different densities, outliers
• Random initialization can give different results — run k-means multiple times

Alternatives:
• DBSCAN: density-based, finds arbitrary-shaped clusters, handles outliers automatically
• Hierarchical clustering: builds a tree of clusters (dendrogram), lets you choose scale post-hoc
• Gaussian Mixture Models (GMM): soft clustering — gives probability of each point belonging to each cluster`,
    order: 10, status: 'locked', xpReward: 25,
  },
  {
    title: 'Dimensionality Reduction — Seeing High-Dimensional Data',
    content: `Real-world data often has hundreds or thousands of features. This creates problems: "curse of dimensionality" (sparsity), slow computation, and hard-to-visualize. Dimensionality reduction solves this.

Principal Component Analysis (PCA) — the most important technique:
PCA finds the directions of maximum variance in your data and projects onto a smaller set of orthogonal axes (principal components).

Steps:
1. Standardize your data (subtract mean, divide by std)
2. Compute covariance matrix
3. Find eigenvectors and eigenvalues of the covariance matrix
4. Sort eigenvectors by eigenvalue (largest first = most variance)
5. Keep top k eigenvectors (k = desired dimensions)
6. Project data onto these k eigenvectors

Interpretation:
• PC1 = direction of maximum variance in the data
• PC2 = direction of second most variance (orthogonal to PC1)
• Each component is a linear combination of original features
• The eigenvalue tells you how much variance that component captures

How many components to keep?
• Kaiser criterion: keep eigenvalues > 1 (components that explain more variance than a single original feature)
• Explained variance plot: keep enough components to reach 90-95% of total variance
• Visual inspection (for 2D/3D): keep until you can visualize the data clearly

Why this matters:
• Visualization (reduce to 2D, plot it)
• Remove noise (low-variance components may be noise)
• Speed up ML models (fewer features = faster training)
• Compress data (like JPEG for structured data)

t-SNE (t-Distributed Stochastic Neighbor Embedding):
• Specifically for visualization (typically 2D)
• Non-linear — can capture complex structures PCA misses
• Computationally expensive — use on subsamples of large datasets
• Random each run — different each time (for exploration, not for pipelines)`,
    order: 11, status: 'locked', xpReward: 25,
  },
  {
    title: 'Reinforcement Learning — Learning from Experience',
    content: `Reinforcement Learning (RL) = an agent learns to make decisions by trial and error, receiving rewards or penalties from its environment. The goal: learn a policy (strategy) that maximizes total reward over time.

The RL framework:
• Agent: the AI that makes decisions
• Environment: the world the agent interacts with (game, robot, market)
• State (s): the current situation the agent sees
• Action (a): what the agent does
• Reward (r): feedback from environment (+1 for good, -1 for bad)
• Policy (π): the strategy the agent uses to choose actions given states
• Goal: maximize cumulative reward (not just immediate reward)

The exploration-exploitation tradeoff:
• Exploration: try new actions to discover if they're better (delayed gratification)
• Exploitation: choose the action that's worked best so far
• Always exploring = you never capitalize on what you've learned
• Always exploiting = you never discover better strategies
• Classic solution: epsilon-greedy (usually explore ~5-10% of the time)

Q-Learning — a fundamental RL algorithm:
• Q(s,a) = maximum expected future reward from taking action a in state s
• Q-Learning learns Q-values iteratively using the Bellman equation:
  Q(s,a) = Q(s,a) + α[r + γmax_a' Q(s',a') - Q(s,a)]
• Once Q-values converge to the true values, the optimal policy is: take the action with highest Q-value in each state

Deep Q-Networks (DQN):
• Use a neural network to approximate Q-values
• Allows RL to work in high-dimensional state spaces (Atari games from raw pixels)
• Experience replay: store past experiences and sample randomly during training (breaks correlation between consecutive samples)
• Target network: separate network to compute target values (prevents oscillation)

Real-world RL:
• AlphaGo: RL + tree search → beat world champion at Go
• Robotics: train robots to walk, manipulate objects
• Recommendations: optimizing long-term user engagement (not just next-click)
• Finance: algorithmic trading (high risk, complex environment)`,
    order: 12, status: 'locked', xpReward: 25,
  },
  {
    title: 'Applications of ML — Robotics, Speech, Text, and More',
    content: `ML isn't just one thing — it touches every industry. Here's where it's most impactful today.

Computer Vision:
• Object detection: YOLO, Faster R-CNN — find and classify objects in images
  Applications: self-driving cars, medical imaging, quality control in manufacturing
• Image segmentation: classify each pixel (not just bounding boxes)
  Applications: autonomous vehicles (separate road, car, pedestrian at pixel level), medical imaging (tumor boundaries)
• Face recognition: identifying people from images
  Applications: phone unlock, surveillance, photo tagging

Natural Language Processing (NLP):
• Text classification: spam detection, sentiment analysis, topic labeling
• Named entity recognition (NER): find people, places, organizations in text
• Machine translation: Google Translate, DeepL — transformer-based
• Summarization: TL;DR generation, document condensation
• Question answering: read a document and answer questions about it (RAG pattern)
• Chatbots / assistants: conversational AI (LLMs are now state-of-the-art)

Speech:
• Speech recognition: convert audio to text (every voice assistant)
• Text-to-speech (TTS): convert text to audio
• Speaker identification: who's speaking?

Recommendation Systems:
• Collaborative filtering: "users like you also liked X" (Netflix, Spotify)
  Problem: cold start (what to recommend for new users with no history?)
• Content-based: "if you liked this article, you'll like these"
• Hybrid: combine both for better recommendations

Healthcare:
• Medical imaging: detect diabetic retinopathy, tuberculosis, skin cancer — often at or above human specialist level
• Drug discovery: predict molecule properties, accelerate clinical trial design
• Genomics: predicting protein structures (AlphaFold — solved protein folding)
• Electronic health records: predict patient deterioration, readmission risk`,
    order: 13, status: 'locked', xpReward: 25,
  },
  {
    title: 'Building with AI — Practical Patterns',
    content: `You don't need to build models from scratch. Most AI-powered products combine existing models through smart orchestration. Here are the patterns that power real products.

Retrieval-Augmented Generation (RAG):
The most common production AI pattern today. When a user asks something:
1. Convert the user's question to a vector embedding
2. Search a knowledge base (vector database) for relevant documents
3. Feed those documents + the question to an LLM
4. LLM generates an answer grounded in your documents

Why RAG matters: LLMs hallucinate (make things up). RAG grounds answers in real documents, dramatically reducing hallucination rates.

Vector databases (Pinecone, Weaviate, Chroma):
• Store embeddings (numerical representations of text, images, audio)
• Find "similar" items by cosine similarity or dot product
• The backbone of RAG systems

Fine-tuning vs. Prompting:
• Prompting: give instructions in the input each time (no model changes)
  Pros: fast, no retraining needed, works well with GPT-4 class models
  Cons: uses tokens on every request (slower, more expensive), limited context
• Fine-tuning: retrain a model on your data (weights change)
  Pros: model "knows" your domain natively, faster inference, cheaper at scale
  Cons: expensive to retrain, requires ML expertise, can't easily update facts

Agentic AI — AI that takes actions:
• Uses an LLM to reason, then calls tools (web search, code execution, database queries)
• ReAct pattern: Reason → Act → Observe → Reason → ...
• AutoGPT / GPT-Engineer: AI writes and executes its own code to accomplish goals
• Current state: impressive demos, unreliable in production — the field is advancing rapidly

API patterns:
• OpenAI API: the dominant provider, GPT-4/gpt-4o-mini for reasoning
• Anthropic API: Claude models, strong at long documents and coding
• Google Gemini API: multimodal (text + images + audio in one model)
• Open-source (Llama 3, Mistral): run on your own hardware, more control, less capable than frontier models`,
    order: 14, status: 'locked', xpReward: 25,
  },
  {
    title: 'Ethics in AI — Bias, Misinformation, and Responsibility',
    content: `AI systems amplify whatever is in their training data — including biases, stereotypes, and harmful patterns. Understanding AI ethics is essential for anyone building with AI.

Algorithmic bias:
• Training data reflects historical discrimination
• COMPAS recidivism model (used in US courts): falsely labeled Black defendants "high risk" at nearly twice the rate of white defendants
• Amazon's recruiting tool (2014-2017): trained on resumes submitted over 10 years — mostly from men → system learned to penalize resumes containing "women's" (as in women's chess captain)
• Hiring, lending, healthcare — AI is now making consequential decisions in all of these

Sources of bias:
• Training data bias: data reflects existing societal inequities
• Annotation bias: human labelers bring their own assumptions
• Evaluation bias: testing AI systems on benchmarks that don't reflect real-world diversity
• Deployment bias: systems work well for some groups but fail for others

Misinformation and deepfakes:
• LLMs can generate persuasive false narratives at scale
• AI image/video generation (Midjourney, Sora, etc.) can create convincing fake evidence
• Detection models exist but are perpetually behind generation models
• When any video or text could be AI-generated, trust becomes a different problem

Privacy:
• LLMs can memorize and regurgitate training data (including personal information)
• GDPR "right to be forgotten" becomes complicated when info is embedded in model weights
• Training on user data without consent is an ongoing legal battle

What responsible AI looks like:
• Diverse training teams (who builds the system matters)
• Bias audits before deployment (test across demographic groups)
• Human-in-the-loop for high-stakes decisions (don't fully automate consequential decisions)
• Transparency: be honest about what your AI can and cannot do
• Fail-safe: when the AI is uncertain, escalate to humans (don't hallucinate confidently)

The uncomfortable truth: AI ethics is not solved by better algorithms alone. It's a societal and political problem that requires diverse voices in the building process.`,
    order: 15, status: 'locked', xpReward: 25,
  },
];

export function buildAIMLCurriculum(id: string, now: number): { curriculum: Curriculum; nodes: CurriculumNode[] } {
  return {
    curriculum: {
      id,
      title: 'AI & Machine Learning Basics',
      description: 'From linear regression to large language models — Stanford CS229 methodology applied to modern AI. 15 nodes covering fundamentals, neural networks, generative AI, and practical applications.',
      source: 'starter',
      createdAt: now,
      updatedAt: now,
      isPublished: true,
    },
    nodes: AIML_NODES.map(n => ({ ...n, id: '', curriculumId: id, createdAt: now, completedAt: null })),
  };
}
