import { useState } from 'react'
import 'flatpickr/dist/themes/dark.css'
import Flatpickr from 'react-flatpickr'
import { FaRegCalendarAlt } from 'react-icons/fa'

const ReminderForm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const reminder = { title, description, date }

        const response = await fetch('/api/reminders', {
            method: 'POST',
            body: JSON.stringify(reminder),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setTitle('')
            setDescription('')
            setDate('')
            setError(null)

        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <div className="mx-2">
                <div className="flex justify-between items-center">
                    <label htmlFor="title-input" className="block text-xl font-semibold mb-2 text-[var(--primary-dark)] dark:text-[var(--primary-light)]">Title</label>
                </div>
                <input
                    type="text"
                    id="title-input"
                    placeholder="Please enter a title..."
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <div className="flex justify-between items-center">
                    <label htmlFor="description-input" className="block text-xl text-[var(--primary-dark)] font-semibold mb-2 dark:text-[var(--primary-light)]">Description</label>
                    <span className="block text-sm text-gray-500 mb-2">Optional</span>
                </div>
                <input
                    type="text"
                    id="description-input"
                    placeholder="Please enter a description..."
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
                <div>
                    <label htmlFor="date-input" className="block text-xl font-semibold mb-2 text-[var(--primary-dark)] dark:text-[var(--primary-light)]">Date and Time</label>
                    <div className="relative">
                        <Flatpickr
                            id="date-input"
                            className="cursor-pointer"
                            placeholder="Please select a date..."
                            options={{
                                altInput: true,
                                altFormat: "F j, Y, H:i",
                                dateFormat: "Y-m-d H:i",
                                enableTime: true,
                                time_24hr: true
                            }}
                            onChange={(selectedDates) => {
                                setDate(selectedDates[0])
                            }}
                            value={date}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none z-20 pr-4">
                            <FaRegCalendarAlt size={22} className="text-[var(--primary-dark)] dark:text-[var(--primary-light)]" />
                        </div>
                    </div>
                </div>
                <button className="mb-4 px-8 py-3 text-sm md:text-base font-semibold border rounded border-[var(--primary-dark)] text-[var(--primary-dark)] hover:bg-[#d8dce0] dark:border-[var(--primary-light)] dark:text-[var(--primary-light)] dark:hover:bg-[var(--secondary-dark)]">Add reminder</button>
                {error &&
                    <div className="error">
                        <div className="flex items-center text-l justify-between mt-6 p-3 border-l-8 sm:py-8 dark:border-red-700  dark:bg-[var(--secondary-dark)] dark:text-[var(--primary-light)]">
                            <span>{error}</span>
                        </div>
                    </div>}
            </div>
        </form>
    )
}

export default ReminderForm
