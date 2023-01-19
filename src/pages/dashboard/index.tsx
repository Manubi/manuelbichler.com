import Head from 'next/head'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Stat } from '@/components/Stat'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { ArrowUpIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import { trpc } from '../utils/trpc'

function SpeakingSection({ children, ...props }) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

function Appearance({ title, description, event, cta, href }) {
  return (
    <Card as="article">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Eyebrow decorate>{event}</Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  )
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  const stats = trpc.stat.list.useQuery()

  return (
    <>
      <Head>
        <title>Dashboard - Manuel Bichler</title>
        <meta
          name="description"
          content="I’ve spoken at events all around the world and been interviewed for many podcasts."
        />
      </Head>
      <SimpleLayout
        title="I’ve spoken at events all around the world and been interviewed for many podcasts."
        intro="One of my favorite ways to share my ideas is live on stage, where there’s so much more communication bandwidth than there is in writing, and I love podcast interviews because they give me the opportunity to answer questions instead of just present my opinions."
      >
        <div className="space-y-20">
          <pre>{JSON.stringify(stats.data, null, 2)}</pre>
          <Stat>
            <div className="px-4 py-5 sm:p-6">
              <dt className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                Meditation
              </dt>
              <Card.Description>5 times a week</Card.Description>
              <dd className="flex flex-row items-baseline justify-between mt-1 md:block lg:flex">
                <div>
                  <CheckCircleIcon
                    className="w-6 h-6 text-green-500 "
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <CheckCircleIcon
                    className="w-6 h-6 text-green-500 "
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <CheckCircleIcon
                    className="w-6 h-6 text-green-500"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <XCircleIcon
                    className="w-6 h-6 text-gray-500"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <XCircleIcon
                    className="w-6 h-6 text-gray-500"
                    aria-hidden="true"
                  />
                </div>
                <div
                  className={classNames(
                    // item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                    'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0'
                  )}
                >
                  {/* {item.changeType === 'increase' ? (
                  <Arrow
                    className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                    aria-hidden="true"
                  /> */}
                  <ArrowUpIcon
                    className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                    aria-hidden="true"
                  />
                  {/* <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span> */}
                  <span className="sr-only"> Increased by </span>
                  12
                </div>
              </dd>
            </div>
          </Stat>
          <SpeakingSection title="Conferences">
            <Appearance
              href="#"
              title="In space, no one can watch you stream — until now"
              description="A technical deep-dive into HelioStream, the real-time streaming library I wrote for transmitting live video back to Earth."
              event="SysConf 2021"
              cta="Watch video"
            />
            <Appearance
              href="#"
              title="Lessons learned from our first product recall"
              description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
              event="Business of Startups 2020"
              cta="Watch video"
            />
          </SpeakingSection>
          <SpeakingSection title="Podcasts">
            <Appearance
              href="#"
              title="Using design as a competitive advantage"
              description="How we used world-class visual design to attract a great team, win over customers, and get more press for Planetaria."
              event="Encoding Design, July 2022"
              cta="Listen to podcast"
            />
            <Appearance
              href="#"
              title="Bootstrapping an aerospace company to $17M ARR"
              description="The story of how we built one of the most promising space startups in the world without taking any capital from investors."
              event="The Escape Velocity Show, March 2022"
              cta="Listen to podcast"
            />
            <Appearance
              href="#"
              title="Programming your company operating system"
              description="On the importance of creating systems and processes for running your business so that everyone on the team knows how to make the right decision no matter the situation."
              event="How They Work Radio, September 2021"
              cta="Listen to podcast"
            />
          </SpeakingSection>
        </div>
      </SimpleLayout>
    </>
  )
}