import { useState } from 'react'
import { PiTrashLight } from 'react-icons/pi'
import { parseJSON, format, formatDistanceToNow } from 'date-fns'

import ReminderUpdate from './ReminderUpdate'
import { useRemindersContext } from '../hooks/useRemindersContext'

const ReminderDetails = ({ reminder }) => {
    const { dispatch } = useRemindersContext()
    const [openReminderUpdate, setOpenReminderUpdate] = useState(false)

    const handleClick = async (e) => {
        e.stopPropagation()

        const response = await fetch('/api/reminders/' + reminder._id, { method: 'DELETE' })
        const json = await response.json()

        if (response.ok) dispatch({ type: 'DELETE_REMINDER', payload: json })
    }

    return (
        <div className="mb-4 mx-2">
            <button onClick={() => setOpenReminderUpdate(true)} className="block w-full p-6 bg-white border border-gray-200 text-[var(--primary-dark)] rounded-lg shadow hover:bg-gray-100 dark:bg-[var(--secondary-dark)] dark:border-zinc-800 dark:hover:bg-zinc-800 text-left">
                <div className="flex justify-between">
                    <h5 className="mb-2 text-base md:text-2xl font-bold tracking-tight text-[var(--primary-dark)] dark:text-[var(--primary-light)]">{reminder.title}</h5>
                    <PiTrashLight size={28} onClick={handleClick} className="text-[var(--primary-dark)] dark:text-[var(--primary-light)] hover:bg-[var(--secondary-light)] dark:hover:bg-[var(--primary-dark)]  cursor-pointer p-1 rounded-full" />
                </div>
                <div className="font-normal text-[var(--secondary-dark)] dark:text-[var(--secondary-light)]">
                    <p className="text-sm">{reminder.description}</p>
                    <p className="mt-2 text-sm">Event date: {format(new Date(parseJSON(reminder.date)), 'MM/dd/yyyy h:mm aa', { addSuffix: true })}</p>
                    <p className="pt-4 mb-0 pb-0 text-[12px] font-[Sono]">Created: <span className="text-[12px]">{formatDistanceToNow(new Date(parseJSON(reminder.createdAt)), { addSuffix: true })}</span></p>
                </div>
            </button>
            {openReminderUpdate && <ReminderUpdate reminderId={reminder._id} setOpenReminderUpdate={setOpenReminderUpdate} />}
        </div>
    )
}

export default ReminderDetails
