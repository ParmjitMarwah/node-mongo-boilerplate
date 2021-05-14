import { CronJob } from 'cron'
import { CRON_CONFIG } from './../../config'
function pushSchedules () {
  console.log('TASK ==> PUSH MESSAGES INITIATED')
  const { CRON_TIME_SCHEDULE_REMINDER } = CRON_CONFIG
  console.log('TASK ==> PUSH MESSAGES TIME', CRON_TIME_SCHEDULE_REMINDER)

  const cronOptions = {
    cronTime: CRON_TIME_SCHEDULE_REMINDER,
    onTick,
    onComplete,
    start: true,
    timeZone: 'Asia/Kolkata',
    context: true,
    runOnInit: false
  }
  return new CronJob(cronOptions)
}

async function onTick () {
  try {
    const response = null
    console.log('=============================================================')
    console.log('  [Task - Push Messages] After Scheduled Messages job ending response')
    console.log(response)
    console.log('=============================================================')

    return response
  } catch (error) {
    console.log('  [Task - Push Messages] Error while running the Scheduled Messages job running')
    console.log(error)
    return true
  }
}

async function onComplete () {
  console.log('[Task - Push Messages] After Scheduled Messages job completed')
}

export default pushSchedules
