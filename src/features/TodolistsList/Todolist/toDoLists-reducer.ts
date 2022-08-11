import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../../../api/todolist-api";
import {FilterValuesType} from "../../../app/App";
import {AppActionTypes, AppThunkType} from "../../../app/store";
import {RequestStatusType, setErrorAC, setStatusAC} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";

export let todolistID1 = v1();
export let todolistID2 = v1();
const initialState: Array<TodolistDomainType> = []

export const removeTodolistAC = (id: string) => ({type: "REMOVE-TODOLIST", id: id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist: todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    id: id,
    title: title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: "CHANGE-TODOLIST-FILTER",
    id: id,
    filter: filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({
    type: "SET_TODOLIST",
    todolists: todolists
} as const)
export const changeTodolistEntityStatusAC = (todolistID: string, entityStatus: RequestStatusType) => ({
    type: "CHANGE-TODOLIST-ENTITY-STATUS",
    todolistID,
    entityStatus
} as const)

export const fetchTodolistThunkCreator = (): AppThunkType => (dispatch) => {
    dispatch(setStatusAC("loading"))
    todolistAPI.getTodolists()
        .then((response) => {
            dispatch(setTodolistsAC(response.data))
            dispatch(setStatusAC("succeeded"))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTodolistThunkCreator = (todolistID: string): AppThunkType => (dispatch) => {
    dispatch(setStatusAC("loading"))
    dispatch(changeTodolistEntityStatusAC(todolistID, "loading"))
    todolistAPI.deleteTodolist(todolistID)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistID))
                dispatch(setStatusAC("succeeded"))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const addTodolistThunkCreator = (title: string): AppThunkType => (dispatch) => {
    dispatch(setStatusAC("loading"))
    todolistAPI.createTodolist(title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTodolistAC(response.data.data.item))
                dispatch(setStatusAC("succeeded"))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const changeTodolistTitleThunkCreator = (todolistID: string, title: string): AppThunkType => (dispatch) => {
    dispatch(setStatusAC("loading"))
    todolistAPI.updateTodolistTitle(todolistID, title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todolistID, title))
                dispatch(setStatusAC("succeeded"))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const toDoListsReducer = (state: Array<TodolistDomainType> = initialState, action: AppActionTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.id);
        case "ADD-TODOLIST": {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: "all", entityStatus: "idle"}
            return [newTodolist, ...state]
        }

        case "CHANGE-TODOLIST-TITLE":
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t);
        case "CHANGE-TODOLIST-FILTER":
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t);
        case "SET_TODOLIST":
            return action.todolists.map(tdl => ({...tdl, filter: "all", entityStatus: "idle"}));
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(t => t.id === action.todolistID ? {...t, entityStatus: action.entityStatus} : t);
        default:
            return state;
    }
}

//types

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}