import { createContext, useReducer } from 'react'

export const RemindersContext = createContext()

export const remindersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_REMINDERS':
            return { reminders: action.payload }
        case 'CREATE_REMINDER':
            return { reminders: [action.payload, ...state.reminders] }
        case 'DELETE_REMINDER':
            return { reminders: state.reminders.filter(r => r._id !== action.payload._id) }
        default:
            return state
    }
}

export const RemindersContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(remindersReducer, { reminders: null })

    return (
        <RemindersContext.Provider value={{ ...state, dispatch }}>
            {children}
        </RemindersContext.Provider>
    )
}
