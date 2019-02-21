const express = require('express')
const router = express.Router()
const moment = require('moment')
const Orders = (require('../../../models/orders'))
const Users = (require('../../../models/users'))

router.post('/createOrder/:users_id', (req, res) => {
  const { name, period, date, comments } = req.body
  const userId = req.params.users_id
  return Orders
    .query()
    .insert({
      name,
      period,
      date: moment(date,'DD/MM/YYYY').format(),
      comments: {comments},
      users_id: userId
    })
  .then(res => console.log(res))
})

module.exports = router
