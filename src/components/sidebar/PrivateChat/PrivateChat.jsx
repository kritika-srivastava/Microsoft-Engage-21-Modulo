import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Menu, Icon } from 'semantic-ui-react';
import firebase from '../../../server/firebase';
import { setChannel } from "../../../actions/actioncreator";
import '../channels/channels.css';

const PrivateChat = (props) => {

    const [UsersState, setUsersState] = useState([]);
    const [ConnectedUsersState, setConnectedUsersState] = useState([]);

    const usersRef = firebase.database().ref("users");
    const connectedRef = firebase.database().ref(".info/connected");
    const statusRef = firebase.database().ref("status");

    useEffect(() => {
        usersRef.on('child_added', (snap) => {

            setUsersState((currentState) => {
                let updatedState = [...currentState];

                let user = snap.val();
                user.name = user.displayName;
                user.id = snap.key;
                user.isPrivateChat = true;
                updatedState.push(user);

                return updatedState;
            })
        });
        connectedRef.on("value", snap => {
            if (props.user && snap.val()) {
                const userStatusRef = statusRef.child(props.user.uid);
                userStatusRef.set(true);
                userStatusRef.onDisconnect().remove();
            }
        })
        return () => { usersRef.off(); connectedRef.off(); }
    }, [props.user])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        statusRef.on("child_added", snap => {
            setConnectedUsersState((currentState) => {
                let updatedState = [...currentState];
                updatedState.push(snap.key);
                return updatedState;
            })
        });

        statusRef.on("child_removed", snap => {
            setConnectedUsersState((currentState) => {
                let updatedState = [...currentState];
                let index = updatedState.indexOf(snap.key);
                updatedState.splice(index, 1);
                return updatedState;
            })
        });

        return () => statusRef.off();
    }, [UsersState]);// eslint-disable-line react-hooks/exhaustive-deps


    const generateChannelID = (userId) => {
        if (props.user?.uid < userId) {
            return (props.user?.uid + userId);
        }
        else {
            return (userId + props.user?.uid);
        }
    }

    const selectUser = (user) => {
        let userTemp = { ...user };
        userTemp.id = generateChannelID(user.id);
        props.selectChannel(userTemp);
    }

    const displayUsers = () => {
        if (UsersState.length > 0) {
            return UsersState.filter((user) => user.id !== props.user?.uid).map((user) => {
                return <Menu.Item className="channel_items"
                    key={user.id}
                    name={user.name}
                    onClick={() => selectUser(user)}
                    active={props.channel && generateChannelID(user.id) === props.channel.id}
                >
                    {ConnectedUsersState.indexOf(user.id) !== -1 ? <Icon name="circle" color="orange" /> : <Icon name="circle outline" color="grey" />
                    }
                    {"@ " + user.name}
                </Menu.Item>
            })
        }
    }



    return <Menu.Menu className="channel" style={{ marginTop: '35px' }}>
        <Menu.Item className="channel" style={{ fontSize: '17px' }}>
            <span >
                <Icon name="yellow paper plane" />Private Chat
            </span>
            ({UsersState.length - 1})
        </Menu.Item>
        {displayUsers()}
    </Menu.Menu>

}

const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser,
        channel: state.channel.currentChannel
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectChannel: (channel) => dispatch(setChannel(channel))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PrivateChat);