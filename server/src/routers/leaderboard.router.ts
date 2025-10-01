import { router, publicProcedure } from '../trpc';
import {
  submitScoreSchema,
  getLeaderboardSchema,
} from '@office-survivor/common';
import { getLeaderboard, submitScore } from '../db';

/**
 * Leaderboard router
 * Handles score submission and leaderboard retrieval
 */
export const leaderboardRouter = router({
  /**
   * Get top scores from leaderboard
   */
  getTop: publicProcedure
    .input(getLeaderboardSchema)
    .query(async ({ input }) => {
      const limit = input?.limit ?? 10;
      return await getLeaderboard(limit);
    }),

  /**
   * Submit a new score to the leaderboard
   */
  submitScore: publicProcedure
    .input(submitScoreSchema)
    .mutation(async ({ input }) => {
      return await submitScore(input);
    }),
});
