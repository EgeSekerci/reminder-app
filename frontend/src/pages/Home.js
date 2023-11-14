import ReminderDetails from '../components/ReminderDetails'
import ReminderForm from '../components/ReminderForm'
import Calendar from '../components/Calendar'
import { useRemindersContext } from '../hooks/useRemindersContext'
import { createTheme } from '@mui/material'
import { teal } from '@mui/material/colors'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ThemeProvider } from '@emotion/react'

const Home = () => {
  const { reminders } = useRemindersContext()

  const theme = createTheme({
    palette: { primary: teal }
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </LocalizationProvider>
  )
}

export default Home
