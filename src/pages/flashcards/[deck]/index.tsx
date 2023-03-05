import { SimpleFlashcard } from '@/components/flashcards/SimpleFlashcard'
import { SimpleLayout } from '@/components/SimpleLayout'
import { trpc } from '@/utils/trpc'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Flashcard() {
  const router = useRouter()
  const { deck } = router.query
  const flashcardsQuery = trpc.deck.listFlashcards.useQuery({
    id: Number(deck),
  })
  const { data } = flashcardsQuery
  console.log('data', data)
  return (
    <>
      <Head>
        <title>Flashcards - Manuel Bichler</title>
        <meta
          name={data?.name ?? 'Flashcards'}
          content={
            data?.description ??
            'Some flashcards that I use to read threw and learn from.'
          }
        />
      </Head>
      <SimpleLayout
        title={data?.name ?? 'Flashcards'}
        intro={
          data?.description ??
          'Some flashcards that I use to read threw and learn from.'
        }
      >
        <div className="flex flex-col space-y-16">
          {data?.flashcard && <SimpleFlashcard flashcards={data?.flashcard} />}
        </div>
      </SimpleLayout>
    </>
  )
}
