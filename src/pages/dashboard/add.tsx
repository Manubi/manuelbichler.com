import { Button } from '@/components/Button'
import { ShowAllHabits } from '@/components/dashboard/ShowAllHabits'

import { SimpleLayout } from '@/components/SimpleLayout'
import { getEnumValues } from '@/utils/getEnumValues'
import { BoltIcon } from '@heroicons/react/24/outline'
import { Activity } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { trpc } from '../../utils/trpc'

export default function AddHabit() {
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const mutation = trpc.habit.add.useMutation()

  const onSubmit = handleSubmit((data: { activity: string[]; date: Date }) => {
    console.log('data', data)
    // const formData = {
    //   activity: selected.value as Activity,
    //   date: new Date(data.date),
    // }
    // mutation.mutate(formData)
  })

  return (
    <SimpleLayout title="Add habits" intro="">
      <div className="space-y-20">
        <ShowAllHabits />
        <div>
          <form
            onSubmit={onSubmit}
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
                <input
                  {...register('date')}
                  type="date"
                  required
                  className="my-4 min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
                />
                <div className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
                  {getEnumValues(Activity).map((activity, activityIdx) => (
                    <div
                      key={activityIdx}
                      className="relative flex items-start py-4"
                    >
                      <div className="flex-1 min-w-0 text-sm">
                        <label
                          htmlFor={`activity-${activity}`}
                          className="font-medium select-none text-zinc-600 dark:text-zinc-400"
                        >
                          {activity as string}
                        </label>
                      </div>
                      <div className="flex items-center h-5 ml-3">
                        <input
                          id={`activity-${activity}`}
                          {...register(`${activity}`)}
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
              {mutation.error && (
                <p>Something went wrong! {mutation.error.message}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </SimpleLayout>
  )
}
