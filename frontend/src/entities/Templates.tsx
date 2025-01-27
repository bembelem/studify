import { Dispatch } from 'react'
import { TemplatesState, TemplatesAction, TemplateInfoFull, EventInfoFull } from '@/app/types'
import { TemplatesBoard } from '@/widgets/TemplatesBoard'
import { TemplateCurrent } from '@/widgets/TemplateCurrent'
import styles from '@/app/styles/styles_entities/Templates.module.css'


export function Templates(props: {
    templatesState: TemplatesState,
    dispatch: Dispatch<TemplatesAction>,
    openTemplateInfo: (templateInfo: TemplateInfoFull) => void
    openEventInfo: (eventInfo: EventInfoFull) => void
}) {
    return (
        <main className={styles.container}>
            <TemplatesBoard 
            templatesState={props.templatesState}
            dispatch={props.dispatch} 
            openTemplateInfo={props.openTemplateInfo} />
            <TemplateCurrent 
            templatesState={props.templatesState}
            dispatch={props.dispatch}
            openEventInfo={props.openEventInfo} />
        </main>
    )
}