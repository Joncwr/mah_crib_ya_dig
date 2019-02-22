require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const ApiRoutes = require('./routes/api')
const AdminRoutes = require('./routes/admin')
const passport    = require('passport');
require('./auth/passport');

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', passport.authenticate('jwt', {session: false}), ApiRoutes)
app.use('/admin', AdminRoutes)


app.use(passport.authenticate('jwt', { session: false }));


app.use('/', (req, res) => {
  res.send('hi')
})

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`))
