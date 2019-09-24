import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';

// TODO: Replace the following with your app's Firebase project configuration
/*var firebaseConfig = {
    apiKey: "AIzaSyCIro1kufgHUFE-JtBXnMBOoCTyQH5bc5I",
    authDomain: "ralc-ux.firebaseapp.com",
    databaseURL: "https://ralc-ux.firebaseio.com",
    projectId: "ralc-ux",
    storageBucket: "ralc-ux.appspot.com",
    messagingSenderId: "469897941460",
    appId: "1:469897941460:web:82421a00ad855d52a70641"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);*/


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
