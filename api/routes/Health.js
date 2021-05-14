'use strict'

import Express from 'express'
import { ReqHandler } from '../helpers'
import { HealthController } from '../controllers'

const HealthRouter = new Express.Router()
const { get } = HealthController

const { routeSanity, asyncWrapper } = ReqHandler

HealthRouter.get('/', routeSanity, asyncWrapper(get))

export default HealthRouter
