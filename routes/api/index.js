const express = require('express')
const router = express.Router()

const AdminApi = require('./admin')
const OrderApi = require('./orders')

router.use('/admin', AdminApi)
router.use('/orders', OrderApi)

module.exports = router
