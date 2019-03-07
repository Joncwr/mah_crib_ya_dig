const express = require('express')
const router = express.Router()
const { saltHashPassword, randomString } = require('../../helpers/store')
const Users = require('../../models/users')
const Households = require('../../models/households')

router.post('/createHousehold', (req, res) => {
  const { username, password, household_name } = req.body
  const { salt, hash } = saltHashPassword({ password })

  return Households
    .query()
    .insert({ name: household_name })
    .then(household => {
      if (household) {
        return Users
          .query()
          .insert({
            username,
            password_hash: hash,
            salt_bae: salt,
            household_id: household.id
          })
          .then(user => {
            if (user) res.sendStatus(200)
            else undoHousehold(household.id)
          })
          .catch(err => {
            undoHousehold(household.id)
          })
      }
      else res.sendStatus(400)
    })
    .catch(err => res.send(err))

    function undoHousehold (household_id) {
      return Households
        .query()
        .where({ id: household_id })
        .delete()
        .then(() => {
          res.send('Something went wrong.')
        })
    }
})

module.exports = router
