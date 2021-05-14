'use strict'

import Express from 'express'
import { ReqHandler, RequestValidator } from '../helpers'
import { ReminderController } from '../controllers'
import { ReminderRequestValidator } from '../validators'

const { createReminderSchema } = ReminderRequestValidator
const { validate: createReminderValidator } = new RequestValidator(createReminderSchema)

const ReminderRouter = new Express.Router()
const { fetch, add, deleteReminder, update } = ReminderController

const { routeSanity, asyncWrapper, validateToken } = ReqHandler

ReminderRouter.post('/:userId/reminder', routeSanity, validateToken, createReminderValidator, asyncWrapper(add))
ReminderRouter.get('/:userId/reminders', routeSanity, validateToken, asyncWrapper(fetch))
ReminderRouter.put('/:userId/reminder/:id', routeSanity, validateToken, createReminderValidator, asyncWrapper(update))
ReminderRouter.delete('/:userId/reminder/:id', routeSanity, validateToken, asyncWrapper(deleteReminder))

export default ReminderRouter
