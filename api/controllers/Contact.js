'use strict'

import { ResponseBody } from '../helpers'
import { ContactModel } from '../models'

const ContactController = {
  fetch,
  add,
  update,
  deleteContact
}

export default ContactController

async function fetch (request, response, next) {
  const { params } = request
  const data = await ContactModel.fetch({ userId: params.userId })
  const responseBody = new ResponseBody(200, 'Contacts fetch successfully', data)
  response.body = responseBody
  next()
}

async function add (request, response, next) {
  const { body, params } = request
  const data = await ContactModel.add({ userId: params.userId, contacts: body.contacts })
  const responseBody = new ResponseBody(201, 'Contacts added successfully', data)
  response.body = responseBody
  next()
}
async function update (request, response, next) {
  const { body, params } = request
  const data = await ContactModel.update({ userId: params.userId, ...body, id: params.id })
  const responseBody = new ResponseBody(200, 'Contact updated successfully', data)
  response.body = responseBody
  next()
}
async function deleteContact (request, response, next) {
  const { params } = request
  const data = await ContactModel.deleteContact({ userId: params.userId, id: params.id })
  const responseBody = new ResponseBody(200, 'Contact deleted successfully', data)
  response.body = responseBody
  next()
}
