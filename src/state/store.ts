import {combineReducers, createStore, legacy_createStore} from "redux";
import {toDoListsReducer} from "./toDoLists-reducer";
import {tasksReducer} from "./tasks-reducer";

const rootReducer = combineReducers({
    todolists: toDoListsReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer)

// @ts-ignore
window.store = store;
