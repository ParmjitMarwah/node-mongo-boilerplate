'use strict'

import { ResponseBody } from '../helpers'
import { UserModel } from '../models'

const UserController = {
  signIn,
  updateProfile
}

export default UserController

async function signIn (request, response, next) {
  if (response.body) { return next() }
  const { body } = request
  const data = await UserModel.signIn(body)
  const responseBody = new ResponseBody(200, 'User Signed In', data)
  response.body = responseBody
  next()
}

async function updateProfile (request, response, next) {
  if (response.body) { return next() }
  const { body, params } = request
  const data = await UserModel.updateProfile({ ...body, ...params })
  const responseBody = new ResponseBody(200, 'User Signed In', data)
  response.body = responseBody
  next()
}
