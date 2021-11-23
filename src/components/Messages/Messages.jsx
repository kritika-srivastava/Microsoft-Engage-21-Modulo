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

    const [messageState, setMessageState] = useState([]);

    useEffect(() => {
        if (props.channel) {
            messageRef.child(props.channel.id).on('child_added', (snap) => {
                setMessageState((currentState) => {
                    let updatedState = [...currentState];
                    updatedState.push(snap.val());
                    return updatedState;
                })

            })


            return () => messageRef.child(props.channel.id).off();
        }
    }, [props.channel])


    const displayMessages = () => {
        if (messageState.length > 0) {
            return messageState.map((message) => {
                return <MessageContent ownMessage={message.user.id === props.user.uid} key={message.timestamp} message={message} />
            })
        }

    }
    return <div><MessageHeader />
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