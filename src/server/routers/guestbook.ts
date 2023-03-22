import { z } from 'zod'
import { prisma } from '../prisma'
import {
  adminProcedure,
  protectedProcedure,
  publicProcedure,
  router,
} from '../trpc'

export const guestbookRouter = router({
  list: publicProcedure.query(async () => {
    /**
     * For pagination docs you can have a look here
     * @see https://trpc.io/docs/useInfiniteQuery
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
     */

    const messages = await prisma.guestbook.findMany({
      include: { user: true },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      messages,
    }
  }),
  deleteAll: adminProcedure.mutation(async () => {
    const messages = await prisma.guestbook.deleteMany({})
    return messages
  }),
  add: protectedProcedure
    .input(
      z.object({
        message: z.string().min(2),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newInput = {
        userId: ctx.auth.userId,
        message: input.message,
      }
      const message = await prisma.guestbook.create({
        data: newInput,
      })
      return message
    }),
})
