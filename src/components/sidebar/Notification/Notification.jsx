import React, { useState, useEffect } from "react";
import firebase from "../../../server/firebase";
import { Label } from "semantic-ui-react";

export const Notification = (props) => {
    const messagesRef = firebase.database().ref("messages");
    const usersRef = firebase.database().ref("users");
    const [channelVisitedState, setChannelVisitedState] = useState({});
    const [messagesTimeStampState, setmessagesTimeStampState] = useState({});

    useEffect(() => {
        if (props.user) {
            usersRef.child(props.user.uid).child('lastVisited').on('value', snap => {
                setChannelVisitedState(snap.val());
            })

            messagesRef.on('value', snap => {
                let messages = snap.val();
                let channelsID = Object.keys(messages);
                let messagesTimeStamp = {};

                channelsID.forEach((channelId) => {
                    let channelMessagesKey = Object.keys(messages[channelId]);
                    channelMessagesKey.reduce((agg, item) => {
                        messagesTimeStamp[channelId] = [...messagesTimeStamp[channelId] || []];
                        messagesTimeStamp[channelId].push(messages[channelId][item].timestamp);
                    })
                })
                setmessagesTimeStampState(messagesTimeStamp);
            })
        }
    }, [props.user]);// eslint-disable-line react-hooks/exhaustive-deps


    const calculateNotificationCount = (channelId) => {
        if (channelVisitedState && messagesTimeStampState && props.channel && props.channel.id !== channelId) {
            let lastVisited = channelVisitedState[channelId];
            let channelMessagesTimestamp = messagesTimeStampState[channelId];


            if (channelMessagesTimestamp) {
                let notificationCount = channelMessagesTimestamp.filter(timestamp => !lastVisited || lastVisited < timestamp).length;
                return notificationCount === 0 ? null : <Label color="orange">{notificationCount}</Label>
            }
        }
        return null;
    }

    return <> {props.displayName}{calculateNotificationCount(props.notificationChannelId)}</>;
}