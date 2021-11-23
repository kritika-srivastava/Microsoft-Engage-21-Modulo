import React from "react";
import { Segment, Header, Input, HeaderSubheader, Icon } from "semantic-ui-react";
import '../messages.css';


const MessageHeader = () => {
    return <Segment clearing >
        <Header floated="left" fluid="true" as="h2" className="win_width">
            <span style={{ color: "#0b1f42" }}>
                <Icon name="green linkify" />CHANNEL
            </span>
            <Header.Subheader>
                3 Users
            </Header.Subheader>
        </Header>

        <Header floated="right" >

            <Input
                name="search"
                icon="search"
                placeholder="Search Messages"
                size="mini"

            />
        </Header>

    </Segment>
}

export default MessageHeader;