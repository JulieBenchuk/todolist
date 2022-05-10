import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }
    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    return (
        <div>
            <TextField value={title}
                       onChange={onChangeInputHandler}
                       onKeyPress={onKeyPressHandler}
                       id="standard-basic" label={error} variant="standard" error={!!error}/>
            <Button variant="contained" style = {{maxWidth: "30px", maxHeight: "30px", minWidth: "30px", minHeight: "30px"}} onClick={addItem}>+</Button>
        </div>
    )
}