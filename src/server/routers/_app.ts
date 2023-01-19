import { publicProcedure, router } from '../trcp'
import { statRouter } from './stat'
import { userRouter } from './user'

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  user: userRouter,
  stat: statRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
