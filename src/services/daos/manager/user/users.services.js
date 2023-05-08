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
      const user = this.#usersDb.find(u => u.email === email)
      if (!user) throw new Error('Usuario no encontrado')
      console.log('🐦 findByUser:::__:::🔷')
      console.log(user)
      return { ...user }
    } catch (e) {
      throw new Error(e.message)
    }
  }
}

export const usersService = new UsersServices()
