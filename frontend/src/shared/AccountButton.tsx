import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import styles from '@/app/styles/styles_shared/AccountButton.module.css'


const getWindowStyle = function(isOpen: boolean) {
    return (isOpen ? styles.container_window : styles.container_window_hidden)
}


export function AccountButton() {
    const [windowState, setWindowState] = useState({isOpen: false})
    const router = useRouter()

    const buttonClick = function() {
        setWindowState({...windowState, isOpen: !windowState.isOpen})
    }

    const exitClick = async function() {
        try {
            const response = await fetch('http://localhost:8000/api/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include',
            })
            if (response.ok) {
                console.log('Вышел из аккаунта')
            }
        } catch(error) {
            console.log('Ошибка выхода из аккаунта', error)
        }
    }

    const changeClick = async function() {
        try {
            const response = await fetch('http://localhost:8000/api/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include',
            })
            if (response.ok) {
                console.log('Вышел из аккаунта для смены')
                router.push('/')
            }
        } catch(error) {
            console.log('Ошибка смены аккаунта', error)
        }
    }

    const windowStyle = getWindowStyle(windowState.isOpen)

    return (
        <>
            <button className={styles.button} onClick={buttonClick}>
                <AccountCircleIcon className={styles.icon} />
            </button>
            <div className={windowStyle}>
                <button className={styles.button_window} onClick={exitClick}>Выйти из аккаунта</button>
                <button className={styles.button_window} onClick={changeClick}>Сменить аккаунт</button>
            </div>
        </>
        
    )
}