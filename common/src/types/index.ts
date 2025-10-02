import { z } from 'zod';
import {
  submitScoreSchema,
  leaderboardEntrySchema,
  getLeaderboardSchema,
  leaderboardResponseSchema,
  submitScoreResponseSchema,
} from '../schemas/leaderboard.schema';

/**
 * Inferred TypeScript types from Zod schemas
 * These types are automatically generated and stay in sync with validation rules
 */

export type SubmitScoreInput = z.infer<typeof submitScoreSchema>;
export type LeaderboardEntry = z.infer<typeof leaderboardEntrySchema>;
export type GetLeaderboardInput = z.infer<typeof getLeaderboardSchema>;
export type LeaderboardResponse = z.infer<typeof leaderboardResponseSchema>;
export type SubmitScoreResponse = z.infer<typeof submitScoreResponseSchema>;
