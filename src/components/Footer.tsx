import Link from 'next/link'

import { InnerContainer, OuterContainer } from '@/components/Container'
import { routes } from '@/utils/routes'
import Spotify from './Spotify'

type TNavLinkProps = {
  href: string
  children: React.ReactNode
}

function NavLink({ href, children }: TNavLinkProps) {
  return (
    <Link
      href={href}
      className="transition hover:text-teal-500 dark:hover:text-teal-400"
    >
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="mt-32">
      <OuterContainer>
        <div className="pb-16">
          <InnerContainer className="pt-10 border-t border-zinc-100 dark:border-zinc-700/40">
            <Spotify />
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="grid grid-cols-3 gap-3 text-sm font-medium text-zinc-800 dark:text-zinc-200 lg:flex lg:gap-6">
                <NavLink href={routes.public.about.path}>
                  {routes.public.about.label}
                </NavLink>
                <NavLink href={routes.public.articles.path}>
                  {routes.public.articles.label}
                </NavLink>
                <NavLink href={routes.public.projects.path}>
                  {routes.public.projects.label}
                </NavLink>
                {/* <NavLink href={routes.public.dashboard.path}>
                  {routes.public.dashboard.label}
                </NavLink>
                <NavLink href={routes.public.flashCards.path}>
                  {routes.public.flashCards.label}
                </NavLink> */}
                <NavLink href={routes.public.uses.path}>
                  {routes.public.uses.label}
                </NavLink>
                <NavLink href={routes.public.guestbook.path}>
                  {routes.public.guestbook.label}
                </NavLink>
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} Manuel. All rights reserved.
              </p>
            </div>
          </InnerContainer>
        </div>
      </OuterContainer>
    </footer>
  )
}
