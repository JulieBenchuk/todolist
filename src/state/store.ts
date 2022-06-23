import {combineReducers, compose, legacy_createStore} from "redux";
import {toDoListsReducer} from "./toDoLists-reducer";
import {tasksReducer} from "./tasks-reducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const rootReducer = combineReducers({
    todolists: toDoListsReducer,
    tasks: tasksReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(rootReducer, composeEnhancers());
export type AppRootState = ReturnType<typeof rootReducer>
/*export const store = legacy_createStore(rootReducer)*/


// @ts-ignore
window.store = store;
