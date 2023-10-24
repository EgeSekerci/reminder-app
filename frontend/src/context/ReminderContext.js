import { createContext, useReducer, useEffect } from 'react'

export const RemindersContext = createContext()

export const remindersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_REMINDERS':
            return {
                ...state, reminders: action.payload
            }
        case 'GET_REMINDER':
            return {
                ...state,
                selectedReminder: action.payload
            }
        case 'CREATE_REMINDER':
            return {
                ...state,
                reminders: [action.payload, ...state.reminders]
            }
        case 'DELETE_REMINDER':
            return {
                ...state,
                reminders: state.reminders.filter(r => r._id !== action.payload._id)
            }
        case 'UPDATE_REMINDER':
            return {
                ...state,
                reminders: state.reminders.map(reminder => {
                    if (reminder._id === action.payload._id) return action.payload
                    return reminder
                })
            }
        default:
            return state
    }
}

export const RemindersContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(remindersReducer, { reminders: null, selectedReminder: null })

    useEffect(() => {
        const fetchReminders = async () => {
            const response = await fetch("/api/reminders")
            const json = await response.json()

            if (response.ok) dispatch({ type: 'SET_REMINDERS', payload: json })
        }

        fetchReminders()
    }, [dispatch])

    return (
        <RemindersContext.Provider value={{ ...state, dispatch }}>
            {children}
        </RemindersContext.Provider>
    )
}
