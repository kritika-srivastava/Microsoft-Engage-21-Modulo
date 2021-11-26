import React, { useState } from "react";
import {
  Form,
  Grid,
  Segment,
  Icon,
  Header,
  Button,
  Message,
} from "semantic-ui-react";
import "../auth.css";
import { Link } from "react-router-dom";
import firebase from "../../../server/firebase";

const Login = () => {
  let user = {
    email: "",
    password: "",
  };
  let errors = [];

  const [userState, setuserState] = useState(user);
  const [errorState, seterrorState] = useState(errors);
  const [isLoading, setIsLoading] = useState(false);

  //triggered when the user submits the form
  const handleInput = (event) => {
    let target = event.target;
    setuserState((currentState) => {
      let currentuser = { ...currentState };
      currentuser[target.name] = target.value;
      return currentuser;
    });
  };

  //Checking errors in form
  const checkForm = () => {
    if (isFormEmpty()) {
      seterrorState((error) =>
        error.concat({ message: "Please fill in all the fields." })
      );
      return false;
    }
    return true;
  };

  //Checking if form is empty or not
  const isFormEmpty = () => {
    return !userState.password.length || !userState.email.length;
  };

  //Saving the login data to firebase.
  const onSubmit = () => {
    seterrorState(() => []);
    if (checkForm()) {
      setIsLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(userState.email, userState.password)
        .then((user) => {
          setIsLoading(false);
          console.log(user);
        })
        .catch((serverError) => {
          setIsLoading(false);
          seterrorState((error) => error.concat(serverError));
        });
    }
  };

  const formaterrors = () => {
    return errorState.map((error, index) => <p key={index}>{error.message}</p>);
  };

  return (
    <Grid verticalAlign="middle" textAlign="center" className="grid-form">
      <Grid.Column style={{ maxWidth: "600px" }}>
        <Header icon as="h2">
          <Icon name="green wechat">
            <div style={{ color: "black" }} id="fonts">
              {" "}
              modulo
            </div>
          </Icon>
          Login
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
              type="password"
              placeholder="Password"
            />
            <Button
              disabled={isLoading}
              loading={isLoading}
              className="ui fluid medium orange button"
            >
              Login
            </Button>
          </Segment>
        </Form>
        {errorState.length > 0 && (
          <Message error>
            <h3>Errors</h3>
            {formaterrors()}
          </Message>
        )}
        <Message>
          Not a User? <Link to="/register">Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
