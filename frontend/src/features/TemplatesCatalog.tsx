import { useState, Dispatch, useEffect } from 'react'
import { TimetableWeekAction, DataTemplates } from '@/app/types'
import { initTemplatesCatalogState } from '@/app/initData'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { TemplateCard } from '@/widgets/TemplateCard'
import { Loader } from '@/shared/Loader'
import styles from '@/app/styles/styles_features/TemplatesCatalog.module.css'


const getTemplatesCatalogStyle = function(isOpen: boolean) {
    if (isOpen) {
        return {
            icon: styles.icon_show,
            window: styles.container_show,
        }
    } else {
        return {
            icon: styles.icon_close,
            window: styles.container_close,
        }
    }
}


export function TemplatesCatalog(props: {dispatch: Dispatch<TimetableWeekAction>}) {
    const [templatesCatalogState, setTemplatesCatalogState] = useState(initTemplatesCatalogState)

    const templatesCatalogClick = function() {
        if (templatesCatalogState.isOpen) {
            setTemplatesCatalogState({...templatesCatalogState, isOpen: false})
        } else {
            setTemplatesCatalogState({...templatesCatalogState, isOpen: true})
        }
    }

    const getTemplateCardList = function() {
        const templateCardList = []
        for (let template in templatesCatalogState.templates) {
            const templateKey = crypto.randomUUID()
            templateCardList.push(
                <TemplateCard 
                key={templateKey} 
                templateInfo={templatesCatalogState.templates[template]}
                dispatch={props.dispatch} />
            )
        }

        return templateCardList
    }

    useEffect(() => {
        fetch('http://localhost:8000/api/week-templates', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data: DataTemplates) => {
                    setTemplatesCatalogState({
                        ...templatesCatalogState,
                        templates: data.data,
                        isLoading: false,
                    })
            })
            .catch((error) => {console.log('Ошибка получения каталога шаблонов', error)})
    }, [])

    const templateCardList = getTemplateCardList()
    const templatesCatalogStyle = getTemplatesCatalogStyle(templatesCatalogState.isOpen)

    return (
        <div>
            <div className={styles.templates} onClick={templatesCatalogClick}>
                <h3>Шаблоны</h3>
                <ArrowDropDownIcon className={templatesCatalogStyle.icon} />
            </div>
            <ul className={templatesCatalogStyle.window}>
                {templatesCatalogState.isLoading
                ?
                <div className={styles.container_loader}>
                    <Loader />
                </div>
                :
                templateCardList
                }
            </ul>
        </div>
    )
}