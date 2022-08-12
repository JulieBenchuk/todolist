import React, {useEffect} from 'react';
import './App.css';
import ButtonAppBar from "../components/ButtonAppBar";
import {CircularProgress, Container, LinearProgress} from "@mui/material";
import TodolistsList from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store";
import {AppInitialStateType} from "./app-reducer";
import {Login} from "../features/Login/Login";
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import {initializeAppTC} from "../features/Login/authReducer";


export type FilterValuesType = "all" | "active" | "completed";

function App() {
    const {status, isInitialized} = useSelector<AppRootState, AppInitialStateType>(state => state.app)
    const dispatch: any = useDispatch()
    console.log("App is called")
    useEffect(()=> {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return <div>
        <ErrorSnackbar/>
        <ButtonAppBar/>
        {status === "loading" && <LinearProgress/>}
        <Container fixed>
            <Routes>
                <Route path="/" element={<TodolistsList/>}/>
                <Route path="/login" element={ <Login/>}/>
                <Route path="/404" element={ <h1>404: PAGE NOT FOUND</h1>}/>
                <Route path="*" element={<Navigate to ="/404"/> }/>
            </Routes>
        </Container>
    </div>
}

export default App;

