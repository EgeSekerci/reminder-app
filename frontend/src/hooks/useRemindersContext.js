import { useContext } from 'react'
import { RemindersContext } from '../context/ReminderContext'

export const useRemindersContext = () => {
    const context = useContext(RemindersContext)

    if (!context) throw Error("useRemindersContext must be used inside an RemindersContextProvider")

    return context
}
