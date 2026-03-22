// ─── Statistics & Probability ───────────────────────────────────────────────────

import type { Curriculum, CurriculumNode } from '../schema';

export const STATS_NODES: Omit<CurriculumNode, 'id' | 'curriculumId' | 'createdAt' | 'completedAt'>[] = [
  {
    title: 'Descriptive Statistics — What Does the Data Actually Say?',
    content: `Before you can analyze data, you need to describe it. Descriptive statistics summarize what you have so you can see the big picture.

The three most important numbers:
• Mean (average): sum of all values divided by count. Sensitive to outliers — one extreme value skews it.
• Median (middle): the value where half are above and half below. More robust to outliers.
• Mode (most frequent): the most common value. Used for categorical data.

Why median matters more than you think:
Income example: If Bill Gates walks into a bar, the average income of the room goes from ~$70K to billions. The median doesn't budge.
Lesson: always look at both mean and median. If mean >> median, you're dealing with outliers.

Variance and Standard Deviation:
• Variance = how spread out the data is (average of squared deviations from the mean)
• Standard deviation = √variance (puts it back in original units)
• A high standard deviation means wild swings. A low one means tight clustering.
• In finance: higher standard deviation = higher risk.

Practice: Calculate the mean, median, and standard deviation of the last 30 days of any stock price you can find online. What does this tell you about the stock's behavior?`,
    order: 1, status: 'available', xpReward: 25,
  },
  {
    title: 'Probability — Quantifying Uncertainty',
    content: `Probability is the language of uncertainty. Every decision under risk can be framed as a probability question.

The basics:
• P(A) = 0 → impossible event
• P(A) = 1 → certain event
• P(A) + P(not A) = 1 (something either happens or it doesn't)

Two rules of probability:

1. Addition rule (OR):
• P(A or B) = P(A) + P(B) - P(A and B)
• If mutually exclusive (can't both happen): just add them
• Example: P(red card OR black card) = 1/2 + 1/2 = 1 (certain)

2. Multiplication rule (AND):
• P(A and B) = P(A) × P(B|A) — probability of A times probability of B given A happened
• If independent (A doesn't affect B): P(A and B) = P(A) × P(B)
• Example: Two fair coin flips both being heads = 1/2 × 1/2 = 1/4

Expected value (EV):
• EV = sum of (probability × outcome) for all possible outcomes
• Example: Lottery ticket costs $1, 0.001% chance of $10,000 → EV = (0.00001 × 10000) - 1 = -$0.999 → terrible bet
• ALWAYS calculate EV before making probabilistic decisions

Practice: What's the expected value of a raffle ticket that costs $5, has a 1 in 200 chance of winning $500?`,
    order: 2, status: 'locked', xpReward: 25,
  },
  {
    title: 'Conditional Probability — The Probability That Changes Everything',
    content: `Conditional probability = P(A given B) = the probability of A, knowing that B has already happened. This is where most people get confused.

Bayes' Theorem — the most important formula in probability:
P(A|B) = P(B|A) × P(A) / P(B)

Where:
• P(A|B) = probability of A given B has occurred (posterior)
• P(B|A) = probability of B given A (likelihood)
• P(A) = probability of A before new evidence (prior)
• P(B) = total probability of B

Famous example — medical testing:
• Disease prevalence: 1% of people have the disease
• Test accuracy: 99% sensitivity (catches 99% of true cases), 99% specificity (99% of healthy people test negative)
• If you test positive — what's the probability you actually have the disease?

Answer: Only about 50% (not 99%!). This is counterintuitive but correct. When a disease is rare, most positive tests are false positives. This is why base rate matters.

Application to trading: What's the probability a stock drops 10% after earnings, given it dropped 10% after the last two earnings? Apply Bayes' theorem — prior + new evidence = updated probability.`,
    order: 3, status: 'locked', xpReward: 25,
  },
  {
    title: 'Distributions — The Shapes Data Makes',
    content: `Data tends to cluster in recognizable patterns called distributions. Recognizing distributions tells you what's likely to happen.

The Normal Distribution (Gaussian / Bell Curve):
• Symmetric, mean = median = mode
• Described by two parameters: mean (center) and standard deviation (spread)
• ~68% of data falls within 1 SD of mean, ~95% within 2 SD, ~99.7% within 3 SD
• Used everywhere: IQ scores, heights, measurement errors, stock returns (approximately)

The problem: financial markets are NOT normally distributed. They have "fat tails" — extreme events happen far more often than the normal distribution predicts. The 2008 crisis was a 6-sigma event theoretically impossible in a true normal distribution. It happened.

Other important distributions:
• Log-normal: stock prices (never go below zero but can go very high)
• Poisson: rare events per time period (earthquakes, default events)
• Binomial: number of successes in N independent trials

Central Limit Theorem (CLT):
• Even if underlying data isn't normal, the average of large samples tends toward normal
• This is why normal distribution is so ubiquitous — sample averages tend to look normal even when the underlying data isn't
• This is the mathematical basis for polling, A/B testing, and most of statistics`,
    order: 4, status: 'locked', xpReward: 25,
  },
  {
    title: 'Correlation and Causation — What Really Affects What?',
    content: `Correlation = two variables move together. Causation = one variable directly causes the other to change. These are NOT the same thing.

The classic example: ice cream sales and drowning deaths are highly correlated. Does ice cream cause drowning? No — both are caused by a third factor: hot weather. Summer increases both.

Why this matters:
• Investors see two assets rise together and assume they're related — often they're both responding to market conditions, not each other
• "Past performance predicts future results" — correlation of an asset with its own past performance is often spurious when the market regime changes
• Many investment strategies are built on observed correlations that are actually coincidental over certain time periods

How to establish causation:
• Randomized controlled trial (RCT): the gold standard. Randomly assign people to treatment or control group. For finance, this means A/B testing strategies.
• Natural experiments: when assignment is essentially random (a company accidentally splits their product test across geography — comparing the two groups gives causal estimates)
• Statistical controls: regression with control variables can approximate causation but never prove it

The Spurious Correlations website (Tyler Vigen) shows absurd examples of completely unrelated variables that correlate over 99% — correlation is necessary but not sufficient for causation.`,
    order: 5, status: 'locked', xpReward: 25,
  },
  {
    title: 'Regression Analysis — Finding the Line Through the Chaos',
    content: `Regression analysis finds the best-fitting line through your data — it tells you how much an independent variable (X) explains changes in a dependent variable (Y).

Simple linear regression:
• Equation: Y = α + βX + ε
• α (alpha) = intercept — what Y equals when X is zero
• β (beta) = slope — for every 1-unit increase in X, Y increases by β
• ε (epsilon) = error term — everything regression can't explain

The R² (R-squared) — the most important number in regression:
• Ranges from 0 to 1
• Tells you what percentage of Y's variation is explained by X
• R² = 0.7 means X explains 70% of Y's movement — strong relationship
• R² = 0.02 means X explains almost none of Y — weak relationship

Finance example:
• Stock returns = α + β × Market returns
• Beta measures how sensitive the stock is to the market
• Beta > 1: more volatile than market (higher risk, higher potential return)
• Beta < 1: less volatile
• Beta = 1: moves exactly with the market

Watch out: regression can tell you correlation exists, but doesn't prove X causes Y. Outliers can completely distort regression results. Check your data first.`,
    order: 6, status: 'locked', xpReward: 25,
  },
  {
    title: 'Hypothesis Testing — Proving Something Wrong',
    content: `Hypothesis testing = the scientific method applied to data. You assume something is true (null hypothesis) until the data proves otherwise (reject the null).

The process:
1. State your null hypothesis (H₀): "This stock's returns are not different from the market" (beta = 1)
2. State your alternative (H₁): "This stock's returns are different from the market" (beta ≠ 1)
3. Collect data (historical returns)
4. Calculate a test statistic (like a t-statistic)
5. Determine the p-value: if p < 0.05, reject the null — the result is statistically significant
6. Conclusion: the result was unlikely to occur by chance alone

P-value interpretation:
• p = 0.03 → if the null hypothesis were true, there's only a 3% chance of observing this data → reject H₀
• p = 0.15 → 15% chance of this result happening by chance → fail to reject H₀ (not proven wrong, but not confirmed)
• Never say "proven" — you can only reject or fail to reject. Statistics deals in probabilities, not certainties.

Common mistakes:
• p-hacking: running many tests and only reporting the one with p < 0.05
• Confusing statistical significance (p < 0.05) with practical significance (the effect size matters)
• Assuming correlation proves causation (regression can show association but not causation)`,
    order: 7, status: 'locked', xpReward: 25,
  },
  {
    title: 'Statistical Significance and Confidence Intervals',
    content: `Statistical significance tells you IF an effect exists. Confidence intervals tell you HOW LARGE it probably is. You need both.

Confidence interval:
• A range of values that's likely to contain the true population parameter
• "We're 95% confident the true average return is between 8% and 14%"
• 95% CI means: if you repeated this study 100 times, 95 of those CIs would contain the true value
• Narrower CI = more precise estimate. Wider CI = more uncertainty.

The relationship:
• Sample size ↑ → CI width ↓ (more data = more precision)
• Variance ↑ → CI width ↑ (noisier data = less precision)
• Confidence level ↑ → CI width ↑ (99% CI is wider than 95% CI)

Why this matters in trading:
• Backtesting a strategy on historical data gives you an estimate of expected return, not a guarantee
• The 95% CI of your backtested strategy's return might be 2% to 18% annually — that's a massive range for real-world planning
• Out-of-sample testing is critical: test the strategy on data it hasn't seen. If it still works, the CI is more credible.

Practical rule: any single backtest is unreliable. The strategy must work across different market regimes (bull, bear, sideways) and asset classes.`,
    order: 8, status: 'locked', xpReward: 25,
  },
  {
    title: 'Bayesian Thinking — Updating Beliefs with Evidence',
    content: `Frequentist statistics: "The data tells us what happened." Bayesian statistics: "The data updates what we believe."

The Bayesian framework:
• Start with a prior — your initial belief about something (often a probability)
• Collect new evidence
• Update your prior → get a posterior (updated belief)
• As more evidence accumulates, your beliefs converge toward what's actually true

The Bayesian update:
Posterior ∝ Likelihood × Prior
(Updated belief is proportional to how likely the new evidence is, weighted by your initial belief)

Example — stock picking:
• Prior: P(stock goes up) = 50% (neutral)
• New evidence: the company just beat earnings by 20%
• Likelihood: stocks that beat earnings by 20% go up 70% of the time
• Update: your 50% estimate should shift upward — toward a higher probability of up

Why this matters for decision-making:
• You should always have a prior belief, updated by evidence
• "The market is efficient" (frequentist) vs. "markets are probably efficient but I'm updating when I see anomalies" (Bayesian)
• Most skilled investors are Bayesian thinkers: they have probabilistic mental models, updated continuously with new data

Practical application: before reading an investment thesis, note your own prior belief about the company/sector. After reading, explicitly ask: "Did this change my view? Why or why not?"`,
    order: 9, status: 'locked', xpReward: 25,
  },
  {
    title: 'The Law of Large Numbers and Gambler\'s Fallacy',
    content: `The Law of Large Numbers: as sample size grows, the average converges toward the expected value. This is why casinos and insurance companies can predict their revenues — individual randomness cancels out over many trials.

The Gambler's Fallacy: the incorrect belief that past random events affect future random events. If a roulette wheel lands on red 10 times in a row, most people think black is "due" — but each spin is independent. The wheel has no memory.

This applies to investing too:
• A stock that has dropped 5 days in a row is NOT "due for a bounce"
• Past price movements don't influence future price movements (if markets are efficient)
• Each trade is independent — your win rate should be measured across many trades, not in streaks

The危险 (dangerous) version: people who believe in the Gambler's Fallacy will DOUBLE DOWN after losses ("I have to win it back"). This is how traders blow up accounts.

Regression to the Mean:
• Extreme outcomes tend to be followed by more moderate outcomes
• A stock that outperformed the market by 50% in one year will likely underperform slightly the following year (but not always — consistent outperformance can persist due to skill or structural advantages)
• This is NOT the same as Gambler's Fallacy — it's a real statistical phenomenon`,
    order: 10, status: 'locked', xpReward: 25,
  },
  {
    title: 'Practical Statistics for Making Better Decisions',
    content: `Synthesizing it all — how to use statistics to make better decisions.

The framework:

1. Start with a question: "Is this stock worth buying?"
2. Form a hypothesis: "This stock will outperform the market"
3. Collect data: historical returns, fundamentals, sentiment
4. Apply statistics: regression (relationship?), hypothesis testing (statistically significant?), Bayesian updating (how does new info change my probability estimate?)
5. Make a decision: under uncertainty, not certainty

Statistics won't tell you what to buy. It tells you:
• What the historical patterns have been
• Whether an apparent pattern is likely real or random
• How confident you should be in your estimate
• What the distribution of outcomes looks like (so you can size bets appropriately)

The most important statistical habits:
• Always check for outliers before averaging (mean vs. median)
• Look at R² before trusting a regression relationship
• Calculate EV before making any probabilistic decision
• Use out-of-sample data to validate any strategy
• Remember: you can only reject or fail to reject — statistics gives you probabilistic evidence, not proof

Your last node! The Feynman test: explain p-value, R², and Bayesian updating to a 10-year-old in 3 sentences each.`,
    order: 11, status: 'locked', xpReward: 25,
  },
];

export function buildStatsCurriculum(id: string, now: number): { curriculum: Curriculum; nodes: CurriculumNode[] } {
  return {
    curriculum: {
      id,
      title: 'Statistics & Probability',
      description: 'Statistics for better decisions — distributions, regression, hypothesis testing, Bayes theorem, and avoiding cognitive biases. 11 nodes.',
      source: 'starter',
      createdAt: now,
      updatedAt: now,
      isPublished: true,
    },
    nodes: STATS_NODES.map(n => ({ ...n, id: '', curriculumId: id, createdAt: now, completedAt: null })),
  };
}
