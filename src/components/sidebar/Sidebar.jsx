import React from "react";
import { Menu } from 'semantic-ui-react';
import "./sidebar.css";
import UserInfo from "./UserInfo/UserInfo";


export const Sidebar = () => {
    return (<Menu vertical fixed="left" borderless size="large" className="side_bar" >
        <UserInfo />
    </Menu >
    )
}