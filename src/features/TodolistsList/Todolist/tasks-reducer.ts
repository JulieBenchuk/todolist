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
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./toDoLists-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";


export const fetchTasksThunkCreator = (todolistID: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC({status: "loading"}))
    taskAPI.getTasks(todolistID)
        .then((response) => {
            const action = setTasksAC({tasks: response.data.items, todolistID: todolistID});
            dispatch(action)
            dispatch(setStatusAC({status: "succeeded"}))

        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTaskThunkCreator = (taskID: string, todolistID: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC({status: "loading"}))
    dispatch(changeTaskEntityStatusAC({todolistID: todolistID, taskID: taskID, entityStatus: "loading"}))
    taskAPI.deleteTask(todolistID, taskID)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(removeTaskAC({todolistID, taskID}))
                dispatch(setStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(response.data, dispatch)
                dispatch(changeTaskEntityStatusAC({todolistID, taskID: taskID, entityStatus: "idle"}))
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
            dispatch(changeTaskEntityStatusAC({todolistID, taskID: taskID, entityStatus: "idle"}))
        })
}
export const addTaskThunkCreator = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC({status: "loading"}))
    taskAPI.createTask(todolistID, title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTaskAC({task: response.data.data.item}))
                dispatch(setStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const updateTaskThunkCreator = (todolistID: string, taskID: string, domainModel: UpdateTaskDomainModelType) => (dispatch: Dispatch, getState: () => AppRootState) => {
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
        dispatch(setStatusAC({status: "loading"}))
        dispatch(changeTaskEntityStatusAC({todolistID: todolistID, taskID: taskID, entityStatus: "loading"}))
        taskAPI.updateTask(todolistID, taskID, apiModel)
            .then(response => {
                    if (response.data.resultCode === 0) {
                        dispatch(updateTaskAC({todolistID: todolistID, taskID: taskID, model: apiModel}))
                        dispatch(setStatusAC({status: "succeeded"}))
                        dispatch(changeTaskEntityStatusAC({
                            todolistID: todolistID,
                            taskID: taskID,
                            entityStatus: "succeeded"
                        }))
                    } else {
                        handleServerAppError(response.data, dispatch)
                        dispatch(changeTaskEntityStatusAC({
                            todolistID: todolistID,
                            taskID: taskID,
                            entityStatus: "idle"
                        }))
                    }

                }
            )
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
                dispatch(changeTaskEntityStatusAC({
                    todolistID: todolistID,
                    taskID: taskID,
                    entityStatus: "failed"
                }))
            })
    } else {
        console.warn("Task is not found")
        return
    }
}

const initialState: TasksStateType = {}
const slice = createSlice({
        name: "tasks",
        initialState: initialState,
        reducers: {
            removeTaskAC(state, action: PayloadAction<{ todolistID: string, taskID: string }>) {
                const tasks = state[action.payload.todolistID]
                const index = tasks.findIndex(t => t.id === action.payload.taskID)
                if (index !== -1) {
                    tasks.splice(index, 1)
                }
            },
            addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
                const newTask = action.payload.task
                state[action.payload.task.todoListId].unshift(newTask)
            },
            updateTaskAC(state, action: PayloadAction<{ todolistID: string, taskID: string, model: UpdateTaskDomainModelType }>) {
                const tasks = state[action.payload.todolistID]
                const index = tasks.findIndex(t => t.id === action.payload.taskID)
                if (index !== -1) {
                    tasks[index] = {...tasks[index], ...action.payload.model}
                }
            },
            setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistID: string }>) {
                state[action.payload.todolistID] = action.payload.tasks
            },
            changeTaskEntityStatusAC(state, action: PayloadAction<{ todolistID: string, taskID: string, entityStatus: RequestStatusType }>) {
                const tasks = state[action.payload.todolistID]
                const index = tasks.findIndex(t => t.id === action.payload.taskID)
                if (index !== -1) {
                    tasks[index].entityStatus = action.payload.entityStatus
                }
            }
        },
        extraReducers: {
            [addTodolistAC.type]: () => {
            },
            [removeTodolistAC.type]: () => {
            },
            [setTodolistsAC.type]: () => {
            }
        }
    }
)
export const taskReducer = slice.reducer
export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC, changeTaskEntityStatusAC} = slice.actions
export const _tasksReducer = (state: TasksStateType = initialState, action: AppActionTypes): TasksStateType => {
    switch (action.type) {
        case addTodolistAC.type: {
            return {...state, [action.payload.todolist.id]: []};
        }
        case removeTodolistAC.type: {
            let copyState = {...state}
            delete copyState[action.payload.id];
            return copyState
        }
        case setTodolistsAC.type: {
            const copyState = {...state}
            action.payload.todolists.forEach((tdl: any) => {
                copyState[tdl.id] = []
            })
            return copyState
        }
    }
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}