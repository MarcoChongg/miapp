import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import firebase, { Auth } from 'firebase/app'
import 'firebase/auth'

export const Login = () =>{
    
    const[usuario,setUser] = useState()
    const[password,setPass] = useState()

    const handleSubmit = (e) => {

        e.preventDefault()
        login(usuario,password)

    }

    return(
        <div className='row'>
            <div className='col-md-4'>
                <form className='card card-body' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label className='form-label'>User</label>
                        <input type='email' className='form-control' onChange={e => setUser(e.target.value)} value={usuario} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Password</label>
                        <input type='password' className='form-control' onChange={e => setPass(e.target.value)} value={password} />
                    </div>

                    <button type='submit' className='btn btn-primary'>LOG IN</button>

                </form>

                <Link className='navbar-brand' to='/signin'>Not registered?</Link>
                <Link className='navbar-brand' to='/recuperar'>Forgot your password?</Link>

            </div>
        </div>
    )
}

function login(usuario,password){
    firebase
    .auth()
    .signInWithEmailAndPassword(usuario,password)
    .then(res => {
        if (res.user) Auth.setLoggedIn(true)
    })
    .catch(e =>{
        console.log()
    })
    
}