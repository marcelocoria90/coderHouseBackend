/* eslint-disable camelcase */
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { compare } from '../services/utils/criptografia.js'
import { usersService } from '../services/daos/manager/user/users.services.js'

import { Strategy as GitHubStrategy } from 'passport-github2'
import { githubCallbackUrl, githubClientId, githubClientSecret, JWT_PRIVATE_KEY } from '../services/config/auth.config.js'

import { User } from '../services/daos/classes/Users.js'

import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'

passport.use('jwt', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([function (req) {
    let token = null
    if (req && req.signedCookies) {
      token = req.signedCookies.jwt_authorization
    }
    return token
  }]),
  secretOrKey: JWT_PRIVATE_KEY
}, async (jwt_payload, done) => {
  try {
    done(null, jwt_payload)
  } catch (err) {
    done(err)
  }
}))

export const authJwtApi = (req, res, next) => {
  passport.authenticate('jwt', (err, jwt_payload, info) => {
    if (err || !jwt_payload) return next()
    req.user = jwt_payload
    next()
  })(req, res, next)
}

export const authJwtView = (req, res, next) => {
  console.log(req.body)
  passport.authenticate('jwt', (err, jwt_payload) => {
    if (err || !jwt_payload) return res.redirect('/web/login')
    req.user = jwt_payload
    next()
  })(req, res, next)
}

passport.use('local', new LocalStrategy({ usernameField: 'email' },
  async (username, password, done) => {
    console.log('🐦 localStrategy:::__:::🔷')
    console.log(username)
    const user = await usersService.findByEmail(username)
    if (!user) return done()
    if (!compare(password, user.password)) return done()
    delete user.password
    done(null, user)
  }))

passport.use('github', new GitHubStrategy({
  clientID: githubClientId,
  clientSecret: githubClientSecret,
  callbackURL: githubCallbackUrl
}, async (accessToken, refreshToken, profile, done) => {
  console.log('🐦 profile:::__:::🔷')
  console.log(profile)
  let user
  console.log('🐦 :::__:::🔷')
  try {
    console.log('🐦 USERNAME:::__:::⚡')
    console.log(profile.username)
    user = await usersService.findByEmail(profile.username)
  } catch (err) {
    console.log('🐦 ERROR:::__:::🔷🔷🔷🔷🔷🔷🔷')
    console.log(err)
    user = new User({
      email: profile.username
    })
    console.log('🐦 USER:::__:::🔷')
    console.log(user)
    await usersService.save(user)
  }
  done(null, user)
}))

export const passportInitialize = passport.initialize()

export const authenticationLocal = passport.authenticate('local', { session: false, failWithError: true })
export const authenticationGithub = passport.authenticate('github', { session: false, scope: ['user:email'] })
export const authenticationGithub_CB = passport.authenticate('github', { session: false, failWithError: true })
