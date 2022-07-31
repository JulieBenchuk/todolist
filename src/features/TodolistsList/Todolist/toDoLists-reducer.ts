import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../../../api/todolist-api";
import {Dispatch} from "redux";
import {FilterValuesType} from "../../../app/App";
import {AppActionTypes, AppThunkType} from "../../../app/store";

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
export const setTodolistsAC = (todolists: Array<TodolistType>)=> ({
    type: "SET_TODOLIST",
    todolists: todolists
} as const)

export const fetchTodolistThunkCreator = (): AppThunkType => (dispatch) => {
    todolistAPI.getTodolists()
        .then((response) => {
            dispatch(setTodolistsAC(response.data))
        })
}
export const removeTodolistThunkCreator = (todolistID: string): AppThunkType => (dispatch)=> {
    todolistAPI.deleteTodolist(todolistID)
        .then(response => {
            dispatch(removeTodolistAC(todolistID))
        })
}
export const addTodolistThunkCreator = (title: string): AppThunkType => (dispatch) => {
    todolistAPI.createTodolist(title)
        .then(response=> {
            dispatch(addTodolistAC(response.data.data.item))
        })
}
export const changeTodolistTitleThunkCreator = (todolistID: string, title: string): AppThunkType => (dispatch)=> {
    todolistAPI.updateTodolistTitle(todolistID, title)
        .then(response => {
            dispatch(changeTodolistTitleAC(todolistID, title))
        })
}

export const toDoListsReducer = (state: Array<TodolistDomainType> = initialState, action: AppActionTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.id);
        case "ADD-TODOLIST":{
            const newTodolist: TodolistDomainType = {...action.todolist, filter: "all"}
            return [newTodolist, ...state]
        }

        case "CHANGE-TODOLIST-TITLE":
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t);
        case "CHANGE-TODOLIST-FILTER":
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t);
        case "SET_TODOLIST":
            return action.todolists.map(tdl => ({...tdl, filter: "all"}))
        default:
            return state;
    }
}

//types

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}