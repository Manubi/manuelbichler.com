import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { format } from 'date-fns'
import { Line } from 'react-chartjs-2'
import type { TOura } from '../../pages/dashboard'
import { Card } from '../Card'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export function OuraDashboard({ oura }: { oura: TOura }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Oura Daily Scores',
      },
    },
  }

  // manuel todo fix problem with missing date in api call

  function getScore(
    scoreObj: { date: string; score: number }[],
    labels: string[]
  ) {
    return scoreObj.map((obj) => obj.score)
  }

  // get the labels from the last 8 days
  const labels8 = [...Array(8)]
    .map((_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - i)
      return format(new Date(d), 'dd MMMM')
    })
    .reverse()

  const labels = labels8.slice(0, labels8.length - 1)
  const data = {
    labels,
    datasets: [
      {
        label: 'Readiness',
        data: getScore(oura.readiness, labels),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Sleep',
        data: getScore(oura.sleep, labels),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Activity',
        data: getScore(oura.activities, labels),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
      },
    ],
  }

  return (
    <Card as="li">
      <Card.Title as="h3">Oura</Card.Title>
      <Card.Description>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          I use an apple watch and an{' '}
          <span>
            <a href="https://ouraring.com" target="_blank" rel="noreferrer">
              Oura
            </a>
          </span>{' '}
          ring as a sleep and activity tracker. The maximum you can reach is 100
          every day. Above score 85 is considered optimal.
        </p>
        <div className="my-8">
          <Line options={options} data={data} />
        </div>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          One of the most surprising things I&apos;ve found out is, how much my
          sleep is affected by warm weather and just a little alcohol (surprise,
          surprise).
        </p>
      </Card.Description>
    </Card>
  )
}
