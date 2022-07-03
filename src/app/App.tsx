import React from 'react';
import './App.css';
import ButtonAppBar from "../components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";

import TodolistsList from "../features/TodolistsList/TodolistsList";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
    console.log("App is called")
    return <div>
        <ButtonAppBar/>
        <Container fixed>
            <TodolistsList/>
        </Container>
    </div>
}

export default App;

