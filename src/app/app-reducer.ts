//app-reducer.tsx

const initialState = {
    status: "loading" as RequestStatusType,
    error: null,
    isInitialized: false
}



export const appReducer = (state: AppInitialStateType = initialState, action: ActionsType): AppInitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-IS_INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}
export const setErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)
export const setStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setIsInitializedAC = (isInitialized: boolean)=>({type: "APP/SET-IS_INITIALIZED", isInitialized} as const)
export type setErrorACType = ReturnType<typeof setErrorAC>
export type setStatusACType = ReturnType<typeof setStatusAC>
export type setIsInitializedACType = ReturnType<typeof setIsInitializedAC>

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type AppInitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean

}
type ActionsType = setErrorACType | setStatusACType | setIsInitializedACType

