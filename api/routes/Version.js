'use strict'

import Express from 'express'
import { ReqHandler } from '../helpers'
import { VersionController } from '../controllers'

const VersionRouter = new Express.Router()
const { get } = VersionController

const { routeSanity, asyncWrapper } = ReqHandler

VersionRouter.get('/', routeSanity, asyncWrapper(get))

export default VersionRouter
