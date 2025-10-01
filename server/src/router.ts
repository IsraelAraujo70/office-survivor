import { router } from './trpc';
import { leaderboardRouter } from './routers/leaderboard.router';

/**
 * Main application router
 * Merges all feature routers
 */
export const appRouter = router({
  leaderboard: leaderboardRouter,
  // Future routers:
  // auth: authRouter,
  // game: gameRouter,
  // multiplayer: multiplayerRouter,
});

/**
 * Export type for tRPC client
 */
export type AppRouter = typeof appRouter;
