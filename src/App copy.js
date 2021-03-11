import logo from './logo.svg';
import './App.css';

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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {miPrimeraFuncion(nombre, apellido)}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
