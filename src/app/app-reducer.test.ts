import {appReducer, InitialStateType, setErrorAC, setStatusAC} from "./app-reducer";

let startState: InitialStateType
beforeEach(() => {
    startState = {
        status: "idle",
        error: null
    }
})
test("app error should be set", () => {
    const endState = appReducer(startState, setErrorAC("some error_test"))
    expect(endState.error).toBe("some error_test");
})
test("app status should be set", () => {
    const endState = appReducer(startState, setStatusAC("loading"))
    expect(endState.status).toBe("loading");
})
