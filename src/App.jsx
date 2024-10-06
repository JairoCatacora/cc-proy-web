// src/App.js
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Inicio from './pages/Inicio';
import InicioClientes from './pages/Inicio-Clientes';
import InicioDeudas from './pages/Inicio-Deudas';
import InicioTransacciones from './pages/Inicio-Transacciones';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Inicio />} /> 
          <Route path="/inicio-deudas" element={<InicioDeudas />} />
          <Route path="/inicio-clientes" element={<InicioClientes />} /> 
          <Route path="/inicio-transacciones" element={<InicioTransacciones />} /> 

        </Routes> 
      </div>
    </Router>
  );
}

export default App;
