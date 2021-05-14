import ResponseBody from './ResponseBody'
import { EXPRESS_CONSTANTS } from './../constants'
import jwt from './jwt'
const { REQUEST_ACCESS_TOKEN_HEADER_KEY, ACCESS_TOKEN_PROP } = EXPRESS_CONSTANTS

export default {
  asyncWrapper (middleware) {
    return (request, response, next) => {
      if (response.body) { return process.nextTick(next) }

      return Promise.resolve(middleware(request, response, next)).catch((error) => {
        console.log(error)

        response.body = new ResponseBody(500, error.message, undefined, error)
        next()
      })
    }
  },
  routeSanity (request, response, next) {
    request.isMatched = true
    process.nextTick(next)
  },
  async validateToken (request, response, next) {
    const { headers } = request
    console.log(headers)
    const token = headers[REQUEST_ACCESS_TOKEN_HEADER_KEY]
    request[ACCESS_TOKEN_PROP] = token
    try {
      await jwt.verify(token)
    } catch (e) {
      next(e)
    }
    next()
  }
}
