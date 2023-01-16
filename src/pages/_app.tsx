import { useEffect, useRef, useState } from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import type { AppProps } from 'next/app'

import '@/styles/tailwind.css'
import 'focus-visible'
import { trpc } from './utils/trpc'

function usePrevious(value) {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
function MyApp({
  Component,
  pageProps,
  router,
}: AppProps<{ dehydratedState: unknown }>) {
  let previousPathname = usePrevious(router.pathname)
  // Create a client
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <div className="fixed inset-0 flex justify-center sm:px-8">
          <div className="flex w-full max-w-7xl lg:px-8">
            <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
          </div>
        </div>
        <div className="relative">
          <Header />
          <main>
            <Component previousPathname={previousPathname} {...pageProps} />
          </main>
          <Footer />
        </div>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default trpc.withTRPC(MyApp)
