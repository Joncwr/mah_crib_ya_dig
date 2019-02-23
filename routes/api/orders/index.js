const express = require('express')
const router = express.Router()
const moment = require('moment')

router.use('/', require('./orders.js'))

module.exports = router
