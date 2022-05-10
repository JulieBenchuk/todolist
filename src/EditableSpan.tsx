import React, {useState, MouseEvent, FocusEvent, ChangeEvent} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsSpan = {
    title: string
    onChange: (newTitle: string)=> void
}
const EditableSpan = (props: EditableSpanPropsSpan) => {
    const [title, setTitle] = useState("")
    const [editMode, setEditMode] = useState<boolean>(false)
    const editSpanHandler = (e: MouseEvent<HTMLSpanElement>) => {
        setEditMode(true)
        setTitle(props.title)
    }
    const onBlurInput = (e: FocusEvent<HTMLSpanElement>) => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
    }
    return (

        editMode // if ===true
            ? <TextField id="standard-basic" label="Standard" variant="standard" autoFocus={true} onBlur={onBlurInput} value={title} onChange={onChangeTitleHandler}/>
            : <span onDoubleClick={editSpanHandler}> {props.title}</span>

    );
};

export default EditableSpan;