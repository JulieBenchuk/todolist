import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    toDoListsReducer
} from "./test/toDoLists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./test/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchToTodolistsReducer] = useReducer(toDoListsReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer,{
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false}
        ]
    });

/// fn for tasks
    function removeTask(todoListID: string, id: string) {
        const action = removeTaskAC(todoListID, id)
        dispatchToTasksReducer(action)
    }

    function addTask(todoListID: string, title: string) {
        const action = addTaskAC(todoListID, title)
        dispatchToTasksReducer(action)
    }

    function changeStatus(todoListID: string, taskId: string, isDone: boolean) {
        const action = changeTaskStatusAC(todoListID, taskId, isDone)
        dispatchToTasksReducer(action)
    }

    function changeTaskTitle(todolistID: string, taskID: string, newTitle: string) {
        const action = changeTaskTitleAC(todolistID, taskID, newTitle)
        dispatchToTasksReducer(action)
    }

    /// fn tor todolists
    function changeFilter(todoListID: string, value: FilterValuesType) {
        const action = changeTodolistFilterAC(todoListID, value)
        dispatchToTodolistsReducer(action)
    }

    function addTodoList(title: string) {
        const action = addTodolistAC(title)
        dispatchToTodolistsReducer(action)
    }

    function onChangeTDLTitle(todoListID: string, newTitle: string) {
        const action = changeTodolistTitleAC(todoListID, newTitle)
        dispatchToTodolistsReducer(action)
    }

    function removeTodolist(todoListID: string) {
        const action = removeTodolistAC(todoListID)
        dispatchToTodolistsReducer(action)
    }


return (
    <div>
        <ButtonAppBar/>
        <Container fixed>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map(tdl => {
                    let tasksForTodolist = tasks[tdl.id];
                    if (tdl.filter === "active") {
                        tasksForTodolist = tasks[tdl.id].filter(t => t.isDone === false);
                    }
                    if (tdl.filter === "completed") {
                        tasksForTodolist = tasks[tdl.id].filter(t => t.isDone === true);
                    }
                    return (           //up key to parent element
                        <Grid item key={tdl.id}>
                            <Paper sx={{padding: "10px"}}>
                                <Todolist title={tdl.title}
                                          todoListID={tdl.id}
                                          tasks={tasksForTodolist}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          changeTaskStatus={changeStatus}
                                          removeTodolist={removeTodolist}
                                          filter={tdl.filter}
                                          onChangeInput={changeTaskTitle}
                                          onChangeTDLTitle={onChangeTDLTitle}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    </div>
);
}

export default AppWithReducer;
