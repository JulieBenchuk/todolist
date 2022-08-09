import {
    taskAPI,
    TaskType,
    UpdateTaskDomainModelType,
    UpdateTaskModelType
} from "../../../api/task-api";
import {Dispatch} from "redux";
import {AppActionTypes, AppRootState, AppThunkType} from "../../../app/store";
import {setErrorAC, setStatusAC} from "../../../app/app-reducer";


export const removeTaskAC = (todolistID: string, taskID: string) => ({
    type: "REMOVE-TASK",
    todolistID: todolistID,
    taskID: taskID
} as const)
export const addTaskAC = (task: TaskType) => ({
    type: "ADD-TASK",
    task
} as const)
export const updateTaskAC = (todolistID: string, taskID: string, model: UpdateTaskDomainModelType) => ({
    type: "UPDATE-TASK",
    todolistID: todolistID,
    taskID: taskID,
    model: model
} as const)

export const setTasksAC = (tasks: Array<TaskType>, todolistID: string) => ({
    type: "SET_TASK",
    tasks: tasks,
    todolistID: todolistID
} as const)

export const fetchTasksThunkCreator = (todolistID: string): AppThunkType => (dispatch) => {
    dispatch(setStatusAC("loading"))
    taskAPI.getTasks(todolistID)
        .then((response) => {
            const action = setTasksAC(response.data.items, todolistID);
            dispatch(action)
            dispatch(setStatusAC("succeeded"))
        })
}
export const removeTaskThunkCreator = (taskID: string, todolistID: string): AppThunkType => (dispatch) => {
    dispatch(setStatusAC("loading"))
    taskAPI.deleteTask(todolistID, taskID)
        .then(response => {
            dispatch(removeTaskAC(todolistID, taskID))
            dispatch(setStatusAC("succeeded"))
        })
}
export const addTaskThunkCreator = (todolistID: string, title: string): AppThunkType => (dispatch) => {
    dispatch(setStatusAC("loading"))
    taskAPI.createTask(todolistID, title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTaskAC(response.data.data.item))
                dispatch(setStatusAC("succeeded"))
            } else {
                if (response.data.messages.length) {
                    dispatch(setErrorAC(response.data.messages[0]))
                } else {
                    dispatch(setErrorAC("some error occurred :("))
                }
                dispatch(setStatusAC("failed"))
            }


        })
}
export const updateTaskThunkCreator = (todolistID: string, taskID: string, domainModel: UpdateTaskDomainModelType): AppThunkType => (dispatch, getState: () => AppRootState) => {
    const allTasksFromState = getState().tasks
    const tasksForCurrentTodo = allTasksFromState[todolistID]
    const currentTask = tasksForCurrentTodo.find(t => t.id === taskID)
    if (currentTask) {
        const apiModel: UpdateTaskModelType = {
            title: currentTask.title,
            startDate: currentTask.startDate,
            priority: currentTask.priority,
            description: currentTask.description,
            deadline: currentTask.deadline,
            status: currentTask.status,
            ...domainModel
        }
        dispatch(setStatusAC("loading"))
        taskAPI.updateTask(todolistID, taskID, apiModel)
            .then(response => {
                dispatch(updateTaskAC(todolistID, taskID, apiModel))
                dispatch(setStatusAC("succeeded"))
            })
    } else {
        console.warn("Task is not found")
        return
    }
}

const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: AppActionTypes): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)};
        case "ADD-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case "UPDATE-TASK":
            return {
                ...state, [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    ...action.model
                } : t)
            };
        case "ADD-TODOLIST": {
            return {...state, [action.todolist.id]: []};
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id];
            return copyState
        }
        case "SET_TODOLIST": {
            const copyState = {...state}
            action.todolists.forEach((tdl) => {
                copyState[tdl.id] = []
            })
            return copyState
        }
        case "SET_TASK":
            return {...state, [action.todolistID]: action.tasks}
        default:
            return state
    }
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}