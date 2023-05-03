import { request, response } from 'express'
import { messagesService as MS } from '../../../services/daos/manager/messages/messages.services.js'

/**
 * @param {request} req
 * @param {response} res
 * @returns {Promise<void>}
 * @router /chat
 * @description Obtiene los mensajes del chat y los envía al cliente por medio del renderizado de la vista chat
 */
export const renderMessages = async (req = request, res = response) => {
  try {
    const messages = await MS.getList()
    res.render('chat', { pageTitle: 'Mensajes 💬', messages })
  } catch (e) {
    res.status(500).json({ ERROR: `${e.message}` })
  }
}
