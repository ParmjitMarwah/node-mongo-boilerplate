'use strict'

const {
  DB_FIELD_ENCRYPTION_KEY,
  DB_FIELD_ENCRYPTION_SALT_KEY
} = process.env

const REQUIRED_CONFIG = [
  'DB_FIELD_ENCRYPTION_KEY',
  'DB_FIELD_ENCRYPTION_SALT_KEY'
]

REQUIRED_CONFIG.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing Jwt credentials: ${key}`)
  }
})

const SECRETS_CONFIG = {
  DB_FIELD_ENCRYPTION_KEY,
  DB_FIELD_ENCRYPTION_SALT_KEY
}

export default SECRETS_CONFIG
