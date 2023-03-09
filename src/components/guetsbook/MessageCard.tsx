import AvatarMarble from 'boring-avatars'
import { format } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export function MessageCard({ msg }) {
  console.log('MessageCard', msg)
  return (
    <div className="px-4 py-5 bg-white sm:px-6" key={msg.id}>
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
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900">
            {msg.user.username}
          </p>
          <p className="text-sm text-gray-500">
            {format(msg.createdAt, 'dd.MM.yyyy')}
          </p>
        </div>
      </div>
      <div>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {msg.message}
        </p>
      </div>
    </div>
  )
}
