import { Schema, model } from 'mongoose'
import { fieldEncryption } from 'mongoose-field-encryption'
import { SECRETS_CONFIG } from './../../config'

const { DB_FIELD_ENCRYPTION_KEY, DB_FIELD_ENCRYPTION_SALT_KEY } = SECRETS_CONFIG

const ContactSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true })

ContactSchema.plugin(fieldEncryption, {
  fields: ['phoneNumber'],
  secret: DB_FIELD_ENCRYPTION_KEY,
  saltGenerator: function () {
    return DB_FIELD_ENCRYPTION_SALT_KEY
  }
})

export default model('contact', ContactSchema)
