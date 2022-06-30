import {FilterValuesType} from "../App";
import {v1} from "uuid";
import {TodolistType} from "../api/todolist-api";

export type ActionType =
    removeTodolistActionType
    | addTodolistActionType
    | changeTodolistTitleActionType
    | changeTodolistFilterActionType
    | SetTodoloistsActionType
export type removeTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export const removeTodolistAC = (id: string): removeTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: id}
}
export type addTodolistActionType = {
    type: "ADD-TODOLIST"
    todolistID: string
    title: string
}
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
export const addTodolistAC = (title: string): addTodolistActionType => {
    return {type: "ADD-TODOLIST", todolistID: v1(), title: title}
}
type changeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}
export const changeTodolistTitleAC = (id: string, title: string): changeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}
type changeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): changeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter}
}
export type SetTodoloistsActionType = {
    type: "SET_TODOLIST"
    todolists: Array<TodolistType>
}
export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodoloistsActionType => {
    return {type: "SET_TODOLIST", todolists: todolists}
}

export let todolistID1 = v1();
export let todolistID2 = v1();
const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]
export const toDoListsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.id);
        case "ADD-TODOLIST":
            return [{
                id: action.todolistID,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
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