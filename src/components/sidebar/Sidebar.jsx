import React from "react";
import { Menu } from 'semantic-ui-react';
import "./sidebar.css";
import UserInfo from "./UserInfo/UserInfo";
import Channels from "./channels/channels";
import PrivateChat from "./PrivateChat/PrivateChat";
import FavouriteChannels from "./favouriteChannels/FavouriteChannels";

export const Sidebar = () => {
    return (<Menu vertical fixed="left" borderless size="large" className="side_bar" >
        <UserInfo />
        <FavouriteChannels />
        <Channels />
        <PrivateChat />
    </Menu >
    )
}