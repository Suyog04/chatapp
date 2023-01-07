import React from 'react';
import './App.css';

// import firebase
import firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/auth'


// Firebase authentication hooks
import {useAuthState} from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyBNPfdGC3VpXZs0md9Q5w1V-BtLb6XvEuk",
  authDomain: "letsconnect-bf285.firebaseapp.com",
  projectId: "letsconnect-bf285",
  storageBucket: "letsconnect-bf285.appspot.com",
  messagingSenderId: "958357147280",
  appId: "1:958357147280:web:302318a90e6e62ae655215",
  measurementId: "G-G92WG9GYR8"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        section
      </header>
    </div>
  );
}

export default App;
