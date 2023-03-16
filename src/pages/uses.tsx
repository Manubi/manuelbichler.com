import Head from 'next/head'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

type TToolsSectionProps = { children: React.ReactNode } & React.ComponentProps<
  typeof Section
>

type TToolProps = {
  title: string
  href?: string
  children: React.ReactNode
}

function ToolsSection({ children, ...props }: TToolsSectionProps) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({ title, href, children }: TToolProps) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export default function Uses() {
  return (
    <>
      <Head>
        <title>Uses - Manuel Bichler</title>
        <meta
          name="description"
          content="Software I use, gadgets I love, and other things I recommend."
        />
      </Head>
      <SimpleLayout
        title="Software I use, gadgets I love, and other things I recommend."
        intro="I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I’m being productive when I’m really just procrastinating. Here’s a big list of all of my favorite stuff."
      >
        <div className="space-y-20">
          <ToolsSection title="Workstation">
            <Tool title="14” MacBook Pro, M2 Max, 2023">
              Just recently switched to a new MacBook Pro M2Max. Have to say
              it's gooood.
            </Tool>
            <Tool title="2 x Dell U2415 Monitors">Simple enough.</Tool>
            <Tool title="Kinesis Advantage360 Pro">
              Best keyboard I&apos;ve ever used. Also good for my wrists which
              tend to hurt if I use a traditional keyboard for to long.
            </Tool>
            <Tool title="Apple Magic Mouse">
              I know, the mouse has some issues, and I wouldn&apos;t buy it
              again.
            </Tool>
            <Tool title="Apple Airpod Pros 2">
              Most of the time it&apos;s easier to get into the zone with some
              music.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Development tools">
            <Tool title="VSCode">
              I also tried NeoVim, but I still enjoy VScode more. I use it with
              the Vim plugin. I believe it is the best editor for me. I also
              think with all the AI and cloud computing advancements VSCode will
              adopt quicker.
            </Tool>
            <Tool title="iTerm2">
              I&apos;ve added some plugins for autocomplete, syntax highlighting
              and a few other things. I also use it with tmux, zsh and Fig. I
              also tried warp but don&apos;t like it.
            </Tool>
            <Tool title="Github Copilot & other AI tools">
              I like most of them. Makes my day to day easier.
            </Tool>
            <Tool title="Postico">Simple database client for postgres.</Tool>
          </ToolsSection>
          <ToolsSection title="Programming Languages">
            <Tool title="Typescript">My go to language.</Tool>
            <Tool title="Python">
              I started playing around with Python in 2022. Mainly because of
              Data stuff. Use it more nowadays because of the AI stuff.
            </Tool>
            <Tool title="Rust">
              Recently started looking into Rust. I like it so far. If people
              are not too lazy, I believe it will become the next big thing. AI
              will help a lot with writing Rust.
            </Tool>
            <Tool title="TailwindCSS">
              Simple tool for blocking distracting websites when I need to just
              do the work and get some momentum going.
            </Tool>
            <Tool title="NextJS">
              Simple tool for blocking distracting websites when I need to just
              do the work and get some momentum going.
            </Tool>
            <Tool title="&Others">
              Just to give you an impression. I also use/d React, React Native,
              Vue, Express, Fastify, GraphQL, Apollo, Prisma, NodeJS, Docker,
              AWS, GCP, Azure, Vercel, MongoDB, Postgres, Redis, MySQL, and a
              few others.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Productivity">
            <Tool title="Raycast">
              Changed from Aflred to Raycast. Not a hundred percent sure yet.
              But it added a lot of smaller tools as plugins which I like.
            </Tool>
            <Tool title="Notes">
              I came full circle (roam, notion) now and use it basically for
              everything.
            </Tool>
            <Tool title="SpaceLauncher">
              Simple shortcut app that allows you to mainly open apps.
            </Tool>
            <Tool title="Cleanshot">
              Need it all the time to take awesome screenshots.
            </Tool>
          </ToolsSection>
        </div>
      </SimpleLayout>
    </>
  )
}
