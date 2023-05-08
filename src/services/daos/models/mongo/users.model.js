import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  age: { type: Number },
  rol: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { versionKey: false })

export const usersDb = mongoose.model('usuarios', usuarioSchema)
