import { avoidRateLimit } from './avoidRateLimit'

const API_KEY = process.env.WAKA_API_KEY
const WAKA_LANGUAGES_ENDPOINT = `https://wakatime.com/api/v1/users/manubi/stats/last_7_days`
const WAKA_TIME_ENDPOINT = `https://wakatime.com/api/v1/users/current/all_time_since_today`
// manuel todo add waka endpoint to /api routes to keep it secret
export const getWakaStats = async () => {
  const apiKey = btoa(API_KEY as string)
  await avoidRateLimit()
  const responseLanguages = await fetch(WAKA_LANGUAGES_ENDPOINT, {
    headers: {
      Authorization: `Basic ${apiKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  // manueltodo add waka to /api routes to keep it secret
  await avoidRateLimit()
  const responseTimeSpend = await fetch(WAKA_TIME_ENDPOINT, {
    headers: {
      Authorization: `Basic ${apiKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  const languages = await responseLanguages.json()
  const timeSpend = await responseTimeSpend.json()

  const response = { languages, timeSpend }

  return response
}
