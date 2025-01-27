import { Dispatch } from "react"


export type StatesWindow = 
    | 'close' 
    | 'show'
export type StatesAuth = 
    | 'ВХОД' 
    | 'РЕГИСТРАЦИЯ'
export type StatesTextBlock = 
    | 'ДЗ' 
    | 'ЗАМЕТКИ'

export type ChangeSectionAuth = (sectionName: StatesAuth) => void
export type ChangeSectionTextBlock = (sectionName: StatesTextBlock) => void

export type TimetableDay = {[orderKey: string]: EventInfoFull}
export type TimetableWeek = {[dayKey in Weekdays]: {[orderKey: string]: EventInfoFull}}
export type Templates = {[templateKey: string]: TemplateInfoFull}
export type FiltersInfo = {[filterKey in InfoCategories] : boolean}

export type Weekdays = 
    | 'monday' 
    | 'tuesday' 
    | 'wednesday' 
    | 'thursday' 
    | 'friday' 
    | 'saturday'
export type ImpactObjectNames = 
    | 'event' 
    | 'event_today' 
export type InfoInputs = 
    | 'room' 
    | 'subject' 
    | 'teacher' 
    | 'name'
export type InfoTypes = 
    | '' 
    | 'practice' 
    | 'lecture'
export type InfoCategories = 
    | 'practice' 
    | 'lecture' 
    | 'test' 
    | 'project' 
    | 'colloquium' 
    | 'homework'
export type InfoTextAreas = 
    | 'homework' 
    | 'notes' 
    | 'description'

export interface UserState {
    id: number,
    name: string,
    email: string,
    email_verified_at?: null | string,
    updated_at: string,
    created_at: string,
}

export interface TimetableWeekState {
    timetable: TimetableWeek,
    isLoading: boolean,
    shift: number,
}

export interface TimetableTodayState {
    timetable: TimetableDay,
    isLoading: boolean,
}

export interface TemplatesState {
    templates: Templates,
    templateInfo: TemplateInfoFull,
    eventInfo: EventInfoFull,
    isLoading: boolean,
}

export interface EventInfoState {
    eventInfo: EventInfoFull,
    impactObjectName: ImpactObjectNames
    impactObjectDispatch: 
        | null 
        | Dispatch<TimetableWeekAction> 
        | Dispatch<TimetableTodayAction>
        | Dispatch<TemplatesAction>
}

export interface TemplatesCatalogState {
    templates: Templates,
    isOpen: boolean,
    isLoading: boolean,
}

type TimetableWeekActionTypes =
    | 'delete_template'
    | 'save_template'
    | 'delete_event'
    | 'save_event'
    | 'apply_template' 
    | 'clear_timetable'
    | 'switch_week'
    | 'switch_week_today'
    | 'fetch_timetable'
    | 'apply_timetable'

export interface TimetableWeekAction {
    type: TimetableWeekActionTypes,
    eventInfo?: EventInfoFull,
    timetable?: TimetableWeek,
    shift?: number,
}

type TimetableTodayActionTypes =
    | 'delete_event'
    | 'save_event'
    | 'apply_timetable'

export interface TimetableTodayAction {
    type: TimetableTodayActionTypes,
    eventInfo?: EventInfoFull,
    timetable?: TimetableDay,
}

export type TemplatesActionTypes = 
    | 'delete_template'
    | 'save_template'
    | 'delete_event'
    | 'save_event'
    | 'change_template' 
    | 'change_event'
    | 'clear_timetable'
    | 'apply_templates'

export interface TemplatesAction {
    type: TemplatesActionTypes,
    templateInfo?: TemplateInfoFull,
    eventInfo?: EventInfoFull,
    templates?: Templates
}

export interface EventInfoBase { // необходимо для внесения изменений в полученное расписание
    day: Weekdays,
    order: string,
    date: string,
}

export interface EventInfoFull extends EventInfoBase {
    id?: string
    room: string,
    subject: string,
    type: InfoTypes,
    teacher?: string,
    homework?: string,
    notes?: string,
    test?: boolean,
    project?: boolean,
    colloquium?: boolean,
    created_at?: string,
    updated_at?: string,
}

export interface TemplateInfoFull {
    id?: string
    name: string,
    description?: string,
    timetable: TimetableWeek,
    created_at?: string,
    updated_at?: string,
}

export interface Data {
    status: string,
    message: string,
}

export interface DataAuth extends Data {
    data: {
        user: UserState,
    },
}

export interface DataEvent extends Data {
    data: {
        event: EventInfoFull,
    }
}

export interface DataWeek extends Data {
    data: {
        week: TimetableWeek,
    },
}

export interface DataTemplates extends Data {
    data: Templates
}

export interface DataTemplateInfo extends Data {
    data: TemplateInfoFull,
}