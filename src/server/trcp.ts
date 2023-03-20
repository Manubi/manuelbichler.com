import { initTRPC, TRPCError } from '@trpc/server'
import SuperJSON from 'superjson'
import { Context } from './context'

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
export const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
  errorFormatter({ shape }) {
    return shape
  },
})

// check if the user is signed in, otherwise through a UNAUTHORIZED CODE
const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      auth: ctx.auth,
    },
  })
})

// check if the user is manuel, otherwise through a UNAUTHORIZED CODE
const isAdmin = t.middleware(({ next, ctx }) => {
  if (ctx.auth.userId !== 'user_2N0aup1gzqOY2sdjaBbSbmBjugt') {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      auth: ctx.auth,
    },
  })
})
/**
 * Create an unprotected procedure
 * @see https://trpc.io/docs/v10/procedures
 **/

// Base router and procedure helpers
export const router = t.router
export const procedure = t.procedure
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthed)
export const adminProcedure = t.procedure.use(isAdmin)
