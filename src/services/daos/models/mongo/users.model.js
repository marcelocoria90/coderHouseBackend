import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  password: { type: String },
  carts: {
    type: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'carts'
        }
      }
    ],
    required: true
  },
  rol: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { versionKey: false })

export const usersDb = mongoose.model('usuarios', usuarioSchema)
