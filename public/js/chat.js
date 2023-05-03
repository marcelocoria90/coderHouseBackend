/* eslint-disable no-undef */
// @ts-ignore
const serverSocket = io()

// @ts-ignore
Swal.fire({
  title: 'Identifícate',
  input: 'text',
  inputValidator: (value) => {
    return !value && '¡Necesitas escribir un nombre de usuario para comenzar a chatear!'
  },
  allowOutsideClick: false
}).then(result => {
  const inputUser = document.querySelector('#inputAutor')
  if (!(inputUser instanceof HTMLInputElement)) return
  inputUser.value = result.value
  serverSocket.emit('newUser', inputUser.value)
})

const btnEnviar = document.querySelector('#btnEnviar')

if (btnEnviar) {
  btnEnviar.addEventListener('click', evento => {
    const inputUser = document.querySelector('#inputAutor')
    const inputMessage = document.querySelector('#textMessage')

    if (!(inputUser instanceof HTMLInputElement)) return

    const user = inputUser.value
    const message = inputMessage.value

    if (!user || !message) return

    serverSocket.emit('newMessage', { user, message })

    inputMessage.value = ''
  })
}

const plantillaMensajes = `
{{#if hayMensajes }}
<ul class=" list-unstyled text-white overflow-auto contenedor">
    {{#each mensajes}}
      <li class="d-flex justify-content-between mb-8">
          <img src="images/icono-perfil-avatar_188544-4755.avif" alt="avatar"
              class="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60">
          <div class="card mask-custom w-50">
              <div class="card-header d-flex justify-content-between p-3"
                  style="border-bottom: 1px solid rgba(255,255,255,.3);">
                  <p class="fw-bold mb-0 ">{{this.user}}</p>
                  <p class="text-light small mb-0"><i class="far fa-clock"></i> {{this.timestamp}}</p>
              </div>
              <div class="card-body">
                  <p class="mb-0">
                  {{this.message}}
                  </p>
              </div>
          </div>
      </li>
    {{/each}}
</ul>
{{else}}
<p>no hay mensajes...</p>
{{/if}}
`
const armarHtmlMensajes = Handlebars.compile(plantillaMensajes)

serverSocket.on('updateMessages', mensajes => {
  // console.log('Mensajes actulizarMensajes 🚩', mensajes)
  const divMensajes = document.querySelector('#messages')
  if (divMensajes) {
    divMensajes.innerHTML = armarHtmlMensajes({ mensajes, hayMensajes: mensajes.length > 0 })
  }
})

serverSocket.on('newUser', nombreUsuario => {
  // @ts-ignore
  Swal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    title: `"${nombreUsuario}" se ha unido al chat`,
    icon: 'success'
  })
})
