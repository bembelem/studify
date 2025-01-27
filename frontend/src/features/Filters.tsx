import { useState, ChangeEvent } from 'react'
import { FiltersInfo, StatesWindow } from '@/app/types'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { EventInfoCheckbox } from '@/shared/EventInfoCheckbox'
import styles from '@/app/styles/styles_features/Filters.module.css'


const getFilterStyle = function(windowState: StatesWindow) {
    if (windowState === 'close') {
        return {
            icon: styles.icon_close,
            window: styles.container_close,
        }
    } else {
        return {
            icon: styles.icon_show,
            window: styles.container_show,
        }
    }
}


export function Filters(props: {
    currentFilters: FiltersInfo,
    changeFilters: (filters: FiltersInfo) => void
}) {
    const [windowState, setWindowState] = useState<StatesWindow>('close')

    const filtersClick = function()  {
        if (windowState === 'show') {
            setWindowState('close')
        } else {
            setWindowState('show')
        }
    }

    const handleFiltersChange = function(event: ChangeEvent<HTMLInputElement>) {
        props.changeFilters({...props.currentFilters, [event.target.name]: event.target.checked})
    }

    const filterStyle = getFilterStyle(windowState)

    return (
        <div>
            <div className={styles.filters} onClick={filtersClick}>
                <h3>Фильтры</h3>
                <ArrowDropDownIcon className={filterStyle.icon} />
            </div>
            <div className={filterStyle.window}>
                <EventInfoCheckbox 
                name='practice' 
                checked={props.currentFilters['practice']}
                handleChange={handleFiltersChange} />
                <EventInfoCheckbox 
                name='lecture' 
                checked={props.currentFilters['lecture']}
                handleChange={handleFiltersChange} />
                <EventInfoCheckbox 
                name='test' 
                checked={props.currentFilters['test']}
                handleChange={handleFiltersChange} />
                <EventInfoCheckbox 
                name='project' 
                checked={props.currentFilters['project']}
                handleChange={handleFiltersChange} />
                <EventInfoCheckbox 
                name='colloquium' 
                checked={props.currentFilters['colloquium']}
                handleChange={handleFiltersChange} />
                <EventInfoCheckbox 
                name='homework' 
                checked={props.currentFilters['homework']}
                handleChange={handleFiltersChange} />
            </div>
        </div>
    )
}