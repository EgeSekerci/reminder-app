const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reminderSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        requred: true
    },
    description: {
        type: String
    }
}, { timestams: true })

module.exports = mongoose.model('Reminder', reminderSchema)