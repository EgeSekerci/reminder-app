import { useEffect } from 'react'

import ReminderDetails from '../components/ReminderDetails'
import ReminderForm from '../components/ReminderForm'
import { useRemindersContext } from '../hooks/useRemindersContext'

const Home = () => {
  const { reminders, dispatch } = useRemindersContext()

  useEffect(() => {
    const fetchReminders = async () => {
      const response = await fetch("/api/reminders")
      const json = await response.json()

      if (response.ok) dispatch({ type: 'SET_REMINDERS', payload: json })
    }

    fetchReminders()
  }, [dispatch])

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 md:gap-3 lg:gap-7">
      <div className="order-2 md:col-start-1 md:col-end-4 md:order-1">
        {reminders && reminders.map((reminder) => (
          <ReminderDetails key={reminder._id} reminder={reminder} />
        ))}
      </div>
      <div className="order-1 md:order-2 md:col-start-4 md:col-end-6">
        <ReminderForm />
      </div>
    </div>
  )
}

export default Home
