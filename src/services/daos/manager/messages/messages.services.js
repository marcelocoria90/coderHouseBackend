import { messagesDb } from '../../models/mongo/messages.model.js'
import { Message } from '../../classes/Messages.js'

class MessagesServices {
  #messagesDb
  constructor () {
    this.#messagesDb = messagesDb
  }

  async save (data) {
    try {
      const message = new Message(data)
      const result = await this.#messagesDb.create(message.dataMessage())
      return result
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async getList () {
    try {
      const result = await this.#messagesDb.find().lean()
      return result
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async getMessageById (mid) {
    try {
      const result = await this.#messagesDb.findById(mid).lean()
      return result
    } catch (e) {
      throw new Error(e.message)
    }
  }
}

export const messagesService = new MessagesServices()
