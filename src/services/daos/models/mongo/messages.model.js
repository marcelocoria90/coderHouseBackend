import mongoose from 'mongoose'

const schemaMessages = new mongoose.Schema({
  user: { type: String, required: true },
  message: { type: String, required: false },
  timestamp: { type: Date, required: false }
}, { versionKey: false })

export const messagesDb = mongoose.model('messages', schemaMessages)
