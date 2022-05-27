import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {TasksType} from "../App";

export type ActionType = removeTaskActionType | addTaskActionType | changeTaskTitleActionType
type removeTaskActionType = {
    type: "REMOVE-TASK"
    todolistID: string
    taskID: string
}
export const removeTaskAC = (todolistID: string, taskID: string ): removeTaskActionType => {
    return {type: "REMOVE-TASK", todolistID: todolistID, taskID: taskID}
}
type addTaskActionType = {
    type: "ADD-TASK"
    todolistID: string
    taskID: string
    title: string
}
export const addTaskAC = (todolistID: string, title: string): addTaskActionType=> {
    return {type: "ADD-TASK", taskID: v1(), todolistID: todolistID, title: title}
}
type changeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    todolistID: string
    taskID: string
    title: string
}
export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string): changeTaskTitleActionType=> {
    return {type: "CHANGE-TASK-TITLE", todolistID: todolistID, taskID: taskID, title: title}
}

export const tasksReducer = (state: TasksType, action: ActionType): TasksType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state, [action.todolistID]: state[action.todolistID].filter(t=>t.id!==action.taskID)
            };
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistID]: [...state[action.todolistID], {id: action.taskID, title: action.title, isDone: false}]
            };
        case "CHANGE-TASK-TITLE":
            return {
                ...state, [action.todolistID]: state[action.todolistID].map(t=>t.id===action.taskID ? {...t, title: action.title}: t)
            }
        default:
            return state;
    }
}