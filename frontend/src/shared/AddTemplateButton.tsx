import { TemplateInfoFull } from '@/app/types'
import { initTemplateInfo } from '@/app/initData'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import styles from '@/app/styles/styles_shared/AddTemplateButton.module.css'


export function AddTemplateButton(props: {openTemplateInfo: (templateInfo: TemplateInfoFull) => void}) {
    const buttonClick = function() {
        props.openTemplateInfo({...initTemplateInfo})
    }
    
    return (
        <button className={styles.button} onClick={buttonClick}>
            <AddOutlinedIcon className={styles.button_icon} />
        </button>
    )
}