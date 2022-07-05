import {v1} from "uuid";
import {taskAPI, TaskPriorities, TaskStatuses, TaskType} from "../../../api/task-api";
import {Dispatch} from "redux";
import {ActionType} from "./toDoLists-reducer";
import {AppRootState} from "../../../app/store";

export const removeTaskAC = (todolistID: string, taskID: string) => ({
    type: "REMOVE-TASK",
    todolistID: todolistID,
    taskID: taskID
} as const)
export const addTaskAC = (task: TaskType) => ({
    type: "ADD-TASK",
    task
} as const)
export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string) => ({
    type: "CHANGE-TASK-TITLE",
    todolistID: todolistID,
    taskID: taskID,
    title: title
} as const)
export const changeTaskStatusAC = (todolistID: string, status: TaskStatuses, taskID: string) => ({
    type: "CHANGE-TASK-STATUS",
    todolistID: todolistID,
    status: status,
    taskID: taskID
} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistID: string) => ({
    type: "SET_TASK",
    tasks: tasks,
    todolistID: todolistID
} as const)

export const fetchTasksThunkCreator = (todolistID: string) => (dispatch: Dispatch<ActionType>) => {
    taskAPI.getTasks(todolistID)
        .then((response) => {
            const action = setTasksAC(response.data.items, todolistID);
            dispatch(action)
        })
}
export const removeTaskThunkCreator = (taskID: string, todolistID: string) => (dispatch: Dispatch<ActionType>) => {
    taskAPI.deleteTask(todolistID, taskID)
        .then(response => {
            dispatch(removeTaskAC(todolistID, taskID))
        })
}
export const addTaskThunkCreator = (todolistID: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    taskAPI.createTask(todolistID, title)
        .then(response => {
            dispatch(addTaskAC(response.data.data.item))
        })
}
export const updateTaskStatusThunkCreator = (todolistID: string, taskID: string, title: string) => (dispatch: Dispatch<ActionType>, getState: () => AppRootState) => {
    /*const allTasksFromState = getState().tasks
    const tasksForCurrentTodo = allTasksFromState[todolistID]
    const currentTask = tasksForCurrentTodo.find(t => t.id === taskID)

    if (currentTask) {
        taskAPI.updateTaskTitle(todolistID, taskID, {
            title: currentTask.title,
            startDate: currentTask.startDate,
            priority: currentTask.priority,
            description: currentTask.description,
            deadline: currentTask.deadline,
            status: status
        })
            .then(response => {
                dispatch(changeTaskTitleAC(todolistID, taskID, title))
            })
    }*/
}

const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)};
        case "ADD-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case "CHANGE-TASK-TITLE":
            return {
                ...state, [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    title: action.title
                } : t)
            };
        case "ADD-TODOLIST":{
            return {...state, [action.todolist.id]: []};
        }
        case "CHANGE-TASK-STATUS":
            return {
                ...state, [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    status: action.status
                } : t)
            };
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id];
            return copyState
        }
        case "SET_TODOLIST": {
            const copyState = {...state}
            action.todolists.forEach((tdl) => {
                copyState[tdl.id] = []
            })
            return copyState
        }
        case "SET_TASK":
            return {...state, [action.todolistID]: action.tasks}
        default:
            return state
    }
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}