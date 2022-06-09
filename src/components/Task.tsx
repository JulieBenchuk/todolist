import React, {ChangeEvent} from 'react';
import {EditableSpan} from "../EditableSpan";
import {Button} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "../Todolist";

type TaskPropsType = {
    task: TaskType
    removeTask: (todoListID: string, taskId: string) => void
    todoListID: string
    changeTaskStatus: (todoListID: string, taskId: string, isDone: boolean) => void
    onChangeInput: (todoListID: string, taskId: string, newTitle: string) => void
}
export const Task = (props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.todoListID, props.task.id)
    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todoListID, props.task.id, e.currentTarget.checked);
    }
    const onChangeInputHandler = (newTitle: string) => {
        props.onChangeInput(props.todoListID, props.task.id, newTitle)
    }

    return <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <input type="checkbox"
               onChange={onChangeTaskStatusHandler}
               checked={props.task.isDone}/>
        <EditableSpan title={props.task.title} onChange={onChangeInputHandler}/>
        <Button variant="text" size="small" startIcon={<DeleteIcon/>} onClick={onClickHandler}></Button>
    </li>;
};
