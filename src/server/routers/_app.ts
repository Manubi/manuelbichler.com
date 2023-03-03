import { publicProcedure, router } from '../trcp'
import { deckRouter } from './deck'
import { flashcardRouter } from './flashcard1'
import { habitRouter } from './habit'
import { userRouter } from './user'

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  user: userRouter,
  habit: habitRouter,
  flashcard: flashcardRouter,
  deck: deckRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
