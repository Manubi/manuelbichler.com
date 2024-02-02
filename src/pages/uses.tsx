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
          content="Software I use, gadgets I love, and other tools I recommend."
        />
      </Head>
      <SimpleLayout
        title="My Tools and Workflows"
        intro="I enjoy learning about the tools and workflows used by other engineers. To that end, I've compiled a short list of my personal favorites."
      >
        <div className="space-y-20">
          <ToolsSection title="Workstation">
            <Tool title="16” MacBook Pro, Intel 2,6 Ghz, 32GB RAM (2019)">
              I like it. But will switch soon to the M2 Max.
            </Tool>
            <Tool title="2 x Dell U2415 Monitors">Simple enough.</Tool>
            <Tool title="Kinesis Advantage360 Pro">
              Best keyboard I&apos;ve ever used. Also good for my wrists which
              tend to hurt if I use a traditional keyboard for to long.
            </Tool>
            <Tool title="Logitech MX Vertical">
              Changed to it because of some wrist issues. Wrist is better since.
            </Tool>
            <Tool title="Apple Airpod Pros 2">
              Most of the time it&apos;s easier to get into the zone with some
              music.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Development tools">
            <Tool title="Cursor/Zed">
              I also tried NeoVim, but I still enjoy Cursor more. I use it with
              the Vim plugin. I believe it is the best editor for me. I also
              think with all the AI and cloud computing advancements Cursor will
              adopt quicker. For Rust I tend to use Zed.
            </Tool>
            <Tool title="iTerm">
              Changed back from Wharp as I just prefer the iTerm experience.
            </Tool>
            <Tool title="Github Copilot, ChatGPT other AI tools">
              I like most of them. Makes my day to day easier.
            </Tool>
            <Tool title="Postico">Simple database client for postgres.</Tool>
          </ToolsSection>
          <ToolsSection title="Programming">
            <Tool title="TypeScript">My go to language.</Tool>
            <Tool title="TailwindCSS">
              I am a heavy user of the tailwind ecosystem.
            </Tool>
            <Tool title="Python">
              I started playing around with Python in 2022. Mainly because of
              Data stuff. Use it more nowadays because of the AI stuff.
            </Tool>
            <Tool title="Rust">
              Started looking into Rust. I like it but the developer velocity is
              still quiet low compared to other languages.But, if it needs to be
              fast and safe, Rust it is. If people are not too lazy, I believe
              it will become the next big thing. AI will help a lot with writing
              Rust.
            </Tool>
            <Tool title="&Others">
              Just to give you an impression. I also use/d React, React Native,
              Vue, Express, Fastify, GraphQL, Apollo, Prisma, NodeJS, Docker,
              AWS, GCP, Azure, Vercel, MongoDB, Postgres, Redis, MySQL and a few
              others.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Productivity">
            <Tool title="Raycast">
              Changed from Aflred to Raycast. Not a hundred percent sure yet.
              But it added a lot of smaller tools via plugins which I like.
            </Tool>
            <Tool title="Notes">
              I came full circle (roam, notion, obsidian) now and use it
              basically for everything.
            </Tool>
            <Tool title="SpaceLauncher">
              Simple shortcut app that allows you to mainly open apps.
            </Tool>
            <Tool title="AltTab">
              Alternative too SpaceLauncher which displays all the different
              windows. Does support Vim like navigation.
            </Tool>
            <Tool title="Cleanshot">
              Need it all the time to take awesome screenshots.
            </Tool>
            <Tool title="Stats">macOS system monitor in your menu bar</Tool>
          </ToolsSection>
        </div>
      </SimpleLayout>
    </>
  )
}
