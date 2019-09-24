import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyCIro1kufgHUFE-JtBXnMBOoCTyQH5bc5I",
    authDomain: "ralc-ux.firebaseapp.com",
    databaseURL: "https://ralc-ux.firebaseio.com",
    projectId: "ralc-ux",
    storageBucket: "ralc-ux.appspot.com",
    messagingSenderId: "469897941460",
    appId: "1:469897941460:web:82421a00ad855d52a70641"
}

const firebaseApp = firebase.initializeApp(config);
export default firebaseApp;

//let db = firebase.firestore();
//db.settings({timestampsInSnapshots:true});
//export default db;

//export const FIREBASE_MESSAGING = firebase.messaging();
//const messaging = firebase.messaging();
//export const messaging = firebase.initializeApp().messaging();