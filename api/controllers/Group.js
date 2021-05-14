'use strict'

import { ResponseBody } from '../helpers'
import { GroupModel } from '../models'

const GroupController = {
  fetch,
  add,
  update,
  deleteGroup
}

export default GroupController

async function fetch (request, response, next) {
  const { params } = request
  const data = await GroupModel.fetch({ userId: params.userId })
  const responseBody = new ResponseBody(200, 'Groups fetch successfully', data)
  response.body = responseBody
  next()
}

async function add (request, response, next) {
  const { body, params } = request
  const data = await GroupModel.add({ userId: params.userId, ...body })
  const responseBody = new ResponseBody(201, 'Group added successfully', data)
  response.body = responseBody
  next()
}
async function update (request, response, next) {
  const { body, params } = request
  const data = await GroupModel.update({ userId: params.userId, ...body, id: params.id })
  const responseBody = new ResponseBody(200, 'Group updated successfully', data)
  response.body = responseBody
  next()
}
async function deleteGroup (request, response, next) {
  const { params } = request
  const data = await GroupModel.deleteGroup({ userId: params.userId, id: params.id })
  const responseBody = new ResponseBody(200, 'Group deleted successfully', data)
  response.body = responseBody
  next()
}
