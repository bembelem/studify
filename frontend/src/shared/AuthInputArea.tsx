import { ReactNode } from 'react'
import styles from '@/app/styles/styles_shared/AuthInputArea.module.css'


const getLabelStyles = function(error: string, inputValue: string) {
    if (!inputValue) {
        return {
            label: styles.label,
            error: styles.error_clear,
        }
    } else if (!error && inputValue) {
        return {
            label: styles.label_valid,
            error: styles.error_clear,
        }
    } else {
        return {
            label: styles.label_error,
            error: styles.error,
        }
    }
}


export function AuthInputArea(props: {
    id: string
    labelName: string,
    error: string,
    inputValue: string,
    children: ReactNode
}) {
    const labelStyles = getLabelStyles(props.error, props.inputValue)

    return (
        <div className={styles.container}>
            <div className={styles.container_info}>
                <label className={labelStyles.label} htmlFor={props.id}>{props.labelName}</label>
                <span className={labelStyles.error}>{props.error}</span>
            </div>
            {props.children}
        </div>
    )
}