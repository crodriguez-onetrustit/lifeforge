// ─── Trading & Markets ─────────────────────────────────────────────────────────

import type { Curriculum, CurriculumNode } from '../schema';

export const TRADING_NODES: Omit<CurriculumNode, 'id' | 'curriculumId' | 'createdAt' | 'completedAt'>[] = [
  {
    title: 'How Markets Work — Exchanges, Order Books, and Price Discovery',
    content: `Financial markets are where buyers and sellers meet to trade assets. Understanding how they work is the foundation before you trade anything.

The order book:
• Every exchange has an "order book" — a live list of all buy orders (bids) and sell orders (asks)
• Bid = the highest price a buyer is willing to pay
• Ask = the lowest price a seller is willing to accept
• The spread = the gap between the highest bid and lowest ask
• When a buyer and seller agree on price, a trade happens

Market structure:
• Bull market = prices rising (optimism, growth)
• Bear market = prices falling (pessimism, decline)
• Sideways / ranging market = no clear trend

Types of markets:
• Stock markets (NYSE, NASDAQ) — equities
• Bond markets — fixed income securities
• Crypto exchanges (Coinbase, Binance, Kraken) — digital assets
• Forex (FX) — currency pairs (EUR/USD, etc.)
• Commodity markets (gold, oil) — physical goods

The key insight: markets exist to efficiently allocate capital. Prices convey information. In an efficient market, prices reflect all available information. In real markets, inefficiencies exist — that's where traders find opportunities.

Who trades: retail traders (individuals), institutional investors (hedge funds, pension funds), market makers (provide liquidity), algorithmic traders (70%+ of volume).`,
    order: 1, status: 'available', xpReward: 25,
  },
  {
    title: 'Market Orders vs. Limit Orders — Getting Your Price Right',
    content: `When you place a trade, the type of order you use matters enormously. Different order types have different outcomes.

Market Order:
• Execute immediately at the current market price
• Guaranteed execution, not guaranteed price
• Use when: you need to get in/out immediately and accept the current price
• Risk: in fast-moving markets, "slippage" can mean you pay more (or receive less) than expected

Limit Order:
• Only execute if the price reaches your specified level or better
• Buy limit = set below current price
• Sell limit = set above current price
• Guaranteed price (or better), not guaranteed execution
• Use when: you want to enter at a specific price and are willing to wait

Stop-Loss Order:
• A sell order triggered when price reaches a certain level (the "stop price")
• Protects against further losses if the trade goes against you
• Automatically converts to a market order when triggered
• Every serious trader uses stop losses — non-negotiable risk management

Stop-Limit Order:
• Like a stop-loss but becomes a limit order (not market order) when triggered
• Guarantees you won't sell below your limit price
• Risk: may not execute if price gaps past your limit

Practice: Simulate placing orders. What type would you use if you want to buy Bitcoin at exactly $50,000? What if you want to limit losses to 5%?`,
    order: 2, status: 'locked', xpReward: 25,
  },
  {
    title: 'Technical Analysis — Reading Price Charts',
    content: `Technical analysis = the study of historical price and volume data to predict future price movements. Traders use charts; the idea is that all relevant information is already priced in.

Key premise: prices move in trends, history repeats itself, and patterns are identifiable.

The basics — chart types:
• Line chart: closes only, clean, good for seeing overall direction
• Candlestick chart: open, high, low, close — gives you much more information per bar
• Japanese candlestick patterns: dozens of named patterns (doji, hammer, engulfing) that traders use as signals

Support and Resistance:
• Support = price level where buying pressure has historically exceeded selling pressure (price "holds up")
• Resistance = price level where selling pressure has historically exceeded buying (price "hits a ceiling")
• When support breaks, it often becomes resistance (and vice versa — "polarity flip")

Trend lines:
• Uptrend = higher highs + higher lows (price is climbing)
• Downtrend = lower highs + lower lows (price is falling)
• Channels = parallel lines connecting highs and lows — price oscillates between them

Volume:
• Confirms trends — healthy uptrends have increasing volume on advances
• Divergence between price and volume signals weakening momentum

Important caveat: technical analysis is contested. Critics say it's self-fulfilling (people see the same patterns and act on them) or that markets are efficient and patterns don't persist. Proponents use it successfully. Best used alongside fundamental analysis.`,
    order: 3, status: 'locked', xpReward: 25,
  },
  {
    title: 'Reading Candlesticks — The Language of Price',
    content: `Each candlestick tells a story. Green/white = price closed higher than it opened (bullish). Red/black = price closed lower (bearish).

Anatomy of a candle:
• Body: the range between open and close
• Upper wick (shadow): highest price reached
• Lower wick (shadow): lowest price reached

Common single-candle patterns:

Doji:
• Open and close are almost equal — the market is undecided
• Looks like a cross or plus sign
• Signals potential reversal, especially after a long candle — "indecision candle"

Hammer:
• Small body at the top, long lower wick (at least 2x body length), little to no upper wick
• Appears at bottom of downtrends — buyers pushed price back up from lows
• Bullish reversal signal

Shooting Star:
• Same shape as hammer but appears at top of uptrends
• Price pushed up intraday, then sellers pushed it back down
• Bearish reversal signal

Common two-candle patterns:

Engulfing:
• Bullish engulfing: red candle followed by larger green candle that "engulfs" the previous body
• Bearish engulfing: green followed by larger red

Morning Star / Evening Star:
• Three-candle patterns signaling reversal at bottoms (morning) and tops (evening)

Practice: Find a real chart (TradingView is free) and identify these patterns in historical data.`,
    order: 4, status: 'locked', xpReward: 25,
  },
  {
    title: 'Risk Management — The Most Important Part of Trading',
    content: `Most traders lose money not because they pick bad trades, but because they don't manage risk. Risk management is the difference between trading and gambling.

Position sizing:
• Never risk more than 1–2% of your portfolio on a single trade
• If you have a $10,000 account and risk 1% ($100) per trade, you'd need to lose 100 times in a row to blow up your account
• If you risk 10% per trade, you can lose only 10 times before account destruction

The math:
• Losing 50% of your account requires a 100% gain just to break even
• A 10% loss requires only ~11% gain to recover — asymmetry matters
• Losses compound against you. Protecting capital is more important than making money.

Risk-reward ratio:
• For every dollar you risk, how much do you expect to make?
• A 1:3 risk-reward means risking $1 to make $3
• Always know your stop-loss (exit point) before you enter a trade

The trading plan rule: define entry, exit (stop-loss), and position size BEFORE you enter. Not after. Emotions after entering a trade are your enemy.

The single most important rule: if a trade doesn't immediately go in your favor, it often doesn't go your way at all. Cut losses fast. Let winners run.`,
    order: 5, status: 'locked', xpReward: 25,
  },
  {
    title: 'Fundamental Analysis — What Is the Asset Actually Worth?',
    content: `Fundamental analysis = determining an asset's "intrinsic value" by examining economic, financial, and qualitative factors. If price is below intrinsic value = buy. Above = sell or avoid.

For stocks:

Price-to-Earnings (P/E) ratio:
• Stock price / earnings per share
• Higher P/E = market expects higher future growth (or stock is overvalued)
• Compare to industry average and historical P/E

Earnings & Revenue:
• Is the company growing revenue consistently?
• Are they profitable? (Revenue is vanity, profit is sanity)
• Earnings beat/miss on earnings calls moves prices dramatically

Competitive moat:
• What protects this company from competitors?
• Brand (Apple), network effects (Visa), patents (pharma), cost advantages (Amazon logistics)
• Warren Buffett calls this "moat" — a sustainable advantage

For crypto:

Network value (Metcalfe's Law):
• A network's value grows proportionally to the square of its users
• More users = more utility = higher value
• Useful for comparing layer-1 blockchain valuations

For any asset:
• Is the team capable and honest?
• Is there real product-market fit?
• Tokenomics / share structure — is supply concentrated in few hands?

Combine fundamentals (what is it worth?) with technicals (when to enter?) for best results.`,
    order: 6, status: 'locked', xpReward: 25,
  },
  {
    title: 'Sentiment Analysis — Reading the Fear and Greed Index',
    content: `Market sentiment = the overall attitude of investors toward an asset or market. Extreme greed = markets are overbought and likely to fall. Extreme fear = oversold and potentially a buying opportunity.

Why sentiment matters:
• Markets are driven by human emotion, which is predictable
• Warren Buffett: "Be fearful when others are greedy, and greedy when others are fearful"
• Contrarian indicators: when everyone agrees, the market has often already priced it in

Indicators of extreme fear:
• Fear & Greed Index near 0 (CNN Markets)
• High VIX (Volatility Index — "the fear index")
• Heavy media coverage of crashes and losses
• Sentiment surveys showing majority bearish

Indicators of extreme greed:
• Fear & Greed Index near 100
• Crypto "to the moon" headlines on mainstream media
• Everyone you know is talking about buying an asset
• Meme stocks, NFT frenzies, IPO fevers

Crypto-specific sentiment tools:
• Funding rates (on perpetual futures) — when very high, traders are overly long (potential dump incoming)
• Open interest — high open interest + falling price = mass liquidations likely
• Social volume — tracking mentions of specific tokens on Twitter, Reddit, Telegram

The contrarian approach: when sentiment is extreme in either direction, consider betting the other way. Not blindly — confirm with technical and fundamental analysis.`,
    order: 7, status: 'locked', xpReward: 25,
  },
  {
    title: 'Short Selling — Profiting When Prices Fall',
    content: `Short selling = borrowing an asset you don't own, selling it at today's price, then buying it back later (hopefully at a lower price) to return it to the lender. Your profit = sell price minus buy price.

Example:
1. Borrow 1 BTC at $60,000 (you owe 1 BTC)
2. Sell that BTC immediately → $60,000 cash
3. BTC drops to $50,000
4. Buy 1 BTC at $50,000
5. Return the BTC to lender
6. Profit: $60,000 - $50,000 = $10,000

Short selling risks:
• Losses are theoretically unlimited — if BTC goes to $100,000, you still owe 1 BTC (now costs you $100,000)
• Short squeezes: when heavily shorted assets suddenly spike up, shorts get forced to buy (cover) at huge losses
• Famous example: the 2021 GameStop short squeeze — retail traders forced institutional short sellers to cover at massive losses

Margin and leverage:
• Brokers lend you money to short (margin)
• Leverage = borrowed money as a multiple of your capital
• 2x leverage doubles both gains AND losses
• 10x leverage: a 10% move against you = liquidation (you lose everything)

Crypto-specific: perpetual futures (perps) allow shorting without borrowing. Binance, Bybit, dYdX all offer perp contracts. More accessible but still dangerous with leverage.`,
    order: 8, status: 'locked', xpReward: 25,
  },
  {
    title: 'Trading Psychology — Why You Are Your Own Worst Enemy',
    content: `You can have the best strategy in the world and still lose money if you can't control your emotions. Trading psychology is arguably the hardest part of trading.

The three biggest psychological enemies:

1. FOMO (Fear of Missing Out):
• You see a stock/crypto ripping higher. Everyone is making money. You jump in at the top.
• By the time retail FOMOs in, institutions are often selling.
• Prevention: wait for pullbacks. The trade will still be there.

2. Revenge trading:
• You take a loss. You're angry. You immediately enter another trade to "get it back."
• One loss becomes three losses in 20 minutes.
• Prevention: after a loss, step away. No trading for 30 minutes minimum.

3. Confirmation bias:
• You want the trade to work, so you only read news that confirms your view
• Ignore red flags because they conflict with your position
• Prevention: journal every trade including your reasoning. Write down what could go wrong BEFORE you enter.

The pre-trade checklist:
• Why am I entering?
• What is my stop-loss?
• What is my target?
• How much am I risking?
• What would make me wrong?

If you can't answer these before entering, you shouldn't enter.`,
    order: 9, status: 'locked', xpReward: 25,
  },
  {
    title: 'Paper Trading — Practicing Without Losing Real Money',
    content: `Paper trading = simulated trading with fake money. Before risking real capital, practice until you can demonstrate consistent profitability.

Why paper trading matters:
• Proves you can execute a strategy without real emotions
• Reveals which strategies fit your personality
• Identifies psychological patterns before they cost you money
• Builds habit of following your trading plan

Why paper trading is limited:
• No skin in the game — emotions are different with real money on the line
• Execution quality differs — fills may not match real market conditions
• Some brokers offer paper trading; others don't

Free paper trading platforms:
• TradingView: free account, full charting, paper trading on their platform
• Thinkorswim (TD Ameritrade): full-featured paper trading
• Binance: testnet mode for crypto spot and futures trading

How to paper trade correctly:
1. Set a starting capital ($100,000 simulated is standard)
2. Treat it exactly like real money — same position sizing, same discipline
3. Track every trade in a journal
4. Review monthly: are you profitable? What's working? What's not?
5. After 3+ months of profitability AND emotional discipline, consider live trading with minimum viable capital

The goal: demonstrate you can follow your plan under the psychological stress of tracking P&L — even if it's simulated.`,
    order: 10, status: 'locked', xpReward: 25,
  },
  {
    title: 'Building Your Trading Plan — Rules Before You Trade',
    content: `A trading plan transforms you from a gambler into a trader. Gamblers rely on luck. Traders have systems.

The seven rules every trading plan must answer:

1. What will you trade? (Assets, markets — your edge)
2. When will you enter? (Specific conditions, signals)
3. When will you exit if it goes wrong? (Stop-loss — always defined before entry)
4. When will you take profit? (Target — don't let greed override logic)
5. How much will you risk per trade? (Position sizing — typically 1–2% max)
6. What markets conditions are you looking for? (Trending, ranging, volatile — different strategies)
7. What are you NOT allowed to do? (Rules: no trading before coffee, no revenge trading, no trading on emotional days)

The daily routine:
• Pre-market: review overnight news, check key levels
• During: follow your plan, don't deviate
• Post-market: journal the session, review what worked and didn't

The most important rule:
"If your plan works but you don't follow it, you don't have a plan."

Most traders fail not because their strategy is wrong, but because they can't execute it under pressure. Building the discipline to follow a plan through drawdowns, FOMO, and revenge impulses is what separates consistently profitable traders from lucky gamblers.`,
    order: 11, status: 'locked', xpReward: 25,
  },
];

export function buildTradingCurriculum(id: string, now: number): { curriculum: Curriculum; nodes: CurriculumNode[] } {
  return {
    curriculum: {
      id,
      title: 'Trading & Markets',
      description: 'Markets, order types, technical analysis, risk management, and trading psychology — 11 nodes from basics to building a trading plan.',
      source: 'starter',
      createdAt: now,
      updatedAt: now,
      isPublished: true,
    },
    nodes: TRADING_NODES.map(n => ({ ...n, id: '', curriculumId: id, createdAt: now, completedAt: null })),
  };
}
