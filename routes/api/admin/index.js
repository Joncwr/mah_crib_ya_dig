const express = require('express')
const router = express.Router()
const { saltHashPassword, randomString } = require('../../../helpers/store')
const Users = (require('../../../models/users'))

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
  const { username, password } = req.body
  return Users
    .query()
    .where({ username })
    .then(([user]) => {
      if (!user) res.sendStatus(401)
      else {
        const { hash } = saltHashPassword({
          password,
          salt: user.salt_bae
        })
        if ( hash === user.password_hash) res.sendStatus(200)
        else res.sendStatus(401)
      }
    })
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
