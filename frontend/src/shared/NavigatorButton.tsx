import { ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import styles from '@/app/styles/styles_shared/NavigatorButton.module.css'


const getButtonStyle = function(path: string, currentPath: string | null) {
    if (path === currentPath) {
        return styles.button_active 
    } else {
        return styles.button
    }
}


export function NavigatorButton(props: {path: string, children: ReactNode}) {
    const router = useRouter()
    const currentPath = usePathname()

    const buttonClick = function() {
        router.push(props.path)
    }

    const buttonStyle = getButtonStyle(props.path, currentPath)

    return (
        <button className={buttonStyle} onClick={buttonClick}>
            {props.children}
        </button>
    )
}