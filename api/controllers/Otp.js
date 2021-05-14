'use strict'

import { ResponseBody } from '../helpers'
import { OtpModel } from '../models'

const OtpController = {
  verify
}

export default OtpController

async function verify (request, response, next) {
  const { body } = request
  const data = await OtpModel.verify(body)
  const responseBody = new ResponseBody(200, 'User Signed In', data)
  response.body = responseBody
  next()
}
