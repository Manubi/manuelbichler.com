import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { Card } from '@/components/Card'

import { LinkIcon } from '@/components/icons/LinkIcon'
import { SimpleLayout } from '@/components/SimpleLayout'
import logoLabio from '@/images/logos/labio.png'
import logoResolute from '@/images/logos/resolute.png'
import { routes } from '@/utils/routes'
import { Github } from 'lucide-react'

const projectDetails = [
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
    github: { href: null, label: 'github.com' },
  },
]

export default function Projects() {
  function getGithubLink(github) {
    if (!github.href) return null
    return (
      <a href={github.href} target="_blank" rel="noreferrer">
        <p className="relative z-10 flex text-sm font-medium transition cursor-pointer group/link text-zinc-400 hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500">
          <Github className="flex-none w-6 h-4 mt-1 text-zinc-400 group-hover/link:text-teal-500 dark:text-zinc-200" />
          <span className="ml-2">{github.label}</span>
        </p>
      </a>
    )
  }

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
        intro="Over the years, I have worked on numerous projects, ranging from small to large in scale. Although most of them have either been discontinued or are utilized as internal tools, I am now striving to provide a permanent space for future projects. If you come across something that sparks your curiosity, feel free to explore it or examine the code, and if you have any suggestions on how it can be enhanced, don't hesitate to contribute."
      >
        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projectDetails.map((project) => (
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
              <Link href={project.link.href} target="_blank" className="mt-6">
                <p className="relative z-10 flex text-sm font-medium transition cursor-pointer text-zinc-400 hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500">
                  <LinkIcon className="flex-none w-6 h-6" />
                  <span className="ml-2">{project.link.label}</span>
                </p>
              </Link>
              {project?.github?.href && getGithubLink(project.github)}
            </Card>
          ))}
        </ul>
      </SimpleLayout>
    </>
  )
}
