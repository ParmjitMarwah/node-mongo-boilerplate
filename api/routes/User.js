'use strict'

import Express from 'express'
import { ReqHandler, RequestValidator } from '../helpers'
import { UserController } from '../controllers'
import { UserRequestValidator } from './../validators'

const { signInSchema, updateProfileSchema } = UserRequestValidator
const { validate: signInValidator } = new RequestValidator(signInSchema)
const { validate: updateProfileValidator } = new RequestValidator(updateProfileSchema)

const UserRouter = new Express.Router()
const { signIn, updateProfile } = UserController

const { routeSanity, asyncWrapper, validateToken } = ReqHandler

UserRouter.post('/signIn', routeSanity, signInValidator, asyncWrapper(signIn))
UserRouter.put('/:id', routeSanity, validateToken, updateProfileValidator, asyncWrapper(updateProfile))

export default UserRouter
