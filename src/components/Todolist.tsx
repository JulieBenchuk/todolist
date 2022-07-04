import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {Task} from "./Task";
import {useDispatch} from "react-redux";
import {fetchTasksThunkCreator} from "../features/TodolistsList/Todolist/tasks-reducer";
import {FilterValuesType} from "../app/App";
import {TaskStatuses, TaskType} from "../api/task-api";

export type PropsType = {
    title: string
    todoListID: string
    tasks: Array<TaskType>
    removeTask: (todoListID: string, taskId: string) => void
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    addTask: (todoListID: string, title: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    removeTodolist: (todoListID: string) => void
    filter: FilterValuesType
    onChangeInput: (taskId: string, newTitle: string, todolistId: string) => void
    onChangeTDLTitle: (todoListID: string, newTitle: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    const dispatch: any = useDispatch();
    console.log("Todolist is called")
    const onAllClickHandler = useCallback(() => props.changeFilter(props.todoListID, "all"), [props.changeFilter, props.todoListID]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todoListID, "active"), [props.changeFilter, props.todoListID]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todoListID, "completed"), [props.changeFilter, props.todoListID]);
    const addTask = useCallback((title: string) => {
        props.addTask(props.todoListID, title)
    }, [props.addTask, props.todoListID])
    const onChangeTDLTitleHandler = useCallback((newTitle: string) => {
        props.onChangeTDLTitle(props.todoListID, newTitle)
    }, [props.onChangeTDLTitle, props.todoListID])
    let tasksForTodolist = props.tasks
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }
    useEffect(() => {
        dispatch(fetchTasksThunkCreator(props.todoListID))
    }, [])

    return <div>
        <h3>
            <EditableSpan title={props.title} onChange={onChangeTDLTitleHandler}/>
            <Button variant="text" size="small" startIcon={<DeleteIcon/>}
                    onClick={() => props.removeTodolist(props.todoListID)}></Button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                tasksForTodolist.map(t =>
                    <Task key={t.id} task={t} removeTask={props.removeTask}
                          todolistId={props.todoListID}
                          changeTaskStatus={props.changeTaskStatus}
                          changeTaskTitle={props.onChangeInput}/>
                )
            }
        </ul>
        <div>
            <Button size="small" variant={props.filter === "all" ? "contained" : "text"} color="secondary"
                    onClick={onAllClickHandler}>All</Button>
            <Button size="small" variant={props.filter === "active" ? "contained" : "text"} color="inherit"
                    onClick={onActiveClickHandler}>Active</Button>
            <Button size="small" variant={props.filter === "completed" ? "contained" : "text"} color="primary"
                    onClick={onCompletedClickHandler}>Completed</Button>

        </div>
    </div>
})

