import {combineReducers} from "redux";
import {toDoListsReducer} from "../features/TodolistsList/Todolist/toDoLists-reducer";
import {tasksReducer} from "../features/TodolistsList/Todolist/tasks-reducer";
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

export const RootReducerType = typeof rootReducer

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),

})


export type AppRootState = ReturnType<typeof rootReducer>
export type AppActionTypes = any


export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionTypes>

