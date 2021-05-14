'use strict'

import joi from 'joi'

const signInSchema = joi.object().keys({
  phoneNumber: joi.string().required().regex(/^[0-9]{10}$/)
})

const updateProfileSchema = joi.object().keys({
  organizationName: joi.string().required(),
  name: joi.string()
})

export default {
  signInSchema,
  updateProfileSchema
}
