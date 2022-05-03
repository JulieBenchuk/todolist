import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'completed'},
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


    function removeTask(todoListID: string, id: string) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== id)})
    }

    function addTask(todoListID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoListID]: [...tasks[todoListID], newTask]})
    }

    function changeStatus(todoListID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todoListID]:tasks[todoListID].map(t=> t.id===taskId ? {...t, isDone: isDone} : t)})
    }

    function changeFilter(todoListID: string, value: FilterValuesType) {
        setTodolists(todolists.map(t=>t.id===todoListID ? {...t, filter: value} : t))
    }
    function removeTodolist (todoListID: string) {
        setTodolists(todolists.filter(t=>t.id!==todoListID))
    }
    function addTodoList (title: string) {
        let newTodoList: todolistsType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodolists([...todolists, newTodoList])
        setTasks({...tasks,
            [newTodoList.id]: []}) //add new empty array, because there are any tasks yet
    }


    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todolists.map(tdl => {
                let tasksForTodolist = tasks[tdl.id];
                if (tdl.filter === "active") {
                    tasksForTodolist = tasks[tdl.id].filter(t => t.isDone === false);
                }
                if (tdl.filter === "completed") {
                    tasksForTodolist = tasks[tdl.id].filter(t => t.isDone === true);
                }
                return (
                    <Todolist title={tdl.title}
                              key={tdl.id}
                              todoListID={tdl.id}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              removeTodolist={removeTodolist}
                              filter={tdl.filter}
                    />
                )
            })}

        </div>
    );
}

export default App;
