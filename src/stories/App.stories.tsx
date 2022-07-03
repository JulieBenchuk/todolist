import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import App from "../app/App";
import {Provider} from "react-redux";
import {store} from "../app/store";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default {
    title: 'TODOLIST/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <Provider store={store}> <App /> </Provider> ;

export const AppStories = Template.bind({});
AppStories.args = {

};


