import { trpc } from '@/utils/trpc'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useQueryClient } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Button } from '../Button'
import { Input } from '../Input'
import { Notification } from '../Notification'

export function AddCategory({
  setShowAddCategory,
}: {
  setShowAddCategory: (value: boolean) => void
}) {
  const { register, handleSubmit, reset } = useForm()
  const queryClient = useQueryClient()

  const { isLoading, mutate: addCategory } = trpc.category.add.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [['category', 'list']],
      })
      toast.custom((t) => (
        <Notification
          title="All good!"
          subtitle="Category added successfully."
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

  const onSubmit = handleSubmit(({ name }) => {
    addCategory({ name })
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
            <span className="ml-3">Add new category</span>
          </h2>
          <fieldset className="flex flex-col">
            <Input
              {...register('name')}
              type="input"
              required
              placeholder="category name"
              id="name"
            />
          </fieldset>
          <Button type="submit" className="flex-none">
            {isLoading ? 'Adding...' : 'Add category'}
          </Button>
          <Button
            variant="secondary"
            className="flex-none"
            onClick={() => setShowAddCategory(false)}
          >
            Close
          </Button>
        </div>
      </form>
    </div>
  )
}
