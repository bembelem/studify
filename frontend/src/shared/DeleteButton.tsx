import styles from '@/app/styles/styles_shared/DeleteButton.module.css'


export function DeleteButton(props: {deleteElement: () => void}) {
    return (
        <input className={styles.button} type='button' value='Удалить' onClick={props.deleteElement}></input>
    )
}