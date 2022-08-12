import {
    taskAPI,
    TaskType,
    UpdateTaskDomainModelType,
    UpdateTaskModelType
} from "../../../api/task-api";
import {AppActionTypes, AppRootState, AppThunkType} from "../../../app/store";
import {RequestStatusType, setStatusAC} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {actions} from "@storybook/addon-actions";


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
export const changeTaskEntityStatusAC = (todolistID: string, taskID: string, entityStatus: RequestStatusType)=> ({
    type: "CHANGE_TASK_ENTITY_STATUS",
    todolistID,
    taskID,
    entityStatus
} as const)

export const fetchTasksThunkCreator = (todolistID: string): AppThunkType => (dispatch) => {
    dispatch(setStatusAC("loading"))
    taskAPI.getTasks(todolistID)
        .then((response) => {
            const action = setTasksAC(response.data.items, todolistID);
            dispatch(action)
            dispatch(setStatusAC("succeeded"))

        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTaskThunkCreator = (taskID: string, todolistID: string): AppThunkType => (dispatch) => {
    dispatch(setStatusAC("loading"))
    dispatch(changeTaskEntityStatusAC(todolistID, taskID, "loading"))
    taskAPI.deleteTask(todolistID, taskID)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(removeTaskAC(todolistID, taskID))
                dispatch(setStatusAC("succeeded"))
            } else {
                handleServerAppError(response.data, dispatch)
                dispatch(changeTaskEntityStatusAC(todolistID, taskID, "idle"))
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
            dispatch(changeTaskEntityStatusAC(todolistID, taskID, "idle"))
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
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
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
        dispatch(changeTaskEntityStatusAC(todolistID, taskID, "loading"))
        taskAPI.updateTask(todolistID, taskID, apiModel)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(updateTaskAC(todolistID, taskID, apiModel))
                    dispatch(setStatusAC("succeeded"))
                    dispatch(changeTaskEntityStatusAC(todolistID, taskID, "succeeded"))
                } else {
                    handleServerAppError(response.data, dispatch)
                    dispatch(changeTaskEntityStatusAC(todolistID, taskID, "idle"))
                }

            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
                dispatch(changeTaskEntityStatusAC(todolistID, taskID, "failed"))
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
        case "CHANGE_TASK_ENTITY_STATUS":
            return {...state, [action.todolistID]: state[action.todolistID].map(t=> t.id===action.taskID ? {...t, entityStatus: action.entityStatus} : t)}
        default:
            return state
    }
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}