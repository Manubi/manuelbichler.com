import { initTRPC } from '@trpc/server'
import SuperJSON from 'superjson'
import { Context } from './context'

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
export const t = initTRPC.context<Context>().create({ transformer: SuperJSON })
/**
 * Create an unprotected procedure
 * @see https://trpc.io/docs/v10/procedures
 **/
export const publicProcedure = t.procedure
// Base router and procedure helpers
export const router = t.router
export const procedure = t.procedure
