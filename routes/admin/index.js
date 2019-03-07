const express = require('express')
const router = express.Router()
const AccountsApi = require('./accounts')
const HouseholdsApi = require('./households')

router.use('/', AccountsApi)
router.use('/households', HouseholdsApi)

module.exports = router
