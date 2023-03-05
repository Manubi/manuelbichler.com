import { classNames } from '@/utils/classNames'
import { trpc } from '@/utils/trpc'
import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import NextError from 'next/error'
import { toast } from 'react-hot-toast'
import { Button } from '../Button'
import { Spinner } from '../Spinner'

export function ShowAllHabits() {
  const queryClient = useQueryClient()
  const habitsQuery = trpc.habit.list.useQuery()

  const { isLoading, mutate: deleteHabitByDate } =
    trpc.habit.deleteByDate.useMutation({
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: [['habit', 'list']] })
        toast.success(
          `Deleted habits with date ${format(
            new Date(data.date),
            'dd.MM.yyyy'
          )} successfully.`,
          {
            position: 'top-right',
          }
        )
      },
      onError(error) {
        toast.error(`Error: ${error.message}`)
      },
    })

  if (habitsQuery.error) {
    return (
      <NextError
        title={habitsQuery.error.message}
        statusCode={habitsQuery.error.data?.httpStatus ?? 500}
      />
    )
  }

  if (habitsQuery.status !== 'success') {
    return (
      <div className="w-full">
        <Spinner size="md" className="mx-auto" />
      </div>
    )
  }

  function organiseHabitsByDate(habits: any) {
    const output = [] as any
    for (const entry of habits) {
      const date = entry.date
      output.push({ date, activity: entry.activity })
    }

    const groupedByDate = output.reduce((acc, entry) => {
      const date = entry.date
      if (!acc[date]) {
        acc[date] = [entry.activity]
      } else {
        acc[date].push(entry.activity)
      }
      return acc
    }, {})

    const result = [] as any
    for (const date in groupedByDate) {
      result.push({ date: date, activity: groupedByDate[date] })
    }
    return result.sort(
      (a, b) => (new Date(a.date) as any) + (new Date(b.date) as any)
    )
  }

  function deleteByDate(date: string) {
    const dateDate = new Date(date)
    deleteHabitByDate({ date: dateDate })
  }

  const { data } = habitsQuery
  return (
    <div className="-mx-6 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-zinc-800 dark:text-zinc-200"
            >
              Date
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-zinc-800 dark:text-zinc-200 lg:table-cell"
            >
              Habits
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-6">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {organiseHabitsByDate(data.habits).map((habit, habitIdx) => (
            <tr key={habit.date}>
              <td
                className={classNames(
                  habitIdx === 0 ? '' : 'border-t border-transparent',
                  'relative py-4 pl-6 pr-3 text-sm'
                )}
              >
                <div className="font-medium text-zinc-800 dark:text-zinc-200">
                  {new Date(habit.date).toLocaleDateString('de-DE')}
                </div>
                {habitIdx !== 0 ? (
                  <div className="absolute right-0 left-6 -top-px h-px bg-zinc-200" />
                ) : null}
              </td>
              <td
                className={classNames(
                  habitIdx === 0 ? '' : ' border-t border-gray-200',
                  'hidden px-3 py-3.5 text-sm text-zinc-700 dark:text-zinc-400 lg:table-cell '
                )}
              >
                <div className="flex">
                  {habit.activity.sort().map((act: string, actIdx: number) => (
                    <p key={`${act}-${actIdx}`} className="mr-2">
                      {act}
                    </p>
                  ))}
                </div>
              </td>

              <td
                className={classNames(
                  habitIdx === 0 ? '' : 'border-t border-transparent',
                  'relative py-3.5 pl-3 pr-6 text-right text-sm font-medium'
                )}
              >
                <Button onClick={() => deleteByDate(habit.date)}>Delete</Button>
                {habitIdx !== 0 ? (
                  <div className="absolute left-0 right-6 -top-px h-px bg-zinc-200" />
                ) : null}
                {/* todo manuel add edit button */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
