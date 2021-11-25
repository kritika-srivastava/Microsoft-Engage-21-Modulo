import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import Register from './components/auth/Register/Register';
import Login from './components/auth/Login/Login';
import 'semantic-ui-css/semantic.min.css'
import firebase from './server/firebase'
import { Provider, connect } from "react-redux";
import { createStore } from 'redux';
import { combinedReducers } from './actions/reducer';
import { setUser } from './actions/actioncreator';
import { AppLoader } from './components/AppLoader/AppLoader';


const store = createStore(combinedReducers)

const Index = (props) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.setUser(user);
        props.history.push("/");
      }
      else {
        props.setUser(null);
        props.history.push("/login");
      }
    })
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  console.log("Debug", props.currentUser);

  return (
    <>
    <AppLoader loading={props.loading && props.location.pathname === "/"} />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path='/' component={App} />
      </Switch>
    </>)
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    loading: state.channel.loading
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => { dispatch(setUser(user)) }

  }
}

const IndexWithRouter = withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <IndexWithRouter />
      </Router>
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
