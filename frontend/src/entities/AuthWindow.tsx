import { useState } from 'react'
import { StatesAuth } from '@/app/types'
import { AuthNavigatorButton } from '@/shared/AuthNavigatorButton'
import { LoginSection } from '@/features/LoginSection'
import { SignupSection } from '@/features/SignupSection'
import styles from '@/app/styles/styles_entities/AuthWindow.module.css'


export function AuthWindow() {
    const [windowState, setAuthState] = useState<StatesAuth>('ВХОД')

    const changeSection = function(sectionName: StatesAuth) {
        setAuthState(sectionName)
    }

    return (
        <div className={styles.container}>
            <div className={styles.container_button}>
                <AuthNavigatorButton 
                name={'ВХОД'} 
                windowState={windowState}
                changeSection={changeSection} />
                <AuthNavigatorButton 
                name={'РЕГИСТРАЦИЯ'} 
                windowState={windowState}
                changeSection={changeSection} />
            </div>
            {windowState === 'ВХОД'
            ?
            <LoginSection />
            :
            <SignupSection />
            }
        </div>
    )
}