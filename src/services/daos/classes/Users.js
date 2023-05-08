/* eslint-disable camelcase */
export class User {
  constructor ({ email, password, first_name, last_name, age, rol }) {
    this.email = email
    this.password = password
    this.first_name = first_name
    this.last_name = last_name
    this.age = age
    this.rol = rol
  }
}
