import clsx from 'clsx'

type TProps = {
  children: React.ReactNode
  className?: string
}

export function Prose({ children, className }: TProps) {
  return (
    <div className={clsx(className, 'prose dark:prose-invert')}>{children}</div>
  )
}
