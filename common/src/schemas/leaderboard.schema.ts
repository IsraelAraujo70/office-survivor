import { z } from 'zod';

/**
 * Zod schema for submitting a leaderboard score
 */
export const submitScoreSchema = z.object({
  playerName: z
    .string()
    .min(1, 'Player name is required')
    .max(20, 'Player name must be 20 characters or less')
    .trim()
    .regex(/^[a-zA-Z0-9_\-\s]+$/, 'Player name can only contain letters, numbers, spaces, hyphens and underscores'),
  score: z
    .number()
    .int('Score must be an integer')
    .positive('Score must be positive')
    .max(999999999, 'Score is too high'),
  survivalTime: z
    .number()
    .positive('Survival time must be positive')
    .max(7200, 'Survival time cannot exceed 2 hours'), // 2 hours max in seconds
  character: z
    .string()
    .max(50, 'Character name is too long')
    .optional(),
});

/**
 * Zod schema for leaderboard entry response
 */
export const leaderboardEntrySchema = z.object({
  id: z.number().int(),
  playerName: z.string(),
  score: z.number().int(),
  survivalTime: z.number(),
  character: z.string().nullable(),
  createdAt: z.date(),
});

/**
 * Zod schema for getting leaderboard with optional limit
 */
export const getLeaderboardSchema = z.object({
  limit: z.number().int().min(1).max(100).default(10).optional(),
});

/**
 * Zod schema for leaderboard API response
 */
export const leaderboardResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(leaderboardEntrySchema),
});

/**
 * Zod schema for submit score API response
 */
export const submitScoreResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    id: z.number().int(),
    rank: z.number().int(),
  }).optional(),
  error: z.string().optional(),
});
