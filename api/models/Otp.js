'use strict'
import { Otp } from '../schemas'
import { jwt } from './../helpers'
import { EXPRESS_CONSTANTS } from './../constants'
import httpContext from 'express-http-context'
import UserModel from './User'

const { ACCESS_TOKEN_PROP } = EXPRESS_CONSTANTS
const OtpModel = {
  verify,
  remove,
  create
}

export default OtpModel

async function verify (params) {
  const { otp, phoneNumber } = params

  const user = await UserModel.findUser({ phoneNumber })

  const OtpObj = await Otp.findOne({ userId: user._id, otp })

  if (!OtpObj) {
    throw new Error('Invalid Otp')
  }
  const token = await jwt.sign({ id: user._id })

  httpContext.set(ACCESS_TOKEN_PROP, token)
  return { message: 'Otp verified', user }
}

async function create ({ userId, otp }) {
  return Otp.create({ userId, otp })
}

async function remove ({ userId }) {
  return Otp.remove({ userId })
}
