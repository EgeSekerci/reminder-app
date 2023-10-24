import ReminderDetails from '../components/ReminderDetails'
import ReminderForm from '../components/ReminderForm'
import Calendar from '../components/Calendar'
import { useRemindersContext } from '../hooks/useRemindersContext'

const Home = () => {
  const { reminders } = useRemindersContext()

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 md:gap-3 lg:gap-7">
      <div className="order-2 md:col-start-1 md:col-end-4 md:order-1">
        {reminders && reminders.map((reminder) => (
          <ReminderDetails key={reminder._id} reminder={reminder} />
        ))}
      </div>
      <div className="order-1 md:order-2 md:col-start-4 md:col-end-6">
        <ReminderForm />
        <Calendar />
      </div>
    </div>
  )
}

export default Home
