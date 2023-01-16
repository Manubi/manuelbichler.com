import { useId } from 'react'

type TProps = {
  title?: string
  children: React.ReactNode
}

export function Stat({ title, children }: TProps) {
  let id = useId()

  return (
    <section
      aria-labelledby={id}
      className="p-6 border rounded-2xl border-zinc-100 dark:border-zinc-700/40"
    >
      <div className="grid items-baseline max-w-3xl grid-cols-1 gap-y-8 md:grid-cols-4">
        <h2
          id={id}
          className="text-sm font-semibold text-zinc-800 dark:text-zinc-100"
        >
          {title}
        </h2>
        <div className="md:col-span-3">{children}</div>
      </div>
    </section>
  )
}
