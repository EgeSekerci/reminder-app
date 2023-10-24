import { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { addDays, addMonths, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, parseJSON, startOfMonth, startOfWeek, subMonths } from 'date-fns'
import { useRemindersContext } from '../hooks/useRemindersContext'

const Calendar = () => {
    const { reminders } = useRemindersContext()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [activeDate, setActiveDate] = useState(new Date())
    const [todaysEvents, setTodaysEvents] = useState(null)

    useEffect(() => {
        const todaysEvent = reminders?.filter(reminder => {
            return isSameDay(parseJSON(reminder.date), new Date())
        })
        setTodaysEvents(todaysEvent)
    }, [reminders])

    const getHeader = () => {
        return (
            <div className="flex justify-between items-center select-none md:text-lg md:mx-2 lg:mx-4">
                <div className="font-bold">
                    <h2>{format(activeDate, "MMM yyyy")}</h2>
                </div>
                <div className="flex justify-center items-center">
                    <IoIosArrowBack size={22} onClick={() => setActiveDate(subMonths(activeDate, 1))} />
                    <IoIosArrowForward className="order-3" size={22} onClick={() => setActiveDate(addMonths(activeDate, 1))} />
                    <div
                        className="font-semibold"
                        onClick={() => {
                            setSelectedDate(new Date())
                            setActiveDate(new Date())
                        }}
                    >
                        Today
                    </div>
                </div>
            </div>
        )
    }

    const getWeekDaysNames = () => {
        const weekStartDate = startOfWeek(activeDate)
        const weekDays = []

        for (let day = 1; day <= 7; day++) {
            weekDays.push(
                <div>
                    {format(addDays(weekStartDate, day), "E")}
                </div>
            )
        }

        return <div className="grid grid-cols-7 h-12 place-content-center text-center select-none">{weekDays}</div>
    }

    const generateDatesForCurrentWeek = (date, selectedDate, activeDate) => {
        const week = []

        for (let day = 0; day < 7; day++) {
            const currentDate = addDays(date, day)
            const todaysReminders = reminders?.filter(reminder => {
                return isSameDay(parseJSON(reminder.date), currentDate)
            })

            week.push(
                <div className="flex flex-col h-12 justify-center items-center">
                    <div onClick={() => {
                        todaysReminders?.length > 0 ? setTodaysEvents(todaysReminders) : setTodaysEvents(null)
                        setSelectedDate(currentDate)
                    }}
                    >
                        <div className={`
                            ${isSameMonth(currentDate, activeDate) ? "" : "text-gray-400"}
                            
                            ${isSameDay(currentDate, selectedDate) ? "!bg-[var(--secondary-light)] text-[var(--primary-dark)] dark:!bg-[var(--primary-dark)] dark:text-[var(--primary-light)]" : ""}
                            
                            ${isSameDay(currentDate, new Date()) ? "!text-red-600" : ""}
                         
                            h-8 w-8 grid place-content-center rounded-full hover:!bg-[var(--secondary-dark)] hover:text-[var(--primary-light)] hover:dark:!bg-[var(--primary-dark)] hover:dark:text-[var(--primary-light)] transition-all cursor-pointer
                        `}
                        >
                            {format(currentDate, "d")}
                        </div>
                        <div className="h-1 w-1 mt-1 mx-auto">
                            {todaysReminders?.length > 0 ? <div className="h-1 w-1 bg-[var(--primary-dark)] dark:bg-[var(--primary-light)] rounded-full"></div> : null}
                        </div>
                    </div>
                </div>
            )
        }

        return <>{week}</>
    }

    const getDates = () => {
        const startOfTheSelectedMonth = startOfMonth(activeDate)
        const endOfTheSelectedMonth = endOfMonth(activeDate)
        const startDate = startOfWeek(startOfTheSelectedMonth)
        const endDate = endOfWeek(endOfTheSelectedMonth)

        let currentDate = startDate

        const allWeeks = []

        while (currentDate <= endDate) {
            allWeeks.push(generateDatesForCurrentWeek(currentDate, selectedDate, activeDate))
            currentDate = addDays(currentDate, 7)
        }

        return <div className="grid grid-cols-7">{allWeeks}</div>
    }

    return (
        <div>
            <div className="mb-4 mx-2">
                <div className="flex flex-col text-sm w-full p-6 bg-white border border-gray-200 text-[var(--primary-dark)] rounded-lg shadow dark:bg-[var(--secondary-dark)] dark:border-zinc-800 dark:text-[var(--primary-light)]">
                    {getHeader()}
                    {getWeekDaysNames()}
                    {getDates()}
                </div>
            </div>
            <div className="mb-4 mx-2">
                <div className="w-full p-6 bg-white border border-gray-200 text-[var(--primary-dark)] rounded-lg shadow dark:bg-[var(--secondary-dark)] dark:border-zinc-800 dark:text-[var(--primary-light)]">
                    <h5 className="font-bold text-lg">Reminders for {format(new Date(parseJSON(selectedDate)), 'MMM dd yyyy', { addSuffix: true })}</h5>
                    {todaysEvents?.length > 0 ?
                        <ul>
                            {todaysEvents?.map(r =>
                                <li className="w-full mt-2 p-3 text-base rounded-lg hover:bg-gray-100 dark:hover:bg-[var(--primary-dark)]" key={r._id}>
                                    <p className="font-semibold">{r.title}</p>
                                    <p>{format(new Date(parseJSON(r.date)), 'MMM dd yyyy h:mm aa', { addSuffix: true })}</p>
                                </li>)}
                        </ul> :
                        <div className="text-sm text-gray-400 dark:text-[var(--secondary-light)] mt-2">No reminder for today.</div>}
                </div>
            </div>
        </div>
    )
}

export default Calendar
