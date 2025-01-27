import { useState, ChangeEvent } from 'react'
import { StatesTextBlock } from '@/app/types'
import { TextBlockNavigatorButton } from '@/shared/TextBlockNavigatorButton'
import { EventInfoText } from '@/shared/EventInfoText'
import styles from '@/app/styles/styles_widgets/EventInfoTextBlock.module.css'


interface EventInfoTextBlocks {
    homework: string,
    notes: string,
}


export function EventInfoTextBlock(props: {
    values: EventInfoTextBlocks,
    handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}) {
    const [textBlockState, setTextBlockState] = useState<StatesTextBlock>('ДЗ')

    const changeSection = function(sectionName: StatesTextBlock) {
        setTextBlockState(sectionName)
    }

    return (
        <div className={styles.container} >
            <div className={styles.container_button}>
                <TextBlockNavigatorButton
                name={'ДЗ'}
                textBlockState={textBlockState} 
                changeSection={changeSection} />
                <TextBlockNavigatorButton
                name={'ЗАМЕТКИ'}
                textBlockState={textBlockState} 
                changeSection={changeSection} />
            </div>
            {textBlockState === 'ДЗ'
            ?
            <EventInfoText
            htmlAttrs={{
                name: 'homework',
                placeholder: 'Здесь можно написать ДЗ...',
                value: props.values.homework
            }} 
            handleChange={props.handleChange} />
            :
            <EventInfoText 
            htmlAttrs={{
                name: 'notes',
                placeholder: 'А здесь заметки...',
                value: props.values.notes
            }} 
            handleChange={props.handleChange} />
            }
        </div>
    )
}