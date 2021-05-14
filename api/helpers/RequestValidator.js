'use strict'

import ResponseBody from './ResponseBody'

export default class RequestValidator {
  constructor (schema) {
    this.schema = schema

    this.validate = this.validate.bind(this)
    this._validate = this._validate.bind(this)
  }

  async validate (request, response, next) {
    const { responseBody } = await this._validate(request.body)
    if (responseBody) response.body = responseBody
    next()
  }

  async validateParams (request, response, next) {
    const { responseBody } = await this._validate(request.params)
    if (responseBody) response.body = responseBody
    next()
  }

  async validateQuery (request, response, next) {
    const { responseBody } = await this._validate(request.query)
    if (responseBody) response.body = responseBody
    next()
  }

  async _validate (data) {
    const { error } = await this.schema.validate(data)

    if (error) {
      const responseBody = new ResponseBody(422, 'Validation Error', null, { message: error.message })

      return { responseBody }
    }

    return {}
  }
}
