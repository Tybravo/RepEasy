# RepEasy <> End to End Decentralized Application

# RepEasy 🐳

RepEasy is a decentralized reputation generation platform that empowers users to amplify projects hosted on GiveRep through AI-powered tweet threads and social sharing tools.

Built on the SUI blockchain with Walrus decentralized storage, Move smart contracts, and a modern React/Vite frontend, RepEasy enables individuals and project owners to create, schedule, and share awareness campaigns across Twitter (X) and Discord — turning project promotion into an effortless, automated experience.

Built on **SUI** with **Walrus** storage, **Move** contracts, **React/Vite** frontend, **Node.js** backend, and **pnpm** monorepo.


## Project File Structure

~~~

RepEasy/
├── README.md
├── pnpm-workspace.yaml
├── turbo.json
├── package.json                          # Root deps: turbo, typescript, eslint, prettier, husky
├── .gitignore
├── .env.example                          # Shared env vars
├── pnpm-lock.yaml                        # Generated
│
├── apps/
│   ├── frontend/                         # React + Vite + Tailwind + TS + Sui dApp Kit + Sui SDK
│   │   ├── README.md
│   │   ├── package.json                  # deps: react, @mysten/dapp-kit, @mysten/sui, tailwind, shadcn/ui?, lucide-react
│   │   ├── tsconfig.json
│   │   ├── tsconfig.node.json
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tailwind.config.js
│   │   ├── postcss.config.js
│   │   ├── src/
│   │   │   ├── main.tsx
│   │   │   ├── App.tsx
│   │   │   ├── App.css
│   │   │   ├── components/
│   │   │   │   ├── ui/                  # shadcn/ui components
│   │   │   │   ├── ProjectSelector.tsx
│   │   │   │   ├── ThreadGenerator.tsx
│   │   │   │   ├── PostButtons.tsx
│   │   │   │   ├── WalletConnect.tsx
│   │   │   │   └── PricingTiers.tsx
│   │   │   ├── pages/
│   │   │   │   ├── Home.tsx
│   │   │   │   ├── Generate.tsx
│   │   │   │   └── Dashboard.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useProjects.ts
│   │   │   │   ├── useGenerateThread.ts
│   │   │   │   └── useSuiWallet.ts
│   │   │   ├── lib/
│   │   │   │   ├── utils.ts
│   │   │   │   ├── twitter.ts           # Twitter OAuth/Post
│   │   │   │   └── discord.ts           # Discord Post
│   │   │   ├── services/
│   │   │   │   └── api.ts               # Backend API calls
│   │   │   └── types/
│   │   │       └── index.ts
│   │   └── public/
│   │       └── favicon.ico
│   │
│   ├── backend/                         # Node.js + Express/Fastify + TS + Sui SDK
│   │   ├── README.md
│   │   ├── package.json                 # deps: express, @mysten/sui, walrus-sdk?, cron, openai/grok-api
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   ├── index.ts                 # Server entry
│   │   │   ├── routes/
│   │   │   │   ├── projects.ts
│   │   │   │   ├── generate.ts
│   │   │   │   ├── twitter.ts
│   │   │   │   ├── discord.ts
│   │   │   │   └── client.ts            # Tier3 API keys
│   │   │   ├── controllers/
│   │   │   │   ├── projectController.ts
│   │   │   │   ├── aiController.ts
│   │   │   │   └── postController.ts
│   │   │   ├── services/
│   │   │   │   ├── walrusService.ts
│   │   │   │   ├── suiService.ts        # Interact with contract
│   │   │   │   ├── aiService.ts         # Tweet generation
│   │   │   │   ├── scraperService.ts    # Fetch giverep.com
│   │   │   │   └── cronService.ts       # Sync job
│   │   │   ├── middleware/
│   │   │   │   ├── auth.ts              # Wallet verify/JWT
│   │   │   │   └── rateLimit.ts
│   │   │   ├── utils/
│   │   │   │   └── logger.ts
│   │   │   └── types/
│   │   │       └── index.ts
│   │   └── .env                         # API keys: SUI_RPC, WALRUS, AI_API, TWITTER, DISCORD
│   │
│   └── docs/                            # Optional: API docs, wireframes
│
├── packages/
│   ├── config/
│   │   ├── eslint-config/
│   │   │   └── index.js
│   │   ├── tsconfig/
│   │   │   ├── base.json
│   │   │   └── strict.json
│   │   └── tailwind-config/
│   │       └── index.js
│   ├── ui/                              # Shared React components (shadcn)
│   │   ├── package.json
│   │   └── src/
│   │       └── components/
│   └── shared/                          # Shared types/utils
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           ├── types/
│           │   ├── project.ts
│           │   ├── tweet.ts
│           │   └── sui.ts
│           └── utils/
│               └── index.ts
│
└── move/                           # SUI Move smart contract
    ├── README.md
    ├── Move.toml                        # [package] name = "repeasy"
    ├── sources/
    │   └── repeasy.move                 # Register blob_id, metadata
    ├── tests/
    │   └── repeasy_tests.move
    └── build/                           # Generated after sui move build

~~~


## Mission Statement

RepEasy simplifies project advocacy by turning social engagement into reputation.
Anyone can now represent, amplify, and share projects they believe in — with just a few clicks.

##  Features

###  Tier 1 — Free (No Wallet Required)
- Browse and select projects from GiveRep
- Generate up to 10 tweet threads at once
- Copy threads manually for posting
- Instantly post to X (Twitter) or Discord
- Attribution to original GiveRep project sources

###  Tier 2 — Premium (Wallet Connect)
- Generate 40+ AI-powered tweet threads
- Automated post scheduling for X and Discord
- All Tier 1 features included
- Access to exclusive AI tone presets (informative, emotional, viral-ready)

###  Tier 3 — Clients (Wallet + API Keys)
- Register and expose your own projects for public tweet generation
- API endpoints for custom integration
- Analytics dashboard (impressions, clicks, engagements)
- Access control via SUI smart contracts and on-chain Blob IDs

##  Tech Stack
- **Blockchain**: SUI + Move (Smart Contract for Blob IDs)
- **Storage**: Walrus (Project Images)
- **Frontend**: React + Vite + Tailwind + TypeScript + Sui dApp Kit + Sui SDK
- **Backend**: Node.js + Express + Sui SDK + AI (Grok/OpenAI)
- **Monorepo**: pnpm + Turborepo
- **Posting**: X API + Discord Webhooks/Bot


##  Quick Start

1. Clone & Install
~~
git clone <repo>
cd RepEasy
pnpm install
~~~

2. Run the Frontend
~~~
cd apps/frontend
pnpm run dev
~~~

3. Run the Backend
~~~
cd apps/backend
pnpm run dev
~~~

4. Environment Variables
~~~
Create .env files for both frontend and backend:

Frontend (.env):
~~~
VITE_SUI_NETWORK=testnet
VITE_WALRUS_GATEWAY=https://gateway.walrus.network
VITE_X_API_URL=https://api.twitter.com/...
~~~

Backend (.env):
~~~
OPENAI_API_KEY=<your_openai_key>
SUI_FULLNODE_URL=https://fullnode.testnet.sui.io
DISCORD_WEBHOOK_URL=<your_discord_webhook>
X_BEARER_TOKEN=<your_twitter_api_token>
~~~


## 🧠 Insight: Product Requirements Document (PRD) Summary
Problem Statement

- Project creators and supporters on GiveRep lack a seamless way to generate awareness across social platforms. Manual tweet crafting, limited visibility, and inconsistent branding reduce the impact of project campaigns.

## Proposed Solution

--RepEasy provides a social reputation engine that uses AI to automate and amplify project visibility through personalized tweet threads and decentralized content storage.

## Core Objectives

- Allow users to browse and select verified GiveRep projects

- Generate AI-crafted social media threads (X/Discord-ready)

- Integrate SUI + Walrus for decentralized identity and asset storage

- Enable tiered monetization for scaling and project promotion services

## Key Metrics

- User Adoption Rate (new vs returning promoters)

- Thread Generation Count per project

- Social Engagement (retweets, impressions, Discord shares)

- Premium Subscription Conversions


## Success Definition

- A decentralized social layer where awareness equals contribution — users build reputations by helping causes reach broader audiences through authentic, AI-optimized messaging.

## Attribution

- All project data and media are fetched from GiveRep
 and are used only for representational and awareness purposes with clear attribution.
RepEasy does not commercialize or redistribute GiveRep’s proprietary assets without their consent.


##  Development Commands
Command	            Description
* pnpm dev	        Start all apps in development mode
* pnpm build	    Build all packages and apps
* pnpm lint	        Run ESLint checks
* pnpm test	        Run tests across workspace