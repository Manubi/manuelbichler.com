import { Button } from '@/components/Button'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { BoltIcon } from '@heroicons/react/24/outline'
import type { Activity } from '@prisma/client'
import NextError from 'next/error'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { trpc } from '../../utils/trpc'

const activities = [
  { value: 'ALCOHOL', displayName: 'No Alcohol' },
  { value: 'BEARTIK', displayName: 'No Beard tugging' },
  { value: 'CODE', displayName: 'Coding' },
  { value: 'COLDSHOWER', displayName: 'Cold shower' },
  { value: 'MEDITATION', displayName: 'Meditation' },
  { value: 'READ', displayName: 'Reading' },
  { value: 'SCREENTIME', displayName: 'Screentime' },
  { value: 'SLEEP', displayName: 'Sleep' },
  { value: 'SOCIALMEDIA', displayName: 'Social Media' },
  { value: 'SPORT', displayName: 'Sport' },
  { value: 'SUGAR', displayName: 'No Sugar' },
  { value: 'WRITE', displayName: 'Write' },
]

function Activities({ setSelected, selected }) {
  return (
    <div className="relative">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg border border-zinc-900/10 bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-500 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm">
            <span className="block truncate">{selected.displayName}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:text-zinc-200 sm:text-sm">
              {activities.map((activity, activityIdx) => (
                <Listbox.Option
                  key={activityIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-teal-100 text-teal-900' : 'text-gray-900'
                    }`
                  }
                  value={activity}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {activity.displayName}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

type StatFormData = {
  activity: Activity
  minutes?: string
  date: Date
}

const StatAddPage = () => {
  const [selected, setSelected] = useState(activities[0])
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<StatFormData>()

  const mutation = trpc.stat.add.useMutation()

  const onSubmit = handleSubmit((data) => {
    const formData = {
      activity: selected.value as Activity,
      minutes:
        data.minutes && parseInt(data.minutes) > 0
          ? parseInt(data.minutes)
          : undefined,
      date: new Date(data.date),
    }
    mutation.mutate(formData)
  })

  const statsQuery = trpc.stat.byDate.useQuery({
    date: new Date('2023-01-18T00:00:00.000Z'),
  })

  if (statsQuery.error) {
    return (
      <NextError
        title={statsQuery.error.message}
        statusCode={statsQuery.error.data?.httpStatus ?? 500}
      />
    )
  }
  if (statsQuery.status !== 'success') {
    return <>Loading...</>
  }
  const { data } = statsQuery
  return (
    <SimpleLayout title="Activities" intro="yoyoyo">
      <div className="space-y-20">
        <div>
          <pre className="text-white">{JSON.stringify(data, null, 2)}</pre>
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
          >
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <BoltIcon className="h-6 w-6 flex-none" />
              <span className="ml-3">Add activity</span>
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Some allow Minutes to add as duration
            </p>
            <div className="mt-6 flex flex-col gap-6">
              <Activities selected={selected} setSelected={setSelected} />
              <input
                {...register('minutes')}
                type="number"
                placeholder="minutes"
                aria-label="minutes"
                className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
              />
              <input
                {...register('date')}
                type="date"
                required
                className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
              />
              <Button type="submit" className="flex-none ">
                Add activity
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

export default StatAddPage
