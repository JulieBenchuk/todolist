import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";

export type FilterValuesType = "all" | "active" | "completed";
export type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
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
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== id)})
    }

    function addTask(todoListID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoListID]: [...tasks[todoListID], newTask]})
    }

    function changeStatus(todoListID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
    }

    function changeTaskTitle(todolistID: string, taskID: string, newTitle: string) {
        let newTasks = tasks[todolistID].map(task => task.id === taskID ? {...task, title: newTitle} : task)
        setTasks({...tasks, [todolistID]: newTasks})
    }

    /// fn tor todolists
    function changeFilter(todoListID: string, value: FilterValuesType) {
        setTodolists(todolists.map(t => t.id === todoListID ? {...t, filter: value} : t))
    }

    function removeTodolist(todoListID: string) {
        setTodolists(todolists.filter(t => t.id !== todoListID))
    }

    function addTodoList(title: string) {
        let newTodoList: todolistsType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodolists([...todolists, newTodoList])
        setTasks({
            ...tasks,
            [newTodoList.id]: []
        }) //add new empty array, because there are any tasks yet
    }


    function onChangeTDLTitle(todoListID: string, newTitle: string) {
        let newTodolists = todolists.map(tl => tl.id === todoListID ? {...tl, title: newTitle} : tl)
        setTodolists(newTodolists)
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

export default App;
