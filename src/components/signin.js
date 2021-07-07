import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import firebase, { Auth } from 'firebase/app'

export const Signin =  () => {

    const[usuario,setUser] = useState()
    const[password,setPass] = useState()
    const[repass,setRepass] = useState()

    const handleSubmit = (e) => {

        if (validatePass(password,repass) == true){
            e.preventDefault()
            addUser(usuario,password)
            console.log('presiono botón')
        }
    }
    return(
        <div className='row'>
            <div className='col-md-4'>
                <form className='card card-body' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label class="form-control-label mbr-fonts-style display-7" for="name-form1-4">User</label>
                        <input type='email' className='form-control' onChange={e => setUser(e.target.value)} value={usuario} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Password</label>
                        <input type='password' className='form-control' onChange={e => setPass(e.target.value)} value={password} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Confirm Password</label>
                        <input type='password' className='form-control' onChange={e => setRepass(e.target.value)} value={repass} />
                    </div>

                    <button type='submit' className='btn btn-primary'>SIGN IN</button>

                </form>

                <Link className='navbar-brand' to='/login'>Already have an account?</Link>

            </div>
        </div>
    )

}

function addUser(user,password){
    firebase.auth().createUserWithEmailAndPassword(user,password).then(res => {
        if (res.user) Auth.setLoggedIn(true)
    })
    .catch(e =>{
        console.log(e.message)
    })
}
function validatePass(password,repassword){
    if(password===repassword){
        return true;
    } else{
        alert("passwords do not match");
        return false;
    }
}
//<>