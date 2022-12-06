import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../../../api/todolist-api";
import {FilterValuesType} from "../../../app/App";
import {RequestStatusType, setStatusAC} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";

export let todolistID1 = v1();
export let todolistID2 = v1();
const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: "toDoLists",
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{id: string}>){
            const index = state.findIndex(tl=>tl.id === action.payload.id)
            if(index!==-1){
                state.splice(index, 1)
            }

        },
        addTodolistAC(state, action: PayloadAction<{todolist: TodolistType}>){
            const newTodolist: TodolistDomainType = {...action.payload.todolist, filter: "all", entityStatus: "idle"}
            state.unshift(newTodolist)
        },
        changeTodolistTitleAC(state, action: PayloadAction<{id: string, title: string}>){
            const index = state.findIndex(tl=>tl.id === action.payload.id)
            if(index!==-1){
                state[index].title = action.payload.title
            }
        },
        changeTodolistFilterAC(state, action: PayloadAction<{id: string, filter: FilterValuesType}>){
            const index = state.findIndex(tl=>tl.id === action.payload.id)
            if(index!==-1){
                state[index].filter = action.payload.filter
            }
        },
        setTodolistsAC(state, action: PayloadAction<{todolists: Array<TodolistType>}>){
            return action.payload.todolists.forEach(tl=>({...tl, filter: "all", entityStatus: "idle"})) //or MAP??????
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{todolistID: string, entityStatus: RequestStatusType}>){
            const index = state.findIndex(tl=>tl.id === action.payload.todolistID)
            if(index!==-1){
                state[index].entityStatus = action.payload.entityStatus
            }
        },

    }
})
export const toDoListsReducer = slice.reducer
export const {removeTodolistAC, addTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, setTodolistsAC, changeTodolistEntityStatusAC} = slice.actions

export const fetchTodolistThunkCreator = () => (dispatch: Dispatch) => {
    dispatch(setStatusAC({status:"loading"}))
    todolistAPI.getTodolists()
        .then((response) => {
            dispatch(setTodolistsAC({todolists: response.data}))
            dispatch(setStatusAC({status:"succeeded"}))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTodolistThunkCreator = (todolistID: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC({status:"loading"}))
    dispatch(changeTodolistEntityStatusAC({todolistID: todolistID, entityStatus: "loading"}))
    todolistAPI.deleteTodolist(todolistID)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(removeTodolistAC({id: todolistID}))
                dispatch(setStatusAC({status:"succeeded"}))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const addTodolistThunkCreator = (title: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC({status:"loading"}))
    todolistAPI.createTodolist(title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTodolistAC({todolist: response.data.data.item}))
                dispatch(setStatusAC({status:"succeeded"}))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const changeTodolistTitleThunkCreator = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC({status:"loading"}))
    todolistAPI.updateTodolistTitle(todolistID, title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC({id: todolistID, title: title}))
                dispatch(setStatusAC({status:"succeeded"}))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}


//types
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}