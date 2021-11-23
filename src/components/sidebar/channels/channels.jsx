import React, { useState } from "react";
import { connect } from "react-redux";
import { Menu, Icon, Modal, Button, Form, Segment, Message } from 'semantic-ui-react';
import './channels.css';
import firebase from '../../../server/firebase';
const Channels = (props) => {
    const [modalOpenState, setModalOpenState] = useState(false);
    const [channelAddState, setChannelAddState] = useState({ name: '', description: '' });
    const [isLoadingState, setisLoadingState] = useState(false);


    const channelsRef = firebase.database().ref("channels");



    const openModal = () => {
        setModalOpenState(true);
    }

    const closeModal = () => {
        setModalOpenState(false);
    }
    const checkIfFormValid = () => {
        return channelAddState && channelAddState.name && channelAddState.description;
    }

    const onSubmit = () => {
        if (!checkIfFormValid) {
            return;
        }

        const key = channelsRef.push().key;
        const channel = {
            id: key,
            name: channelAddState.name,
            description: channelAddState.description,
            created_by: {
                name: props.user.displayName,
                avatar: props.user.photoURL
            }
        }


        setisLoadingState(true);
        channelsRef.child(key)
            .update(channel)
            .then(() => {
                setChannelAddState({ name: '', description: '' });
                setisLoadingState(false);
                closeModal();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleInput = (e) => {

        let target = e.target;
        setChannelAddState((currentState) => {
            let updatedState = { ...currentState };
            updatedState[target.name] = target.value;
            return updatedState;
        })
    }




    return <><Menu.Menu className="channel">
        <Menu.Item>
            <span className="channel">
                <Icon name=" yellow exchange" />Channels(0)
            </span>

            
        </Menu.Item>

        <Menu.Item>
            <span className="clickable" onClick={openModal}>
                <Icon name=" yellow add" />Add Channel
            </span>
        </Menu.Item>

    </Menu.Menu>

        <Modal open={modalOpenState} onClose={closeModal} >
            <Modal.Header>
                Create Channel
            </Modal.Header>
            <Modal.Content>
                <Form onSubmit={onSubmit}>
                    <Segment stacked>

                        <Form.Input
                            name="name"
                            value={channelAddState.name}
                            icon="code"
                            iconPosition="left"
                            onChange={handleInput}
                            type="text"
                            placeholder="Channel Name"
                        />
                        <Form.Input
                            name="description"
                            value={channelAddState.description}
                            icon="pencil alternate"
                            iconPosition="left"
                            onChange={handleInput}
                            type="text"
                            placeholder="Channel Description"

                        />
                    </Segment>
                </Form>

            </Modal.Content>

            <Modal.Actions>
                <Button loading={isLoadingState} onClick={onSubmit} className="ui blue button">
                    <Icon name="checkmark" /> Save
                </Button>
                <Button onClick={closeModal} className="ui red button">
                    <Icon name="remove" />Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    </>
}

const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser
    }
}
export default connect(mapStateToProps)(Channels);