const express = require('express')
const router = express.Router()

const OrderApi = require('./orders')

router.use('/orders', OrderApi)

module.exports = router
