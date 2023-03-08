import { Prisma } from '@prisma/client'
import { z } from 'zod'
import { prisma } from '../prisma'
import { adminProcedure, publicProcedure, router } from '../trcp'

const defaultDeckSelect = Prisma.validator<Prisma.DeckSelect>()({
  id: true,
  name: true,
  description: true,
  createdAt: true,
  updatedAt: true,
})

export const deckRouter = router({
  list: publicProcedure.query(async () => {
    /**
     * For pagination docs you can have a look here
     * @see https://trpc.io/docs/useInfiniteQuery
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
     */

    const decks = await prisma.deck.findMany({
      select: defaultDeckSelect,
      // get an extra item at the end which we'll use as next cursor

      where: {},
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      decks: decks.reverse(),
    }
  }),
  listFlashcards: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const flashcards = await prisma.deck.findUnique({
        where: { id: input.id },
        include: { flashcard: true },
      })
      return flashcards
    }),

  add: adminProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const newInput = {
        name: input.name,
        description: input.description,
      }
      const deck = await prisma.deck.create({
        data: newInput,
      })
      return deck
    }),
})
