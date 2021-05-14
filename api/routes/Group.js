'use strict'

import Express from 'express'
import { ReqHandler, RequestValidator } from '../helpers'
import { GroupController } from '../controllers'
import { GroupRequestValidator } from '../validators'

const { createGroupSchema, updateGroupSchema } = GroupRequestValidator
const { validate: createGroupValidator } = new RequestValidator(createGroupSchema)
const { validate: updateGroupValidator } = new RequestValidator(updateGroupSchema)

const GroupRouter = new Express.Router()
const { fetch, add, update, deleteGroup } = GroupController

const { routeSanity, asyncWrapper, validateToken } = ReqHandler

GroupRouter.post('/:userId/groups', routeSanity, validateToken, createGroupValidator, asyncWrapper(add))
GroupRouter.get('/:userId/groups', routeSanity, validateToken, asyncWrapper(fetch))
GroupRouter.put('/:userId/groups/:id', routeSanity, validateToken, updateGroupValidator, asyncWrapper(update))
GroupRouter.delete('/:userId/groups/:id', routeSanity, validateToken, asyncWrapper(deleteGroup))

export default GroupRouter
