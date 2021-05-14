import { Schema, model } from 'mongoose'

const MessageLogSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  serviceProviderLog: {
    type: String,
    required: true
  },
  reminderId: {
    type: Schema.Types.ObjectId,
    ref: 'reminder'
  },
  type: {
    type: String,
    enum: ['OTP', 'REMINDER'],
    required: true
  }
}, { timestamps: true })

export default model('message_logs', MessageLogSchema)
