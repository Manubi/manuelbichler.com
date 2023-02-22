import { format } from 'date-fns'

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { Card } from '../Card'

ChartJS.register(ArcElement, Tooltip, Legend)

export function WakaTime({ waka }: any) {
  const labels = waka.languages.data.languages.map((lang: any) => lang.name)
  const dataPercent = waka.languages.data.languages.map(
    (lang: any) => lang.percent
  )

  const data = {
    labels,
    datasets: [
      {
        label: 'Language activity last 7 days',
        data: dataPercent,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(129, 242, 1, 0.2)',
          'rgba(255, 0, 204, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(129, 242, 1, 1)',
          'rgba(255, 0, 204,1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'Languages used last 7 days',
      },
    },
  }

  return (
    <Card as="li">
      <Card.Title as="h3">WakaTime</Card.Title>
      <Card.Description>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          To track my time spend coding I use{' '}
          <span>
            <a href="https://wakatime.com" target="_blank" rel="noreferrer">
              WakaTime
            </a>
          </span>
          . Since{' '}
          {format(new Date(waka.timeSpend.data.range.start_date), 'MMMM yyyy')}{' '}
          I&apos;ve spend ~{waka.timeSpend.data.text} in my favorite code editor
          VSCode. However, I do not think it&apos;s a good indicator as it says
          nothing about your productivity. During the last 7 days I&apos;ve used
          the following languages:
        </p>
        <div className="max-w-lg mx-auto my-8">
          <Doughnut data={data} options={options} />
        </div>
      </Card.Description>
    </Card>
  )
}
