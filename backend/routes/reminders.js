const express = require('express')
const {
    createReminder,
    getReminders,
    getReminder,
    deleteReminder,
    updateReminder
} = require('../controllers/reminderController')

const router = express.Router()

router.get('/', getReminders)

router.get('/:id', getReminder)

router.post('/', createReminder)

router.delete('/:id', deleteReminder)

router.patch('/:id', updateReminder)

module.exports = router