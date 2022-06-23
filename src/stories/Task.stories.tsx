import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {action} from "@storybook/addon-actions";
import {Task} from "../components/Task";


export default {
    title: 'TODOLISTS/Task',
    component: Task,
    args: {
        changeTaskStatus: action("changeTaskStatus"),
        changeTaskTitle: action("changeTaskTitle"),
        removeTask: action("removeTask"),
        todolistId: "wqw",
        task: {id: "qwe1", isDone: true, title: "JS"}
    } as ComponentMeta<typeof Task>
}


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStories = Template.bind({});
TaskIsDoneStories.args = {
    changeTaskStatus: action("task status is changed"),
    changeTaskTitle: action("task title is changed"),
    removeTask: action("task is removed"),
    todolistId: "wqw",
    task: {id: "qwe1", isDone: true, title: "JS"}
};

export const TaskIsNotDoneStories = Template.bind({});
TaskIsNotDoneStories.args = {
    changeTaskStatus: action("task status is changedd"),
    changeTaskTitle: action("task title is changed"),
    removeTask: action("task is removed"),
    todolistId: "ffdssfsr",
    task: {id: "esfae", isDone: false, title: "JS"}
};

