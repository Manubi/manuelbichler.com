import { trpc } from '@/utils/trpc'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useQueryClient } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Button } from '../Button'
import { Input } from '../Input'

export function AddDeck({
  setShowAddDeck,
}: {
  setShowAddDeck: (value: boolean) => void
}) {
  const { register, handleSubmit, reset } = useForm()
  const queryClient = useQueryClient()

  const { isLoading, mutate: addDeck } = trpc.deck.add.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [['deck', 'list']] })
      toast.success('Deck added successfully.', {
        position: 'top-right',
      })
    },
    onError(error) {
      toast.error(`Error: ${error.message}`)
    },
  })

  const onSubmit = handleSubmit(({ name, description }) => {
    addDeck({ name, description })
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
            <Input
              {...register('name')}
              type="input"
              required
              placeholder="deck name"
              id="name"
            />

            <Input
              {...register('description')}
              type="input"
              required
              placeholder="deck description"
              id="description"
            />
          </fieldset>
          <Button type="submit" className="flex-none">
            {isLoading ? 'Adding...' : 'Add deck'}
          </Button>
          <Button
            variant="secondary"
            className="flex-none"
            onClick={() => setShowAddDeck(false)}
          >
            Close
          </Button>
        </div>
      </form>
    </div>
  )
}
