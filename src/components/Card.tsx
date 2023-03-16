import { cn } from '@/utils/cn'
import NextLink from 'next/link'

type TCardProps = {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
  dateTime?: string
  href?: string
}

type TLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
}

function ChevronRightIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CardRoot({ as: Component = 'div', className, children }: TCardProps) {
  return (
    <Component
      className={cn(className, 'group relative flex flex-col items-start')}
    >
      {children}
    </Component>
  )
}

function Link({ children, ...props }: TLinkProps) {
  return (
    <>
      <div className="absolute z-0 transition scale-95 opacity-0 -inset-y-6 -inset-x-4 bg-zinc-50 group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />{' '}
      <NextLink {...props}>
        <span className="absolute z-20 -inset-y-6 -inset-x-4 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </NextLink>
    </>
  )
}

function Title({
  as: Component = 'h2',
  href,
  children,
}: TCardProps & { href?: string }) {
  return (
    <Component className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
      {href ? <Link href={href}>{children}</Link> : children}
    </Component>
  )
}

function Description({ children }) {
  return (
    <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
      {children}
    </p>
  )
}

function Cta({ children }) {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 flex items-center mt-4 text-sm font-medium text-teal-500"
    >
      {children}
      <ChevronRightIcon className="w-4 h-4 ml-1 stroke-current" />
    </div>
  )
}

function Eyebrow({
  as: Component = 'p',
  decorate = false,
  className,
  children,
  ...props
}: TCardProps & { decorate?: boolean }) {
  return (
    <Component
      className={cn(
        className,
        'relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500',
        decorate && 'pl-3.5'
      )}
      {...props}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
      )}
      {children}
    </Component>
  )
}
export let Card = Object.assign(CardRoot, {
  Eyebrow,
  Cta,
  Description,
  Title,
  Link,
})
