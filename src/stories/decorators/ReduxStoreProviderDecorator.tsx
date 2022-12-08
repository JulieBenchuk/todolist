import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers} from 'redux'
import {v1} from 'uuid'
import {tasksReducer} from "../../features/TodolistsList/Todolist/tasks-reducer";
import {toDoListsReducer} from "../../features/TodolistsList/Todolist/toDoLists-reducer";
import thunk from "redux-thunk";
import {AppRootState, RootReducerType} from "../../app/store";
import {TaskPriorities, TaskStatuses} from "../../api/task-api";
import {appReducer, RequestStatusType} from "../../app/app-reducer";
import {authReducer} from "../../features/Login/authReducer";
import {configureStore} from "@reduxjs/toolkit";
import {HashRouter} from "react-router-dom";


const rootReducer: RootReducerType = combineReducers({
    tasks: tasksReducer,
    todolists: toDoListsReducer,
    app: appReducer,
    auth: authReducer
})

const initialGlobalState: AppRootState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", entityStatus: "idle", addedDate: "", order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", entityStatus: "loading", addedDate: "", order: 0}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
                order: 0,
                addedDate: "",
                description: "",
                startDate: "",
                deadline: "",
                priority: TaskPriorities.Low,
                todoListId: "todolistId1",
                entityStatus: "idle"
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                order: 0,
                addedDate: "",
                description: "",
                startDate: "",
                deadline: "",
                priority: TaskPriorities.Low,
                todoListId: "todolistId1",
                entityStatus: "idle"
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(),
                title: "Milk",
                status: TaskStatuses.Completed,
                order: 0,
                addedDate: "",
                description: "",
                startDate: "",
                deadline: "",
                priority: TaskPriorities.Low,
                todoListId: "todolistId2",
                entityStatus: "idle"
            },
            {
                id: v1(),
                title: "React Book",
                status: TaskStatuses.Completed,
                order: 0,
                addedDate: "",
                description: "",
                startDate: "",
                deadline: "",
                priority: TaskPriorities.Low,
                todoListId: "todolistId2",
                entityStatus: "idle"
            }
        ]
    },
    app: {
        status: "succeeded" as RequestStatusType,
        error: null,
        isInitialized: true
    },
    auth: {
        isLoggedIn: false
    }
};

export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
})

export const ReduxStoreProviderDecorator = (storyFn: any) => (<HashRouter>
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>
</HashRouter>)


