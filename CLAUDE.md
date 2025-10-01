# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Office Survivor** is a roguelite bullet heaven game (Vampire Survivors-style) set in a corporate office hell. Built with **Phaser 3 + TypeScript** for web deployment.

**Core Concept**: A developer trapped in infinite meetings and corporate chaos must survive the workday by auto-attacking hordes of enemies (Jira tickets, spreadsheets, ghost meetings) while collecting XP to level up and choose upgrades.

## Development Phases

### Phase 1 - MVP Prototype (Current)
- **Critical**: All entities (player, enemies, projectiles, pickups) must be represented as **simple geometric shapes (circles, squares, rectangles)** - NO sprites initially
- Focus: Validate collision detection, balancing, and gameplay loop before adding art
- Target: 1 playable character, 5-6 weapons, 5 passives, 3 basic enemies, 1 boss
- Timeline: 4-6 weeks

### Phase 2 - Art Integration
- Gradually replace geometric hitboxes with pixel art sprites
- Add more maps (office floors), bosses, weapons
- Implement meta-progression with permanent upgrades

### Phase 3 - Multiplayer
- Co-op online mode (2-4 players)
- Global leaderboards
- Cosmetics/skins

## Tech Stack

**Client** (future):
- Phaser 3 + TypeScript
- Controls: WASD/Arrow keys + virtual joystick for mobile
- Static deployment (Vercel/Netlify for single-player)

**Server** (current):
- Express + REST API
- Prisma ORM with SQLite (dev) / PostgreSQL (prod)
- Bun runtime for faster development
- Zod for request validation
- CORS enabled for web client

**Type Safety**:
- Monorepo with workspaces: `/server`, `/common`, `/client` (future)
- `/common` package contains shared Zod schemas and TypeScript types
- Client and server import from `@office-survivor/common` for consistent validation

## Project Structure

Current structure:
- `/common` - **Shared types and Zod schemas**
  - `/src/schemas` - Zod validation schemas (e.g., `leaderboard.schema.ts`)
  - `/src/types` - TypeScript types inferred from Zod schemas
  - Exported as `@office-survivor/common` workspace package
- `/server` - Backend REST API
  - `/src/index.ts` - Express server with REST endpoints
  - `/src/db.ts` - Prisma client and database functions
  - `/prisma/schema.prisma` - Database schema (Leaderboard model)
- `/client` - (future) Phaser 3 game client
  - `/src/scenes` - Phaser game scenes (menu, gameplay, game over)
  - `/src/entities` - Player, enemies, projectiles, pickups
  - `/src/systems` - Weapons, upgrades, spawning, collision
  - `/src/config` - Game constants, weapon definitions, upgrade trees
  - `/src/utils` - Helpers, math utilities
- `/public` - Static assets (sprites will go here in Phase 2)

## Core Gameplay Rules

- **Loop**: Survive 20 minutes (5-10 min for quick runs) → defeat boss → earn currency → buy permanent upgrades → repeat
- **Combat**: Weapons auto-fire on cooldown, player only moves
- **Progression**: Collect XP (coffee, commits, post-its) → level up → choose 1 of 3 random upgrades
- **Death**: Return to lobby with VR Points (currency) for meta-progression

## Thematic Elements

**Enemies**:
- Jira tickets (flying)
- Spreadsheets (alive)
- Ghost meetings (trap player)
- Bosses: Project Manager, Product Manager, CFO, CEO

**Weapons** (dev tools):
- "Espresso Coffee" - rapid projectiles
- "Massive Commit" - area damage
- "Pull Request" - ricochet between enemies
- "Script in Prod" - chaotic explosion

**Passives**:
- "Headphones" - +speed
- "Ultrawide Monitor" - +range
- "Meal Voucher" - health regen

## Development Commands

**Root (monorepo):**
- `bun install` - Install all workspace dependencies
- `bun run dev` - Start development server (currently runs server only)

**Server specific:**
- `cd server && bun run dev` - Start Express server with hot reload
- `cd server && bun run db:generate` - Generate Prisma client
- `cd server && bun run db:push` - Sync Prisma schema to database (dev)
- `cd server && bun run db:migrate` - Create migration (production)
- `cd server && bun run db:studio` - Open Prisma Studio GUI

**API Endpoints (REST):**
- `GET /health` - Health check
- `GET /api/leaderboard?limit=10` - Fetch top scores
- `POST /api/leaderboard` - Submit score (body: `{playerName, score, survivalTime, character?}`)

## Type Safety Pattern

**How we handle shared types:**

1. **Define Zod schemas in `/common/src/schemas/`:**
```typescript
// common/src/schemas/leaderboard.schema.ts
export const submitScoreSchema = z.object({
  playerName: z.string().min(1).max(20).trim(),
  score: z.number().int().positive(),
  survivalTime: z.number().positive(),
  character: z.string().optional(),
});
```

2. **Infer TypeScript types in `/common/src/types/`:**
```typescript
// common/src/types/index.ts
export type SubmitScoreInput = z.infer<typeof submitScoreSchema>;
```

3. **Use in server for validation:**
```typescript
// server/src/index.ts
import { submitScoreSchema } from '@office-survivor/common';
const validated = submitScoreSchema.parse(req.body);
```

4. **Use in client (future) for type-safe API calls:**
```typescript
// client/src/api/leaderboard.ts
import type { SubmitScoreInput } from '@office-survivor/common';
function submitScore(data: SubmitScoreInput) { ... }
```

**Benefits:**
- Single source of truth for validation rules
- Runtime validation with Zod on server
- Compile-time type checking on client
- No type duplication or drift between client/server

## Important Notes

- **Phase 1 constraint**: Use only geometric shapes for all entities - validate gameplay before art
- **Package manager**: Use **bun** (not npm/yarn) for all commands
- Game design inspired by Vampire Survivors (bullet heaven mechanics)
- Tone: satirical humor about corporate life, targeting developers and office workers
- Session length: 5-15 minutes for casual browser play
- Portuguese references in PRD, but code/comments should be in English