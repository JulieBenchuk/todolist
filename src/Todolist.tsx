import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
    todoListID: string
    tasks: Array<TaskType>
    removeTask: (todoListID: string, taskId: string) => void
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    addTask: (todoListID: string, title: string) => void
    changeTaskStatus: (todoListID: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todoListID: string) => void
    filter: FilterValuesType
    onChangeInput: (todoListID: string, taskId: string, newTitle: string)=> void
    onChangeTDLTitle: (todoListID: string, newTitle: string)=> void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter(props.todoListID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todoListID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todoListID, "completed");
    const addTask = (title: string) => {
        props.addTask(props.todoListID, title)
    }
    const onChangeTDLTitleHandler = (newTitle: string) => {
        props.onChangeTDLTitle(props.todoListID, newTitle)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} onChange={onChangeTDLTitleHandler}/>
            <Button variant="text" size="small" startIcon={<Delete />} onClick={() => props.removeTodolist(props.todoListID)}></Button>
        </h3>
        <AddItemForm addItem={addTask} />
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todoListID, t.id)
                    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todoListID, t.id, e.currentTarget.checked);
                    }
                    const onChangeInputHandler = (newTitle: string) => {
                      props.onChangeInput(props.todoListID, t.id, newTitle)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeTaskStatusHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={onChangeInputHandler}/>
                        <Button variant="text" size="small" startIcon={<Delete />} onClick={onClickHandler}></Button>
                    </li>
                })
            }
        </ul>
        <div>
            <Button size="small" variant={props.filter==="all" ? "contained" : "text"} color="secondary" onClick={onAllClickHandler}>All</Button>
            <Button size="small" variant={props.filter==="active" ? "contained" : "text"} color="inherit" onClick={onActiveClickHandler}>Active</Button>
            <Button size="small" variant={props.filter==="completed" ? "contained" : "text"} color="primary" onClick={onCompletedClickHandler}>Completed</Button>

        </div>
    </div>
}
