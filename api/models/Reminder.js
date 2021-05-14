'use strict'
import { Reminder } from '../schemas'
import moment from 'moment'
const ReminderModel = {
  fetch,
  add,
  deleteReminder,
  update
}

export default ReminderModel

async function fetch (params) {
  const { userId } = params
  return { Reminders: (await Reminder.find({ userId })) }
}

async function add (params) {
  const parentObj = new Reminder({ parentId: null, ...params })
  const schedules = await constructSchedules(parentObj._id, params)

  await parentObj.save()
  await Reminder.create(schedules)
  return { message: 'Reminders added successfully' }
}

async function update (params) {
  const { userId, id, ...data } = params

  const completedCount = await Reminder.find({ userId, parentId: id, status: 'COMPLETED' }).count()

  if (completedCount > 0) throw new Error('scheduler has started already')

  const parentRecord = await Reminder.findOne({ userId, _id: id }).lean()

  const isTimeChange = !(moment(data.scheduleTime).utcOffset('+05:30').isSame(moment(parentRecord.scheduleTime).utcOffset('+05:30')))
  const isRepeatChange = data.repeat !== parentRecord.repeat
  const isFrequencyChange = data.frequency !== parentRecord.frequency

  if (isTimeChange || isRepeatChange || isFrequencyChange) {
    await updateReminder({ parentId: id, userId, status: 'SCHEDULED' }, { active: false, status: 'MODIFIED' })
    const schedules = await constructSchedules(parentRecord._id, { userId, ...data })
    await Reminder.create(schedules)
  } else {
    await updateReminder({ parentId: parentRecord._id, userId, status: 'SCHEDULED' }, { ...data })
  }
  await updateReminder({ _id: parentRecord._id, userId }, { ...data })

  return { message: 'Reminder Updated Successfully' }
}

async function deleteReminder (params) {
  const { userId, id } = params

  await updateReminder({ parentId: id, userId, status: 'SCHEDULED' }, { active: false, status: 'CANCELLED' })
  await updateReminder({ _id: id, userId }, { active: false, status: 'CANCELLED' })

  return { message: 'Reminder deleted Successfully' }
}

async function updateReminder (condition, updateObj) {
  return Reminder.updateMany(condition, {
    $set: updateObj
  })
}

async function constructSchedules (parentId, schedulerObj) {
  let { frequency, repeat, scheduleTime, userId, tags, message } = schedulerObj
  const schedules = []
  for (let i = 1; i <= frequency; i++) {
    const time = scheduleTime
    schedules.push({ userId, parentId, message, tags, scheduleTime: moment(time).utcOffset('+05:30').format() })
    if (repeat === 'DAILY') {
      scheduleTime = moment(scheduleTime).utcOffset('+05:30').add(1, 'd').format()
    } else if (repeat === 'WEEKLY') {
      scheduleTime = moment(scheduleTime).utcOffset('+05:30').add(1, 'w').format()
    }
  }
  return schedules
}
