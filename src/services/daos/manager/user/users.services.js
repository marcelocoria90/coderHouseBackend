import { usersDb } from '../../models/mongo/users.model.js'
class UsersServices {
  #usersDb
  constructor () {
    this.#usersDb = usersDb
  }

  async save (userData) {
    let newUser = await this.#usersDb.create(userData)
    newUser = JSON.parse(JSON.stringify(newUser))
    return newUser
  }

  async findByEmail (email) {
    try {
      console.log(`🐦 findByEmail:::__:🔷 ${email}`)
      const user = await this.#usersDb.findOne({ email }).lean()
      if (!user) throw new Error('Usuario no encontrado')
      console.log('🐦 findByUser:::__:🔷')
      console.log(user)
      return { ...user }
    } catch (e) {
      console.log('ERROR:::findByEmail:::__:🔷')
      console.log(e)
      throw new Error(e.message)
    }
  }
}

export const usersService = new UsersServices()
