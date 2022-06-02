import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/toDoLists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    const dispatch = useDispatch();
    let todolists = useSelector<AppRootState, Array<todolistsType>>(state => state.todolists)
    let tasks = useSelector<AppRootState, TasksType>(state => state.tasks)

/// fn for tasks
    function removeTask(todoListID: string, id: string) {
        const action = removeTaskAC(todoListID, id)
        dispatch(action)
    }

    function addTask(todoListID: string, title: string) {
        const action = addTaskAC(todoListID, title)
        dispatch(action)
    }

    function changeStatus(todoListID: string, taskId: string, isDone: boolean) {
        const action = changeTaskStatusAC(todoListID, taskId, isDone)
        dispatch(action)
    }

    function changeTaskTitle(todolistID: string, taskID: string, newTitle: string) {
        const action = changeTaskTitleAC(todolistID, taskID, newTitle)
        dispatch(action)
    }

    /// fn tor todolists
    function changeFilter(todoListID: string, value: FilterValuesType) {
        const action = changeTodolistFilterAC(todoListID, value)
        dispatch(action)
    }

    function addTodoList(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
    }

    function onChangeTDLTitle(todoListID: string, newTitle: string) {
        const action = changeTodolistTitleAC(todoListID, newTitle)
        dispatch(action)
    }

    function removeTodolist(todoListID: string) {
        const action = removeTodolistAC(todoListID)
        dispatch(action)
    }


return <div>
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
}

export default AppWithRedux;
