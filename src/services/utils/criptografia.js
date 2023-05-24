import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import util from 'util'
import { JWT_PRIVATE_KEY } from '../config/auth.config.js'

const jwtSignAsync = util.promisify(jwt.sign)

export const hash = (data) => {
  return bcrypt.hashSync(data, bcrypt.genSaltSync(10))
}

export const compare = (data, dataHash) => {
  return bcrypt.compareSync(data, dataHash)
}

export const encryptJWT = async (payload) => {
  try {
    console.log('🐦 encryptJWT:::__:::🔷')
    console.log(payload)

    const token = await jwtSignAsync(payload, JWT_PRIVATE_KEY)
    console.log('Token')
    console.log(token)
    return token
  } catch (e) {
    throw new Error(e)
  }
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
