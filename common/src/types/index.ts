import { z } from 'zod';
import {
  submitScoreSchema,
  leaderboardEntrySchema,
  getLeaderboardSchema
} from '../schemas/leaderboard.schema';

/**
 * Inferred TypeScript types from Zod schemas
 * These types are automatically generated and stay in sync with validation rules
 */

export type SubmitScoreInput = z.infer<typeof submitScoreSchema>;
export type LeaderboardEntry = z.infer<typeof leaderboardEntrySchema>;
export type GetLeaderboardInput = z.infer<typeof getLeaderboardSchema>;

/**
 * API Response types
 */
export interface SubmitScoreResponse {
  success: boolean;
  message: string;
}
