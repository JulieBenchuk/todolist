import {FilterValuesType, todolistsType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}
type AllActionTypes = removeTodolistType | addTodolistType | changeTodolistTitleType | changeTodolistFilterType
type removeTodolistType = {
    type: "REMOVE-TODOLIST"
    id: string
}
type addTodolistType = {
    type: "ADD-TODOLIST"
    title: string
}
type changeTodolistTitleType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string

}
type changeTodolistFilterType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}

export const toDoListsReducer = (state: Array<todolistsType>, action: AllActionTypes): Array<todolistsType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.id);
        case "ADD-TODOLIST":
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(t=>t.id===action.id ? {...t, title: action.title} : t );
        case "CHANGE-TODOLIST-FILTER":
            return state.map(t=>t.id===action.id ? {...t, filter: action.filter} : t)
        default:
            return state;
    }
}