import { SimpleLayout } from '@/components/SimpleLayout'
import { UserProfile } from '@clerk/nextjs'
import Head from 'next/head'

export default function Profile() {
  return (
    <>
      <Head>
        <title>Profile - Manuel Bichler</title>
        <meta name="description" content="User profile" />
      </Head>
      <SimpleLayout title="" intro="">
        <div className="flex justify-center">
          <UserProfile
            appearance={{
              variables: { colorPrimary: '#27272A' },
              elements: {
                formFieldInput:
                  'rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm',
              },
            }}
          />
        </div>
      </SimpleLayout>
    </>
  )
}
