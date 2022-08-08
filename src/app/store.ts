import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, setTodolistsAC,
    toDoListsReducer
} from "../features/TodolistsList/Todolist/toDoLists-reducer";
import {
    addTaskAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer,
    updateTaskAC
} from "../features/TodolistsList/Todolist/tasks-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {appReducer} from "./app-reducer";


const rootReducer = combineReducers({
    todolists: toDoListsReducer,
    tasks: tasksReducer,
    app: appReducer
})


export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
export type AppRootState = ReturnType<typeof rootReducer>
export type AppActionTypes =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>

export type AppThunkType <ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionTypes>
// @ts-ignore
window.store = store;
