import { ChangeEvent } from 'react'
import { InfoTextAreas } from '@/app/types'
import styles from '@/app/styles/styles_shared/EventInfoText.module.css'


interface HTMLAttributesEventInfoText {
    name: InfoTextAreas,
    placeholder: string,
    value: string
}


export function EventInfoText(props: {
    htmlAttrs: HTMLAttributesEventInfoText,
    handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}) {
    return (
        <textarea className={styles.text} 
        {...props.htmlAttrs}
        onChange={props.handleChange}>
        </textarea>
    )
}