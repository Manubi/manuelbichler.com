import { cn } from '@/utils/cn'
import Link from 'next/link'

type TSocialLinkProps = {
  href: string
  className?: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  children: React.ReactNode
}

export function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: TSocialLinkProps) {
  return (
    <li className={cn(className, 'flex')}>
      <Link
        href={href}
        className="flex text-sm font-medium transition group text-zinc-800 hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="flex-none w-6 h-6 transition fill-zinc-500 group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}
