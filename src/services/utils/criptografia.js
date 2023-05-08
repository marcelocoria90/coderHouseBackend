import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_PRIVATE_KEY } from '../config/auth.config.js'

export const hash = (data) => {
  return bcrypt.hashSync(data, bcrypt.genSaltSync(10))
}

export const compare = (data, dataHash) => {
  return bcrypt.compareSync(data, dataHash)
}

export const encryptJWT = (payload) => {
  const token = jwt.sign(payload, JWT_PRIVATE_KEY, { expiresIn: '24h' })
  return token
}

export const decryptJWT = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_PRIVATE_KEY, (err, decodedPayload) => {
      if (err) {
        reject(err)
      } else {
        resolve(decodedPayload)
      }
    })
  })
}
