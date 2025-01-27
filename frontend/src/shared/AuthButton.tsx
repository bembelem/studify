import styles from '@/app/styles/styles_shared/AuthButton.module.css'


export interface HTMLAuthButtonAttributes {
    type: 'button' | 'submit'
    value: string,
    form?: string,
}


export function AuthButton(props: {
    htmlAttributes?: HTMLAuthButtonAttributes, 
    formStatus: 'fulfilled' | 'clear',
    confirmChanges?: () => void,
}) {
    return (
        <>
            {props.formStatus === 'fulfilled'
            ?
            <input className={styles.button_active} 
            onClick={props.confirmChanges} 
            {...props.htmlAttributes}>
            </input>
            :
            <input className={styles.button} 
            {...props.htmlAttributes}
            disabled>
            </input>
            }
        </> 
    )
}