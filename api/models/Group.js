'use strict'
import { Group } from '../schemas'
const GroupModel = {
  fetch,
  add,
  update,
  deleteGroup
}

export default GroupModel

async function fetch (params) {
  const { userId } = params
  return { groups: (await Group.find({ userId }).populate('contacts', 'name phoneNumber')) }
}

async function add (params) {
  const { userId, name, contacts } = params
  await Group.create({ userId, name, contacts })
  return { message: 'groups added successfully' }
}

async function update (params) {
  const { userId, id, name, contacts } = params

  await Group.updateOne({ userId, _id: id }, { $set: { name, contacts } })
  return { message: 'Group Updated Successfully' }
}

async function deleteGroup (params) {
  const { userId, id } = params
  await Group.updateOne({ userId, _id: id }, { $set: { active: false } })
  return { message: 'Group deleted Successfully' }
}
