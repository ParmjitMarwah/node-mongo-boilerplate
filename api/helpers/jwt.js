import jwt from 'jsonwebtoken'

import { JWT_CONFIG } from './../../config'

// const jwtAsync = util.promisify(jwt)
const { JWT_SECRET, JWT_EXPIRES_IN } = JWT_CONFIG

export default {
  sign,
  verify
}

async function sign (payload, options = {}) {
  return jwt.sign(payload, JWT_SECRET, { ...options, ...{ expiresIn: JWT_EXPIRES_IN } })
}

async function verify (token) {
  return verifyAsync(token)
}

function verifyAsync (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, function (err, decoded) {
      if (err) {
        reject(err)
        return
      }
      resolve(decoded)
    })
  })
}
