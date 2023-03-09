import Link from 'next/link'
import { useRouter } from 'next/router'

import { cn } from '@/utils/cn'
import { routes } from '@/utils/routes'

function NavItem({ href, children }) {
  let isActive = useRouter().pathname === href

  return (
    <li>
      <Link
        href={href}
        className={cn(
          'relative block px-3 py-2 transition',
          isActive
            ? 'text-teal-500 dark:text-teal-400'
            : 'hover:text-teal-500 dark:hover:text-teal-400'
        )}
      >
        {children}
        {isActive && (
          <span className="absolute h-px inset-x-1 -bottom-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0" />
        )}
      </Link>
    </li>
  )
}

export function DesktopNavigation(props) {
  return (
    <nav {...props}>
      <ul className="flex px-3 text-sm font-medium rounded-full shadow-lg bg-white/90 text-zinc-800 shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        <NavItem href={routes.public.about.path}>
          {routes.public.about.label}
        </NavItem>
        <NavItem href={routes.public.articles.path}>
          {routes.public.articles.label}
        </NavItem>
        <NavItem href={routes.public.projects.path}>
          {routes.public.projects.label}
        </NavItem>
        <NavItem href={routes.public.dashboard.path}>
          {routes.public.dashboard.label}
        </NavItem>
        <NavItem href={routes.public.flashCards.path}>
          {routes.public.flashCards.label}
        </NavItem>
        <NavItem href={routes.public.uses.path}>
          {routes.public.uses.label}
        </NavItem>
        <NavItem href={routes.public.guestbook.path}>
          {routes.public.guestbook.label}
        </NavItem>
      </ul>
    </nav>
  )
}
