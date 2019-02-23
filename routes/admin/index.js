const express = require('express')
const router = express.Router()
const { saltHashPassword, randomString } = require('../../helpers/store')
const Users = require('../../models/users')
const jwt = require('jsonwebtoken')
const passport = require('passport')

router.post('/createUser', (req, res) => {
  const { username, password } = req.body
  const { salt, hash } = saltHashPassword({ password })

  return Users
    .query()
    .insert({
      username,
      password_hash: hash,
      salt_bae: salt
    })
    .then(user => {
      if (user) res.sendStatus(200)
      else res.sendStatus(401)
  })
})

router.post('/login', (req, res) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({
        message: 'Login failed.',
      })
    }
    req.login(user, {session: false}, (err) => {
      if (err) {
          res.send(err);
      }
      let userDetails = {
        id: user.id,
        username: user.username
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign({ user: userDetails }, process.env.SECRET_KEY);
      return res.json({userDetails, token});
   });
  })(req, res)
})

router.get('/getUser', (req, res) => {
  const { user_id } = req.body
  return Users
    .query()
    .where({ id: user_id })
    .eager('orders')
    .then(([user]) => {
      console.log(user);
    })
})

module.exports = router
