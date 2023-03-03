import { SimpleFlashcard } from '@/components/flashcards/SimpleFlashcard'
import { SimpleLayout } from '@/components/SimpleLayout'
import Head from 'next/head'

export default function FalshCards() {
  return (
    <>
      <Head>
        <title>Flashcards - Manuel Bichler</title>
        <meta
          name="description"
          content="Some flashcards that I use to read threw and learn from."
        />
      </Head>
      <SimpleLayout
        title="Flashcards"
        intro="As with many fields. Here you can finde some flashcards that I use to read threw and learn from."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            <SimpleFlashcard />
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}
