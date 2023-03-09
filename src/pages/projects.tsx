import Head from 'next/head'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { LinkIcon } from '@/components/icons/LinkIcon'
import { SimpleLayout } from '@/components/SimpleLayout'
import logoCosmos from '@/images/logos/cosmos.svg'
import logoHelioStream from '@/images/logos/helio-stream.svg'
import logoLabio from '@/images/logos/labio.png'
import logoOpenShuttle from '@/images/logos/open-shuttle.svg'
import logoResolute from '@/images/logos/resolute.png'
import { routes } from '@/utils/routes'

const projects = [
  {
    name: routes.external.projects.Labio.label,
    description:
      'A decentralized data storage solution built on top of IPFS and the Filecoin EVM.',
    link: {
      href: routes.external.projects.Labio.url,
      label: 'labio.vercel.app',
    },
    logo: logoLabio,
    github: 'https://github.com/Manubi/labio',
  },
  {
    name: routes.external.projects.Resolute.label,
    description: 'A monorepo in typescript with react, graphql and fastify.',
    link: {
      href: routes.external.projects.Resolute.url,
      label: 're-solute.eu',
    },
    logo: logoResolute,
    github: '',
  },
  {
    name: 'HelioStream',
    description:
      'Real-time video streaming library, optimized for interstellar transmission.',
    link: { href: '#', label: 'github.com' },
    logo: logoHelioStream,
  },
  {
    name: 'cosmOS',
    description:
      'The operating system that powers our Planetaria space shuttles.',
    link: { href: '#', label: 'github.com' },
    logo: logoCosmos,
  },
  {
    name: 'OpenShuttle',
    description:
      'The schematics for the first rocket I designed that successfully made it to orbit.',
    link: { href: '#', label: 'github.com' },
    logo: logoOpenShuttle,
  },
]

export default function Stack() {
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
        intro="I’ve worked on tons of little and bigger projects over the years. Most of them are gone or used as internal tools. This is now my attempt to give future projects a home. If you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved."
      >
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <Card as="li" key={project.name}>
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
                <Card.Link href={project.link.href}>{project.name}</Card.Link>
              </h2>
              <Card.Description>{project.description}</Card.Description>
              <p className="relative z-10 flex mt-6 text-sm font-medium transition text-zinc-400 group-hover:text-teal-500 dark:text-zinc-200">
                <LinkIcon className="flex-none w-6 h-6" />
                <span className="ml-2">{project.link.label}</span>
              </p>
            </Card>
          ))}
        </ul>
      </SimpleLayout>
    </>
  )
}
