'use strict'

import { ResponseBody, ResHandler } from '../helpers'
import HealthRouter from './Health'
import VersionRouter from './Version'
import UserRouter from './User'
import OtpRouter from './Otp'
import ContactRouter from './Contact'
import GroupRouter from './Group'
import ReminderRouter from './Reminder'
import httpContext from 'express-http-context'

const { handleResponse } = ResHandler

const Routes = [
  { path: '/health', router: HealthRouter },
  { path: '/version', router: VersionRouter },
  { path: '/user', router: UserRouter },
  { path: '/otp', router: OtpRouter },
  { path: '/user', router: ContactRouter },
  { path: '/user', router: GroupRouter },
  { path: '/user', router: ReminderRouter }
]

Routes.init = (app) => {
  if (!app || !app.use) {
    console.error('[Error] Route Initialization Failed: app / app.use is undefined')
    return process.exit(1)
  }

  app.use(httpContext.middleware)

  // Custom Routes
  Routes.forEach(route => app.use(route.path, route.router))

  // Final Route Pipeline
  app.use('*', (request, response, next) => {
    if (!request.isMatched) {
      const { method, originalUrl } = request
      const message = `Cannot ${method} ${originalUrl}`
      const error = new ResponseBody(404, message)
      response.body = error
    }
    return handleResponse(request, response, next)
  })

  // Route Error Handler
  app.use((error, request, response, next) => {
    if (!error) { return process.nextTick(next) }
    console.log(error)

    const { statusCode = 500, message } = error
    let responseBody

    if (error.constructor.name === 'ResponseBody') {
      responseBody = error
    } else {
      responseBody = new ResponseBody(statusCode, message, error)
    }

    response.body = responseBody
    return handleResponse(request, response, next)
  })
}

export default Routes
