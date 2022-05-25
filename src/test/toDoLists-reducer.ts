import {todolistsType} from "../App";

type ActionType = {
    type: string
    [key: string]: any
}
type RemoveTodolistACType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export const toDoListsReducer = (state: Array<todolistsType>, action: RemoveTodolistACType): Array<todolistsType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.id);
        default:
            return state
    }
}