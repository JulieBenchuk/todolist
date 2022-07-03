import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {FilterValuesType} from "../AppWithRedux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, setTasksAC} from "./tasks-reducer";

export let todolistID1 = v1();
export let todolistID2 = v1();
const initialState: Array<TodolistDomainType> = []

export const removeTodolistAC = (id: string) => ({type: "REMOVE-TODOLIST", id: id} as const)
export const addTodolistAC = (title: string) => ({type: "ADD-TODOLIST", todolistID: v1(), title: title} as const)
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

export const fetchTodolistThunkCreator = () => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.getTodolists()
        .then(response => {
            const action = setTodolistsAC(response.data);
            dispatch(action)
        })
}
export const removeTodolistThunkCreator = (todolistID: string) => (dispatch: Dispatch<ActionType>)=> {
    todolistAPI.deleteTodolist(todolistID)
        .then(response => {
            dispatch(removeTodolistAC(todolistID))
        })
}
export const addTodolistThunkCreator = (title: string)=> (dispatch: Dispatch<ActionType>) => {
    todolistAPI.createTodolist(title)
        .then(response=> {
            dispatch(addTodolistAC(response.data.data.item))
        })
}

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

//types
export type ActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}