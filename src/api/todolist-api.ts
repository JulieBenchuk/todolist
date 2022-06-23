import axios from 'axios';

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: { D: any }
}


const settings = {
    withCredentials: true,
    headers: {
        "api-key": "39867000-e13b-4b12-9050-13ca63da81b6"
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