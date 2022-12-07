import {appReducer, AppInitialStateType, setErrorAC, setStatusAC} from "./app-reducer";

let startState: AppInitialStateType
beforeEach(() => {
    startState = {
        status: "idle",
        error: null,
        isInitialized: false
    }
})
test("app error should be set", () => {
    const endState = appReducer(startState, setErrorAC({error: "some error_test"}))
    expect(endState.error).toBe("some error_test");
})
test("app status should be set", () => {
    const endState = appReducer(startState, setStatusAC({status: "loading"}))
    expect(endState.status).toBe("loading");
})
