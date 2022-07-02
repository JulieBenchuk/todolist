import {v1} from "uuid";
import {taskAPI, TaskPriorities, TaskStatuses, TaskType} from "../api/task-api";
import {Dispatch} from "redux";
import {ActionType} from "./toDoLists-reducer";

export const removeTaskAC = (todolistID: string, taskID: string) => ({
    type: "REMOVE-TASK",
    todolistID: todolistID,
    taskID: taskID
} as const)
export const addTaskAC = (todolistID: string, title: string) => ({
    type: "ADD-TASK",
    taskID: v1(),
    todolistID: todolistID,
    title: title
} as const)
export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string) => ({
    type: "CHANGE-TASK-TITLE",
    todolistID: todolistID,
    taskID: taskID,
    title: title
} as const)
export const changeTaskStatusAC = (todolistID: string, status: TaskStatuses, taskID: string) => ({
    type: "CHANGE-TASK-STATUS",
    todolistID: todolistID,
    status: status,
    taskID: taskID
} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistID: string) => ({
    type: "SET_TASK",
    tasks: tasks,
    todolistID: todolistID
} as const)
export const fetchTasksThunkCreator = (todolistID: string) => (dispatch: Dispatch) => {
    taskAPI.getTasks(todolistID)
        .then(response => {
            const action = setTasksAC(response.data.items, todolistID);
            dispatch(action)
        })
}

const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)
            };
        case "ADD-TASK": {
            const stateCopy = {...state}
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todolistID, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
            const tasks = stateCopy[action.todolistID];
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistID] = newTasks;
            return stateCopy;
        }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    title: action.title
                } : t)
            };
        case "ADD-TODOLIST":
            return {
                [action.todolistID]: [], ...state
            };
        case "CHANGE-TASK-STATUS":
            return {
                ...state, [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    status: action.status
                } : t)
            };
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id];
            return copyState
        }
        case "SET_TODOLIST": {
            let copyState = {...state}
            action.todolists.forEach((tdl) => {
                copyState[tdl.id] = []
            })
            return copyState
        }
        case "SET_TASK": {
            let copyState = {...state}
            copyState[action.todolistID] = action.tasks
            return copyState
        }
        default:
            return state
    }
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}