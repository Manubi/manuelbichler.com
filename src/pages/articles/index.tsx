import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { getAllArticles } from '@/lib/getAllArticles'
import Head from 'next/head'

function Article({ article }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  )
}

export default function ArticlesIndex({ articles }) {
  return (
    <>
      <Head>
        <title>Articles - Manuel Bichler</title>
        <meta
          name="description"
          content="All of my long-form thoughts on programming, product design, and more."
        />
      </Head>
      <SimpleLayout
        title="Ramblings about my own stupidity, endless cycle of facepalms and self-deprecation that follows. "
        intro="What's my hope with this? To improve my thinking. To keep a personal notebook. To send a message to my younger self. What will it be about? A lot of tech. Some biology - I hope. And basically everything else that my mind decides to deal with. As my primary target audience is a cohort of one - myself, please don't expect anything significant from it."
      >
        <blockquote className="mb-20 -mt-8 text-xl font-semibold italic text-zinc-600 dark:text-zinc-400">
          <svg
            aria-hidden="true"
            className="h-10 w-10 text-gray-400 dark:text-gray-600"
            viewBox="0 0 24 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
              fill="currentColor"
            />
          </svg>
          <p className="text-zinc-800 dark:text-zinc-200">
            &quot;Expectations are like mosquitoes in a nudist colony:
            you&apos;re never quite sure what&apos;s going to happen, but you
            know it&apos;s going to be annoying.&quot; - unknown
          </p>
        </blockquote>

        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
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
      articles: (await getAllArticles()).map(({ component, ...meta }) => meta),
    },
  }
}
