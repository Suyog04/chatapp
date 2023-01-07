import React, { useRef, useState } from 'react';
import './App.css';

// import firebase
import firebase from "firebase/compat/app"
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'


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

function App() 
{

  const [user] = useAuthState(auth)
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <section className="App-main">
        {user ? <ChatRoom />: <SignIn />} 
      </section>
    </div>
  );
}

// Sign in component
const SignIn = () =>
{
  const signInWithGoogle = () =>
  {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return(
    <button onClick={ signInWithGoogle }>You have to sign in with google.</button>
  )
}

// Sign out component
const SignOut = () =>
{
  return auth.currentUser &&(
    <button onClick={ auth.signOut()}>Sign Out</button>
  )
}

const ChatRoom = () =>
{
  const dummy = useRef();
  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderby('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});
  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({behaviour: 'smooth'})
  }

  return(
    <>
      <main>
        {messages && messages.map(msg => <ChatMessage key = {msg.id} message = {msg} /> )}

        <span ref = {dummy}></span>
      </main>
      <form onSubmit = { sendMessage}>
        <input value = {formValue} onChange = {(e) => setFormValue(e.target.value)} placeholder = "say something nice" />

        <button type = "submit" disabled = {!formValue}>Send</button>
      </form>
    </>
  )
}

const ChatMessage = (props) =>
{
  const { text, uid, photoURL } = props.message
  const messageClass = uid === auth.currentUset.uid? 'sent': 'recieved'

  return(
    <>
      <div className = { `message ${messageClass}` }>
        <p>
          {text}
        </p>
      </div>
    </>
  )
}


export default App;
