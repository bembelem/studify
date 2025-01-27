import { StatesAuth, ChangeSectionAuth } from '@/app/types'
import styles from '@/app/styles/styles_shared/AuthNavigatorButton.module.css'


export function AuthNavigatorButton(props: {
    name: StatesAuth,
    windowState: StatesAuth,
    changeSection: ChangeSectionAuth
}) {
    const buttonStyle = (props.name === props.windowState ? styles.button_active : styles.button)

    const buttonClick = function() {
        props.changeSection(props.name)
    }

    return (
        <button className={buttonStyle} onClick={buttonClick}>{props.name}</button>
    )
}