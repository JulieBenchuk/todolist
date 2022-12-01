//app-reducer.tsx

import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    status: "loading" as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}
const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers:{
        setErrorAC: (state, action: PayloadAction<{error: string | null}>)=>{
            state.error=action.payload.error
        },
        setStatusAC: (state, action: PayloadAction<{status: RequestStatusType}>)=>{
            state.status= action.payload.status
        },
        setIsInitializedAC: (state, action: PayloadAction<{isInitialized: boolean}>)=>{
            state.isInitialized=action.payload.isInitialized
        }
    }
})



export const appReducer = slice.reducer
export const {setErrorAC, setStatusAC, setIsInitializedAC} = slice.actions


export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type AppInitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean

}


