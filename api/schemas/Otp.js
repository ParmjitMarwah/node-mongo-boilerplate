import { model, Schema } from 'mongoose'

const otpSchema = new Schema({
  otp: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
}, { timestamps: true })

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 })

export default model('otp', otpSchema)
