import { AuthWindow } from '@/entities/AuthWindow'
import styles from '@/app/styles/styles_pages/AuthPage.module.css'


export function AuthPage() {
    return (
        <main className={styles.container}>
            <AuthWindow />
        </main>
    )
}