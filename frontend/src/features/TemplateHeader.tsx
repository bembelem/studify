import { Dispatch } from 'react'
import { TemplatesState, FiltersInfo, TemplatesAction, DataTemplateInfo } from '@/app/types'
import { Filters } from './Filters'
import { ChangesClearButton } from '@/shared/ChangesClearButton'
import { ChangesSaveButton } from '@/shared/ChangesSaveButton'
import styles from '@/app/styles/styles_features/TemplateHeader.module.css'


export function TemplateHeader(props: {
    templatesState: TemplatesState,
    dispatch: Dispatch<TemplatesAction>,
    currentFilters: FiltersInfo,
    changeFilters: (filters: FiltersInfo) => void
}) {
    const clearButtonClick = function() {
        props.dispatch({type: 'clear_timetable'})
    }

    const saveButtonClick = async function() {
        fetch(`http://localhost:8000/api/week-templates/${props.templatesState.templateInfo.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(props.templatesState.templateInfo)
        }) // с id, потому что такое сохранение работатет только с созданными
            .then((response) => response.json())
            .then((data: DataTemplateInfo) => {
                props.dispatch({type: 'save_template', templateInfo: data.data})
            })
            .catch((error) => {console.log('Ошибка обновления шаблона', error)})
    }

    return (
        <header className={styles.container}>
            <div className={styles.container_block}>
                <Filters 
                currentFilters={props.currentFilters}
                changeFilters={props.changeFilters} />
            </div>
            <div className={styles.container_block}>
                <h1>{props.templatesState.templateInfo.name}</h1>
            </div>
            <div className={styles.container_block}>
                <ChangesClearButton clearButtonClick={clearButtonClick} />
                <ChangesSaveButton saveButtonClick={saveButtonClick} />
            </div>
        </header>
    )
}