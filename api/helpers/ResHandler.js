import ResponseBody from './ResponseBody'
import { EXPRESS_CONSTANTS } from './../constants'
import httpContext from 'express-http-context'

const { EXPOSE_HEADERS, CUSTOM_HEADERS } = EXPRESS_CONSTANTS
export default {
  handleResponse (request, response, next) {
    const resBody = response.encryptedBody || response.body || {}
    const { statusCode } = resBody

    const handler = ([301, 302].indexOf(statusCode) > -1)
      ? _redirectResponse
      : _sendResponse

    handler(request, response, next)
  },
  setHeaders (request, response, next) {
    const { HEADER_KEY, HEADER_VALUE } = EXPOSE_HEADERS
    response.set(HEADER_KEY, HEADER_VALUE)

    CUSTOM_HEADERS.forEach((header) => {
      const { HEADER_KEY, HEADER_PROP } = header
      response.set(HEADER_KEY, httpContext.get(HEADER_PROP))
    })
    next()
  }
}

// --------- Handle Response -------------------------------------------------
function _sendResponse (request, response, next) {
  let resBody = response.encryptedBody || response.body || {}
  const { statusCode } = resBody

  if (!resBody || !statusCode) {
    resBody = new ResponseBody(500, 'Response Data Not Found!')
  }

  response.status(resBody.statusCode).json(resBody)
}

function _redirectResponse (request, response, next) {
  const resBody = response.encryptedBody || response.body || {}
  const { statusCode, data } = resBody
  response.status(statusCode).redirect(data)
}
// -----------------------------------------------------------------------------
