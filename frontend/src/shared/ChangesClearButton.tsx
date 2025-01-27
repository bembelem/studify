import styles from '@/app/styles/styles_shared/ChangesClearButton.module.css'


export function ChangesClearButton(props: {clearButtonClick: () => void}) {
    return (
        <button className={styles.button} onClick={props.clearButtonClick}>Очистить</button>
    )
}