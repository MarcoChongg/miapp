import React,{Component} from 'react'
import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from '../firebaseConfig.js'
import {Redirect} from 'react-router-dom'


const firebaseApp = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const firestore = firebase.firestore()

class Bygoogle extends Component{

    render(){
        const{
            user,
            signOut,
            signInWithGoogle,
            signInWithFacebook,
        } = this.props

        return(
            <div>
                {
                    user
                    ? <Redirect to='/inicio' />
                    : <Redirect to='/' />
                }

                {
                    user
                    ? <Redirect to='/inicio' />
                    :  <style type="text/css">{`.navchat {display: none}`}</style>
                }

                {
                    user
                    ? <button onClick= {signOut}>SIGN OUT</button> 
                    : SignIn() 
                }
            </div>

            
        )
    }
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {

    googleProvider: new firebase.auth.GoogleAuthProvider(),
    facebookProvider: new firebase.auth.FacebookAuthProvider(),
}

export default withFirebaseAuth({
    providers,
    firebaseAppAuth

})(Bygoogle)

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

//<>