import { ChangeEvent } from 'react'
import { InfoCategories } from '@/app/types'
import { nameMap } from '@/app/initData'
import styles from '@/app/styles/styles_shared/EventInfoCheckbox.module.css'


const eventInfoStyleMap: {[filterKey in InfoCategories]: string} = {
    'practice': styles.label_practice,
    'lecture': styles.label_lecture,
    'test': styles.label_test,
    'project': styles.label_project,
    'colloquium': styles.label_colloquium,
    'homework': styles.label_homework,
}


const getLabelStyle = function(name: InfoCategories) {
    return eventInfoStyleMap[name]
}


export function EventInfoCheckbox(props: {
    name: InfoCategories, 
    checked: boolean,
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}) {
    const labelStyle = getLabelStyle(props.name)
    const labelName = nameMap[props.name]

    return (
        <label>
            <input className={styles.input} 
            type='checkbox' 
            name={props.name}
            checked={props.checked}
            onChange={props.handleChange}>
            </input>
            <span className={labelStyle}>{labelName}</span>
        </label>
    )
}