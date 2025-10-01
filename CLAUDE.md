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

**Client**:
- Phaser 3 + TypeScript
- Controls: WASD/Arrow keys + virtual joystick for mobile
- Static deployment (Vercel/Netlify for single-player)

**Server** (future):
- Express + tRPC (shared types between client/server)
- Supabase for auth, leaderboard storage, analytics
- Socket.IO or Colyseus for multiplayer

## Project Structure

When setting up the project, organize as:
- `/src` - TypeScript source code
  - `/scenes` - Phaser game scenes (menu, gameplay, game over)
  - `/entities` - Player, enemies, projectiles, pickups
  - `/systems` - Weapons, upgrades, spawning, collision
  - `/config` - Game constants, weapon definitions, upgrade trees
  - `/utils` - Helpers, math utilities
- `/public` - Static assets (sprites will go here in Phase 2)
- `/server` - Backend code (future multiplayer/leaderboard)

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

Once the project is initialized with package.json, expected commands:
- `npm install` - Install dependencies
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests (if configured)

## Important Notes

- **Phase 1 constraint**: Use only geometric shapes for all entities - validate gameplay before art
- Game design inspired by Vampire Survivors (bullet heaven mechanics)
- Tone: satirical humor about corporate life, targeting developers and office workers
- Session length: 5-15 minutes for casual browser play
- Portuguese references in PRD, but code/comments should be in English