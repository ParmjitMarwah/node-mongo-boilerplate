'use strict'

import Express from 'express'
import { ReqHandler, RequestValidator, ResHandler } from '../helpers'
import { OtpController } from '../controllers'
import { OtpRequestValidator } from '../validators'

const { verifyOtpSchema } = OtpRequestValidator
const { validate: verifyOtpValidator } = new RequestValidator(verifyOtpSchema)

const OtpRouter = new Express.Router()
const { verify } = OtpController

const { routeSanity, asyncWrapper } = ReqHandler
const { setHeaders } = ResHandler

OtpRouter.post('/verify', routeSanity, verifyOtpValidator, asyncWrapper(verify))

OtpRouter.use(setHeaders)
export default OtpRouter
