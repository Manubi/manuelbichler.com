import { trpc } from '@/utils/trpc'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

import { useForm } from 'react-hook-form'
import { Button } from '../Button'

export function AddDeck() {
  const { register, handleSubmit, reset } = useForm()

  const mutation = trpc.deck.add.useMutation()
  const { isLoading, isSuccess } = mutation

  const onSubmit = handleSubmit(({ name, description }) => {
    mutation.mutate({ name, description })
    reset()
  })

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="p-6 border rounded-2xl border-zinc-100 dark:border-zinc-700/40"
      >
        <div className="flex flex-col gap-6 ">
          <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            <PlusCircleIcon className="flex-none w-6 h-6" />
            <span className="ml-3">Add new deck</span>
          </h2>
          <fieldset className="flex flex-col">
            <input
              {...register('name')}
              type="input"
              required
              placeholder="deck name"
              id="name"
              className="my-4 min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
            />

            <input
              {...register('description')}
              type="input"
              required
              placeholder="deck description"
              id="description"
              className="my-4 min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
            />
          </fieldset>
          <Button type="submit" className="flex-none">
            {isLoading ? 'Adding...' : 'Add deck'}
          </Button>
          {isSuccess && (
            <p className="text-sm dark:text-zinc-200">
              Deck added successfully!
            </p>
          )}
          {mutation.error && (
            <p className="text-sm dark:text-zinc-200">
              Something went wrong! {mutation.error.message}
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
