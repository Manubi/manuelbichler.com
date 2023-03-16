import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { routes } from '@/utils/routes'
import { useClerk, useUser } from '@clerk/nextjs'
import AvatarMarble from 'boring-avatars'
import { LifeBuoy, LogOut, User } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export function ProfileButton() {
  const { isSignedIn, user, isLoaded } = useUser()
  const { signOut, openSignIn } = useClerk()

  return (
    <>
      {isSignedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative w-10 h-10 rounded-full">
              <span className="sr-only">Open user menu</span>
              <Avatar>
                {user?.profileImageUrl.includes('gravatar') ? (
                  <AvatarFallback>
                    <AvatarMarble
                      size={34}
                      name="Maria Mitchell"
                      variant="marble"
                      colors={['#2E9E94', '#2E709E', '#3AC5B9', '#A1A1AA']}
                    />
                  </AvatarFallback>
                ) : (
                  <AvatarImage
                    src={user?.profileImageUrl}
                    alt={user?.username ?? 'username'}
                  />
                )}
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={routes.protected.profile.add.path}>
                <DropdownMenuItem className="cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  <span>{routes.protected.profile.add.label}</span>
                </DropdownMenuItem>
              </Link>
              <a href={`mailto:${routes.contacts.email}`} target="_blank">
                <DropdownMenuItem className="cursor-pointer">
                  <LifeBuoy className="w-4 h-4 mr-2" />
                  <span>Support</span>
                </DropdownMenuItem>
              </a>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut()}
              className="cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <button
            className="relative text-sm font-semibold leading-6 text-zinc-800 hover:text-teal-500 dark:divide-zinc-100/5 dark:text-zinc-300 dark:hover:text-teal-400"
            onClick={() => openSignIn()}
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </button>
        </>
      )}
    </>
  )
}
