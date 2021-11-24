import React, { useState, useEffect } from "react";
import MessageHeader from './MessageHeader/MessageHeader';
import MessageContent from './MessageContent/MessageContent';
import MessageInput from './MessageInput/MessageInput';
import firebase from '../../server/firebase';
import { connect } from "react-redux";
import { Comment, Segment } from "semantic-ui-react";
import './messages.css';

const Messages = (props) => {

    const messageRef = firebase.database().ref('messages');
    const [SearchTermState, setSearchTermState] = useState("");
    const [messageState, setMessageState] = useState([]);

    useEffect(() => {
        if (props.channel) {
            setMessageState([]);


            messageRef.child(props.channel.id).on('child_added', (snap) => {
                setMessageState((currentState) => {
                    let updatedState = [...currentState];
                    updatedState.push(snap.val());
                    return updatedState;
                })

            })


            return () => messageRef.child(props.channel.id).off();
        }
    }, [props.channel])// eslint-disable-line react-hooks/exhaustive-deps


    const displayMessages = () => {
        let messagesToDisplay = SearchTermState ? filterMessageBySearchTerm() : messageState;
        if (messagesToDisplay.length > 0) {
            return messagesToDisplay.map((message) => {
                return <MessageContent ownMessage={message.user.id === props.user?.uid} key={message.timestamp} message={message} />
            })
        }

    }
    const uniqueUsersCount = () => {
        const uniqueUsers = messageState.reduce((acc, message) => {
            if (!acc.includes(message.user.name)) {
                acc.push(message.user.name);
            }
            return acc;
        }, []);

        return uniqueUsers.length;
    }

    const searchTermChange = (e) => {
        const target = e.target;
        setSearchTermState(target.value);

    }

    const filterMessageBySearchTerm = () => {
        const regex = new RegExp(SearchTermState, 'gi');
        const messages = messageState.reduce((acc, message) => {
            if ((message.content && message.content.match(regex)) || message.user.name.match(regex)) {
                acc.push(message);
            }
            return acc;
        }, []);
        return messages;
    }

    return <div><MessageHeader searchTermChange={searchTermChange} isPrivateChat={props.channel?.isPrivateChat} channelName={props.channel?.name} uniqueUsers={uniqueUsersCount()} />
        <Segment className="msg_content">
            <Comment.Group>
                {displayMessages()}
            </Comment.Group>
        </Segment>
        <MessageInput /></div>
}

const mapStateToProps = (state) => {
    return {
        channel: state.channel.currentChannel,
        user: state.user.currentUser
    }
}
export default connect(mapStateToProps)(Messages);