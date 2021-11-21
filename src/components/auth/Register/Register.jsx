import React, { useState } from 'react';
import { Form, Grid, Segment, Icon, Header, Button, Message } from 'semantic-ui-react';
import './Register.css';

const Register = () => {

    let user = {
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    let errors = [];
    const [userState, setuserState] = useState(user);
    const [errorState, seterrorState] = useState(errors);

    const handleInput = (event) => {
        let target = event.target;
        setuserState((currentState) => {
            let currentuser = { ...currentState };
            currentuser[target.name] = target.value;
            return currentuser;
        })
    }

    const checkForm = () => {
        if (isFormEmpty()) {
            seterrorState((error) => error.concat({ message: "Please fill in all the fields." }));
            return false;
        } else if (!checkPassword()) {
            seterrorState((error) => error.concat({ message: "Given Password is not Valid." }));
            return false;
        }

        return true;
    }

    const isFormEmpty = () => {
        return !userState.userName.length ||
            !userState.password.length ||
            !userState.confirmPassword.length ||
            !userState.email.length;
    }

    const checkPassword = () => {
        if (userState.password.length < 8) {
            return false;
        }
        else if (userState.password !== userState.confirmPassword) {
            return false;
        }
        else {
            return true;
        }
    }

    const onSubmit = () => {
        seterrorState(() => []);
        if (checkForm()) {

        } else {

        }
    }

    const formaterrors = () => {
        return errorState.map((error, index) => <p key={index}>{error.message}</p>);
    }


    return <Grid verticalAlign="middle" textAlign="center" className="grid-form">
        <Grid.Column style={{ maxWidth: '600px' }}>
            <Header icon>
                <Icon name="wechat" >  modulo</Icon>

                Register
            </Header>
            <Form onSubmit={onSubmit}>
                <Segment stacked>
                    <Form.Input
                        name="email"
                        value={userState.email}
                        icon="mail"
                        iconPosition="left"
                        onChange={handleInput}
                        type="text"
                        placeholder="User Email"
                    />
                    <Form.Input
                        name="password"
                        value={userState.password}
                        icon="lock"
                        iconPosition="left"
                        onChange={handleInput}
                        type="text"
                        placeholder="Password"
                    />
                    <Form.Input
                        name="confirmPassword"
                        value={userState.confirmPassword}
                        icon="lock"
                        iconPosition="left"
                        onChange={handleInput}
                        type="text"
                        placeholder="Confirm Password"
                    />
                    <Form.Input
                        name="userName"
                        value={userState.userName}
                        icon="user"
                        iconPosition="left"
                        onChange={handleInput}
                        type="text"
                        placeholder="UserName"
                    />
                </Segment>
                <Button className="ui red button">Submit</Button>
            </Form>
            {errorState.length > 0 && <Message error>
                <h3>Errors</h3>
                {formaterrors()}

            </Message>
            }
        </Grid.Column>
    </Grid>


}

export default Register;