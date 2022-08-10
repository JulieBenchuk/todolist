import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'

import {v1} from 'uuid'
import {tasksReducer} from "../../features/TodolistsList/Todolist/tasks-reducer";
import {toDoListsReducer} from "../../features/TodolistsList/Todolist/toDoLists-reducer";
import thunk from "redux-thunk";



const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: toDoListsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, /*initialGlobalState,*/ applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: any) => (<Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)


