import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, fetchTodolistThunkCreator,
    removeTodolistAC, TodolistDomainType,
} from "./state/toDoLists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {TaskStatuses} from "./api/task-api";

export type FilterValuesType = "all" | "active" | "completed";

function AppWithRedux() {
    console.log("App is called")

    const dispatch: any = useDispatch();
    let todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
    let tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

/// fn for tasks
    const removeTask = useCallback((todoListID: string, id: string) => {
        const action = removeTaskAC(todoListID, id)
        dispatch(action)
    }, [])

    const addTask = useCallback((todoListID: string, title: string) => {
        const action = addTaskAC(todoListID, title)
        dispatch(action)
    }, [])

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        const action = changeTaskStatusAC(id, status, todolistId);
        dispatch(action);
    }, []);

    const changeTaskTitle = useCallback((todolistID: string, taskID: string, newTitle: string) =>{
        const action = changeTaskTitleAC(todolistID, taskID, newTitle)
        dispatch(action)
    }, [])

    /// fn tor todolists
    const changeFilter = useCallback((todoListID: string, value: FilterValuesType) => {
        const action = changeTodolistFilterAC(todoListID, value)
        dispatch(action)
    }, [])

    const addTodoList=useCallback((title: string) =>{
        const action = addTodolistAC(title)
        dispatch(action)
    }, [])

    const onChangeTDLTitle = useCallback((todoListID: string, newTitle: string) =>{
        const action = changeTodolistTitleAC(todoListID, newTitle)
        dispatch(action)
    },[])

    const removeTodolist = useCallback((todoListID: string) =>{
        const action = removeTodolistAC(todoListID)
        dispatch(action)
    }, [])

    useEffect(()=>{
        dispatch(fetchTodolistThunkCreator)
    }, [])

    return <div>
        <ButtonAppBar/>
        <Container fixed>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map(tdl => {
                    let allTodolistTasks = tasks[tdl.id];
                    return (           //up key to parent element
                        <Grid item key={tdl.id}>
                            <Paper sx={{padding: "10px"}}>
                                <Todolist title={tdl.title}
                                          todoListID={tdl.id}
                                          tasks={allTodolistTasks}
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
