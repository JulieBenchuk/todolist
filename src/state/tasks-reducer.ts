import {v1} from "uuid";
import {
    addTodolistActionType,
    removeTodolistActionType,
    SetTodoloistsActionType,
    todolistID1,
    todolistID2
} from "./toDoLists-reducer";
import {taskAPI, TaskPriorities, TaskStatuses, TaskType} from "../api/task-api";
import {Dispatch} from "redux";

export type ActionType =
    removeTaskActionType
    | addTaskActionType
    | changeTaskTitleActionType
    | changeTaskStatusActionType
    | addTodolistActionType
    | removeTodolistActionType
    | SetTodoloistsActionType
    | setTasksActionType

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type removeTaskActionType = {
    type: "REMOVE-TASK"
    todolistID: string
    taskID: string
}
export const removeTaskAC = (todolistID: string, taskID: string): removeTaskActionType => {
    return {type: "REMOVE-TASK", todolistID: todolistID, taskID: taskID}
}
type addTaskActionType = {
    type: "ADD-TASK"
    todolistID: string
    taskID: string
    title: string
}
export const addTaskAC = (todolistID: string, title: string): addTaskActionType => {
    return {type: "ADD-TASK", taskID: v1(), todolistID: todolistID, title: title}
}
type changeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    todolistID: string
    taskID: string
    title: string
}
export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string): changeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", todolistID: todolistID, taskID: taskID, title: title}
}
type changeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    todolistID: string
    status: TaskStatuses
    taskID: string
}
export const changeTaskStatusAC = (todolistID: string, status: TaskStatuses, taskID: string): changeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", todolistID: todolistID, status: status, taskID: taskID}
}

type setTasksActionType = {
    type: "SET_TASK"
    tasks: Array<TaskType>
    todolistID: string
}
export const setTasksAC = (tasks: Array<TaskType>, todolistID: string):setTasksActionType =>{
    return {type: "SET_TASK", tasks: tasks, todolistID: todolistID}
}
export const fetchTasksThunkCreator = (todolistID: string) => {
    return (dispatch: Dispatch)=> {
        taskAPI.getTasks(todolistID)
            .then(response=>{
                debugger
                const action = setTasksAC(response.data.items, todolistID);
                dispatch(action)
            })
    }
}

const initialState: TasksStateType = {
    "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
        ]
}
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
            copyState[action.todolistID]=action.tasks
            return copyState
        }
        default:
            return state
    }
}