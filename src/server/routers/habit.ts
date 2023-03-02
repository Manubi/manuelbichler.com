import { Activity, Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { prisma } from '../prisma'
import { publicProcedure, router } from '../trcp'

const defaultHabitSelect = Prisma.validator<Prisma.HabitSelect>()({
  id: true,
  activity: true,
  date: true,
  createdAt: true,
  updatedAt: true,
})

export const habitRouter = router({
  list: publicProcedure.query(async () => {
    /**
     * For pagination docs you can have a look here
     * @see https://trpc.io/docs/useInfiniteQuery
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
     */

    const habits = await prisma.habit.findMany({
      select: defaultHabitSelect,
      // get an extra item at the end which we'll use as next cursor

      where: {},
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      habits: habits.reverse(),
    }
  }),
  byDate: publicProcedure
    .input(
      z.object({
        date: z.date(),
      })
    )
    .query(async ({ input }) => {
      const { date } = input
      const habits = await prisma.habit.findMany({
        where: { date },
        select: defaultHabitSelect,
      })
      console.log('habits', habits)
      if (!habits) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No habits with date '${date}'`,
        })
      }
      return habits
    }),
  add: publicProcedure
    .input(
      z.object({
        activity: z.nativeEnum(Activity),
        date: z.date(),
      })
    )
    .mutation(async ({ input }) => {
      const newInput = {
        activity: input.activity,
        date: input.date,
      }
      const habits = await prisma.habit.create({
        data: newInput,
      })
      return habits
    }),
})
