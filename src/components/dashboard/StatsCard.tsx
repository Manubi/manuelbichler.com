import { cn } from '@/utils/cn'

type TCardProps = {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
  dateTime?: string
  href?: string
}

export function StatsCard({
  as: Component = 'div',
  className,
  children,
}: TCardProps) {
  return (
    <Component
      className={cn(className, 'group relative flex flex-col items-start')}
    >
      {children}
    </Component>
  )
}
