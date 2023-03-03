import NextError from 'next/error'
import { useRouter } from 'next/router'

import { RouterOutput, trpc } from '../../utils/trpc'

type StatByDateOutput = RouterOutput['habit']['byDate']

function StatItem(props: { stat: StatByDateOutput }) {
  const { stat } = props
  return (
    <>
      {/* <h1>{stat.id}</h1>
      <em>Created {stat.createdAt.toLocaleDateString('en-us')}</em>

      <p>{stat.date}</p> */}

      <h2>Raw data:</h2>
      <pre>{JSON.stringify(stat, null, 4)}</pre>
    </>
  )
}

const StatViewPage = () => {
  const date = useRouter().query.date as string
  const statQuery = date && trpc.habit.byDate.useQuery({ date: new Date(date) })
  if (!statQuery) return
  if (statQuery.error) {
    return (
      <NextError
        title={statQuery.error.message}
        statusCode={statQuery.error.data?.httpStatus ?? 500}
      />
    )
  }

  if (statQuery.status !== 'success') {
    return <>Loading...</>
  }
  const { data } = statQuery
  return <StatItem stat={data} />
}

export default StatViewPage
