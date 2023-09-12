import { useState, useEffect } from 'react'

import ReminderDetails from '../components/ReminderDetails'
import ReminderForm from '../components/ReminderForm'

const Home = () => {
  const [reminders, setReminders] = useState(null)

  useEffect(() => {
    const fetchReminders = async () => {
      const response = await fetch("/api/reminders")
      const json = await response.json()

      if (response.ok) setReminders(json)
    }

    fetchReminders()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:gap-3 lg:gap-7">
      <div className="order-2 md:col-start-1 md:col-end-4 md:order-1">
        {reminders && reminders.map((reminder) => (
          <ReminderDetails key={reminder._id} reminder={reminder} />
        ))}
      </div>
      <div className="order-1 md:order-2 md:col-start-4">
        <ReminderForm />
      </div>
    </div>
  )
}

export default Home
