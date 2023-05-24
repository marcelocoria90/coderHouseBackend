/* eslint-disable camelcase */
/* eslint-disable no-undef */
const formLogin = document.querySelector('#formLogin')

if (formLogin instanceof HTMLFormElement) {
  formLogin.addEventListener('submit', async event => {
    event.preventDefault()

    const input_email = document.querySelector('#input_email')
    const input_password = document.querySelector('#input_password')

    if (
      input_email instanceof HTMLInputElement &&
      input_password instanceof HTMLInputElement
    ) {
      const datosUsuario = {
        email: input_email.value,
        password: input_password.value
      }

      console.log('datosUsuario::.::🚩')
      console.log(datosUsuario)

      const { status } = await fetch('/api/sesiones', {
        method: 'POST',
        body: JSON.stringify(datosUsuario),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })

      console.log(status)
      if (status === 201) {
        window.location.href = '/web/perfil'
      } else {
        console.log('[login] estado inesperado: ' + status)
      }
    }
  })
}
