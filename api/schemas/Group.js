import { Schema, model } from 'mongoose'

const GroupSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  contacts: [{
    type: Schema.Types.ObjectId,
    ref: 'contact'
  }],
  name: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true })

export default model('group', GroupSchema)
