import { Button } from '@/components/Button'
import { ShowAllHabits } from '@/components/dashboard/ShowAllHabits'
import { Input } from '@/components/Input'

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
            className="p-6 border rounded-2xl border-zinc-100 dark:border-zinc-700/40"
          >
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <BoltIcon className="flex-none w-6 h-6" />
              <span className="ml-3">
                yesterday you said tomorrow - just do it
              </span>
            </h2>
            <div className="flex flex-col gap-6 ">
              <fieldset>
                <Input
                  {...register('date', {
                    required: true,
                  })}
                  type="date"
                />
                <div className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
                  {getEnumValues(Activity)
                    .sort()
                    .map((activity, activityIdx) => (
                      <div
                        key={activityIdx}
                        className="relative flex items-start py-4"
                      >
                        <div className="flex-1 min-w-0 text-sm">
                          <label
                            htmlFor={`${activity}`}
                            className="font-medium select-none text-zinc-600 dark:text-zinc-400"
                          >
                            {activity as string}
                          </label>
                        </div>
                        <div className="flex items-center h-5 ml-3">
                          <Input
                            id={`${activity}`}
                            {...register(`${activity}` as any)}
                            name={`${activity}`}
                            type="checkbox"
                            value={`${activity}`}
                            className="w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-500 "
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
