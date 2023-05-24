/* eslint-disable camelcase */
import { hash } from '../../../services/utils/criptografia.js'
export class User {
  #first_name
  #last_name
  #email
  #password
  #age
  #rol
  constructor ({ first_name, last_name, email, age, password = 'pass', rol }) {
    this.#first_name = first_name
    this.#last_name = last_name
    this.#email = email
    this.#age = age
    this.#password = hash(password)
    this.#rol = rol
  }

  get email () { return this.#email }
  get password () { return this.#password }
  get first_name () { return this.#first_name }
  get last_name () { return this.#last_name }
  get age () { return this.#age }
  get rol () { return this.#rol }

  data () {
    return {
      email: this.#email,
      password: this.#password,
      first_name: this.#first_name,
      last_name: this.#last_name,
      age: this.#age,
      rol: this.#rol
    }
  }
}
