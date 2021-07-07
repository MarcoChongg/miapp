import React from 'react'
import logo from '../logo.svg';
import '../Chat.css';
import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useRef, useState } from 'react';

const auth = firebase.auth()
const firestore = firebase.firestore()
const analytics = firebase.analytics()
var correo = ''
var usuarioChatId = ''

export const Chat2 = () => {
  const [user] = useAuthState(auth)

  return (
    <div className="App">

      <section>
        { user ? <><Chatroom/> </> : <SignIn/> }
      </section>

    </div>
  );
}

function Chatroom(){
  const [user] = useAuthState(auth)
  const {uid, photoURL, createdAt} = auth.currentUser
  correo = auth.currentUser.email
  
  const dummy = useRef()
  const messageRef = firestore.collection('messages')
  const query = messageRef.orderBy('createdAt').limit(25)
  const [messages] = useCollectionData(query, {idField: 'id'})

  const [formValue,setFormValue] = useState('')

  const sendMessage = async (e) =>{

    e.preventDefault()
    const {uid, photoURL, createdAt} = auth.currentUser

    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('')
    dummy.current.scrollIntoView({ behaviour: 'smooth'})

  }
  return(<>
    <div>
      <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
      {/*---- Include the above in your HEAD tag --------*/}
      <title>Chat</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossOrigin="anonymous" />
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.min.css" />
      {/*Coded With Love By Mutiullah Samim*/}
      <div className="container-fluid h-100">
        <div className="row justify-content-center h-100">
          <div className="col-md-4 col-xl-3 chat"><div className="card mb-sm-3 mb-md-0 contacts_card">
              <div className="card-header">
                <div className="input-group">
                  <input type="text" placeholder="Search..." name className="form-control search" />
                  <div className="input-group-prepend">
                    <span className="input-group-text search_btn"><i className="fas fa-search" /></span>
                  </div>
                </div>
              </div>
              <div className="card-body contacts_body">
                <ui className="contacts">
                  <li className="active">
                    {GetUsers()}
                  </li>
                </ui>
              </div>
              <div className="card-footer" />
            </div></div>
          <div className="col-md-8 col-xl-6 chat">
            <div className="card">
              <div className="card-header msg_head">
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img src={photoURL} className="rounded-circle user_img" />
                    <span className="online_icon" />
                  </div>
                  <div className="user_info">
                    <span>Chat with {user.displayName}</span>
                    <p></p>
                  </div>
                  <div className="video_cam">
                    <span><i className="fas fa-video" /></span>
                    <span><i className="fas fa-phone" /></span>
                  </div>
                </div>
              </div>
              <div className="card-body msg_card_body">
                <main>
                  {messages && messages.map(msg => <ChatMessage key = {msg.id} message= {msg} />)}
                  <span ref= {dummy}></span>
                </main>
              </div>
              <form onSubmit={sendMessage}>
                <div className="card-footer">
                  <div className="input-group">
                    <textarea required name className="form-control type_msg" placeholder="Type your message..." defaultValue={""} value= {formValue} onChange= { (e) => setFormValue(e.target.value)}/>
                    <div className="input-group-append">
                      <span className="input-group-text send_btn" >
                        <button type='submit' className="btn btn-primary" >
                          <i className="fas fa-location-arrow" />
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}

function Usuarios(props){
  const {uid,displayName,lasttime,photoURL} = props.usuario
  if (uid === auth.currentUser.uid || uid === "c2cXo7RJ17YpIgfovRDhnRVhxvJ2") {
    return  (<></>)
  }
  const ultima = new Date(lasttime.seconds*1000)
  usuarioChatId = uid
      return (<>
          <div >
            <div>
              <div className="img_cont">
                <img src={photoURL} id = {uid} className="rounded-circle user_img" />
              </div>
              <div className="user_info">
                <span id={uid} onClick = {e => NewChat(e.target.id)}>{displayName}</span>
                <p>Last login: {ultima.toLocaleString()}</p>
              </div>
            </div>
          </div>
      </>)
}

function GetUsers (){
  const usuariosRef = firestore.collection('usuarios')
  const query = usuariosRef.orderBy('lasttime').limit(25)
  const [usuarios] = useCollectionData(query, {idField:'id'})
  return (<>
        <div className="user_info">
          {usuarios && usuarios.map(user => <Usuarios key = {user.id} usuario = {user} />)}
        </div>
   
  </>)
}

function SignIn(){

  const signWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider).then((result)=>{
      Alta()
    })
  }

  const signWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider()
    auth.signInWithPopup(provider).then((result)=>{
      Alta()
    })
  }

  return (<>
    <button className = "sign-in" onClick= {signWithGoogle}> Iniciar Sesion </button>
    <button className = "sign-in" onClick= {signWithFacebook}> Iniciar Sesion FB</button>
    <p>Bienvenido</p>
  </>)

}

function SignOut(){

  return auth.currentUser && (
    <button className="sign-out" onClick = {() => auth.signOut() }> Salir </button>
  )
}

function Alta(){
  const Registro = async () =>{
    const registro = firestore.collection("usuarios")
    const {uid,photoURL,displayName,email} = auth.currentUser
    const hora = firebase.firestore.FieldValue.serverTimestamp()

    await registro.add({
      uid,
      photoURL,
      displayName,
      email,
      login: hora,
      lasttime: hora
    })
  }

  firestore.collection('usuarios').where('email', "==", auth.currentUser.email).get().then(
    async (e) => {

      if(e.empty){
        Registro()
      } 

    }
  )
  
}

function NewChat(targetuid){
  const Create = async () =>{
    const alta = firestore.collection(targetuid+auth.currentUser.uid)
    const {uid,photoURL} = auth.currentUser
    await alta.add({
        text: 'inicio de chat',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
    })
  }

  firestore.collection(targetuid+auth.currentUser.uid).where('uid', "==", auth.currentUser.uid).get().then(
    async (e) => {

      if(e.empty){
        Create()
      } 

    }
  )
}

function ChatMessage(props){
  const {text, uid, photoURL, createdAt} = props.message

  const messageClass = uid == auth.currentUser.uid ? 'sent': 'received'

  const time = createdAt ? createdAt.toDate().toLocaleTimeString() : null
  const date = createdAt ? createdAt.toDate().toDateString() : null
  
  if(messageClass == 'received'){
    return(<>
      <div className = 'd-flex justify-content-start mb-4' >
        <div className="img_cont_msg">
            <img src={photoURL} className="rounded-circle user_img_msg" />
        </div>
        <div className = 'msg_cotainer'>
          {text} 
          <span className="msg_time_send">{time}</span>
        </div>
      </div>
    </>)
  }

  if(messageClass == 'sent'){
    return(<>
      <div className = 'd-flex justify-content-end mb-4' >
        <div className = 'msg_cotainer_send' >
          {text} 
          <span className="msg_time">{time}</span>
        </div>
        <div className="img_cont_msg">
          <img src={photoURL} className="rounded-circle user_img_msg" />
        </div>
      </div>
    </>)
  }

}