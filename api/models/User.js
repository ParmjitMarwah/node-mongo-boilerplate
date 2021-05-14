'use strict'
import { User } from './../schemas'
import { SMS } from './../helpers'
import OtpModel from './Otp'
import MessageLogModel from './MessageLog'

const { sendSms, generateOTP } = SMS
const UserModel = {
  signIn,
  updateProfile,
  findUser
}

export default UserModel

async function signIn (params) {
  const { phoneNumber } = params
  let user = await findUser({ phoneNumber })

  if (!user) {
    user = await User.create({ phoneNumber })
  }
  const userId = user._id
  const otp = generateOTP(6)

  await OtpModel.remove({ userId })

  const response = await sendSms(phoneNumber, `Thanks for signIn into our app. \n\n Please complete the authentication process by entering otp: ${otp}`, 'q')

  await OtpModel.create({ userId, otp })

  await MessageLogModel.save({ userId, type: 'OTP', serviceProviderLog: JSON.stringify(response) })

  return { message: 'Otp sent on your mobile' }
}

async function updateProfile (params) {
  const { id, ...otherProps } = params
  await User.updateOne({ _id: id }, { $set: otherProps })
  return { message: 'User updated' }
}

async function findUser (params) {
  const { phoneNumber } = params

  const messageToSearchWith = new User({ phoneNumber })
  messageToSearchWith.encryptFieldsSync()

  const users = await User.find({ phoneNumber: messageToSearchWith.phoneNumber })
  return (users.length ? users[0] : null)
}
