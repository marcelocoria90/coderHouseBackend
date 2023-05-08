/* eslint-disable camelcase */
import { User } from '../../../services/daos/classes/Users.js'
import { usersService } from '../../../services/daos/manager/user/users.services.js'
import { hash, encryptJWT } from '../../../services/utils/criptografia.js'

export const postUser = async (req, res, next) => {
  const { email, password, first_name, last_name, age, rol } = req.body

  const user = new User({
    email,
    password: hash(password),
    first_name,
    last_name,
    age,
    rol
  })

  await usersService.save(user)

  res.cookie('jwt_authorization', encryptJWT(user), {
    signed: true,
    httpOnly: true
  })

  res.status(201).json(user)
}
