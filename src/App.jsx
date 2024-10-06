// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Deudas from './components/Deudas';
import RecordPagos from './components/RecordPagos';
import Inicio from './pages/Inicio';
import InicioDeudas from './pages/Inicio-Deudas';
import InicioClientes from './pages/Inicio-Clientes';
import InicioTransacciones from './pages/Inicio-Transacciones';
function App() {
  return (
    <Router>
      <div className="App">
        {/* Definir las rutas de la aplicación */}
        <Routes>
          <Route path="/" element={<Inicio />} /> {/* Página principal */}
          <Route path="/inicio-deudas" element={<InicioDeudas />} /> {/* Página de inicio para Deudas */}
          <Route path="/inicio-clientes" element={<InicioClientes />} /> 
          <Route path="/inicio-transacciones" element={<InicioTransacciones />} /> 

        </Routes> 
      </div>
    </Router>
  );
}

export default App;
