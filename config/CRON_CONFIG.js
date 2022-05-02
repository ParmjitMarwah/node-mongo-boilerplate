'use strict'

const {
  CRON_TIME_SCHEDULE_REMINDER
} = process.env

const REQUIRED_CONFIG = [
  'CRON_TIME_SCHEDULE_REMINDER'
]

REQUIRED_CONFIG.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing Cron credentials: ${key}`)
  }
})

const CRON_CONFIG = {
  CRON_TIME_SCHEDULE_REMINDER
}

export default CRON_CONFIG
