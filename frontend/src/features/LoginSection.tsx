import { useState, useContext, useId, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { DataAuth } from '@/app/types'
import { SetUserContext } from '@/app/context/userContext'
import { AuthInputArea } from '@/shared/AuthInputArea'
import { AuthInput } from '@/shared/AuthInput'
import { AuthButton } from '@/shared/AuthButton'
import styles from '@/app/styles/styles_features/LoginSection.module.css'



const getFormStatus = function(inputValues: {email: string, password: string}) {
    if (inputValues.email && inputValues.password) {
        return 'fulfilled'
    } else {
        return 'clear'
    }
}


export function LoginSection() {
    const [inputState, setInputState] = useState({
        email: '',
        password: '',
    })

    const setUser = useContext(SetUserContext)

    const router = useRouter()

    const formId = useId()
    const emailId = useId()
    const passwordId = useId()

    const handleChange = function(event: ChangeEvent<HTMLInputElement>) {
        setInputState({...inputState, [event.target.name] : event.target.value})
    }

    const loginSubmit = async function(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(inputState)
        })
            .then((response) => response.json())
            .then((data: DataAuth) => {
                setUser!(data.data.user)
                router.push('/home')
            })
            .catch((error) => {console.log('Ошибка входа', error)})
    }

    return (
        <>
            <form className={styles.container} id={formId} onSubmit={loginSubmit} noValidate>
                <AuthInputArea
                id={emailId}
                labelName={'Email'}
                error={''}
                inputValue={inputState.email}>
                    <AuthInput
                    htmlProps={{type: 'email', name: 'email', id: emailId}}
                    error={''}
                    inputValue={inputState.email}
                    handleChange={handleChange} />
                </AuthInputArea>
                
                <AuthInputArea
                id={passwordId}
                labelName={'Пароль'}
                error={''}
                inputValue={inputState.password}>
                    <AuthInput
                    htmlProps={{type: 'password', name: 'password', id: passwordId}}
                    error={''}
                    inputValue={inputState.password}
                    handleChange={handleChange} />
                </AuthInputArea>
            </form>
            <div className={styles.container_button}>
                <AuthButton htmlAttributes={{
                    type: 'submit',
                    value: 'Войти',
                    form: formId
                }}
                formStatus={getFormStatus(inputState)} />
            </div>
        </>
    )
}