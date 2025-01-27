import styles from '@/app/styles/styles_shared/ChangesSaveButton.module.css'


export function ChangesSaveButton(props: {saveButtonClick: () => void}) {
    return (
        <button className={styles.button} onClick={props.saveButtonClick}>Сохранить</button>
    )
}