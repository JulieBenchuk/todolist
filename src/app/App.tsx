import React from 'react';
import './App.css';
import ButtonAppBar from "../components/ButtonAppBar";
import {Container, LinearProgress} from "@mui/material";
import TodolistsList from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {AppRootState} from "./store";
import {RequestStatusType} from "./app-reducer";
import {Login} from "../features/Login";
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";


export type FilterValuesType = "all" | "active" | "completed";

function App() {
    const status = useSelector<AppRootState, RequestStatusType>(state => state.app.status)
    console.log("App is called")
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

