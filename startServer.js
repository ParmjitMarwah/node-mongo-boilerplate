'use strict'

import { SERVER_CONFIG, MONGODB_CONFIG } from './config'
import taskRunner from './api/crons'
const { PORT } = SERVER_CONFIG

const startServer = async (app) => {
  try {
    await MONGODB_CONFIG.connect()
    await app.listen(PORT)
    taskRunner()

    console.log(`[Info] Server Started Successfully! Listening on Port: ${PORT}`)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export default startServer
