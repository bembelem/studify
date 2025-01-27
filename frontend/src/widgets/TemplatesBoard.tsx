import { Dispatch } from 'react'
import { TemplatesState, TemplatesAction, TemplateInfoFull } from '@/app/types'
import { Loader } from '@/shared/Loader'
import { AddTemplateButton } from '@/shared/AddTemplateButton'
import { Template } from './Template'
import styles from '@/app/styles/styles_widgets/TemplatesBoard.module.css'


export function TemplatesBoard(props: {
    templatesState: TemplatesState,
    dispatch: Dispatch<TemplatesAction>,
    openTemplateInfo: (templateInfo: TemplateInfoFull) => void
}) {
    const getTemplatesList = function() {
        const templatesList = []
        for (let template in props.templatesState.templates) {
            const templateKey = crypto.randomUUID()
            templatesList.push(
                <Template 
                key={templateKey} 
                templateInfo={props.templatesState.templates[template]} 
                currentTemplateId={props.templatesState.templateInfo.id}
                dispatch={props.dispatch}
                openTemplateInfo={props.openTemplateInfo} />
            )
        }

        return templatesList
    }

    const templatesList = getTemplatesList()

    return (
        <section className={styles.container}>
            <header className={styles.container_header}>
                <h2>Ваши шаблоны</h2>
            </header>
            <div className={styles.container_templates}>
                {props.templatesState.isLoading
                ?
                <div className={styles.container_loader}>
                    <Loader />
                </div>
                :
                <>
                    <AddTemplateButton openTemplateInfo={props.openTemplateInfo}/>
                    {templatesList}
                </>
                }
            </div>
        </section>
    )
}