import Head from 'next/head'
import Image from 'next/image'

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
          content="I’m Manuel Bichler. I live in Vienna/Austria, where I work as a software engineer."
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
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="prose lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              I’m Manuel. I live in Vienna/Austria, where I work in biotech as a
              software engineer.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <div>
                <p>
                  You might be interested to know that I do not have any formal
                  technical education. I completed a BA & MA in business
                  administration, and my grades weren&apos;t exactly stellar. My
                  passion for the outdoors, especially the mountains, always
                  seemed to take priority. However, through a series of twists
                  and turns, I found my calling in the tech industry. Now, I
                  work as a software engineer at the{' '}
                  <a
                    href={routes.external.work.CeMM.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Center for Molecular Medicine (CeMM)/Vienna
                  </a>{' '}
                  in Vienna, helping scientists build a comprehensive{' '}
                  <a
                    href={routes.external.work.Resolute.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    knowledgebase of SLCs.
                  </a>{' '}
                  My interests are diverse and ever-evolving, currently
                  including blockchains, AI, Rust programming language, and
                  biotech.
                </p>
              </div>
              <p>
                Beyond my technical interests, I remain an avid outdoor
                enthusiast who loves skiing, climbing, hiking, or simply
                breathing in the fresh mountain air. I&apos;m also fond of the
                ocean. If you want to talk, feel free to reach out.
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
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
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
