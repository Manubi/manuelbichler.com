import avatarImage from '@/images/avatar.jpg'
import { cn } from '@/utils/cn'
import Image from 'next/image'
import Link from 'next/link'

export type TAvatarProps = {
  className?: string
  large?: boolean
  style?: React.CSSProperties
  children?: React.ReactNode
}

export function MyAvatar({ large = false, className, ...props }: TAvatarProps) {
  return (
    <Link
      href="/"
      aria-label="Home"
      className={cn(className, 'pointer-events-auto')}
      {...props}
    >
      <Image
        src={avatarImage}
        alt=""
        sizes={large ? '4rem' : '2.25rem'}
        className={cn(
          'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
          large ? 'h-16 w-16' : 'h-9 w-9'
        )}
        priority
      />
    </Link>
  )
}
