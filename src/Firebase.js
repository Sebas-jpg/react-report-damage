import * as firebase from 'firebase';
// import firestore from 'firebase/firestore'

const config = {
    apiKey: "AIzaSyAAapWo7IjsM51kmCCQ-3MAlY3Fx-hi-pI",
    authDomain: "cycleway-damage.firebaseapp.com",
    databaseURL: "https://cycleway-damage.firebaseio.com",
    projectId: "cycleway-damage",
    storageBucket: "cycleway-damage.appspot.com",
    messagingSenderId: "722433868825",
    appId: "1:722433868825:web:5938dca2428109ad7a1688"
  };

  firebase.initializeApp(config);
  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();
  export default firebase;