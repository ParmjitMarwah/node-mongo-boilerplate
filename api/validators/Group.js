'use strict'

import joi from 'joi'

const createGroupSchema = joi.object().keys({
  name: joi.string().required(),
  contacts: joi.array().items(joi.string()).min(1).required()
})

const updateGroupSchema = createGroupSchema
export default {
  createGroupSchema,
  updateGroupSchema
}
