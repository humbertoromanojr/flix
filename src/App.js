import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import Routes from './Routes';
import reducers from './reducers'
//import './config/StatusBarConfig';


class App extends Component {

    /*initializeFirebase() {
        const firebase = require("firebase");
       
        // Initialize Firebase
        firebase.initializeApp({
            apiKey: "AIzaSyB2SVmpuZyCiGvopRrOIwyDtzNLoG1jX4I",
            authDomain: "flix-8ab5b.firebaseapp.com",
            databaseURL: "https://flix-8ab5b.firebaseio.com",
            projectId: "flix-8ab5b",
            storageBucket: "",
            messagingSenderId: "395123320928"
        });
    }
 
    componentWillMount() {
        this.initializeFirebase();
    }*/
  
    render() {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <Routes />
            </Provider>
        )
    }
}

export default App;