import Head from 'next/head'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { LinkIcon } from '@/components/icons/LinkIcon'
import { SimpleLayout } from '@/components/SimpleLayout'
import logoLabio from '@/images/logos/labio.png'
import logoResolute from '@/images/logos/resolute.png'
import { routes } from '@/utils/routes'
import { GithubIcon } from 'lucide-react'
import Link from 'next/link'

const projects = [
  {
    name: routes.external.projects.Labio.label,
    description:
      'A decentralized data storage solution built on top of IPFS and the Filecoin EVM. Build during a hackathon.',
    link: {
      href: routes.external.projects.Labio.url,
      label: 'labio.vercel.app',
    },
    logo: logoLabio,
    github: { href: 'https://github.com/Manubi/labio', label: 'github.com' },
  },
  {
    name: routes.external.projects.Resolute.label,
    description:
      'A monorepo in typescript with react, graphql and fastify. Knowledgebase about solid carriers for the scientific community with many graphs and dashboards.',
    link: {
      href: routes.external.projects.Resolute.url,
      label: 're-solute.eu',
    },
    logo: logoResolute,
    github: null,
  },
]

export default function Projects() {
  // todo manuel add github links
  return (
    <>
      <Head>
        <title>Projects - Manuel Bichler</title>
        <meta
          name="description"
          content="Things I’ve made trying to learn something about how the world works."
        />
      </Head>
      <SimpleLayout
        title="Some things I’ve made."
        intro="I’ve worked on tons of little and bigger projects over the years. Most of them are gone or used as internal tools. This is now my attempt to give future projects a home. If you see something that piques your interest, have a look or check out the code and contribute if you have ideas for how it can be improved."
      >
        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <Card
              as="li"
              key={project.name}
              className="p-8 inset-y-6 -inset-x-4 hover:scale-100 hover:bg-zinc-50 hover:opacity-100 dark:hover:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"
            >
              <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                <Image
                  src={project.logo}
                  alt=""
                  className={
                    project.name === 'RESOLUTE' ? 'h-8 w-8 p-1' : 'h-8 w-8'
                  }
                  unoptimized
                />
              </div>
              <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                <Card className="tracking-wide">{project.name}</Card>
              </h2>
              <Card.Description>{project.description}</Card.Description>
              <Link href={project.link.href} target="_blank">
                <p className="relative z-10 flex mt-6 text-sm font-medium transition cursor-pointer text-zinc-400 hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500">
                  <LinkIcon className="flex-none w-6 h-6" />
                  <span className="ml-2">{project.link.label}</span>
                </p>
              </Link>
              {project.github && (
                <Link href={project.github.href} target="_blank">
                  <p className="relative z-10 flex text-sm font-medium transition cursor-pointer group/link text-zinc-400 hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500">
                    <GithubIcon className="flex-none w-6 h-4 mt-1 text-zinc-400 group-hover/link:text-teal-500 dark:text-zinc-200" />
                    <span className="ml-2">{project.github.label}</span>
                  </p>
                </Link>
              )}
            </Card>
          ))}
        </ul>
      </SimpleLayout>
    </>
  )
}
