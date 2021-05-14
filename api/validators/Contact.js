'use strict'

import joi from 'joi'

const contactSchema = joi.object().keys({
  name: joi.string().required(),
  phoneNumber: joi.string().required().regex(/^[0-9]{10}$/)
})
const createContactSchema = joi.object().keys({
  contacts: joi.array().items(contactSchema).min(1).required()
})

const updateContactSchema = contactSchema
export default {
  createContactSchema,
  updateContactSchema
}
