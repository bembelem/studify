import { useState, Dispatch } from 'react'
import { TemplatesState, TemplatesAction, EventInfoFull, FiltersInfo } from '@/app/types'
import { initEventCategories } from '@/app/initData'
import { TemplateHeader } from '@/features/TemplateHeader'
import { WeekTimetableInfo } from '@/features/WeekTimetableInfo'
import styles from '@/app/styles/styles_widgets/TemplateCurrent.module.css'


export function TemplateCurrent(props: {
    templatesState: TemplatesState,
    dispatch: Dispatch<TemplatesAction>,
    openEventInfo: (event: EventInfoFull) => void
}) {
    const [filtersState, setFiltersState] = useState(initEventCategories)

    const changeFilters = function(filters: FiltersInfo) {
        setFiltersState(filters)
    }

    return (
        <section className={styles.container}>
            <TemplateHeader
            templatesState={props.templatesState}
            dispatch={props.dispatch}
            currentFilters={filtersState}
            changeFilters={changeFilters} />
            <WeekTimetableInfo 
            isLoading={props.templatesState.isLoading}
            currentTimetable={props.templatesState.templateInfo.timetable} 
            currentFilters={filtersState} 
            openEventInfo={props.openEventInfo} /> 
        </section>
    )
}