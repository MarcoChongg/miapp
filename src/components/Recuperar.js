import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import Auth from 'firebase/app'

export const Recuperar = () => {

    const[usuario,setUser] = useState()

    const handleSubmit = (e) => {

        e.preventDefault()
        recuperar(usuario)

    }

    return(
        <div className='row'>
            <div className='col-md-4'>
                <form className='card card-body' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label className='form-label'>User</label>
                        <input type='email' className='form-control' onChange={e => setUser(e.target.value)} value={usuario} />
                    </div>

                    <button type='submit' className='btn btn-primary'>Submit</button>

                </form>

            </div>
        </div>
    )

}

function recuperar(usuario){

    firebase
    .auth()
    .sendPasswordResetEmail(usuario)
    .then(res =>{
        alert('check ur email')
    })
    .catch(e => {
        console.log(e.message)
    })
    
}