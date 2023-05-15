/* eslint-disable camelcase */
import { User } from '../../../services/daos/classes/Users.js'
import { usersService } from '../../../services/daos/manager/user/users.services.js'
import { encryptJWT } from '../../../services/utils/criptografia.js'

export const postUser = async (req, res, next) => {
  const credentials = req.body

  console.log('🐦 credentials:::__:::🔶')
  console.log(credentials)

  try {
    const user = new User(credentials)

    console.log('🐦 postUser:::__:::🔷')
    console.log(user.data())

    await usersService.save(user.data())
    const token = await encryptJWT(user.data())

    res.cookie('jwt_authorization', token, {
      signed: true,
      httpOnly: true
    })

    console.log(res.cookie)

    res.status(201).json(user)
  } catch (e) {
    next(e)
  }
}
