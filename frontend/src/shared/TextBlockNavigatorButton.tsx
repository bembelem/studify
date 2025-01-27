import { StatesTextBlock, ChangeSectionTextBlock } from '@/app/types'
import styles from '@/app/styles/styles_shared/TextBlockNavigatorButton.module.css'


const getButtonStyle = function(name: StatesTextBlock, textBlockState: StatesTextBlock) {
    return (name === textBlockState ? styles.button_active : styles.button)
}


export function TextBlockNavigatorButton(props: {
    name: StatesTextBlock,
    textBlockState: StatesTextBlock,
    changeSection: ChangeSectionTextBlock
}) {
    const buttonStyle = getButtonStyle(props.name, props.textBlockState)
    
    const buttonClick = function() {
        props.changeSection(props.name)
    }

    return (
        <button className={buttonStyle} type='button' onClick={buttonClick}>{props.name}</button>
    )
}