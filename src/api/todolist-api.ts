import axios, {AxiosResponse} from 'axios';

const settings = {
    withCredentials: true,
    headers: {
        "api-key": "d501eb2c-62af-4110-b3bd-a9b80e379d76"
    }
}
const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})
export const todolistAPI = {
    getTodolists() {
        const promise = instance.get<Array<TodolistType>>("todo-lists")
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {title: title})
        return promise
    },
    deleteTodolist(id: string) {
        const promise = instance.delete<ResponseType<{}>>(`todo-lists/${id}`)
        return promise
    },
    updateTodolistTitle(id: string, title: string) {
        const promise = instance.put<ResponseType<{}>>(`todo-lists/${id}`, {title: title})
        return promise
    }
}
export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: number }>>>("auth/login", data)
    },
    me(){
        return instance.get<ResponseType<{}>>("auth/me")
    },
    logout(){
        return instance.delete<ResponseType<{}>>("auth/login")
    }
}

//types
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: any
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}
