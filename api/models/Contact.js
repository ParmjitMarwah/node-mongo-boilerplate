'use strict'
import { Contact } from '../schemas'
const ContactModel = {
  fetch,
  add,
  update,
  deleteContact
}

export default ContactModel

async function fetch (params) {
  const { userId } = params
  return { contacts: (await Contact.find({ userId })) }
}

async function add (params) {
  let { userId, contacts } = params
  contacts = contacts.map(contact => {
    contact.userId = userId
    return contact
  })
  await Contact.create(contacts)
  return { message: 'contacts added successfully' }
}

async function update (params) {
  const { userId, id, name, phoneNumber } = params

  await Contact.updateOne({ userId, _id: id }, { $set: { name, phoneNumber } })
  return { message: 'Contact Updated Successfully' }
}

async function deleteContact (params) {
  const { userId, id } = params
  await Contact.updateOne({ userId, _id: id }, { $set: { active: false } })
  return { message: 'Contact deleted Successfully' }
}
