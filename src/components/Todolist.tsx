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
import {TodolistDomainType} from "../features/TodolistsList/Todolist/toDoLists-reducer";

export type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    removeTask: (todoListID: string, taskId: string) => void
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    addTask: (todoListID: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, status: TaskStatuses) => void
    removeTodolist: (todoListID: string) => void
    onChangeInput: (todolistId: string, taskId: string, newTitle: string) => void
    onChangeTDLTitle: (todoListID: string, newTitle: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    const dispatch: any = useDispatch();
    console.log("Todolist is called")
    const onAllClickHandler = useCallback(() => props.changeFilter(props.todolist.id, "all"), [props.changeFilter, props.todolist.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolist.id, "active"), [props.changeFilter, props.todolist.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolist.id, "completed"), [props.changeFilter, props.todolist.id]);
    const addTask = useCallback((title: string) => {
        props.addTask(props.todolist.id, title)
    }, [props.addTask, props.todolist.id])
    const onChangeTDLTitleHandler = useCallback((newTitle: string) => {
        props.onChangeTDLTitle(props.todolist.id, newTitle)
    }, [props.onChangeTDLTitle, props.todolist.id])
    let tasksForTodolist = props.tasks
    if (props.todolist.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }
    useEffect(() => {
        dispatch(fetchTasksThunkCreator(props.todolist.id))
    }, [])

    return <div>
        <h3>
            <EditableSpan title={props.todolist.title} onChange={onChangeTDLTitleHandler} disabled={props.todolist.entityStatus==="loading"}/>
            <Button variant="text" size="small" startIcon={<DeleteIcon/>}
                    onClick={() => props.removeTodolist(props.todolist.id)} disabled={props.todolist.entityStatus==="loading"}></Button>
        </h3>
        <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus==="loading"} />
        <ul>
            {
                tasksForTodolist.map(t =>
                    <Task key={t.id} task={t} removeTask={props.removeTask}
                          todolistId={props.todolist.id}
                          changeTaskStatus={props.changeTaskStatus}
                          changeTaskTitle={props.onChangeInput}/>
                )
            }
        </ul>
        <div>
            <Button size="small" variant={props.todolist.filter === "all" ? "contained" : "text"} color="secondary"
                    onClick={onAllClickHandler}>All</Button>
            <Button size="small" variant={props.todolist.filter === "active" ? "contained" : "text"} color="inherit"
                    onClick={onActiveClickHandler}>Active</Button>
            <Button size="small" variant={props.todolist.filter === "completed" ? "contained" : "text"} color="primary"
                    onClick={onCompletedClickHandler}>Completed</Button>

        </div>
    </div>
})

