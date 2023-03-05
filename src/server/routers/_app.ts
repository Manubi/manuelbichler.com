import { publicProcedure, router } from '../trcp'
import { categoryRouter } from './category'
import { deckRouter } from './deck'
import { flashcardRouter } from './flashcard'
import { habitRouter } from './habit'
import { userRouter } from './user'

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  user: userRouter,
  habit: habitRouter,
  flashcard: flashcardRouter,
  category: categoryRouter,
  deck: deckRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
