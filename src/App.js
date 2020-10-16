import React from 'react'
import { Provider } from 'react-redux';

import MapScreen from './components/Map.js';
import LoginNav from './components/LoginView/LoginNav.js';

import store from './store/index'
import { connect } from "react-redux";

////////////////////////////////////////////////////////////////////
// App component sets up connection between redux store
// and all nested components.
// Renders MainScreen
////////////////////////////////////////////////////////////////////

function App() {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
}

////////////////////////////////////////////////////////////////////
// MainScreen Renders Login Navigation if user is not logged in
// Renders Map Component Suite if user is logged in
////////////////////////////////////////////////////////////////////

function MainScreen(props) {
  return (
    !props.loggedIn
      ? <LoginNav />
      : <MapScreen />

  )
}

////////////////////////////////////////////////////////////////////
// Connection to Redux store
////////////////////////////////////////////////////////////////////

const mapStateToProps = store => {
  return {
    loggedIn: store.logReducer.loggedIn,
    username: store.logReducer.username
  }
}

connect(mapStateToProps)(MainScreen);

export default App;