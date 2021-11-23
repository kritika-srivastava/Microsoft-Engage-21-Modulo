import React, { useState } from "react";
import { Segment, Input, Button } from "semantic-ui-react";
import firebase from "../../../server/firebase";
import { connect } from "react-redux";
import FileUpload from '../FileUpload/FileUpload';
import { v4 as uuidv4 } from 'uuid';

const MessageInput = (props) => {

    const messageRef = firebase.database().ref('messages');
    const storageRef = firebase.storage().ref('messages');


    const [messageState, setMessageState] = useState("");
    const [FileDialogState, setFileDialogState] = useState(false);


    const createMessageInfo = (downloadURL) => {
        return {
            user: {
                avatar: props.user.photoURL,
                name: props.user.displayName,
                id: props.user.uid
            },
            content: messageState,
            image: downloadURL || "",
            timestamp: firebase.database.ServerValue.TIMESTAMP
        }
    }
    const sendMessage = (downloadURL) => {
        if (messageState || downloadURL) {
            messageRef.child(props.channel.id)
                .push()
                .set(createMessageInfo(downloadURL))
                .then(() => setMessageState([]))
                .catch((err) => console.log(err))
        }
    }
    const onMessageChange = (e) => {
        const target = e.target;
        setMessageState(target.value);
    }

    const handleSubmitKey = (target) => {
        if (target.charCode == 13) {
            sendMessage();
        }
    }
    const createActionButtons = () => {
        return <>
            <Button icon="green send" onClick={() => { sendMessage() }} />
            <Button icon="red upload" onClick={() => setFileDialogState(true)} />
        </>
    }

    const uploadFile = (file, contentType) => {
        var filePath = ``;
        if (contentType == "image/jpg") { filePath = `chat/images/${uuidv4()}.jpg`; }
        else if (contentType == "image/jpeg") { filePath = `chat/images/${uuidv4()}.jpeg`; }
        else if (contentType == "image/png") { filePath = `chat/images/${uuidv4()}.png`; }
        else if (contentType == "application/pdf") { filePath = `chat/pdfs/${uuidv4()}.pdf`; }

        storageRef.child(filePath).put(file, { contentType: contentType })
            .then((data) => {
                data.ref.getDownloadURL()
                    .then((url) => {
                        sendMessage(url);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }

    return <Segment>
        <Input
            onKeyPress={handleSubmitKey}
            onChange={onMessageChange}
            fluid={true}
            name="message"
            value={messageState}
            placeholder="Message"
            label={createActionButtons()}
            labelPosition="right"
        />
        <FileUpload uploadFile={uploadFile} open={FileDialogState} onClose={() => setFileDialogState(false)} />
    </Segment>
}
const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser,
        channel: state.channel.currentChannel
    }
}
export default connect(mapStateToProps)(MessageInput);