import { cn } from '@/utils/cn'

type TProps = {
  children: React.ReactNode
  className?: string
}

export function Prose({ children, className }: TProps) {
  return (
    <div className={cn(className, 'prose dark:prose-invert')}>{children}</div>
  )
}
