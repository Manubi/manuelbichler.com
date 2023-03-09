import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { EthereumIcon } from '@/components/icons/EthereumIcon'
import { MailSolidIcon } from '@/components/icons/MailIcon'
import { GitHubIcon, TwitterIcon } from '@/components/SocialIcons'
import { SocialLink } from '@/components/SocialLink'
import portraitImage from '@/images/portrait.jpg'
import { routes } from '@/utils/routes'

export default function About() {
  return (
    <>
      <Head>
        <title>About - Manuel Bichler</title>
        <meta
          name="description"
          content="I’m Manuel Bichler. I live in Vienna/Austria, where I work in biotech as a software engineer."
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="object-cover aspect-square rotate-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="prose lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              I’m Manuel. I live in Vienna/Austria, where I work in biotech as a
              software engineer.
            </h1>
            <div className="mt-6 text-base space-y-7 text-zinc-600 dark:text-zinc-400">
              <div>
                <p>
                  You might be interested to know that I do not have any formal
                  technical education. I completed a BA & MA in business
                  administration, and I didn&apos;t have great grades. I was
                  much more interested in being outside. Mostly in the
                  mountains. But, after a couple of detours I found my way into
                  the tech industry. I&apos;m currently working as a software
                  engineer at the Center for Molecular Medicine (CeMM) in
                  Vienna, where I support scientists in building a comprehensive
                  knowledgebase of SLCs. From time to time I get excited about
                  things. Right now thats blockchains, AI, the Rust programming
                  language and biotech. Why?
                </p>
                <ul>
                  <li>
                    Why I think{' '}
                    <Link href={routes.public.article.blockchainsStay}>
                      &quot;Blockchains are here to stay&quot;
                    </Link>
                  </li>
                  <li>
                    Why I think{' '}
                    <Link href={routes.public.article.aiGreatestWorst}>
                      &quot;AI will be the greatest and worst thing that happens
                      to us&quot;
                    </Link>
                  </li>
                  <li>
                    Why I think{' '}
                    <Link href={routes.public.article.rustEverywhere}>
                      &quot;Rust will be used everywhere&quot;
                    </Link>
                  </li>
                  <li>
                    Why I think{' '}
                    <Link href={routes.public.article.biotechNextNextBigThing}>
                      &quot;Biotech will be the next next big thing&quot;
                    </Link>
                  </li>
                </ul>
              </div>
              <p>
                So basically I am interested in technical stuff. Maybe one day I
                will add robotics, even if I shouldn&apos;t. So if you want to
                talk about anything of the above or something else like
              </p>
              <ul>
                <li>how to drop out of a PhD twice</li>
                <li>how to become a generalist</li>
                <li>how to get masters degree without any A-levels</li>
                <li>how to sink a startup slowly and painfully</li>
              </ul>
              <p>
                I still enjoy being in the mountains. Be it skiing, climbing,
                hiking or just being outside. I also do like the ocean. My main
                goal for the next couple years is to build a bridge between the
                different fields that I am interested in. I want to be able to
                talk to people from all of them and understand what they are
                doing. So my focus will be on AI, blockchain and biology.{' '}
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink
                href={routes.external.socials.twitter.url}
                icon={TwitterIcon}
              >
                Follow on Twitter
              </SocialLink>

              <SocialLink
                href={routes.external.socials.github.url}
                icon={GitHubIcon}
                className="mt-4"
              >
                Follow on GitHub
              </SocialLink>

              <SocialLink
                href={`mailto:${routes.contacts.email}`}
                icon={MailSolidIcon}
                className="pt-8 mt-8 border-t border-zinc-100 dark:border-zinc-700/40"
              >
                {routes.contacts.email}
              </SocialLink>

              <SocialLink
                href={`https://zapper.fi/account/${routes.contacts.ens}`}
                icon={EthereumIcon}
                className="mt-4"
              >
                {routes.contacts.ens}
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
