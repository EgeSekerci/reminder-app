require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const reminderRoutes = require('./routes/reminders')

const app = express()

app.use(express.json())

app.use('/api/reminders', reminderRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT)
    }).catch((error) => {
        console.log(error)
    })
