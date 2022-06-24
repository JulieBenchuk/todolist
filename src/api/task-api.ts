import axios from 'axios';
type TaskType = {
    addedDate: string
    deadline: any
    description: any
    id: string
    order: number
    priority: number
    startDate: any
    status: number
    title: string
    todoListId: string
}
export type ResponseType<D> = {
    resultCode: number
    fieldsErrors: Array<any>
    messages: Array<string>
    data: {D: any}
}
const settings = {
    withCredentials: true,
    headers: {
        "api-key": "4c156dab-c495-4025-92d2-6d671376c376"
    }
}
const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists/",
    ...settings
})
export const taskAPI = {
    getTasks(todolistId: string) {
        const promise = instance.get<Array<TaskType>>(`${todolistId}/tasks`)
        return promise
    },
    createTask(todolistId: string, taskTitle: string) {
        const promise = instance.post<ResponseType<{item: TaskType}>>(`${todolistId}/tasks`, {title: taskTitle})
        return promise
    },
    deleteTask(todolistId: string, taskId: string) {
        const promise = instance.delete<ResponseType<{}>>(`${todolistId}/tasks/${taskId}`)
        return promise
    },
    updateTaskTitle(todolistId: string, taskId: string, newTaskTitle: string) {
        const promise = instance.put<ResponseType<{item: TaskType}>>(`${todolistId}/tasks/${taskId}`, {title: newTaskTitle})
        return promise
    }
}