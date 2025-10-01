import { initTRPC, TRPCError } from '@trpc/server';
import { ZodError } from 'zod';

/**
 * tRPC Context - available to all procedures
 * Can be extended with auth, user session, etc. in the future
 */
export interface Context {
  // Future: user?: User;
  // Future: session?: Session;
}

/**
 * Create tRPC context from Express request
 */
export const createContext = (): Context => {
  return {};
};

/**
 * Initialize tRPC with custom error formatting
 */
const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Export reusable router and procedure builders
 */
export const router = t.router;
export const publicProcedure = t.procedure;

/**
 * Example of a protected procedure (for future auth)
 *
 * export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
 *   if (!ctx.user) {
 *     throw new TRPCError({ code: 'UNAUTHORIZED' });
 *   }
 *   return next({
 *     ctx: {
 *       user: ctx.user,
 *     },
 *   });
 * });
 */
