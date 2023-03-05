import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { prisma } from '../prisma'
import { publicProcedure, router } from '../trcp'

const defaultFlashcardSelect = Prisma.validator<Prisma.FlashcardSelect>()({
  id: true,
  question: true,
  answer: true,
  category: true,
  createdAt: true,
  updatedAt: true,
})

const defaultFlashcardCategorySelect =
  Prisma.validator<Prisma.FlashcardCategorySelect>()({
    id: true,
    name: true,
    flashcard: true,
    createdAt: true,
    updatedAt: true,
  })

export const flashcardRouter = router({
  list: publicProcedure.query(async () => {
    /**
     * For pagination docs you can have a look here
     * @see https://trpc.io/docs/useInfiniteQuery
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
     */

    const flashcards = await prisma.flashcard.findMany({
      select: defaultFlashcardSelect,
      // get an extra item at the end which we'll use as next cursor

      where: {},
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      flashcards: flashcards.reverse(),
    }
  }),
  byCategory: publicProcedure
    .input(
      z.object({
        category: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { category } = input
      const flashcardCategory = await prisma.flashcardCategory.findMany({
        where: { name: category as any },
        select: defaultFlashcardSelect,
      })
      if (!flashcardCategory) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No flashcards with category '${category} found.'`,
        })
      }
      return flashcardCategory
    }),
  add: publicProcedure
    .input(
      z.object({
        deckId: z.number(),
        category: z.array(z.number()),
        question: z.string(),
        answer: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const newFlashcard = {
        deckId: input.deckId,
        question: input.question,
        answer: input.answer,
        category: {
          connect: input.category.map((category) => ({ id: category })),
        },
      }

      const createdFlashcard = await prisma.flashcard.create({
        data: newFlashcard,
      })

      return createdFlashcard
    }),
})
