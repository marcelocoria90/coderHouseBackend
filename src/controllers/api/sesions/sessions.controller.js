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
  res.cookie('jwt_autorization', encryptJWT(req.user), {
    signed: true,
    httpOnly: true
  })
  res.status(201).json(req.user)
}
