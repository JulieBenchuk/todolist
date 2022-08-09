import {addTaskAC, updateTaskAC, removeTaskAC, tasksReducer, setTasksAC} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC, setTodolistsAC, TodolistDomainType} from "./toDoLists-reducer";
import {TaskStatuses} from "../../../api/task-api";
import {v1} from "uuid";


let startState: any;
beforeEach(() => {
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", completed: false},
            {id: "2", title: "JS", completed: true},
            {id: "3", title: "React", completed: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", completed: false},
            {id: "2", title: "milk", completed: true},
            {id: "3", title: "tea", completed: false}
        ]
    };
})
test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("todolistId2", "2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", completed: false},
            {id: "2", title: "JS", completed: true},
            {id: "3", title: "React", completed: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", completed: false},
            {id: "3", title: "tea", completed: false}
        ]
    });

});

test('correct task should be added to correct array', () => {
    const action = addTaskAC({
        todoListId: "todolistId2",
        id: "blabla",
        title: "juice",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: 0,
        startDate: ""
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].title).toBe("juice");
});
test("task title should be changed", () => {

    const action = updateTaskAC("todolistId2", "3", {title: "coffee"});
    const endState = tasksReducer(startState, action);
    expect(endState["todolistId2"][2].title).toBe("coffee");
    expect(endState["todolistId1"][2].title).toBe("React");
});
test('new array should be added when new todolist is added', () => {
    const newTodolist: TodolistDomainType = {id: v1(), title: "new todolist", order: 0, filter: "all", addedDate: "", entityStatus: "idle"}
    const action = addTodolistAC(newTodolist);
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC("todolistId2");
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);
    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
test("empty arrays should be added when we set todolists", () => {
    const action = setTodolistsAC([
        {id: "1", title: "What to learn", addedDate: "", order: 0},
        {id: "2", title: "What to buy", addedDate: "", order: 0}
    ]);
    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)
    expect(keys.length).toBe(2)
    expect(endState["1"]).toBeDefined()
})
test ("tasks should be added to todolist", ()=> {
    const action = setTasksAC(startState["todolistId1"], "todolistId1")
    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": []
    }, action)


    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(0)
    expect(endState["todolistId2"]).toStrictEqual([])

})






