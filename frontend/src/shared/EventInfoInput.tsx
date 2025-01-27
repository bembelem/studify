import { ChangeEvent } from 'react'
import { InfoInputs } from '@/app/types'
import styles from '@/app/styles/styles_shared/EventInfoInput.module.css'


interface HTMLAttributesEventInfoInput {
    name: InfoInputs,
    placeholder: string,
    value: string
}


export function EventInfoInput(props: {
    htmlAttrs: HTMLAttributesEventInfoInput,
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}) {
    return (
        <input className={styles.input} 
        type='text' 
        {...props.htmlAttrs}
        onChange={props.handleChange}>
        </input>
    )
}