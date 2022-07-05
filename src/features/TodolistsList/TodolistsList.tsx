import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm";
import {Todolist} from "../../components/Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {
    addTodolistThunkCreator,
    changeTodolistFilterAC,
    changeTodolistTitleAC, changeTodolistTitleThunkCreator, fetchTodolistThunkCreator, removeTodolistThunkCreator,
    TodolistDomainType
} from "./Todolist/toDoLists-reducer";
import {
    addTaskThunkCreator,
   removeTaskThunkCreator,
    TasksStateType, updateTaskThunkCreator
} from "./Todolist/tasks-reducer";
import {TaskStatuses} from "../../api/task-api";
import {FilterValuesType} from "../../app/App";


const TodolistsList = () => {
    const dispatch: any = useDispatch();
    let todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
    let tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

/// fn for tasks
    const removeTask = useCallback((todoListID: string, id: string) => {
        const action = removeTaskThunkCreator(todoListID, id)
        dispatch(action)
    }, [])

    const addTask = useCallback((todolistID: string, title: string) => {
        const action = addTaskThunkCreator(todolistID, title)
        dispatch(action)
    }, [])

    const changeStatus = useCallback(function (todolistId: string, id: string, status: TaskStatuses) {
        const action = updateTaskThunkCreator(todolistId, id, {status});
        dispatch(action);
    }, []);

    const changeTask = useCallback((todolistID: string, taskID: string, title: string) => {
        const action = updateTaskThunkCreator(todolistID, taskID, {title})
        dispatch(action)
    }, [])

    /// fn tor todolists
    const changeFilter = useCallback((todoListID: string, value: FilterValuesType) => {
        const action = changeTodolistFilterAC(todoListID, value)
        dispatch(action)
    }, [])

    const addTodoList = useCallback((title: string) => {
        const action = addTodolistThunkCreator(title)
        dispatch(action)
    }, [])

    const onChangeTDLTitle = useCallback((todoListID: string, newTitle: string) => {
        const action = changeTodolistTitleThunkCreator(todoListID, newTitle)
        dispatch(action)
    }, [])

    const removeTodolist = useCallback((todoListID: string) => {
        const action = removeTodolistThunkCreator(todoListID)
        dispatch(action)
    }, [])

    useEffect(() => {
        dispatch(fetchTodolistThunkCreator())
    }, [])


    return (
        <div>
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
                                          onChangeInput={changeTask}
                                          onChangeTDLTitle={onChangeTDLTitle}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    );
};

export default TodolistsList;