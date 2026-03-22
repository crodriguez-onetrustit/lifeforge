// ─── Crypto & DeFi Fundamentals ───────────────────────────────────────────────

import type { Curriculum, CurriculumNode } from '../schema';

export const CRYPTO_NODES: Omit<CurriculumNode, 'id' | 'curriculumId' | 'createdAt' | 'completedAt'>[] = [
  {
    title: 'What is Blockchain? The Basics of Distributed Ledgers',
    content: `A blockchain is a shared, immutable record of transactions that multiple people can verify without needing a central authority (like a bank).

How it works:
• Transactions are grouped into "blocks"
• Each block contains a "hash" (a unique digital fingerprint) of the previous block — creating a "chain"
• If you change any past transaction, its hash changes, breaking the chain — everyone can see the tampering
• Distributed across thousands of computers (nodes) worldwide — no single point of failure

Key innovation: trust without intermediaries. You don't need a bank to verify that you sent Bitcoin to someone. The protocol is the bank.

Why this matters:
• Censorship-resistant — no government can freeze your assets
• Transparent — all transactions are verifiable by anyone
• Global — works across borders without SWIFT or bank accounts
• Programmable — smart contracts run automatically when conditions are met

Real-world analogy: Google Docs vs. sending a Word document. With Google Docs, everyone sees the current version and changes are instant. Traditional document sending is like sending a bank transfer — intermediaries, delays, disputes.

The first blockchain: Bitcoin, created in 2009 by Satoshi Nakamoto (pseudonym, real identity unknown). Released in response to the 2008 financial crisis.`,
    order: 1, status: 'available', xpReward: 25,
  },
  {
    title: 'Bitcoin — Digital Gold and the Original Use Case',
    content: `Bitcoin (BTC) is the first and largest cryptocurrency by market cap — currently ~$1–1.5 trillion. It was designed as:
1. A peer-to-peer electronic cash system (original vision)
2. A store of value — "digital gold" (current dominant narrative)

Bitcoin's key properties:
• Fixed supply: 21 million coins maximum. Ever. No central bank can print more.
• Halving: the block reward (new BTC created) halves every ~4 years, reducing new supply
• Decentralized: thousands of nodes validate transactions globally
• Energy intensive (Proof of Work) — controversial, but changing with newer mining tech

Why Bitcoin proponents call it "digital gold":
• Gold has a fixed supply on Earth (technically not, but it's hard to mine more)
• Bitcoin has a mathematically fixed supply
• Both are long-duration stores of value rather than mediums of exchange

Why critics are skeptical:
• No cash flows (unlike stocks or bonds)
• Entirely speculative in the short term
• Highly volatile — 80%+ drawdowns have happened multiple times
• Energy consumption of some mining operations

Practice: Look up the current Bitcoin halving schedule. When is the next one and how does it affect new supply?`,
    order: 2, status: 'locked', xpReward: 25,
  },
  {
    title: 'Altcoins — Ethereum, Solana, and the Smart Contract Platforms',
    content: `Bitcoin was first. Then developers built other blockchains with different features. These are "altcoins" (alternatives to Bitcoin).

Ethereum (ETH):
• Created by Vitalik Buterin in 2015
• Introduced "smart contracts" — self-executing programs on the blockchain
• Largest altcoin by market cap, second only to Bitcoin
• Used for: DeFi, NFTs, DAOs, tokenized assets
• Downside: high transaction fees ("gas") during network congestion

Solana (SOL):
• Created to solve Ethereum's scaling problems
• Much faster transactions (~4,000 TPS vs. Ethereum's ~15 TPS)
• Lower fees — fractions of a cent per transaction
• Trade-off: more centralized, has experienced network outages
• Ecosystem growing rapidly (DeFi, NFT marketplaces, payments)

Other notable platforms:
• Polygon: Ethereum scaling layer, cheaper transactions
• Avalanche: fast, sub-second finality
• Polkadot: connects different blockchains ("internet of blockchains")
• Cosmos: sovereign blockchains that can communicate

Key insight: different blockchains make different trade-offs (speed, decentralization, security — the "trilemma"). No blockchain has solved all three yet.`,
    order: 3, status: 'locked', xpReward: 25,
  },
  {
    title: 'Wallets — How to Actually Hold Crypto',
    content: `Crypto wallets don't hold coins. They hold private keys — the passwords that prove you own your cryptocurrency. The coins live on the blockchain; the wallet is your access card.

Key concepts:
• Private key: a secret number that proves ownership. If someone gets it, they can steal everything.
• Public key / address: like your bank account number. Share it to receive funds.
• Seed phrase: 12 or 24 words that regenerate all your private keys. Write it down. Store it offline. Never share it.

Types of wallets:

Hot wallets (connected to internet):
• Exchanges (Coinbase, Kraken, Binance) — convenient, but you don't control your keys (CEFI — centralized finance)
• Mobile apps (Rainbow, MetaMask mobile) — more control, still connected

Cold wallets (offline):
• Hardware wallets (Ledger, Trezor) — look like USB drives, keep keys offline, required for large holdings
• Paper wallets — seed phrase written on paper, ultra-cold storage

Rule: If you hold more than you can afford to lose, use a hardware wallet. Exchanges have been hacked (Mt. Gox in 2014 lost 850,000 BTC). You are your own bank — act like it.

Never share your seed phrase. Not with anyone. Not even "support."`,
    order: 4, status: 'locked', xpReward: 25,
  },
  {
    title: 'DeFi — Decentralized Finance Without the Banks',
    content: `DeFi (Decentralized Finance) replaces banks, brokers, and exchanges with smart contracts — code that runs automatically when conditions are met, on a public blockchain.

Core DeFi primitives:

1. Lending / Borrowing (Aave, Compound):
• Lend your crypto → earn interest (like a savings account, but 3–10% APY is common)
• Borrow against your crypto as collateral (no credit check, no bank approval)
• Interest rates are algorithmic — supply and demand sets the rate automatically

2. Decentralized Exchanges / DEXs (Uniswap, Raydium):
• Trade crypto directly from your wallet — no order book, no intermediary
• AMM (Automated Market Maker): pools of tokens provide liquidity; you trade against the pool
• "Liquidity providers" earn fees when people trade against the pool they funded

3. Stablecoins (USDC, USDT, DAI):
• Tokens pegged 1:1 to the US dollar
• Let you enter/exit crypto positions without converting back to fiat
• Essential infrastructure for DeFi — most DeFi transactions are in stablecoins

4. Yield farming:
• Moving your crypto between protocols to maximize returns
• Higher yields = higher risk (impermanent loss, smart contract risk, rug pulls)
• NOT passive income — requires active management and understanding`,
    order: 5, status: 'locked', xpReward: 25,
  },
  {
    title: 'Smart Contracts — Code That Money Runs On',
    content: `A smart contract is a program that lives on a blockchain and automatically executes when its conditions are met — no intermediaries needed.

Example: Escrow smart contract
1. Buyer sends funds to the contract
2. Contract holds the funds
3. Seller delivers the goods
4. Buyer confirms receipt
5. Contract releases funds to the seller automatically
No lawyer, no bank, no escrow agent. The code enforces the agreement.

Where smart contracts are used:
• DeFi lending (funds automatically liquidated if collateral falls below threshold)
• Decentralized exchanges (automatic trade execution)
• NFT minting (digital scarcity, programmable royalties)
• DAOs (governance rules written in code)
• Insurance (parametric insurance pays automatically when conditions are met)

Smart contract risks:
• Code bugs — the DAO hack (2016) exploited a reentrancy bug, stole $60M in ETH
• Oracle problems — smart contracts need external data (prices, weather); if the data source lies, the contract can be exploited
• Immutability — bugs can't be patched if the contract is truly immutable. This is a feature AND a risk.

Practice: What would a smart contract for splitting rent look like? What conditions trigger what actions?`,
    order: 6, status: 'locked', xpReward: 25,
  },
  {
    title: 'Security — Protecting Your Assets in a Digital World',
    content: `Crypto security is unlike anything in traditional finance. No bank to call, no fraud department, no chargebacks. If your funds are stolen, they're gone.

Common attack vectors:

Phishing:
• Fake emails, Discord DMs, Telegram messages pretending to be from an exchange or protocol
• Always check URLs manually. Never click links in DMs.
• Ledger users: real Ledger will never ask for your seed phrase

Fake apps:
• Malicious apps on the App Store / Google Play that look like MetaMask or exchanges
• Download only from official sources. Double-check developer names.

Social engineering:
• Someone DMs you "from support" asking for your seed phrase
• A "friend" on Discord needs help and asks you to "connect your wallet"
• Golden rule: your seed phrase is password + secret key + everything. Never share it for any reason.

Smart contract exploits:
• Protocols get hacked through code vulnerabilities
• Mitigation: use audited protocols, don't put more money in than you can afford to lose

Hardware wallet rule: if you hold more than 1 month of expenses in crypto, use a hardware wallet (Ledger or Trezor). The $80–200 device could save you tens of thousands.`,
    order: 7, status: 'locked', xpReward: 25,
  },
  {
    title: 'NFTs — Beyond the JPEG Hype',
    content: `NFT = Non-Fungible Token. "Non-fungible" means unique and not interchangeable. A dollar bill is fungible (one dollar = any other dollar). A Picasso is non-fungible (unique).

NFTs on a blockchain:
• Prove ownership of a unique digital item
• Stored on a public ledger anyone can verify
• Can be programmed (smart contracts) to pay royalties to creators on every resale

What NFTs actually represent (the utility question):
• Profile pictures (PFPs): community membership, social signaling (Bored Ape Yacht Club)
• Art: digital art with provable ownership (platform: SuperRare, Foundation)
• Gaming items: in-game assets you truly own (Ethereum Name Service for .eth domains has real utility)
• Tickets: event access, proof of attendance
• Domain names: ENS (.eth domains) — your crypto username

The 2021–2022 NFT bubble: prices of JPGs reached absurd levels. Most crashed 90–99%. The technology survived the hype cycle — NFTs as a concept (unique digital ownership) is still valid and being used in gaming, ticketing, credentials, and digital identity.

What to look for: real utility, real community, not just speculation on the JPEG.`,
    order: 8, status: 'locked', xpReward: 25,
  },
  {
    title: 'DAOs — Decentralized Organizations',
    content: `DAO = Decentralized Autonomous Organization. A group with shared resources governed by rules encoded in smart contracts, not a central authority.

Traditional organization: CEO makes decisions, board approves, employees execute.
DAO: Token holders vote on proposals, code executes the decision automatically.

How DAOs work:
1. A smart contract defines the rules (who can vote, what gets voted on, how decisions execute)
2. Members hold governance tokens (usually purchased, sometimes earned)
3. Proposals are submitted and voted on by token holders
4. If passed, the code executes automatically — no human can stop it

Famous DAOs:
• MakerDAO: runs the DAI stablecoin — one of the most influential DeFi protocols
• Uniswap: governance token holders decide protocol upgrades
• ConstitutionDAO: raised $47M to buy a rare copy of the US Constitution (didn't win, money refunded)
• Bankless DAO: coordinated decentralized finance education and media

Why this matters for the future:
• Transparent governance — all votes and treasury visible on-chain
• No single leader who can rug the community
• Programmatically enforced rules — the code is the law

Risks: low voter turnout (governance apathy), token concentration (founders often hold most tokens), governance attacks (buying 51% of tokens to take control).`,
    order: 9, status: 'locked', xpReward: 25,
  },
  {
    title: 'Layer 2s — Scaling Ethereum for the Masses',
    content: `Ethereum can process ~15 transactions per second (TPS). For comparison, Visa processes ~65,000 TPS. This is Ethereum's scaling problem — and it's being solved with Layer 2s.

Layer 2 (L2) = a separate blockchain that inherits Ethereum's security but processes transactions off the main chain ("base chain" or "Layer 1"), bundling them together before submitting to Ethereum.

Types of L2 solutions:

Optimistic Rollups (Optimism, Arbitrum):
• Assume transactions are valid unless proven fraudulent ("optimistic")
• Challenges take ~7 days — allows for fraud proofs
• EVM-compatible — Ethereum developers can deploy existing code easily

Zero-Knowledge Rollups / ZK-Rollups (zkSync, StarkNet, Polygon zkEVM):
• Use cryptographic proofs (ZK = zero knowledge) to prove transactions are valid without revealing all the data
• Faster, more efficient than Optimistic
• EVM compatibility still improving

Why this matters for users:
• Transaction fees drop from $5–50 (Ethereum L1) to $0.10–1 (L2)
• Speed increases dramatically
• DeFi becomes accessible to people who can't afford $30 transaction fees

Current leading L2s by TVL (Total Value Locked): Arbitrum, Optimism, Base (by Coinbase), zkSync Era.`,
    order: 10, status: 'locked', xpReward: 25,
  },
  {
    title: 'Building Your Crypto Stack — A Practical Framework',
    content: `Putting it all together — how to think about crypto as part of a broader financial strategy.

The crypto stack (beginner to advanced):
1. Start: Learn. Understand Bitcoin, blockchain, wallets. Paper trade before real money.
2. Stage 1: Buy Bitcoin and/or Ethereum on a reputable exchange (Coinbase, Kraken). Store in exchange wallet for convenience (small amounts).
3. Stage 2: Move significant holdings to a hardware wallet. Understand seed phrase security.
4. Stage 3: Explore DeFi — earn interest on stablecoins, try a DEX, understand impermanent loss.
5. Stage 4: Explore alt-L1s and L2s — diversify across ecosystems.
6. Stage 5: Governance participation — vote on a DAO proposal.

How much to allocate to crypto:
• Most traditional financial advisors: 0–5% maximum
• Crypto-native view: up to 10–20% of high-risk capital
• Personal take: never invest money you can't afford to lose. Crypto is still experimental at scale.

The three rules:
1. Only invest what you can afford to lose entirely
2. If it's too good to be true, it is (DYOR — Do Your Own Research)
3. Not your keys, not your coins (unless you're actively using the funds)`,
    order: 11, status: 'locked', xpReward: 25,
  },
];

export function buildCryptoCurriculum(id: string, now: number): { curriculum: Curriculum; nodes: CurriculumNode[] } {
  return {
    curriculum: {
      id,
      title: 'Crypto & DeFi Fundamentals',
      description: 'Blockchain, Bitcoin, DeFi protocols, wallets, and smart contracts — from first principles to building a crypto strategy. 11 nodes.',
      source: 'starter',
      createdAt: now,
      updatedAt: now,
      isPublished: true,
    },
    nodes: CRYPTO_NODES.map(n => ({ ...n, id: '', curriculumId: id, createdAt: now, completedAt: null })),
  };
}
