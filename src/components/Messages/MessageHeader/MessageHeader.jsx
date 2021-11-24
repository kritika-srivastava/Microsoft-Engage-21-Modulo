import React from "react";
import { Segment, Header, Input, Icon } from "semantic-ui-react";
import '../messages.css';


const MessageHeader = (props) => {
    return <Segment clearing >
        <Header floated="left" fluid="true" as="h2" className="win_width">
            <span style={{ color: "#0b1f42" }}>

                {!props.isPrivateChat && <Icon
                    onClick={props.starChange}
                    name={props.starred ? "star" : "star outline"}
                    color={props.starred ? "yellow" : "grey"} />}
            </span>
            {props.isPrivateChat && <Icon name="red user" />}
            {(props.isPrivateChat ? "@" : "#") + props.channelName}


            {!props.isPrivateChat ?
                <Header.Subheader>{props.uniqueUsers} User{props.uniqueUsers <= 1 ? "" : "s"}</Header.Subheader>
                : null}

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