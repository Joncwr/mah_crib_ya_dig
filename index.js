require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const ApiRoutes = require('./routes/api')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', ApiRoutes)

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`))
