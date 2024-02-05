import { publicProcedure, router } from '../trpc'
import { guestbookRouter } from './guestbook'
import { userRouter } from './user'

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  user: userRouter,
  guestbook: guestbookRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
