import { cn } from '@/utils/cn'
import { TAvatarProps } from './MyAvatar'

export function AvatarContainer({ className, ...props }: TAvatarProps) {
  return (
    <div
      className={cn(
        className,
        'h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10'
      )}
      {...props}
    />
  )
}
