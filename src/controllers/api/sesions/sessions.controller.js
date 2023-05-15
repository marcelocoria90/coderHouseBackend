import { encryptJWT } from '../../../services/utils/criptografia.js'

export const getCurrentSession = (req, res, next) => {
  res.json(req.user)
}

export const logoutSession = async (req, res, next) => {
  res.clearCookie('jwt_authorization', {
    signed: true,
    httpOnly: true
  })
  res.sendStatus(200)
}

export const postSession = async (req, res, next) => {
  console.log('🐦 postSessionReq:::__:::🔶')
  console.log(req.user)
  try {
    res.cookie('jwt_autorization', encryptJWT(req.user), {
      signed: true,
      httpOnly: true
    })
    res.status(201).json(req.user)
  } catch (e) {
    next(e)
  }
}
