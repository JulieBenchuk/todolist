import axios, {AxiosResponse} from 'axios';
import {RequestStatusType} from "../app/app-reducer";
const settings = {
    withCredentials: true,
    headers: {
        "api-key": "551f2e1a-d9fe-4d4c-817c-0a0c51d747e0"
    }
}
const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    ...settings
})

// types
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
    entityStatus: RequestStatusType
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export type UpdateTaskDomainModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}


type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
export const taskAPI = {
    getTasks(todolistId: string) {
        const promise = instance.get<GetTasksResponse>(`/${todolistId}/tasks`)
        return promise
    },
    createTask(todolistId: string, taskTitle: string) {
        const promise = instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`/${todolistId}/tasks`, {title: taskTitle})
        return promise
    },
    deleteTask(todolistId: string, taskId: string) {
        const promise = instance.delete<ResponseType>(`/${todolistId}/tasks/${taskId}`)
        return promise
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        const promise = instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`/${todolistId}/tasks/${taskId}`, {title: model.title})
        return promise
    }
}