import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import {toDoListsReducer} from "./toDoLists-reducer";
import {tasksReducer} from "./tasks-reducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    todolists: toDoListsReducer,
    tasks: tasksReducer
})


export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
export type AppRootState = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
