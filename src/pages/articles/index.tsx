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
        className="hidden mt-1 md:block"
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
        title="Ramblings about my own stupidity, then endless cycle of facepalms and self-deprecation that follows. "
        intro="What's my hope with this? To improve my thinking. To keep a personal notebook. To send a message to my younger self."
      >
        <p>
          What will it be about? A lot of tech. Some biology. And basically
          everything else that my mind decides to deal with. I never was able to
          get into writing. Therefor my expectations are lower than low. &quot;
          <span className="italic">
            Expectations are like mosquitoes in a nudist colony: you&apos;re
            never quite sure what&apos;s going to happen, but you know it&apos;s
            going to be annoying.&quot;{' '}
          </span>
          (unkown) - Let&apos;s see what happens.
        </p>
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex flex-col max-w-3xl space-y-16">
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
