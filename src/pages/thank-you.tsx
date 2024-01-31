import { SimpleLayout } from '@/components/SimpleLayout'
import Head from 'next/head'

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>You&apos;re subscribed - Manuel Bichler</title>
        <meta
          name="description"
          content="Thanks for subscribing to my newsletter."
        />
      </Head>
      <SimpleLayout
        title="Thanks for subscribing."
        intro="Thanks for your interest! To join my mailing list, please confirm your email at hi@manuelbichler.com. As a subscriber, you'll get updates directly from me about new blog posts, project releases, and other content that I believe you'll find interesting. You can opt out anytime - no hard feelings. Looking forward to staying connected!"
      />
    </>
  )
}
