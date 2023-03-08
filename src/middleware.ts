import { getAuth, withClerkMiddleware } from '@clerk/nextjs/server'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { routes } from './utils/routes'

// Set the paths that require the user to be signed in
// get the values of the path property from the routes object of all the protected routes
const privatePaths = Object.values(routes.protected).map((obj) => obj.add.path)

const isPrivate = (path: string) => {
  return privatePaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace('*$', '($|/)')))
  )
}

export default withClerkMiddleware((request: NextRequest) => {
  if (!isPrivate(request.nextUrl.pathname)) {
    return NextResponse.next()
  }
  // if the user is not signed in redirect them to the sign in page.
  const { userId } = getAuth(request)
  if (!userId) {
    // redirect the users to /pages/sign-in/[[...index]].ts

    const signInUrl = new URL('/sign-in', request.url)
    signInUrl.searchParams.set('redirect_url', request.url)
    return NextResponse.redirect(signInUrl)
  }
  return NextResponse.next()
})

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - _next
   * - static (static files)
   * - favicon.ico (favicon file)
   * - image (image files)
   * - trpc (trpc routes)
   */
  matcher: '/(.*?trpc.*?|(?!static|.*\\..*|_next?|image|favicon.ico).*)',
}
