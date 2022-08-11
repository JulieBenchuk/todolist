import React, {useState, MouseEvent, FocusEvent, ChangeEvent} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsSpan = {
    title: string
    onChange: (newTitle: string) => void
    disabled?: boolean
}
export const EditableSpan = React.memo((props: EditableSpanPropsSpan) => {
    console.log("EditableSpan is called")
    const [title, setTitle] = useState("")
    const [editMode, setEditMode] = useState<boolean>(false)
    const editSpanHandler = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const onBlurInput = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    return (

        editMode && !props.disabled // if ===true
            ? <TextField id="standard-basic" label="Standard" variant="standard" autoFocus={true} onBlur={onBlurInput}
                         value={title} onChange={onChangeTitleHandler}/>
            : <span onDoubleClick={editSpanHandler}> {props.title}</span>

    );
});
