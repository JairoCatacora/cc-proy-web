// src/components/Deudas.js
import React, { useEffect, useState } from 'react';
import { getDeudas, createDeuda, updateDeuda, deleteDeuda } from '../service/api';
import '../index.css'; // Asegúrate de importar el CSS global

const Deudas = () => {
  const [deudas, setDeudas] = useState([]);
  const [nuevaDeuda, setNuevaDeuda] = useState({
    id_Deuda: '',
    numeroCuotas: '',
    montoPorCuota: '',
    fechaInicio: '',
    fechaFin: '',
    estado: 'activo'
  });

  const [editandoDeuda, setEditandoDeuda] = useState(null); // Estado para almacenar la deuda en edición

  useEffect(() => {
    cargarDeudas();
  }, []);

  const cargarDeudas = () => {
    getDeudas()
      .then(data => setDeudas(data))
      .catch(error => console.error("Error al obtener las deudas:", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaDeuda({ ...nuevaDeuda, [name]: value });
  };

  const agregarDeuda = () => {
    createDeuda(nuevaDeuda)
      .then(() => {
        cargarDeudas();
        setNuevaDeuda({
          id_Deuda: '',
          numeroCuotas: '',
          montoPorCuota: '',
          fechaInicio: '',
          fechaFin: '',
          estado: 'activo'
        });
      })
      .catch(error => console.error("Error al agregar la deuda:", error));
  };

  const eliminarDeuda = (id_Deuda) => {
    deleteDeuda(id_Deuda)
      .then(() => cargarDeudas())
      .catch(error => console.error("Error al eliminar la deuda:", error));
  };

  const iniciarEdicion = (deuda) => {
    setEditandoDeuda(deuda); // Establecer la deuda seleccionada en estado de edición
    setNuevaDeuda({ ...deuda }); // Rellenar el formulario con los datos actuales de la deuda
  };

  const actualizarDeuda = () => {
    updateDeuda(editandoDeuda.id_Deuda, nuevaDeuda)
      .then(() => {
        cargarDeudas();
        setEditandoDeuda(null); // Salir del modo de edición
        setNuevaDeuda({
          id_Deuda: '',
          numeroCuotas: '',
          montoPorCuota: '',
          fechaInicio: '',
          fechaFin: '',
          estado: 'activo'
        });
      })
      .catch(error => console.error("Error al actualizar la deuda:", error));
  };

  return (
    <div className="deuda-container">
      <div className="deuda-header">
        <h2>Gestión de Deudas</h2>
        <button className="button-create" onClick={() => setEditandoDeuda(null)}>Crear Nueva Deuda</button>
      </div>

      <div className="deuda-list">
        {deudas.map((deuda, index) => (
          <div key={deuda.id_Deuda} className="deuda-item">
            <div>
              <strong>Deuda {index + 1}:</strong>
              <p>
                Número de Cuotas: {deuda.numeroCuotas}
                <br />
                Monto por Cuota: {deuda.montoPorCuota}
                <br />
                Fecha de Inicio: {new Date(deuda.fechaInicio).toLocaleDateString()}
                <br />
                Fecha de Fin: {new Date(deuda.fechaFin).toLocaleDateString()}
                <br />
                Estado: {deuda.estado}
              </p>
            </div>
            <div className="deuda-actions">
              <button className="button-edit" onClick={() => iniciarEdicion(deuda)}>Editar</button>
              <button className="button-delete" onClick={() => eliminarDeuda(deuda.id_Deuda)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      <h3>{editandoDeuda ? 'Editar Deuda' : 'Agregar Nueva Deuda'}</h3>
      <div className="deuda-form">
        <input
          type="text"
          name="id_Deuda"
          placeholder="ID de Deuda"
          value={nuevaDeuda.id_Deuda}
          onChange={handleChange}
          disabled={!!editandoDeuda} // Deshabilitar edición del ID durante la edición de la deuda
        />
        <input
          type="number"
          name="numeroCuotas"
          placeholder="Número de Cuotas"
          value={nuevaDeuda.numeroCuotas}
          onChange={handleChange}
        />
        <input
          type="number"
          name="montoPorCuota"
          placeholder="Monto por Cuota"
          value={nuevaDeuda.montoPorCuota}
          onChange={handleChange}
        />
        <input
          type="date"
          name="fechaInicio"
          placeholder="Fecha de Inicio"
          value={nuevaDeuda.fechaInicio}
          onChange={handleChange}
        />
        <input
          type="date"
          name="fechaFin"
          placeholder="Fecha de Fin"
          value={nuevaDeuda.fechaFin}
          onChange={handleChange}
        />
        <select name="estado" value={nuevaDeuda.estado} onChange={handleChange}>
          <option value="activo">Activo</option>
          <option value="finalizado">Finalizado</option>
          <option value="en mora">En mora</option>
        </select>
        <button className="button-submit" onClick={editandoDeuda ? actualizarDeuda : agregarDeuda}>
          {editandoDeuda ? 'Actualizar Deuda' : 'Agregar Deuda'}
        </button>
        {editandoDeuda && (
          <button className="button-cancel" onClick={() => setEditandoDeuda(null)}>Cancelar Edición</button>
        )}
      </div>
    </div>
  );
};

export default Deudas;
