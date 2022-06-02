import {FilterValuesType, todolistsType} from "../App";
import {v1} from "uuid";

export type ActionType = removeTodolistActionType | addTodolistActionType | changeTodolistTitleActionType | changeTodolistFilterActionType
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
export const addTodolistAC = (title: string): addTodolistActionType=> {
    return {type: "ADD-TODOLIST", todolistID: v1(), title: title}
}
type changeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}
export const changeTodolistTitleAC = (id: string, title: string): changeTodolistTitleActionType=> {
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}
type changeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): changeTodolistFilterActionType=> {
    return { type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter}
}

export const toDoListsReducer = (state: Array<todolistsType>, action: ActionType): Array<todolistsType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.id);
        case "ADD-TODOLIST":
            return [{id: action.todolistID, title: action.title, filter: 'all'}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(t=>t.id===action.id ? {...t, title: action.title} : t );
        case "CHANGE-TODOLIST-FILTER":
            return state.map(t=>t.id===action.id ? {...t, filter: action.filter} : t)
        default:
            return state;
    }
}