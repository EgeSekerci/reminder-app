import { useEffect, useState } from 'react'
import { useRemindersContext } from '../hooks/useRemindersContext'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { parseJSON } from 'date-fns'

const ReminderUpdate = ({ reminderId, setOpenReminderUpdate }) => {
    const { dispatch, selectedReminder } = useRemindersContext()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState(parseJSON(new Date()))
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchReminder = async () => {
            const response = await fetch('/api/reminders/' + reminderId)
            const json = await response.json()

            if (response.ok) dispatch({ type: 'GET_REMINDER', payload: json })
        }
        fetchReminder()
    }, [reminderId])

    useEffect(() => {
        if (selectedReminder) {
            setTitle(selectedReminder.title)
            setDescription(selectedReminder.description)
            setDate(selectedReminder.date)
        }
    }, [selectedReminder])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setOpenReminderUpdate(false)

        const reminder = { title, description, date }

        const response = await fetch('/api/reminders/' + reminderId, {
            method: 'PATCH',
            body: JSON.stringify(reminder),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) setError(json.error)

        if (response.ok) {
            dispatch({ type: 'UPDATE_REMINDER', payload: json })
            clearState()
        }
    }

    const clearState = () => {
        setTitle('')
        setDescription('')
        setDate(new Date())
        setError(null)
    }

    return (
        <div>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full max-w-3xl my-6 mx-6">
                    <div className="dark:border rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-[var(--secondary-dark)] dark:border-zinc-800 outline-none focus:outline-none">
                        <div className="flex justify-between items-center text-2xl text-[var(--primary-dark)] dark:text-[var(--primary-light)] p-5 border-b border-solid border-[var(--secondary-light)]">
                            <h5 className="font-semibold">
                                Update Reminder
                            </h5>
                            <button type="button" className="p-1 ml-auto bg-transparent border-0 float-right leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => {
                                    setOpenReminderUpdate(false)
                                    clearState()
                                }}>
                                <span className="bg-transparent block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        <form className="reminderUpdate" onSubmit={handleSubmit}>
                            <div className="relative p-6 flex-auto">
                                <div className="mx-2">
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="title-input" className="block text-xl font-semibold mb-2 text-[var(--primary-dark)] dark:text-[var(--primary-light)]">Title</label>
                                    </div>
                                    <input
                                        type="text"
                                        id="title-input"
                                        placeholder="Please enter a title..."
                                        onChange={(e) => setTitle(e.target.value)}
                                        defaultValue={title}
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
                                        defaultValue={description}
                                    />
                                    <div>
                                        <label htmlFor="date-input" className="block text-xl font-semibold mb-2 text-[var(--primary-dark)] dark:text-[var(--primary-light)]">Date and Time</label>
                                        <div className="relative">
                                            <DateTimePicker
                                                className="date-time !mb-6"
                                                value={parseJSON(date) || ''}
                                                onChange={(newDate) => {
                                                    setDate(newDate)
                                                }}
                                                viewRenderers={{
                                                    hours: renderTimeViewClock,
                                                    minutes: renderTimeViewClock,
                                                    seconds: renderTimeViewClock,
                                                }}
                                                format="MMM dd yyyy, h:mm aa"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="w-full flex items-center justify-end p-6 border-t border-solid text-[var(--primary-dark)] dark:text-[var(--primary-light)]">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setOpenReminderUpdate(false)
                                        clearState()
                                    }}
                                    className="border rounded border-[var(--primary-dark)] text-[var(--primary-dark)] hover:bg-[#d8dce0] dark:border-[var(--secondary-dark)] dark:text-[var(--primary-light)] dark:hover:bg-[var(--primary-dark)] background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                >
                                    Close
                                </button>
                                <button
                                    className="border rounded bg-[var(--primary-dark)] border-[var(--primary-dark)] text-white hover:bg-[var(--secondary-dark)] dark:bg-[var(--primary-dark)] dark:border-[var(--primary-dark)] dark:text-[var(--primary-light)] dark:hover:bg-[var(--primary-dark)] background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                >
                                    Save Changes
                                </button>
                                {error &&
                                    <div className="error">
                                        <div className="flex items-center text-l justify-between mt-6 p-3 border-l-8 sm:py-8 dark:border-red-700  dark:bg-[var(--secondary-dark)] dark:text-[var(--primary-light)]">
                                            <span>{error}</span>
                                        </div>
                                    </div>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black dark:bg-gray-400"></div>
        </div >
    )
}

export default ReminderUpdate
