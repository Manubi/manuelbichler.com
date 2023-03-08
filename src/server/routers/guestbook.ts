import { z } from 'zod'
import { prisma } from '../prisma'
import { protectedProcedure, publicProcedure, router } from '../trcp'

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
  add: protectedProcedure
    .input(
      z.object({
        message: z.string().min(2),
      })
    )
    .mutation(async ({ input, ctx }) => {
      console.log('ctx', ctx.auth)
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
