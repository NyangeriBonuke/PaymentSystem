const express = require('express')
const cors = require('cors')
require('dotenv').config()
const router = require('./routes/route')

const app = express()

app.use(express.json())
app.use(cors())

require('./db')

app.use('/api', router)

app.listen(process.env.PORT, () => {
    console.log("Server started")
})