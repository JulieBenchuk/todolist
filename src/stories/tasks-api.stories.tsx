import React, {useEffect, useState} from 'react'
import {taskAPI} from "../api/task-api";

export default {
    title: 'API'
}
const todolistId = "7ff197b0-c6c8-409a-b0c8-cdeda8803263"
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.getTasks(todolistId)
            .then((response)=>{
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.createTask(todolistId, "new task created")
            .then((response)=> {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.deleteTask(todolistId, "f0ad62ec-a33b-4492-b5b8-673fc3853bce")
            .then((response)=>{
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.updateTask(todolistId, "855a0213-67e3-41ef-8a72-7634c0c28b0e", "SEEEEEE")
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
