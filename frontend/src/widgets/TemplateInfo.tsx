import { Dispatch, RefObject, ChangeEvent } from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import { TemplateInfoFull, TemplatesAction } from '@/app/types'
import { EventInfoInput } from '@/shared/EventInfoInput'
import { EventInfoText } from '@/shared/EventInfoText'
import { ConfirmButtonsBlockTemplate } from './ConfirmButtonsBlockTemplate'
import styles from '@/app/styles/styles_widgets/TemplateInfo.module.css'


const getTemplateInfoStatus = function(name: string) {
    return (name ? 'fulfilled' : 'clear')
}


export function TemplateInfo(props: {
    templateInfoRef: RefObject<HTMLDialogElement>,
    templateInfo: TemplateInfoFull,
    dispatch: Dispatch<TemplatesAction>,
    closeTemplateInfo: () => void,
}) {
    const handleInputChange = function(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const newTemplateInfo = {...props.templateInfo, [event.target.name]: event.target.value}

        props.dispatch({type: 'change_template', templateInfo: newTemplateInfo})
    }
    
    return (
        <dialog ref={props.templateInfoRef} className={styles.container}>
            <ClearIcon className={styles.button} onClick={props.closeTemplateInfo}/>
            <form className={styles.container_form}>
                <EventInfoInput 
                htmlAttrs={{
                    name: 'name',
                    placeholder: 'Название шаблона*',
                    value: props.templateInfo.name
                }}
                handleChange={handleInputChange} />
                <EventInfoText
                htmlAttrs={{
                    name: 'description',
                    placeholder: 'Здесь можно описать шаблон...',
                    value: (props.templateInfo.description ?? '')
                }}
                handleChange={handleInputChange} />
                <ConfirmButtonsBlockTemplate 
                formStatus={getTemplateInfoStatus(props.templateInfo.name)}
                templateInfo={props.templateInfo}
                dispatch={props.dispatch}
                />
            </form>
        </dialog>
    )
}