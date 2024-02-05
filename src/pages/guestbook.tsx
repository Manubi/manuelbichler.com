import { Button } from '@/components/Button'
import { MessageCard } from '@/components/guetsbook/MessageCard'
import { Input } from '@/components/Input'
import { Notification } from '@/components/Notification'
import { SimpleLayout } from '@/components/SimpleLayout'
import { trpc } from '@/utils/trpc'
import { SignUpButton, useUser } from '@clerk/nextjs'
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline'
import { useQueryClient } from '@tanstack/react-query'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

export default function Guestbook() {
  const queryClient = useQueryClient()
  const { isSignedIn, user } = useUser()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({})
  const messages = trpc.guestbook.list.useQuery()
  const { isLoading, mutate: addGuestbook } = trpc.guestbook.add.useMutation({
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: [['guestbook', 'list']] })
      toast.custom((t) => (
        <Notification
          title="All good!"
          subtitle={`Message added successfully.`}
          type="success"
          t={t}
        />
      ))
    },
    onError(error) {
      toast.custom((t) => (
        <Notification
          title="Ohhh nooo!"
          subtitle={`Error: ${error.message}`}
          type="error"
          t={t}
        />
      ))
    },
  })

  const onSubmit = handleSubmit((data: { message: string }) => {
    const { message } = data
    console.log('User!!!', user)
    const formData = {
      message,
      username: user?.username,
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
              className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
            >
              {' '}
              <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <ChatBubbleLeftEllipsisIcon className="h-6 w-6 flex-none" />
                <span className="ml-3">Leave a message</span>
              </h2>
              <div className="flex gap-3 ">
                <Input
                  {...register('message')}
                  type="text"
                  placeholder="Your message..."
                  required
                />
                <Button type="submit" className="my-4">
                  Send message
                </Button>
              </div>
            </form>
          </>
        )}
        <div className="my-8">
          {messages.data?.messages.map((message) => (
            <MessageCard key={message.id} msg={message} />
          ))}
        </div>
      </SimpleLayout>
    </>
  )
}
