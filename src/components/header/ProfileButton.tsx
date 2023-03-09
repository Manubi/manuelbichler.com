import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useClerk, useUser } from '@clerk/nextjs'
import AvatarMarble from 'boring-avatars'
import { Keyboard, LifeBuoy, LogOut, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export function ProfileButton() {
  const { isSignedIn, user, isLoaded } = useUser()
  const { signOut, openSignIn } = useClerk()

  console.log('user', user?.profileImageUrl)

  return (
    <>
      {isSignedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative h-10 w-10 rounded-full">
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
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer">
                <Keyboard className="mr-2 h-4 w-4" />
                <span>Keyboard shortcuts</span>
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>Support</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut()}
              className="cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
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
