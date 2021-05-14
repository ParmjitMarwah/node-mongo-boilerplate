'use strict'

const {
  SMS_PROVIDER_CUSTOMER_ID,
  SMS_PROVIDER_API_KEY,
  SMS_PROVIDER_ENDPOINT,
  SEND_SMS_TIMEOUT = 10000
} = process.env

const REQUIRED_CONFIG = [
  // 'SMS_PROVIDER_CUSTOMER_ID',
  'SMS_PROVIDER_API_KEY',
  'SMS_PROVIDER_ENDPOINT'
]

REQUIRED_CONFIG.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing Sms credentials: ${key}`)
  }
})

const SMS_PROVIDER_CONFIG = {
  SMS_PROVIDER_CUSTOMER_ID,
  SMS_PROVIDER_API_KEY,
  SMS_PROVIDER_ENDPOINT,
  SEND_SMS_TIMEOUT
}

export default SMS_PROVIDER_CONFIG
