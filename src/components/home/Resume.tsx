import { Button } from '@/components/Button'
import { ArrowDownIcon } from '@/components/icons/ArrowDownIcon'
import { BriefcaseIcon } from '@/components/icons/BriefcaseIcon'
import logoAAA from '@/images/logos/aaa.png'
import logoCemm from '@/images/logos/cemm.png'
import logoWhooop from '@/images/logos/whooop.png'
import logoXBionic from '@/images/logos/xbionic.png'
import { routes } from '@/utils/routes'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

type TResume = {
  company: string
  title: string
  url?: string
  logo: StaticImageData
  start: string
  end: string
}

export function Resume() {
  let resume: TResume[] = [
    {
      company: routes.external.work.CeMM.label,
      title: 'Software Engineer',
      url: routes.external.work.CeMM.url,
      logo: logoCemm,
      start: '2020',
      end: 'Present',
    },
    {
      company: routes.external.work.AllAboutApps.label,
      title: 'Junior Fullstack Developer',
      url: routes.external.work.AllAboutApps.url,
      logo: logoAAA,
      start: '2019',
      end: '2019',
    },
    {
      company: 'whooop',
      title: 'Co-founder',
      logo: logoWhooop,
      start: '2016',
      end: '2018',
    },
    {
      company: routes.external.work.Xbionic.label,
      title: 'Marketing & PR',
      url: routes.external.work.Xbionic.url,
      logo: logoXBionic,
      start: '2014',
      end: '2015',
    },
  ]

  return (
    <div className="p-6 border rounded-2xl border-zinc-100 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="flex-none w-6 h-6" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative flex items-center justify-center flex-none w-10 h-10 mt-1 rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={role.logo}
                alt=""
                className="rounded-full h-7 w-7"
                unoptimized
              />
            </div>
            <dl className="flex flex-wrap flex-auto gap-x-2">
              <dt className="sr-only">Company</dt>
              {role.url ? (
                <Link href={role.url} className="flex-none w-full ">
                  <dd className="text-sm font-medium text-zinc-900 hover:text-teal-500 dark:text-zinc-100 dark:hover:text-teal-400">
                    {role.company}
                  </dd>
                </Link>
              ) : (
                <dd className="flex-none w-full text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {role.company}
                </dd>
              )}
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                aria-label={`${role.start} until ${role.end}`}
              >
                <time dateTime={role.start}>{role.start}</time>{' '}
                <span aria-hidden="true">—</span>{' '}
                <time dateTime={role.end}>{role.end}</time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      <Button
        href={routes.contacts.CV}
        variant="secondary"
        className="w-full mt-6 group"
      >
        Download CV
        <ArrowDownIcon className="w-4 h-4 transition stroke-zinc-400 group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}
