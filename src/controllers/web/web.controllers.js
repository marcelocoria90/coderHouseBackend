import { encryptJWT } from '../../services/utils/criptografia.js'

export const homeView = (req, res, next) => {
  console.log('🐦 homeView:::__:::🔶')
  res.render('profile', {
    pageTitle: 'Profile',
    user: req.user
  })
}

export const loginView = (req, res, next) => {
  res.render('login', {
    pageTitle: 'Login'
  })
}

export const registerView = (req, res, next) => {
  res.render('register', {
    pageTitle: 'Register'
  })
}

export const afterLoginView = (req, res, next) => {
  res.cookie('jwt_authorization', encryptJWT(req.user), { signed: true, httpOnly: true })
  res.redirect('/')
}
