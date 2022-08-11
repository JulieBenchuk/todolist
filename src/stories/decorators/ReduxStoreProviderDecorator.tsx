import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import {v1} from 'uuid'
import {tasksReducer} from "../../features/TodolistsList/Todolist/tasks-reducer";
import {toDoListsReducer} from "../../features/TodolistsList/Todolist/toDoLists-reducer";
import thunk from "redux-thunk";
import {AppRootState} from "../../app/store";
import {TaskPriorities, TaskStatuses} from "../../api/task-api";
import {appReducer, RequestStatusType} from "../../app/app-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: toDoListsReducer,
    app: appReducer
})

const initialGlobalState: AppRootState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", entityStatus: "idle", addedDate: "", order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", entityStatus: "loading", addedDate: "", order: 0}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, order: 0, addedDate: "", description: "", startDate: "", deadline: "", priority: TaskPriorities.Low, todoListId: "todolistId1", entityStatus: "idle"},
            {id: v1(), title: "JS", status: TaskStatuses.Completed, order: 0, addedDate: "", description: "", startDate: "", deadline: "", priority: TaskPriorities.Low, todoListId: "todolistId1", entityStatus: "idle"}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, order: 0, addedDate: "", description: "", startDate: "", deadline: "", priority: TaskPriorities.Low, todoListId: "todolistId2", entityStatus: "idle"},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed, order: 0, addedDate: "", description: "", startDate: "", deadline: "", priority: TaskPriorities.Low, todoListId: "todolistId2", entityStatus: "idle"}
        ]
    },
    app: {
        status: "loading" as RequestStatusType,
        error: null
    },
    auth:{
        isLoggedIn: false
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: any) => (<Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)


