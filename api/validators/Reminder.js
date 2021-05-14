'use strict'

import joi from 'joi'

const createReminderSchema = joi.object().keys({
  type: joi.string().valid(...['INDIVIDUAL', 'GROUP']).required(),
  contactId: joi.string().allow(null),
  groupId: joi.string().allow(null),
  tags: joi.array().items(joi.string()).min(1).required(),
  message: joi.string().required(),
  scheduleTime: joi.date().required(),
  frequency: joi.number().min(1).required(),
  repeat: joi.string().valid(...['DAILY', 'WEEKLY']).required()

}).or('contactId', 'groupId')

const createReminderParamsSchema = joi.object().keys({
  userId: joi.string().required()
})
const updateReminderParamsSchema = joi.object().keys({
  userId: joi.string().required(),
  id: joi.string().required()
})
export default {
  createReminderSchema,
  createReminderParamsSchema,
  updateReminderParamsSchema
}
