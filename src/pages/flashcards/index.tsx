import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { trpc } from '@/utils/trpc'

function Deck({ deck }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/flashcards/${deck.id}`}>{deck.name}</Card.Title>
        <Card.Eyebrow as="time" dateTime={deck.updatedAt} className="" decorate>
          {formatDate(deck.updatedAt)}
        </Card.Eyebrow>
        <Card.Description>{deck.description}</Card.Description>
        <Card.Cta>Start learning</Card.Cta>
      </Card>
    </article>
  )
}

export default function flashCardIndex({ decks }) {
  const deckQuery = trpc.deck.list.useQuery()
  const { data } = deckQuery

  return (
    <>
      <Head>
        <title>Flashcard decks- Manuel Bichler</title>
        <meta
          name="description"
          content="Some flashcard decks that I use to read threw and learn from."
        />
      </Head>
      <SimpleLayout
        title="Decks"
        intro="As with many fields you need to know the language. Here I collect some flashcard decks that I use to read threw and learn from."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex flex-col max-w-3xl space-y-16">
            {data?.decks.map((deck) => (
              <Deck key={deck.id} deck={deck} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}
