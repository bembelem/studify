import { useId, ChangeEvent } from 'react'
import { InfoTypes } from '@/app/types'
import { nameMap } from '@/app/initData'
import styles from '@/app/styles/styles_shared/EventInfoRadio.module.css'


export function EventInfoRadio(props: {
    checkedRadio: InfoTypes, 
    value: InfoTypes,
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
}) {
    const radioId = useId()
    const labelName = nameMap[props.value]

    return (
        <div className={styles.container}>
            <input className={styles.input} 
            type='radio' 
            name='type' 
            id={radioId}
            value={props.value}
            checked={props.value === props.checkedRadio}
            onChange={props.handleChange}>
            </input>
            <label className={styles.label} htmlFor={radioId}>{labelName}</label>
        </div>
    )
}