'use client'


import { AccountButton } from '@/shared/AccountButton'
import { NavigatorButton } from '@/shared/NavigatorButton'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth'
import styles from '@/app/styles/styles_entities/Navigator.module.css'


export function Navigator() {
    return (
        <aside className={styles.container}>
            <AccountButton />
            <nav className={styles.container_navigator}>
                <NavigatorButton path={'/home'}>
                    <CalendarMonthIcon className={styles.button_nav} />
                </NavigatorButton>

                <NavigatorButton path={'/templates'}>
                    <CalendarViewMonthIcon className={styles.button_nav} />
                </NavigatorButton>
            </nav>
        </aside>
    )
}