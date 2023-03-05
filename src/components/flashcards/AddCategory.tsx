import { trpc } from '@/utils/trpc'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useQueryClient } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Button } from '../Button'

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
      toast.success('Category added successfully.', {
        position: 'top-right',
      })
    },
    onError(error) {
      toast.error(`Error: ${error.message}`)
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
        className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
      >
        <div className="flex flex-col gap-6 ">
          <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            <PlusCircleIcon className="h-6 w-6 flex-none" />
            <span className="ml-3">Add new category</span>
          </h2>
          <fieldset className="flex flex-col">
            <input
              {...register('name')}
              type="input"
              required
              placeholder="category name"
              id="name"
              className="my-4 min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
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
