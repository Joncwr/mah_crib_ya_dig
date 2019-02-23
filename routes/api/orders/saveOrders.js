const express = require('express')
const router = express.Router()
const moment = require('moment')
const SavedOrders = (require('../../../models/SavedOrders'))

router.post('/saveOrder/:user_id', (req, res) => {
  const { user_id } = req.params
  const { name, period, date, comments } = req.body

  return SavedOrders
    .query()
    .insert({
      name,
      period,
      date: moment(date,'DD/MM/YYYY').format(),
      comments,
      users_id: user_id
    })
  .then(order => {
    if (order) res.sendStatus(200)
  })
  .catch(err => res.send(err))
})

router.get('/getSavedOrders/:user_id', (req,res) => {
  const { user_id } = req.params
  return SavedOrders
    .query()
    .where({ users_id: user_id })
    .then(savedOrder => res.json(savedOrder))
})

router.get('/getAllSavedOrders', (req,res) => {
  return SavedOrders
    .query()
    .then(savedOrders => res.json(savedOrders))
})

router.put('/editSavedOrder/:order_id', (req,res) => {
  const { order_id } = req.params
  return SavedOrders
    .query()
    .patchAndFetchById(order_id, req.body)
    .then(editedOrder => {
      if (editedOrder) res.sendStatus(200)
      else res.sendStatus(400)
    })
    .catch(err => res.send(err))
})

router.delete('/deleteSavedOrder/:order_id', (req,res) => {
  const { order_id } = req.params
  return SavedOrders
    .query()
    .where({ id: order_id })
    .delete()
    .then(delSavedOrder => {
      if (delSavedOrder > 0) res.sendStatus(200)
      else res.sendStatus(400)
    })
})

module.exports = router
