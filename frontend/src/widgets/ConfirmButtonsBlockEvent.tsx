import { DeleteButton } from '@/shared/DeleteButton'
import { AuthButton } from '@/shared/AuthButton'
import styles from '@/app/styles/styles_widgets/ConfirmButtonsBlock.module.css'
import { DataEvent, EventInfoState } from '@/app/types'


export function ConfirmButtonsBlockEvent(props: {
    formStatus: 'fulfilled' | 'clear',
    eventInfoState: EventInfoState
}) {
    const deleteButtonClick = async function() {
        if (props.eventInfoState.impactObjectName === 'event') {
            props.eventInfoState.impactObjectDispatch!({
                type: 'delete_event', 
                eventInfo: props.eventInfoState.eventInfo
            })
        } else if (props.eventInfoState.impactObjectName === 'event_today') {
            try {
                const response = await fetch(`http://localhost:8000/api/events/${props.eventInfoState.eventInfo.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    credentials: 'include',
                })
                if (response.ok) {
                    props.eventInfoState.impactObjectDispatch!({
                        type: 'delete_event', 
                        eventInfo: props.eventInfoState.eventInfo
                    })
                }
            } catch(error) {
                console.log('Ошибка удаления события на сегодня', error)
            }
        }
    }

    const confirmButtonClick = async function() {
        if (props.eventInfoState.impactObjectName === 'event') {
            props.eventInfoState.impactObjectDispatch!({type: 'save_event', eventInfo: props.eventInfoState.eventInfo})
        } else if (props.eventInfoState.impactObjectName === 'event_today') {
            fetch(`http://localhost:8000/api/events/${props.eventInfoState.eventInfo.id ?? ''}`, {
                method: (props.eventInfoState.eventInfo.id ? 'PATCH' : 'POST'),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(props.eventInfoState.eventInfo)
            }) // при наличии происходит обновление, при отсутствии - создание нового
                .then((response) => response.json())
                .then((data: DataEvent) => {
                    props.eventInfoState.impactObjectDispatch!({type: 'save_event', eventInfo: data.data.event})
                })
                .catch((error) => {console.log('Ошибка сохранения события на сегодня', error)})
        }
    }

    return (
        <div className={styles.container_submit}>
            <div className={styles.container_submit_button}>
                <DeleteButton deleteElement={deleteButtonClick}/>
            </div>
            <div className={styles.container_submit_button}>
                <AuthButton
                htmlAttributes={{
                    type: 'button',
                    value: 'Сохранить',
                }} 
                formStatus={props.formStatus}
                confirmChanges={confirmButtonClick} />
            </div>
        </div>
    )
}