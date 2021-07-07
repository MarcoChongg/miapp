import React from 'react';
import {BrowserRouter as Router ,Switch, Route }from 'react-router-dom';
import { Contacto } from './components/contacto';
import { Inicio } from './components/inicio';
import { Signin } from './components/signin';
import { Media } from './components/media';
import { NavBar } from './components/navbar';
import { Nosotros } from './components/nosotros';
import Bygoogle from './components/Bygoogle';
import { Login } from './components/login';
import { Recuperar } from './components/Recuperar';
import { Chat } from './components/chat';
import { Chat2 } from './components/chat2';
import { Soporte } from './components/soporte';


function miPrimeraFuncion(nombre, apellido){
  
  var salida = <div>
      <h2>hola, me llamo {nombre}</h2>
      <h1>{apellido}</h1>
    </div>

  return salida;
}

//var nombre = <div><h1>Marco</h1><h2>Chong</h2></div>

var nombre = 'Marco';
var apellido = 'Chong';

function App() {
  return (
    <Router>
    <NavBar/>
    <Bygoogle/>
      <div>
        <Switch>
          <Route path = '/inicio' component = {Inicio} />
          <Route path = '/About Us' component = {Nosotros} />
          <Route path = '/Contact Us' component = {Contacto} />
          <Route path = '/Media' component = {Media} />
          <Route path = '/Signin' component = {Signin} />
          <Route path='/recuperar' component= {Recuperar} />
          <Route path='/Chat2' component= {Chat2} />
          <Route path='/Soporte' component= {Soporte} />
          <Route path = '/' component = {Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
//<>