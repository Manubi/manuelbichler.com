import { Activity, Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { prisma } from '../prisma'
import { publicProcedure, router } from '../trcp'

const defaultStatSelect = Prisma.validator<Prisma.StatsSelect>()({
  id: true,
  activity: true,
  date: true,
  minutes: true,
  createdAt: true,
  updatedAt: true,
})

export const statRouter = router({
  list: publicProcedure.query(async () => {
    /**
     * For pagination docs you can have a look here
     * @see https://trpc.io/docs/useInfiniteQuery
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
     */

    const stats = await prisma.stats.findMany({
      select: defaultStatSelect,
      // get an extra item at the end which we'll use as next cursor

      where: {},
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      stats: stats.reverse(),
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
      const stats = await prisma.stats.findMany({
        where: { date },
        select: defaultStatSelect,
      })
      if (!stats) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No stats with date '${date}'`,
        })
      }
      return stats
    }),
  add: publicProcedure
    .input(
      z.object({
        activity: z.nativeEnum(Activity),
        date: z.date(),
        minutes: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const newInput = {
        activity: input.activity,
        date: input.date,
        minutes: input.minutes,
      }
      const stat = await prisma.stats.create({
        data: newInput,
      })
      return stat
    }),
})
