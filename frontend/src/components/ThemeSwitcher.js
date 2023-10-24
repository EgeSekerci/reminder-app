import { useState, useEffect } from 'react'
import { BsSun, BsMoon } from 'react-icons/bs'

const ThemeSwitcher = () => {
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode') === "true"
        setDarkMode(isDarkMode)
    }, [])

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode)
        localStorage.setItem('darkMode', darkMode)
    }, [darkMode])

    const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode)

    return (
        <button onClick={toggleDarkMode}>
            {darkMode ?
                <BsSun size={28} className="text-[var(--primary-light)] transition-all hover:bg-[var(--primary-dark)] p-1 rounded-full" />
                : <BsMoon size={28} className="text-[var(--primary-dark)] transition-all hover:bg-[var(--secondary-light)] p-1 rounded-full" />
            }
        </button>
    )
}

export default ThemeSwitcher
