import React from "react";
import { Segment, Header, Input, HeaderSubheader, Icon } from "semantic-ui-react";
import '../messages.css';


const MessageHeader = (props) => {
    return <Segment clearing >
        <Header floated="left" fluid="true" as="h2" className="win_width">
            <span style={{ color: "#0b1f42" }}>

                <Icon name="green linkify" />{props.channelName}
            </span>
            <Header.Subheader>
                {props.uniqueUsers} User{props.uniqueUsers <= 1 ? "" : "s"}
            </Header.Subheader>
        </Header>

        <Header floated="right" >

            <Input
                name="search"
                icon="search"
                placeholder="Search Messages"
                size="mini"
                onChange={props.searchTermChange}

            />
        </Header>

    </Segment>
}

export default MessageHeader;