import { Button } from '@/components/Button'
import { MilkdownEditor } from '@/components/Editor'
import { AddDeck } from '@/components/flashCards/AddDeck'
import { ListboxSelect } from '@/components/Listbox'

import { SimpleLayout } from '@/components/SimpleLayout'
import { trpc } from '@/utils/trpc'
import { BoltIcon } from '@heroicons/react/24/outline'
import { MilkdownProvider } from '@milkdown/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function AddFlashcard() {
  const [showAddDeck, setShowAddDeck] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const flashCardMutation = trpc.flashCard.add.useMutation()

  const onSubmit = handleSubmit((data: { activity: string[]; date: Date }) => {
    console.log('data', data)
    // const formData = {
    //   activity: selected.value as Activity,
    //   date: new Date(data.date),
    // }
    // mutation.mutate(formData)
  })

  return (
    <SimpleLayout title="Add flashcard" intro="">
      <div className="space-y-20">
        <AddDeck />
        <div>
          <form
            onSubmit={onSubmit}
            className="p-6 border rounded-2xl border-zinc-100 dark:border-zinc-700/40"
          >
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <BoltIcon className="flex-none w-6 h-6" />
              <span className="ml-3">Add new flash card</span>
            </h2>
            <div className="flex flex-col gap-6 ">
              <fieldset>
                <div className="flex space-x-6">
                  <div className="w-72">
                    <ListboxSelect />
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => setShowAddDeck(!showAddDeck)}
                  >
                    Add new deck
                  </Button>
                </div>
                <input
                  {...register('question')}
                  type="input"
                  required
                  className="my-4 min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
                />{' '}
                <MilkdownProvider>
                  <MilkdownEditor />
                </MilkdownProvider>
                <div className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200"></div>
              </fieldset>
              <Button type="submit" className="flex-none ">
                Add flashcard
              </Button>
              {flashCardMutation.error && (
                <p>Something went wrong! {flashCardMutation.error.message}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </SimpleLayout>
  )
}
