
// import TeleSignSDK from 'telesignsdk'
import { SMS_PROVIDER_CONFIG } from './../../config'
import axios from 'axios'

const { SMS_PROVIDER_API_KEY, SMS_PROVIDER_ENDPOINT } = SMS_PROVIDER_CONFIG

async function sendSms (phoneNumber, message, type) {
  try {
    const { data: responseBody } = await axios({
      method: 'post',
      url: SMS_PROVIDER_ENDPOINT,
      headers: {
        authorization: SMS_PROVIDER_API_KEY
      },
      data: {
        message,
        numbers: phoneNumber,
        route: type,
        language: 'english'
      }
    })
    console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
      ` => code: ${responseBody.request_id}` +
      `, description: ${responseBody.message}`)
    return responseBody
  } catch (error) {
    console.error('Unable to send message. ' + error)
  }
}

function generateOTP (otpLength) {
  const digits = '0123456789'

  let otp = ''

  for (let i = 1; i <= otpLength; i++) {
    var index = Math.floor(Math.random() * (digits.length))

    otp = otp + digits[index]
  }

  return otp
}

export default {
  sendSms,
  generateOTP
}
