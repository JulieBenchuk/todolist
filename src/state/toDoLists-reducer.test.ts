import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, setTodolistsAC, TodolistDomainType,
    toDoListsReducer
} from './toDoLists-reducer';
import {v1} from 'uuid';
import {FilterValuesType} from '../App';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType>
let newTodolistTitle: string;
beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    newTodolistTitle = "New Todolist";
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0}
    ]
})

test('correct todolist should be removed', () => {

    const endState = toDoListsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    const endState = toDoListsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {

    const endState = toDoListsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const action = {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: todolistId2,
        filter: newFilter
    };

    const endState = toDoListsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState= [
        {id: todolistId1, title: "What to hear", filter: "all", addedDate: "", order: 0},
        {id: todolistId2, title: "What to read", filter: "all", addedDate: "", order: 0}
    ]

})
test("correct todolilists should be set", () => {
    const action = setTodolistsAC(startState);
    const endState = toDoListsReducer(startState, action)

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe("all");
    expect(endState.length).toBe(2);
})


