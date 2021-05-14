import { model, Schema } from 'mongoose'
import { fieldEncryption } from 'mongoose-field-encryption'
import { SECRETS_CONFIG } from './../../config'

const { DB_FIELD_ENCRYPTION_KEY, DB_FIELD_ENCRYPTION_SALT_KEY } = SECRETS_CONFIG

const UserSchema = new Schema({
  name: { type: String, trim: true },
  organizationName: { type: String, trim: true },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, { timestamps: true })

UserSchema.plugin(fieldEncryption, {
  fields: ['phoneNumber'],
  secret: DB_FIELD_ENCRYPTION_KEY,
  saltGenerator: function () {
    return DB_FIELD_ENCRYPTION_SALT_KEY
  }
})
export default model('user', UserSchema)
