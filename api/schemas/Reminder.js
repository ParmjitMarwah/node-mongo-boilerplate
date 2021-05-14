import { Schema, model } from 'mongoose'

const ReminderSchema = new Schema({

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },

  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'reminder',
    default: null
  },

  type: {
    type: String,
    enum: ['INDIVIDUAL', 'GROUP']
  },

  contactId: {
    type: Schema.Types.ObjectId,
    ref: 'contact'
  },

  groupId: {
    type: Schema.Types.ObjectId,
    ref: 'group'
  },

  tags: [{ type: String }],

  message: {
    type: String
  },
  scheduleTime: {
    type: Date
  },
  frequency: {
    type: Number
  },
  repeat: {
    type: 'String',
    enum: ['DAILY', 'WEEKLY']
  },
  status: {
    type: 'String',
    enum: ['SCHEDULED', 'COMPLETED', 'FAILED', 'STOPPED', 'CANCELLED', 'MODIFIED'],
    default: 'SCHEDULED'
  },
  active: {
    type: Boolean,
    default: true
  }

}, { timestamps: true })

export default model('reminder', ReminderSchema)
