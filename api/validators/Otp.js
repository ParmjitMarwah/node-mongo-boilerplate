'use strict'

import joi from 'joi'

const verifyOtpSchema = joi.object().keys({
  phoneNumber: joi.string().required().regex(/^[0-9]{10}$/),
  otp: joi.string().required().regex(/^[0-9]{6}$/)

})

export default {
  verifyOtpSchema
}
