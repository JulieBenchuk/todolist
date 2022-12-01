import {combineReducers} from "redux";
import {
    addTodolistAC, changeTodolistEntityStatusAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, setTodolistsAC,
    toDoListsReducer
} from "../features/TodolistsList/Todolist/toDoLists-reducer";
import {
    addTaskAC, changeTaskEntityStatusAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer,
    updateTaskAC
} from "../features/TodolistsList/Todolist/tasks-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/authReducer";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    todolists: toDoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),

})

export type AppRootState = ReturnType<typeof rootReducer>
export type AppActionTypes = any
   /* | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>
    | setErrorACType
    | setStatusACType
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | ReturnType<typeof changeTaskEntityStatusAC>*/


export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionTypes>

