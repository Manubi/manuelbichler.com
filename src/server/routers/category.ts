import { Prisma } from '@prisma/client'
import { z } from 'zod'
import { prisma } from '../prisma'
import { publicProcedure, router } from '../trcp'

const defaultCategorySelect =
  Prisma.validator<Prisma.FlashcardCategorySelect>()({
    id: true,
    name: true,
    createdAt: true,
    updatedAt: true,
  })

export const categoryRouter = router({
  list: publicProcedure.query(async () => {
    /**
     * For pagination docs you can have a look here
     * @see https://trpc.io/docs/useInfiniteQuery
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
     */

    const category = await prisma.flashcardCategory.findMany({
      select: defaultCategorySelect,
    })

    return {
      category,
    }
  }),
  add: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const newInput = {
        name: input.name,
      }

      const category = await prisma.flashcardCategory.create({
        data: newInput,
      })
      return category
    }),
})
