import { classNames } from '@/utils/classNames'
import { trpc } from '@/utils/trpc'
import NextError from 'next/error'

export function ShowAllHabits() {
  const habitsQuery = trpc.habit.list.useQuery()

  if (habitsQuery.error) {
    return (
      <NextError
        title={habitsQuery.error.message}
        statusCode={habitsQuery.error.data?.httpStatus ?? 500}
      />
    )
  }
  if (habitsQuery.status !== 'success') {
    return <>Loading...</>
  }
  function organiseHabitsByDate(habits: any) {
    const output = [] as any
    console.log(habits)
    for (const entry of habits) {
      const date = entry.date
      output.push({ date, activity: entry.activity })
    }
    console.log('output', output)

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

  const { data } = habitsQuery
  console.log('habits', data && organiseHabitsByDate(data.habits))
  return (
    <div className="-mx-6 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900"
            >
              Date
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
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
            <tr key={habit.id}>
              <td
                className={classNames(
                  habitIdx === 0 ? '' : 'border-t border-transparent',
                  'relative py-4 pl-6 pr-3 text-sm'
                )}
              >
                <div className="font-medium text-gray-900">
                  {new Date(habit.date).toLocaleDateString('de-DE')}
                </div>
                {habitIdx !== 0 ? (
                  <div className="absolute right-0 left-6 -top-px h-px bg-gray-200" />
                ) : null}
              </td>
              <td
                className={classNames(
                  habitIdx === 0 ? '' : ' border-t border-gray-200',
                  'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                )}
              >
                <div className="flex">
                  {habit.activity.map((act: any) => (
                    <p key={act} className="mr-2">
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
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Edit
                </button>
                {habitIdx !== 0 ? (
                  <div className="absolute left-0 right-6 -top-px h-px bg-gray-200" />
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
