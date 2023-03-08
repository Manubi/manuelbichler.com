import { Button } from '@/components/Button'
import { SimpleLayout } from '@/components/SimpleLayout'
import { trpc } from '@/utils/trpc'
import { SignUpButton, useUser } from '@clerk/nextjs'
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

export default function Guestbook() {
  const { isLoaded, isSignedIn, user } = useUser()
  console.log('user', user)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({})
  const messages = trpc.guestbook.list.useQuery()
  const { isLoading, mutate: addGuestbook } = trpc.guestbook.add.useMutation({
    onSuccess(data) {
      toast.success('Message successfully added.', {
        position: 'top-right',
      })
    },
    onError(error) {
      toast.error(error.message, {
        position: 'top-right',
      })
    },
  })

  const onSubmit = handleSubmit((data: { message: string }) => {
    const { message } = data
    const formData = {
      message,
      email: 'seas@seas.at',
      name: 'manuel bichler',
    }
    addGuestbook(formData)
    reset()
  })

  return (
    <>
      <Head>
        <title>Guestbook - Manuel Bichler</title>
        <meta name="description" content="Say hi. I'd love to hear from you." />
      </Head>
      <SimpleLayout
        title="Guestbook"
        intro="Say hi! I'd love to hear from you."
      >
        {!isSignedIn ? (
          <SignUpButton mode="modal">
            <Button className="px-6">Sign up to leave a message</Button>
          </SignUpButton>
        ) : (
          <>
            <form
              onSubmit={onSubmit}
              className="p-6 border rounded-2xl border-zinc-100 dark:border-zinc-700/40"
            >
              {' '}
              <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <ChatBubbleLeftEllipsisIcon className="flex-none w-6 h-6" />
                <span className="ml-3">Leave a message</span>
              </h2>
              <div className="flex gap-3 ">
                <input
                  {...register('message')}
                  type="text"
                  placeholder="Your message..."
                  required
                  className="my-4  min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
                />
                <Button type="submit" className="my-4">
                  Send message
                </Button>
              </div>
            </form>
          </>
        )}
        <div>Messages</div>
        {messages.data?.messages.map((message) => (
          <div key={message.id}>
            {message.user.username} - {message.message} -{' '}
            {format(message.createdAt, 'dd.MM.yyyy')}
          </div>
        ))}
      </SimpleLayout>
    </>
  )
}
