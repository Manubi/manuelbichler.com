import Head from 'next/head'

import { Card } from '@/components/Card'
import { OuraDashboard } from '@/components/dashboard/OuraDashboard'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { WakaTime } from '@/components/dashboard/WakatTime'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Stat } from '@/components/Stat'
import { getOuraDailyActivities } from '@/lib/oura'
import { getWakaStats } from '@/lib/waka'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { ArrowUpIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import { trpc } from '../../utils/trpc'

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

export type Cursor = {
  count: number
  next: string
  previous?: string
}

type TScore = {
  date: string
  score: number
}

export type TOura = {
  activities: TScore[]
  sleep: TScore[]
  readiness: TScore[]
}

type TProps = {
  oura: TOura
  waka: any
}

export default function Dashboard({ oura, waka }: TProps) {
  const stats = trpc.stat.list.useQuery()

  return (
    <>
      <Head>
        <title>Dashboard - Manuel Bichler</title>
        <meta
          name="Manuel's Dashboard"
          content="Keeping Track of My Life: One Hot Mess at a Time"
        />
      </Head>
      <SimpleLayout
        title="Keeping Track of My Life: One Hot Mess at a Time"
        intro="I tried many things. Read to many self-help books. Listened way too long go productivity podcasts. What I for me found out, is keep it stupid fucking simple. That's - in my case - necessary as I am not the smartest cookie. So here we are."
      >
        <div className="prose space-y-20">
          <h2>Why all this?</h2>
          <p>
            I hesitated to make this public as it kind of makes me feel
            uncomfortable. It kinda gives the impression I am a cheap version of{' '}
            <a href="https://www.iflscience.com/millionaire-spends-over-2-million-in-an-attempt-to-make-his-body-young-again-67266">
              &quot;Millionaire Spends Over $2 Million In An Attempt To Make His
              Body Young Again&quot;
            </a>{' '}
            You can find less clickbaity info about the guy{' '}
            <a href="https://blueprint.bryanjohnson.co/">Blueprint</a>.
          </p>{' '}
          But anyway why should I care what you think. I can&rsquo;t change it
          anyway. But what I can do is work on myself. So I decided to publish
          it because I believe there might be people out there who might find
          inspiration to change something in there life. I am 36 by the way.
          <p>
            I am torn, if such a system is good or bad. What I know is, what
            gets measured usually can be improved. And if I look around. Sports.
            Businesses. Politics. All of them are using data to improve. I know
            poltics sucks, and you probably don&apos;t want to become a
            poltician anway, but also influencers are data junkies.
          </p>
          <p>
            So let&apos;s have a look at my system. I am not a huge fan of
            goals, but of systems. So how it basically works, you decide for a
            gaol and then you build the system.
          </p>
          <div className="grid grid-cols-4">
            <div>Sweat</div>
            <div>Learn</div>
            <div>Reflect</div>
            <div>Nos</div>
          </div>
          <pre>{JSON.stringify(stats.data, null, 2)}</pre>
          <StatsCard></StatsCard>
          <Stat>
            <div className="px-4 py-5 sm:p-6">
              <dt className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                Meditation
              </dt>
              <Card.Description>5 times a week</Card.Description>
              <dd className="mt-1 flex flex-row items-baseline justify-between md:block lg:flex">
                <div>
                  <CheckCircleIcon
                    className="h-6 w-6 text-gray-300 "
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <CheckCircleIcon
                    className="h-6 w-6 text-gray-300 "
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <CheckCircleIcon
                    className="h-6 w-6 text-gray-300 "
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <XCircleIcon
                    className="h-6 w-6 text-gray-500"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <XCircleIcon
                    className="h-6 w-6 text-gray-500"
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
          <OuraDashboard oura={oura} />
          <WakaTime waka={waka} />
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

export async function getServerSideProps() {
  const oura = await getOuraDailyActivities()
  const waka = await getWakaStats()

  return { props: { oura, waka } }
}
