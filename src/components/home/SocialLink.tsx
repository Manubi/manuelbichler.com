import Link from 'next/link'

export function SocialLink({ icon: Icon, href, ...props }) {
  return (
    <Link className="p-1 -m-1 group" href={href} {...props}>
      <Icon className="w-6 h-6 transition fill-zinc-500 group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}
