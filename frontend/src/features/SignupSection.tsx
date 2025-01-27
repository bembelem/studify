import { useState, useContext, useId, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { DataAuth } from '@/app/types'
import { getNameErrors, getPasswordErrors, getPasswordConfirmationErrors } from '../app/lib/validation'
import { SetUserContext } from '@/app/context/userContext'
import { AuthInputArea } from '@/shared/AuthInputArea'
import { AuthInput } from '@/shared/AuthInput'
import { AuthButton } from '@/shared/AuthButton'
import styles from '@/app/styles/styles_features/SignupSection.module.css'


interface InputValues {
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
}


const isFulfilled = function(inputValues: InputValues) {
    return inputValues.name 
        && inputValues.email 
        && inputValues.password 
        && inputValues.password_confirmation     
}


const hasErrors = function(inputErrors: InputValues) {
    return inputErrors.name 
        || inputErrors.email 
        || inputErrors.password 
        || inputErrors.password_confirmation
}


const getFormStatus = function(inputValues: InputValues, inputErrors: InputValues) {
    if (isFulfilled(inputValues) && !hasErrors(inputErrors)) {
        return 'fulfilled'
    } else {
        return 'clear'
    }
}


export function SignupSection() {
    const [inputState, setInputState] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const setUser = useContext(SetUserContext)

    const router = useRouter()

    const formId = useId()
    const nameId = useId()
    const emailId = useId()
    const passwordId = useId()
    const password_confirmationId = useId()

    const errors = {
        name: getNameErrors(inputState.name),
        email: '',
        password: getPasswordErrors(inputState.password),
        password_confirmation: getPasswordConfirmationErrors(inputState.password, inputState.password_confirmation)
    }
    
    const handleChange = function(event: ChangeEvent<HTMLInputElement>) {
        setInputState({...inputState, [event.target.name] : event.target.value})
    }

    const signupSubmit = async function(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        fetch('http://localhost:8000/api/register', {
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
            .catch((error) => {console.log('Ошибка регистрации', error)})
    }

    return (
        <>
            <form className={styles.container} onSubmit={signupSubmit} id={formId} noValidate>
                <AuthInputArea
                id={nameId}
                labelName={'Никнейм'}
                error={errors.name}
                inputValue={inputState.name}>
                    <AuthInput
                    htmlProps={{type: 'text', name: 'name', id: nameId}} 
                    error={errors.name}
                    inputValue={inputState.name}
                    handleChange={handleChange} />
                </AuthInputArea>

                <AuthInputArea
                id={emailId}
                labelName={'Email'}
                error={errors.email}
                inputValue={inputState.email}>
                    <AuthInput
                    htmlProps={{type: 'email', name: 'email', id: emailId}} 
                    error={errors.email}
                    inputValue={inputState.email}
                    handleChange={handleChange} />
                </AuthInputArea>

                <AuthInputArea
                id={passwordId}
                labelName={'Пароль'}
                error={errors.password}
                inputValue={inputState.password}>
                    <AuthInput
                    htmlProps={{type: 'password', name: 'password', id: passwordId}} 
                    error={errors.password}
                    inputValue={inputState.password}
                    handleChange={handleChange} />
                </AuthInputArea>

                <AuthInputArea
                id={password_confirmationId}
                labelName={'Повторный пароль'}
                error={errors.password_confirmation}
                inputValue={inputState.password_confirmation}>
                    <AuthInput
                    htmlProps={{type: 'password', name: 'password_confirmation', id: password_confirmationId}} 
                    error={errors.password_confirmation}
                    inputValue={inputState.password_confirmation}
                    handleChange={handleChange} />
                </AuthInputArea>
            </form>
            <div className={styles.container_button}>
                <AuthButton htmlAttributes={{
                    type: 'submit',
                    value: 'Зарегестрироваться',
                    form: formId
                }}
                formStatus={getFormStatus(inputState, errors)} />
            </div>
        </>
    )
}