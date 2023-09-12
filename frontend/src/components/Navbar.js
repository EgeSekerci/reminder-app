import { Link } from 'react-router-dom'
import ThemeSwitcher from './ThemeSwitcher'

const Navbar = () => {
    return (
        <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full mb-4 bg-white text-sm py-4 shadow-lg dark:bg-[var(--secondary-dark)]">
            <nav className="w-full max-w-[1400px] mx-auto px-4 sm:flex sm:items-center sm:justify-between">
                <div className="flex space w-full items-center justify-between">
                    <Link to="/" className="text-[var(--primary-dark)] dark:text-[var(--primary-light)]">
                        <h1 className="text-2xl">Reminder Application</h1>
                    </Link>
                    <ThemeSwitcher />
                </div>
            </nav>
        </header>
    )
}

export default Navbar
