import React, { useState } from "react";
import { Button, Modal, ModalActions, Input, Icon } from "semantic-ui-react";
import mime from 'mime-types';
const FileUpload = (props) => {


    const [fileState, setFileState] = useState(null);
    const acceptedTypes = ["image/png", "image/jpeg", "image/jpg", "application/pdf"]

    const onFileAdded = (e) => {
        const file = e.target.files[0];

        if (file) {
            setFileState(file);
        }
    }

    const submit = () => {
        if (fileState && acceptedTypes.includes(mime.lookup(fileState.name))) {
            props.uploadFile(fileState, mime.lookup(fileState.name));
            props.onClose();
            setFileState(null);
        }
    }


    return (<Modal basic open={props.open} onClose={props.onClose}>
        <Modal.Header> Select a file </Modal.Header>
        <Modal.Content>
            <Input
                type="file"
                name="file"
                fluid
                onChange={onFileAdded}
                label="File Type (png,jpeg,jpg,pdf)"
            />
        </Modal.Content>
        <ModalActions>
            <Button className="ui blue button" onClick={submit}>
                <Icon name="checkmark" /> Add File
            </Button>
            <Button className="ui red button" onClick={props.onClose}>
                <Icon name="remove" /> Close
            </Button>

        </ModalActions>

    </Modal>)
}

export default FileUpload;