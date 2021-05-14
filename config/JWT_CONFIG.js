'use strict'

const {
  JWT_SECRET,
  JWT_EXPIRES_IN
} = process.env

const REQUIRED_CONFIG = [
  'JWT_SECRET',
  'JWT_EXPIRES_IN'
]

REQUIRED_CONFIG.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing Jwt credentials: ${key}`)
  }
})

const JWT_CONFIG = {
  JWT_SECRET,
  JWT_EXPIRES_IN
}

export default JWT_CONFIG
