import Link from 'next/link'

import { InnerContainer, OuterContainer } from '@/components/Container'
import { routes } from 'utils/routes'
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
        <div className="pt-10 pb-16 border-t border-zinc-100 dark:border-zinc-700/40">
          <InnerContainer>
            <Spotify />
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                <NavLink href={routes.about.path}>{routes.about.label}</NavLink>
                <NavLink href={routes.articles.path}>
                  {routes.articles.label}
                </NavLink>
                <NavLink href={routes.dashboard.path}>
                  {routes.dashboard.label}
                </NavLink>
                <NavLink href={routes.uses.path}>{routes.uses.label}</NavLink>
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} Manuel Bichler. All rights
                reserved.
              </p>
            </div>
          </InnerContainer>
        </div>
      </OuterContainer>
    </footer>
  )
}
