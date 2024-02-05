import AvatarMarble from 'boring-avatars'
import { format } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export function MessageCard({ msg }) {
  return (
    <div
      className="px-4 py-5 hover:bg-zinc-50 hover:opacity-100 dark:hover:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl sm:px-6"
      key={msg.id}
    >
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <Avatar>
            {!msg.user?.profileImageUrl ? (
              <AvatarFallback>
                <AvatarMarble
                  size={32}
                  name={msg.user?.username ?? 'username'}
                  variant="marble"
                  colors={['#2E9E94', '#2E709E', '#3AC5B9', '#A1A1AA']}
                />
              </AvatarFallback>
            ) : (
              <AvatarImage
                src={msg.user?.profileImageUrl}
                alt={msg.user?.username ?? 'username'}
              />
            )}
          </Avatar>
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
            {msg.user.username}
          </h2>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            {format(msg.createdAt, 'dd.MM.yyyy')}
          </p>
        </div>
      </div>
      <div>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          {msg.message}
        </p>
      </div>
    </div>
  )
}
