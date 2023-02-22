import { avoidRateLimit } from './avoidRateLimit';

const access_token = process.env.OURA_PERSONAL_ACCESS_TOKEN;

export const getOuraDailyActivities = async () => {
  let today = new Date();
  today.setDate(today.getDate() - 1);
  let oneWeekBack = new Date();
  oneWeekBack.setDate(oneWeekBack.getDate() - 7);

  const endDate = today.toISOString().split('T')[0];
  const startDate = oneWeekBack.toISOString().split('T')[0];

  const DAILY_ACTIVITY_ENDPOINT = `https://api.ouraring.com/v1/activity?start?start=${startDate}&end=${endDate}`;
  const DAILY_READINESS_ENDPOINT = `https://api.ouraring.com/v1/readiness?start=${startDate}&end=${endDate}`;
  const DAILY_SLEEP_ENDPOINT = `https://api.ouraring.com/v1/sleep?start=${startDate}&end=${endDate}`;

  // get activity scores for one week
  const responeActivityOneWeek = await fetch(DAILY_ACTIVITY_ENDPOINT, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const activityOneWeek = await responeActivityOneWeek.json();
  console.log('activityOneWeek', activityOneWeek);
  const filterDailyActivityScores = activityOneWeek.activity.map((day: any) => {
    return {
      date: day.summary_date,
      score: day.score,
    };
  });
  await avoidRateLimit();
  //get readiness scores for one week
  const responeReadinessOneWeek = await fetch(DAILY_READINESS_ENDPOINT, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  await avoidRateLimit();
  const readinessOneWeek = await responeReadinessOneWeek.json();
  const filterDailyReadinessScores = readinessOneWeek.readiness.map(
    (day: any) => {
      return {
        date: day.summary_date,
        score: day.score,
      };
    },
  );
  await avoidRateLimit();
  // get sleep scores for one week
  const responeSleepOneWeek = await fetch(DAILY_SLEEP_ENDPOINT, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  await avoidRateLimit();
  const sleepOneWeek = await responeSleepOneWeek.json();
  const filterSleepReadinessScores = sleepOneWeek.sleep.map((day: any) => {
    return {
      date: day.summary_date,
      score: day.score,
    };
  });

  return {
    activities: filterDailyActivityScores,
    readiness: filterDailyReadinessScores,
    sleep: filterSleepReadinessScores,
  };
};
