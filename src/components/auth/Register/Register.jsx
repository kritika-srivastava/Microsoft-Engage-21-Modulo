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

const Register = () => {
  let user = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  let errors = [];

  let userCollectionRef = firebase.database().ref("users");

  const [userState, setuserState] = useState(user);
  const [errorState, seterrorState] = useState(errors);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  //triggered when the user submits the form
  const handleInput = (event) => {
    let target = event.target;
    setuserState((currentState) => {
      let currentuser = { ...currentState };
      currentuser[target.name] = target.value;
      return currentuser;
    });
  };

  //Cheecks if form is correct or not
  const checkForm = () => {
    if (isFormEmpty()) {
      seterrorState((error) =>
        error.concat({ message: "Please fill in all the fields." })
      );
      return false;
    } else if (!checkPassword()) {
      return false;
    }

    return true;
  };

  //Checks if form is empty or not
  const isFormEmpty = () => {
    return (
      !userState.userName.length ||
      !userState.password.length ||
      !userState.confirmPassword.length ||
      !userState.email.length
    );
  };

  //Checking the password length and matching
  const checkPassword = () => {
    if (userState.password.length < 8) {
      seterrorState((error) =>
        error.concat({
          message: "The Password length should be greater than 8.",
        })
      );
      return false;
    } else if (userState.password !== userState.confirmPassword) {
      seterrorState((error) =>
        error.concat({ message: "The Passwords do not match." })
      );
      return false;
    } else {
      return true;
    }
  };

  const onSubmit = () => {
    seterrorState(() => []);
    setIsSuccess(false);

    if (checkForm()) {
      setIsLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(userState.email, userState.password)
        .then((createdUser) => {
          setIsLoading(false);
          updateuserDetails(createdUser);
        })
        .catch((serverError) => {
          setIsLoading(false);
          seterrorState((error) => error.concat(serverError));
        });
    }
  };

  const updateuserDetails = (createdUser) => {
    if (createdUser) {
      setIsLoading(true);

      createdUser.user
        .updateProfile({
          displayName: userState.userName,
          photoURL: `http://gravatar.com/avatar/${createdUser.user.uid}?d=identicon`,
        })
        .then(() => {
          setIsLoading(false);
          saveUserInDB(createdUser);
        })
        .catch((serverError) => {
          setIsLoading(false);
          seterrorState((error) => error.concat(serverError));
        });
    }
  };

  const saveUserInDB = (createdUser) => {
    setIsLoading(true);
    userCollectionRef
      .child(createdUser.user.uid)
      .set({
        displayName: createdUser.user.displayName,
        photoURL: createdUser.user.photoURL,
      })
      .then(() => {
        setIsLoading(false);
        setIsSuccess(true);
      })
      .catch((serverError) => {
        setIsLoading(false);
        seterrorState((error) => error.concat(serverError));
      });
  };

  const formaterrors = () => {
    return errorState.map((error, index) => <p key={index}>{error.message}</p>);
  };

  return (
    <Grid verticalAlign="middle" textAlign="center" className="grid-form">
      <Grid.Column style={{ maxWidth: "600px" }}>
        <Header icon as="h2">
          <Icon name="green wechat">
            <div style={{ color: "black" }}> modulo</div>
          </Icon>
          Register
        </Header>
        <Form onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input
              name="userName"
              value={userState.userName}
              icon="user"
              iconPosition="left"
              onChange={handleInput}
              type="text"
              placeholder="UserName"
            />
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
            <Form.Input
              name="confirmPassword"
              value={userState.confirmPassword}
              icon="lock"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="Confirm Password"
            />
            <Button
              disabled={isLoading}
              loading={isLoading}
              className="ui fluid medium orange button"
            >
              Submit
            </Button>
          </Segment>
        </Form>
        {errorState.length > 0 && (
          <Message error>
            <h3>Errors</h3>
            {formaterrors()}
          </Message>
        )}
        {isSuccess > 0 && (
          <Message success>
            <h3>Successfully Registered</h3>
          </Message>
        )}
        <Message>
          Already a User? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
