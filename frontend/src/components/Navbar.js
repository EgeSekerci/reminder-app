import { Link } from 'react-router-dom'
import ThemeSwitcher from './ThemeSwitcher'

const Navbar = () => {
    return (
        <header className="flex justify-start flex-nowrap md:flex-wrap z-50 w-full mb-4 bg-white text-sm py-4 shadow-lg transition-all dark:bg-[var(--secondary-dark)]">
            <nav className="flex items-center justify-between w-full max-w-[1400px] mx-auto px-4">
                <div className="flex space w-full items-center justify-between">
                    <div>
                        <Link to="/">
                            <h1 className="text-base md:text-3xl text-[var(--primary-dark)] dark:text-[var(--primary-light)]">Reminder Application</h1>
                        </Link>
                    </div>
                    <ThemeSwitcher />
                </div>
            </nav>
        </header>
    )
}

export default Navbar
