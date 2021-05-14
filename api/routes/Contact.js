'use strict'

import Express from 'express'
import { ReqHandler, RequestValidator } from '../helpers'
import { ContactController } from '../controllers'
import { ContactRequestValidator } from '../validators'

const { createContactSchema, updateContactSchema } = ContactRequestValidator
const { validate: createContactValidator } = new RequestValidator(createContactSchema)
const { validate: updateContactValidator } = new RequestValidator(updateContactSchema)

const ContactRouter = new Express.Router()
const { fetch, add, update, deleteContact } = ContactController

const { routeSanity, asyncWrapper, validateToken } = ReqHandler

ContactRouter.post('/:userId/contacts', routeSanity, validateToken, createContactValidator, asyncWrapper(add))
ContactRouter.get('/:userId/contacts', routeSanity, validateToken, asyncWrapper(fetch))
ContactRouter.put('/:userId/contacts/:id', routeSanity, validateToken, updateContactValidator, asyncWrapper(update))
ContactRouter.delete('/:userId/contacts/:id', routeSanity, validateToken, asyncWrapper(deleteContact))

export default ContactRouter
