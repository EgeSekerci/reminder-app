const ReminderDetails = ({ reminder }) => {
    return (
        <div className="max-w-m mb-4 mx-2">
            <a href="#" className="block w-full p-6 bg-white border border-gray-200 text-[var(--primary-dark)] rounded-lg shadow hover:bg-gray-100 dark:bg-[var(--secondary-dark)] dark:border-zinc-800 dark:hover:bg-zinc-800">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-[var(--primary-dark)] dark:text-[var(--primary-light)]">{reminder.title}</h5>
                <div className="font-normal text-[var(--secondary-dark)] dark:text-[var(--secondary-light)]">
                    <p className="text-sm">{reminder.description}</p>
                    <p className="mt-2 text-sm">Event date: {reminder.date}</p>
                    <p className="pt-4 mb-0 pb-0 text-[12px] font-[Sono]">Created: <span className="text-[12px]">{reminder.createdAt}</span></p>
                </div>
            </a>
        </div>
    )
}

export default ReminderDetails