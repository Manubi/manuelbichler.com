import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { getAllSnippets } from '@/lib/getAllSnippets'

function Snippet({ snippet }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/snippets/${snippet.slug}`}>
          {snippet.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={snippet.date}
          className="md:hidden"
          decorate
        >
          {formatDate(snippet.date)}
        </Card.Eyebrow>
        <Card.Description>{snippet.description}</Card.Description>
        <Card.Cta>Read snippet</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={snippet.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(snippet.date)}
      </Card.Eyebrow>
    </article>
  )
}

export default function snippetIndex({ snippets }) {
  return (
    <>
      <Head>
        <title>snippets - Manuel Bichler</title>
        <meta
          name="description"
          content="Some code snippetpets that I use to read threw and learn from."
        />
      </Head>
      <SimpleLayout
        title="snippets"
        intro="Here you can finde some code snippetpets that I use to read threw and learn from."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {snippets.map((snippet) => (
              <Snippet key={snippet.slug} snippet={snippet} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      snippets: (await getAllSnippets()).map(({ component, ...meta }) => meta),
    },
  }
}
