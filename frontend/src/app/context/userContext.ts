import { createContext, Dispatch, SetStateAction } from 'react'
import { UserState } from '../types'


export const UserContext = createContext<UserState | null>(null)
export const SetUserContext = createContext<Dispatch<SetStateAction<UserState | null>> | null>(null)