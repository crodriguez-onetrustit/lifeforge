// ─── Finance Fundamentals ──────────────────────────────────────────────────────
// Source: MIT OCW Finance Theory I (Lo) + Khan Academy Personal Finance
// URL: https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/
// License: Creative Commons (MIT OCW)

import type { Curriculum, CurriculumNode } from '../schema';

export const FINANCE_CURRICULUM_NODES: Omit<CurriculumNode, 'id' | 'curriculumId' | 'createdAt' | 'completedAt'>[] = [
  {
    title: 'What is Money? The Basics of Financial Literacy',
    content: `Money is a stored form of energy — you exchange your time and skills for it, then exchange it for others' time and skills. Financial literacy means understanding how money moves, how it grows, and how to keep it from controlling you.

Key concepts:
• Income vs. wealth — income is a flow (monthly salary), wealth is a stock (assets minus debts)
• The three financial states: broke, stable, wealthy — most people oscillate between broke and stable
• Financial literacy gap — most schools don't teach this. You're learning it now.

Real-world: Track your last 3 months of income and expenses. You'll need this for the budgeting node.`,
    order: 1, status: 'available', xpReward: 25,
  },
  {
    title: 'Compound Interest — The Eighth Wonder of the World',
    content: `Einstein allegedly called compound interest the eighth wonder of the world. Whether he said it or not, it's true.

The formula: A = P(1 + r/n)^(nt)
• P = principal (starting amount)
• r = annual interest rate
• n = compounds per year
• t = years

The key insight: interest earns interest. The longer your money sits, the faster it grows — not linearly, but exponentially.

The Rule of 72: divide 72 by your interest rate to know how many years to double your money.
• 6% → 12 years to double
• 10% → 7.2 years to double
• 12% → 6 years to double

The enemy: inflation. If inflation is 3% and your savings earn 2%, you're losing purchasing power.

Practice: If you invest $1,000 at 8% annual return, how much do you have in 30 years? (Answer: ~$10,062 — 10x growth from compounding alone)`,
    order: 2, status: 'locked', xpReward: 25,
  },
  {
    title: 'Budgeting — Tell Your Money Where to Go',
    content: `A budget is not a restriction — it's a plan for your money. Without one, you're guessing.

The 50/30/20 framework:
• 50% Needs — rent, utilities, groceries, insurance, minimum debt payments
• 30% Wants — dining out, entertainment, hobbies, subscriptions
• 20% Savings & Debt — investments, extra debt payments, emergency fund

The 4 walls of financial stability:
1. Income greater than expenses (or equal — starting point)
2. Emergency fund: 3–6 months of expenses saved
3. No high-interest debt (credit cards at 20%+ are wealth destroyers)
4. Investing — starting early, consistently

The biggest budget trap: lifestyle inflation. When you earn more, you spend more. Breaking this cycle is the key to building wealth.

Practice: Calculate your actual 50/30/20 split from last month. Where are you off?`,
    order: 3, status: 'locked', xpReward: 25,
  },
  {
    title: 'Debt — Good vs. Bad and How to Escape It',
    content: `Not all debt is equal. The math and the psychology are different.

Good debt (generally):
• Mortgage — you're borrowing to own an asset that historically appreciates
• Student loans (if the degree leads to higher earnings) — controversial but often valid
• Business loans (if the business generates returns) — risky but potentially powerful

Bad debt (almost always):
• Credit card debt at 20%+ APR — you're paying for yesterday's purchases with tomorrow's income
• Car loans on depreciating assets — cars lose value the second you drive them off the lot
• Payday loans — predatory, APR can exceed 400%

The debt avalanche method: pay minimums on all debts, put every extra dollar on the highest-interest debt first. Mathematically optimal.

The debt snowball method: pay off the smallest balance first. Psychologically motivating for some people.

Credit score basics:
• 35% — payment history
• 30% — amounts owed relative to credit limits
• 15% — length of credit history
• 10% — new credit inquiries
• 10% — credit mix

Practice: List all your debts with interest rates. Which would you attack first with the avalanche method?`,
    order: 4, status: 'locked', xpReward: 25,
  },
  {
    title: 'Emergency Fund — Your Financial Immune System',
    content: `An emergency fund is cash set aside for unexpected expenses — job loss, medical bills, car breakdowns, home repairs. Without it, unexpected costs go on credit cards, starting a debt cycle.

How much:
• Starter: $1,000 (bare minimum)
• Standard: 3 months of essential expenses
• Ideal: 6 months of essential expenses

Where to keep it:
• High-yield savings account (HYSA) — currently ~4–5% APY
• NOT in stocks (you don't want to sell at a loss when you need cash)
• NOT in checking (too easy to spend accidentally)

The trigger: define "emergency" before it happens. Job loss = emergency. Vacation = not emergency. New phone = not emergency.

Practice: Calculate your monthly essential expenses. Multiply by 3. That's your starter emergency fund goal.`,
    order: 5, status: 'locked', xpReward: 25,
  },
  {
    title: 'Investing Basics — How Money Makes Money',
    content: `There are four main asset classes:

1. Stocks — partial ownership of a company. Highest long-term returns (historically ~10% annually). Highest short-term volatility. You own a piece of Apple, Amazon, and every S&P 500 company when you buy an index fund.

2. Bonds — lending money to a government or company. Lower returns (~4–6%), lower risk. Used for stability in a portfolio.

3. Real estate — physical property. High barrier to entry. Tangible. Mortgages create leverage (you control a $500k asset with $100k down).

4. Cash / Cash Equivalents — savings accounts, CDs, money market funds. Lowest returns, highest stability. The parking spot between when you're saving for a goal and when you invest.

The key insight: returns and risk are inseparable. Higher potential return = higher potential loss.

The first investment most people should make: a low-cost index fund (e.g., Vanguard S&P 500 ETF, ticker VOO). It gives you instant diversification across 500 companies.`,
    order: 6, status: 'locked', xpReward: 25,
  },
  {
    title: "Diversification — Don't Put All Your Eggs in One Basket",
    content: `Diversification is the only free lunch in investing. You reduce risk without reducing expected returns.

Types of diversification:
• Across asset classes — stocks, bonds, real estate, cash
• Across geography — US stocks, international stocks, emerging markets
• Across sectors — tech, healthcare, energy, finance
• Across time — dollar-cost averaging (investing fixed amounts regularly) vs. lump sum

The problem with individual stocks: even great companies can drop 50% in a year (Amazon dropped 95% in 2001 before recovering). Without diversification, one company failure can devastate you.

Index funds solve this: owning the S&P 500 means you own all 500 companies. If Apple fails, 499 others hold you up.

Portfolio allocation by age (rough guide):
• Young (20s–30s): 90–100% stocks, 0–10% bonds
• Mid (40s–50s): 70–80% stocks, 20–30% bonds
• Near retirement: 50–60% stocks, 40–50% bonds

This is NOT personalized advice — it's a starting framework.`,
    order: 7, status: 'locked', xpReward: 25,
  },
  {
    title: 'Risk Management — How Much Can You Actually Afford to Lose?',
    content: `Risk is personal. A 30% market drop means different things to different people:

• You lose your job AND the market drops 30% — you might need to sell stocks at the worst time
• You're 25 with a stable job and 30 years to recover — a 30% drop is an opportunity, not a crisis

Risk capacity vs. risk tolerance:
• Risk capacity = your financial ability to absorb losses (objective)
• Risk tolerance = your psychological ability to not panic when your portfolio drops 20% (subjective)

Most people overestimate their risk tolerance. The 2008 financial crisis made this clear — millions of people sold at the bottom, locking in losses, when historically markets always recovered.

Key risk management rules:
1. Never invest money you need within 3–5 years (stocks are too volatile short-term)
2. Never invest with borrowed money (leverage amplifies losses as much as gains)
3. Only invest what you can afford to lose — not just practically but psychologically

Practice: Imagine your portfolio dropped 40%. What would you do? That tells you your real risk tolerance.`,
    order: 8, status: 'locked', xpReward: 25,
  },
  {
    title: 'Taxes — How the Government Takes Its Cut',
    content: `Taxes are one of the biggest drags on wealth building. Understanding them is essential.

Account types and their tax treatment:
• Tax-advantaged (retirement accounts):
  - 401(k): pre-tax contributions, grows tax-deferred, taxed on withdrawal. Employer match = free money.
  - Roth IRA: after-tax contributions, grows tax-free, withdrawals are tax-free. Best for young earners in lower tax brackets.
  - HSA: triple tax-advantaged (if eligible for HDHP). Best health savings vehicle in America.

• Taxable brokerage accounts:
  - You pay taxes on dividends and capital gains each year
  - Long-term capital gains (held >1 year): 0%, 15%, or 20% depending on income
  - Short-term capital gains: taxed as ordinary income (up to 37%)

Tax-loss harvesting: selling a losing position to realize a tax loss, then buying a similar (not identical) asset. Reduces your tax bill. Completely legal.

The most powerful long-term tax strategy: hold index funds in tax-advantaged accounts, trade actively in taxable accounts (to manage capital gains).`,
    order: 9, status: 'locked', xpReward: 25,
  },
  {
    title: 'Retirement — The Math of Financial Independence',
    content: `Retirement is not about age — it's about having enough wealth that your money works for you instead of you working for money.

The 4% Rule: If you can live on 4% of your portfolio per year, your money will last 30+ years (historically). A $1M portfolio = $40,000/year.

To calculate your target number:
Annual expenses × 25 = financial independence number
• $40,000/year → $1,000,000 needed
• $60,000/year → $1,500,000 needed
• $100,000/year → $2,500,000 needed

This assumes a 4% safe withdrawal rate. Adjust based on your lifestyle and flexibility.

The power of starting early:
• Starting at 25, investing $500/month at 8% → ~$1.5M by 65
• Starting at 35, investing $500/month at 8% → ~$680K by 65
The 10-year delay costs you more than doubling your contribution. Time is the most powerful variable.

FIRE (Financial Independence, Retire Early):
• Lean FIRE: ~$1M, very frugal lifestyle
• Fat FIRE: $2.5M+, comfortable lifestyle
• Coast FIRE: save aggressively early, let compounding do the rest`,
    order: 10, status: 'locked', xpReward: 25,
  },
  {
    title: 'Behavioral Finance — Why We Make Stupid Money Decisions',
    content: `Economists used to assume humans were rational. They were wrong. Behavioral finance studies the psychology of money decisions.

Key cognitive biases that destroy wealth:

Loss aversion: losing $100 feels twice as bad as gaining $100 feels good. This makes people sell winning stocks too early and hold losing stocks too long ("it'll come back").

Anchoring: fixating on a purchase price. "I bought at $150, I can't sell at $130." The market doesn't care what you paid.

Confirmation bias: only reading news that agrees with your existing beliefs about a stock.

Herd behavior: everyone is buying crypto/NFTs/stock X, so you buy too — usually at the peak.

Recency bias: assuming what happened recently will continue. "Stocks always go up" after a bull market, or "it's different this time" — it never is.

The sunk cost fallacy: "I can't quit now, I've already invested so much." That's not a financial reason — it's an emotional one.

How to counter: automate your investing (removes emotion), have a written investment policy, rebalance annually (systematic, not emotional), and remember that doing nothing is often better than reacting to short-term moves.`,
    order: 11, status: 'locked', xpReward: 25,
  },
  {
    title: 'Insurance — Protecting Your Financial Foundation',
    content: `Insurance is not an investment — it's a bet with a company that a disaster won't happen to you. Most people should view it as a necessary cost of doing business.

Types you likely need:
• Health insurance: without it, one hospital stay can bankrupt you. Non-negotiable.
• Auto insurance: required by law in most states. Get liability + collision + comprehensive.
• Renters/homeowners insurance: cheap (~$15–30/month), covers theft, fire, water damage.
• Term life insurance: if someone depends on your income (spouse, kids). Buy 10–12x your annual income. Get a 20-year term policy and invest the rest. Way cheaper than whole life.

Types to AVOID (usually):
• Whole life / universal life insurance: expensive, complex, terrible returns. Salespeople love the tax benefits — they're not wrong, but term + investing the difference is almost always better.
• Extended warranties on electronics: statistically a terrible deal for consumers.

The deductible principle: higher deductible = lower premium = self-insuring small losses. If you can afford a $1,000 deductible without financial pain, take the high-deductible plan and pocket the premium savings.`,
    order: 12, status: 'locked', xpReward: 25,
  },
  {
    title: 'Net Worth — The True Score of Your Financial Life',
    content: `Net worth = all your assets minus all your liabilities (debts).

Assets include: cash, investments, home equity (if you own), car value (trade-in, not sticker), valuable items.

Liabilities include: mortgage, student loans, car loans, credit card balances, any other debt.

Your net worth tells you where you actually stand — not your income, not your lifestyle, but the actual number.

Net worth by age (median, US data — rough guide):
• 25: ~$0 (you're starting)
• 35: ~$50,000–$75,000
• 45: ~$150,000–$250,000
• 55: ~$300,000–$500,000
• 65: ~$500,000–$1,000,000

Negative net worth early in life (student loans, car debt) is normal. The goal is to get solidly positive and grow from there.

Track it monthly. What gets measured gets improved.

Practice: Calculate your net worth right now. Assets - Liabilities. Write it down. This is your starting line.`,
    order: 13, status: 'locked', xpReward: 25,
  },
  {
    title: 'Side Income & Multiple Income Streams',
    content: `Your primary income is your most powerful wealth-building tool. Time and energy invested in increasing your income has a compounding effect that investing can't match.

Income quadrants (Robert Kiyosaki framework):
• E: Employee — trade time for money, limited by hours in a day
• S: Self-employed — trade time for money, but you're the product (doctor, lawyer, consultant)
• B: Business owner — build a system that makes money without you
• I: Investor — money makes money, scales infinitely

The path most people follow: E/S → use income to build I (investments) → eventually B if ambitious.

Multiple income streams:
1. Primary job (salary)
2. Side business / freelance (skill leverage)
3. Investments (stocks, bonds, real estate)
4. Content / royalties (books, courses, YouTube)
5. Digital products (templates, apps)

The skill most people skip: selling. Being able to sell anything — an idea, a service, a product — multiplies your income potential more than any investment strategy.`,
    order: 14, status: 'locked', xpReward: 25,
  },
  {
    title: 'Building Your Financial Plan — Putting It All Together',
    content: `You now have the foundations. This node is about synthesizing them into a plan.

The LifeForge Financial Framework:
1. Know your number — calculate your Financial Independence number (annual expenses × 25)
2. Build the foundation — emergency fund (3–6 months), pay off high-interest debt
3. Maximize tax advantages — 401(k) to employer match, then max Roth IRA, then max 401(k)
4. Invest in low-cost index funds — consistent monthly contributions, never stop
5. Protect what you've built — appropriate insurance
6. Increase your earning power — skills, network, negotiation
7. Re-evaluate annually — life changes, so should your plan

The single most impactful action most people can take right now:
• If employed: contribute enough to 401(k) to get the full employer match. This is an instant 50–100% return on your money.
• If not in debt: invest in a taxable brokerage with a low-cost index fund.

The best time to start was 10 years ago. The second best time is today.`,
    order: 15, status: 'locked', xpReward: 25,
  },
];

export function buildFinanceCurriculum(id: string, now: number): { curriculum: Curriculum; nodes: CurriculumNode[] } {
  return {
    curriculum: {
      id,
      title: 'Finance Fundamentals',
      description: 'Money, investing, debt, and wealth-building — based on MIT Finance Theory + Khan Academy. 15 nodes from basics to financial independence.',
      source: 'starter',
      createdAt: now,
      updatedAt: now,
      isPublished: true,
    },
    nodes: FINANCE_CURRICULUM_NODES.map((n, i) => ({
      ...n,
      id: '', // caller assigns via uuid
      curriculumId: id,
      createdAt: now,
      completedAt: null,
    })),
  };
}
