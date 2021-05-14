// Import the mongoose module
import mongoose from 'mongoose'

const {
  MONGO_URL
} = process.env

const REQUIRED_CONFIG = [
  'MONGO_URL'
]

REQUIRED_CONFIG.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing MONGODB_CONFIG credentials: ${key}`)
  }
})

async function connect () {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

mongoose.connection.on('connected', () => {
  console.log('[Info] Mongo Connection Established')
})

mongoose.connection.on('reconnected', () => {
  console.log('[Info] Mongo Connection Re-established')
})

mongoose.connection.on('disconnected', () => {
  console.log('[Error] Mongo Connection Disconnected')
})

mongoose.connection.on('close', () => {
  console.log('[Info] Mongo Connection Closed')
})

mongoose.connection.on('error', (error) => {
  console.log('[Error] Mongo Connection ERROR: ', error)
  throw error
})

const MONGODB_CONFIG = {
  connect
}
export default MONGODB_CONFIG
