import React from 'react';
import './App.css';
import ButtonAppBar from "../components/ButtonAppBar";
import {Container, LinearProgress} from "@mui/material";
import TodolistsList from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {AppRootState} from "./store";
import {RequestStatusType} from "./app-reducer";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
    const status = useSelector<AppRootState, RequestStatusType>(state => state.app.status)
    console.log("App is called")
    return <div>
        <ErrorSnackbar/>
        <ButtonAppBar/>
        {status ==="loading" && <LinearProgress/>}
        <Container fixed>
            <TodolistsList/>
        </Container>
    </div>
}

export default App;

