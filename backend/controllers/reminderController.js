const Reminder = require('../models/reminderModel')
const mongoose = require('mongoose')

const getReminders = async (req, res) => {
    const reminders = await Reminder.find({}).sort({ date: 1 })

    res.status(200).json(reminders)
}

const getReminder = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'No such reminder' })

    const reminder = await Reminder.findById(id)

    if (!reminder) return res.status(404).json({ error: 'No such reminder' })

    res.status(200).json(reminder)
}

const createReminder = async (req, res) => {
    const { title, date, description } = req.body

    let emptyFields = []

    if (!title) emptyFields.push('title')
    if (!date) emptyFields.push('date')
    if (emptyFields.length > 0) return res.status(400).json({ error: 'Please fill in al the required fields.', emptyFields })

    try {
        const reminder = await Reminder.create({ title, date, description })

        res.status(200).json(reminder)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteReminder = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'No such reminder' })

    const reminder = await Reminder.findOneAndDelete({ _id: id })

    if (!reminder) return res.status(404).json({ error: 'No such reminder' })

    res.status(200).json(reminder)
}

const updateReminder = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'No such reminder' })

    const reminder = await Reminder.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })

    if (!reminder) return res.status(404).json({ error: 'No such reminder' })

    res.status(200).json(reminder)
}

module.exports = {
    createReminder,
    getReminders,
    getReminder,
    deleteReminder,
    updateReminder
}
