const express = require('express')
const router = express.Router()
const Orders = (require('../../../models/orders'))
const Users = (require('../../../models/users'))

router.post('/createOrder/:users_id', (req, res) => {
  const { name, period, date, comments } = req.body
  const user_id = req.params.users_id
  return Orders
    .query()
    .insert({
      name,
      period,
      date,
      comments,
      users_id: user_id
    })
  .then(order => {
    if (order) {
      res.sendStatus(200)
    }
  })
  .catch(err => res.send(err))
})

// get single order - not sure if will be used
// router.get('/getOrder/:order_id', (req,res) => {
//   const { order_id } = req.params
//   return Orders
//     .query()
//     .where({ id: order_id })
//     .then(order => res.json(order))
// })

router.get('/getOrders/:user_id', (req,res) => {
  const { user_id } = req.params
  return Users
    .query()
    .where({ id: user_id })
    .select('username')
    .eager('orders')
    .then(orders => {
      res.json(orders)
    })
})

router.get('/getAllOrders', (req,res) => {
  return Users
    .query()
    .whereExists(Users.relatedQuery('orders'))
    .eager('orders')
    .then(users => {
      res.send(users)
    })
})

router.delete('/deleteOrder/:order_id', (req,res) => {
  const { order_id } = req.params
  return Orders
    .query()
    .where({ id: order_id })
    .delete()
    .then(delOrder => {
      if (delOrder > 0) res.sendStatus(200)
      else res.sendStatus(400)
    })
})

router.delete('/deleteLastOrder/:user_id', (req,res) => {
  const { user_id } = req.params
  return Orders
    .query()
    .where({ users_id: user_id })
    .then(orders => {
      if (orders.length > 0) {
        let lastOrder_id = orders[orders.length-1].id
        return Orders
          .query()
          .where({ id: lastOrder_id })
          .delete()
          .then(delOrder => {
            console.log(delOrder);
            if (delOrder > 0) res.sendStatus(200)
            else res.sendStatus(400)
          })
      }
      else res.sendStatus(400)
    })
})

router.put('/orderCompleted/:order_id', (req,res) => {
  const { order_id } = req.params
  return Orders
    .query()
    .patchAndFetchById(order_id, {isDone: true})
    .then(order => {
      if(order.isDone) res.sendStatus(200)
      else res.sendStatus(400)
    })
})

router.put('/orderNotCompleted/:order_id', (req,res) => {
  const { order_id } = req.params
  return Orders
    .query()
    .patchAndFetchById(order_id, {isDone: false})
    .then(order => {
      if(!order.isDone) res.sendStatus(200)
      else res.sendStatus(400)
    })
})

// TEST
router.get('/test', (req,res) => {
  return Users
    .loadRelated(['orders', 'users'], 'orders.name')
    .then(orders => res.json(orders))
})

module.exports = router
