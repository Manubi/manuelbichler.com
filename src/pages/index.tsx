import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { Newsletter } from '@/components/home/Newsletter'
import { Photos } from '@/components/home/Photos'
import { Resume } from '@/components/home/Resume'
import { SocialLink } from '@/components/home/SocialLink'
import { Prose } from '@/components/Prose'
import { GitHubIcon, TwitterIcon } from '@/components/SocialIcons'
import { formatDate } from '@/lib/formatDate'
import { generateRssFeed } from '@/lib/generateRssFeed'
import { getAllArticles } from '@/lib/getAllArticles'
import { routes } from '@/utils/routes'
import { SpeakerWaveIcon } from '@heroicons/react/24/outline'
import Head from 'next/head'

function Article({ article }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

export default function Home({ articles }) {
  function saySess() {
    const audio = new Audio('/sess.m4a')
    audio.play()
  }

  return (
    <>
      <Head>
        <title>Manuel Bichler</title>
        <meta
          name="description"
          content="I’m Manuel, a software engineer based in Vienna/Austria."
        />
      </Head>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <div className="flex items-baseline">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              Sess!{' '}
            </h1>
            <div className="flex items-baseline prose">
              <a
                href="#"
                onClick={saySess}
                className="flex ml-3 -my-8 peer hover:cursor-pointer sm:text-lg "
              >
                /sɛs/
                <SpeakerWaveIcon className="mt-1 ml-1 h-[12px] w-[12px] text-zinc-500 dark:text-zinc-400" />
              </a>
              <p className="invisible ml-3 text-base text-zinc-600 peer-hover:visible dark:text-zinc-400">
                Saying &quot;Hi&quot; in my home town Matrei i.O.
              </p>
            </div>
          </div>
          <Prose>
            <p className="text-base text-zinc-600 dark:text-zinc-400">
              I&rsquo;m Manuel, a software engineer at the{' '}
              <a
                href={routes.external.work.CeMM.url}
                target="_blank"
                rel="noreferrer"
              >
                Center for Molecular Medicine (CeMM)/Vienna
              </a>{' '}
              where I support scientists in building a comprehensive{' '}
              <a
                href={routes.external.work.Resolute.url}
                target="_blank"
                rel="noreferrer"
              >
                knowledgebase of SLCs.
              </a>{' '}
              Sometimes I play around with blockchains, the Rust programming
              language and AI. I only recently started writing about things I
              do, in order to understand things better. So forgive me if my
              texts are bad, but as we all know it&rsquo;s the AI that&rsquo;s
              really to blame. <br />
              I also started making flashcards to learn new things. Both can be
              seen here.
              <br /> Anyway, thanks for stopping by!
            </p>
          </Prose>
          <div className="flex gap-6 mt-6">
            <SocialLink
              href={routes.external.socials.twitter.url}
              aria-label="Follow on Twitter"
              icon={TwitterIcon}
            />
            <SocialLink
              href={routes.external.socials.github.url}
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
          </div>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="grid max-w-xl grid-cols-1 mx-auto gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume />
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed()
  }

  return {
    props: {
      articles: (await getAllArticles())
        .slice(0, 4)
        .map(({ component, ...meta }) => meta),
    },
  }
}
