import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { getLeaderboard, submitScore } from './db';

const t = initTRPC.create();

const router = t.router;
const publicProcedure = t.procedure;

export const appRouter = router({
  leaderboard: router({
    getTop10: publicProcedure.query(async () => {
      return await getLeaderboard(10);
    }),

    submitScore: publicProcedure
      .input(
        z.object({
          playerName: z.string().min(1).max(20),
          score: z.number().int().positive(),
          survivalTime: z.number().positive(),
          character: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return await submitScore(input);
      }),
  }),
});

export type AppRouter = typeof appRouter;
