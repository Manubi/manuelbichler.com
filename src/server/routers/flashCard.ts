import { FlashCardCategories, Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { prisma } from '../prisma'
import { publicProcedure, router } from '../trcp'

const defaultFlashCardSelect = Prisma.validator<Prisma.FlashCardSelect>()({
  id: true,
  question: true,
  answer: true,
  category: true,
  createdAt: true,
  updatedAt: true,
})

const defaultFlashCardCategorySelect =
  Prisma.validator<Prisma.FlashCardCategorySelect>()({
    id: true,
    name: true,
    flashCard: true,
    createdAt: true,
    updatedAt: true,
  })

export const flashCardRouter = router({
  list: publicProcedure.query(async () => {
    /**
     * For pagination docs you can have a look here
     * @see https://trpc.io/docs/useInfiniteQuery
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
     */

    const flashCards = await prisma.flashCard.findMany({
      select: defaultFlashCardSelect,
      // get an extra item at the end which we'll use as next cursor

      where: {},
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      flashCards: flashCards.reverse(),
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
      const flashCardCategory = await prisma.flashCardCategory.findMany({
        where: { name: category as any },
        select: defaultFlashCardSelect,
      })
      if (!flashCardCategory) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No flashCards with category '${category} found.'`,
        })
      }
      return flashCardCategory
    }),
  add: publicProcedure
    .input(
      z.object({
        category: z.nativeEnum(FlashCardCategories),
        question: z.string(),
        answer: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const newInput = {
        question: input.question,
        answer: input.answer,
        category: input.category as FlashCardCategories,
      }
      const flashCard = await prisma.flashCard.create({
        data: newInput as any,
      })
      return flashCard
    }),
})
