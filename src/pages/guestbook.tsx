import { SimpleLayout } from '@/components/SimpleLayout'
import Head from 'next/head'

export default function Guestbook() {
  return (
    <>
      <Head>
        <title>Guestbook - Manuel Bichler</title>
        <meta name="description" content="Say hi. I'd love to hear from you." />
      </Head>
      <SimpleLayout
        title="Guestbook"
        intro="Say hi! I'd love to hear from you."
      >
        Manuel todo add guestbook
      </SimpleLayout>
    </>
  )
}
