'use strict'

import { ResponseBody } from '../helpers'
import { ReminderModel } from '../models'

const ReminderController = {
  fetch,
  add,
  update,
  deleteReminder
}

export default ReminderController

async function fetch (request, response, next) {
  const { params } = request
  const data = await ReminderModel.fetch({ userId: params.userId })
  const responseBody = new ResponseBody(200, 'Reminders fetch successfully', data)
  response.body = responseBody
  next()
}

async function add (request, response, next) {
  const { body, params } = request
  const data = await ReminderModel.add({ userId: params.userId, ...body })
  const responseBody = new ResponseBody(201, 'Reminders added successfully', data)
  response.body = responseBody
  next()
}
async function update (request, response, next) {
  const { body, params } = request
  const data = await ReminderModel.update({ userId: params.userId, ...body, id: params.id })
  const responseBody = new ResponseBody(200, 'Reminder updated successfully', data)
  response.body = responseBody
  next()
}
async function deleteReminder (request, response, next) {
  const { params } = request
  const data = await ReminderModel.deleteReminder({ userId: params.userId, id: params.id })
  const responseBody = new ResponseBody(200, 'Reminder deleted successfully', data)
  response.body = responseBody
  next()
}
