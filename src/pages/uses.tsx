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
            <Tool title="16” MacBook Pro, 2,6 GHz 6-Core Intel Core i7, 32GB RAM (2019)">
              As the fans are turning on quiet often I am thinking about
              changing to the next generation of MacBook Pro with the M2 chip.
              They are supposed to be out early 2023.
            </Tool>
            <Tool title="2 x Dell U2415 Monitors">Simple enough.</Tool>
            <Tool title="Kinesis Advantage360 Pro">
              Best keyboard I&apos;ve ever used. Also good for my wrists which
              tend to hurt if I use a traditional keyboard for to long.
            </Tool>
            <Tool title="Apple Magic Mouse">
              I know, the mouse has some slight issues, and I wouldn&apos;t buy
              it again.
            </Tool>
            <Tool title="Apple Airpod Pros 2">
              Most of the time it&apos;s easier to get into the zone with some
              music.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Development tools">
            <Tool title="NeoVim">
              I was a long time VSCode user but I&apos;ve recently switched to
              NeoVim. I believe it is the best editor for me. Mainly because it
              is fast.
            </Tool>
            <Tool title="iTerm2">
              I&apos;ve added some plugins for autocomplete, syntax highlighting
              and a few other things. I also use it with tmux, zsh and Fig. I
              also tried warp but don&apos;t like it.
            </Tool>
            <Tool title="Github Copilot">
              I like it and it will just become bettet and better.
            </Tool>
            <Tool title="Postico">Simple database client for postgres.</Tool>
          </ToolsSection>
          <ToolsSection title="Design">
            <Tool title="Figma">
              Use it to quickly mock up some designs and to collaborate with
              colleagues on designs and prototypes.
            </Tool>
            <Tool title="Tailwind">
              I am a fan of TailwindCSS. This page is build with it and is using
              spotlight theme from TailwindUI.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Programming Languages">
            <Tool title="Typescript">My go to language.</Tool>
            <Tool title="Rust">
              Recently started looking into Rust. I like it so far. If people
              are not too lazy, I believe it will become the next big thing.
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
            <Tool title="Alfred">
              It’s not the newest kid on the block but it’s still the fastest.
            </Tool>
            <Tool title="Notes">
              I came full circle and now use it as basically for everything.
            </Tool>
            <Tool title="SpaceLauncher">
              Simple shortcut app that can do things for you.
            </Tool>
            <Tool title="SavvyCal">
              Great tool for scheduling meetings while protecting my calendar
              and making sure I still have lots of time for deep work during the
              week.
            </Tool>
            <Tool title="Focus">
              Simple tool for blocking distracting websites when I need to just
              do the work and get some momentum going.
            </Tool>
          </ToolsSection>
        </div>
      </SimpleLayout>
    </>
  )
}
