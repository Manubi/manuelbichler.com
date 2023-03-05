import { Button } from '@/components/Button'
import { ShowAllHabits } from '@/components/dashboard/ShowAllHabits'

import { SimpleLayout } from '@/components/SimpleLayout'
import { getEnumValues } from '@/utils/getEnumValues'
import { BoltIcon } from '@heroicons/react/24/outline'
import { Activity } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { trpc } from '../../utils/trpc'

type FormValuesActivity = {
  [key in Activity]: string
}

type FormValues = { date: string } & FormValuesActivity

export default function AddHabit() {
  const queryClient = useQueryClient()

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { date: format(new Date(), 'yyyy-MM-dd') } })

  const { isLoading, mutate: addHabit } = trpc.habit.add.useMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [['habit', 'list']] })
      toast.success(`Habit ${data.activity} added successfully.`, {
        position: 'top-right',
      })
      reset()
    },
    onError(error) {
      toast.error(`Error: ${error.message}`)
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const activities = Object.entries(data)
      .filter(([key, value]) => key !== 'date' && !!value)
      .map(([key, value]) => value)
      .sort()
    const date = new Date(data.date)
    activities.map((activity) => {
      const formData = {
        activity: activity,
        date,
      }
      addHabit(formData as any)
    })
  }

  return (
    <SimpleLayout title="Add habits" intro="">
      <div className="space-y-20">
        <ShowAllHabits />
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
          >
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <BoltIcon className="h-6 w-6 flex-none" />
              <span className="ml-3">
                yesterday you said tomorrow - just do it
              </span>
            </h2>
            <div className="flex flex-col gap-6 ">
              <fieldset>
                <input
                  {...register('date', {
                    required: true,
                  })}
                  type="date"
                  className="my-4 min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
                />
                <div className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
                  {getEnumValues(Activity)
                    .sort()
                    .map((activity, activityIdx) => (
                      <div
                        key={activityIdx}
                        className="relative flex items-start py-4"
                      >
                        <div className="min-w-0 flex-1 text-sm">
                          <label
                            htmlFor={`${activity}`}
                            className="select-none font-medium text-zinc-600 dark:text-zinc-400"
                          >
                            {activity as string}
                          </label>
                        </div>
                        <div className="ml-3 flex h-5 items-center">
                          <input
                            id={`${activity}`}
                            {...register(`${activity}` as any)}
                            name={`${activity}`}
                            type="checkbox"
                            value={`${activity}`}
                            className="h-4 w-4 rounded border-gray-300 text-teal-500 focus:ring-teal-500 "
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </fieldset>
              <Button type="submit" className="flex-none ">
                Add habit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </SimpleLayout>
  )
}
