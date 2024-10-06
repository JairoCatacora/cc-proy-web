// src/components/RecordPagos.js
import React, { useEffect, useState } from 'react';
import { getRecordPagos, createRecordPago, updateRecordPago, deleteRecordPago } from '../service/api';
import '../index.css'; // Importar el CSS global para aplicar los estilos

const RecordPagos = () => {
  const [recordPagos, setRecordPagos] = useState([]);
  const [nuevoRecordPago, setNuevoRecordPago] = useState({
    id_Record: '', // Campo id_Record ahora editable
    id_Deuda: '',
    fechaPago: '',
    montoPagado: '',
    metodoPago: '',
    estadoPago: 'pendiente'
  });

  const [editandoRecordPago, setEditandoRecordPago] = useState(null); // Estado para almacenar el registro de pago en edición

  useEffect(() => {
    cargarRecordPagos();
  }, []);

  const cargarRecordPagos = () => {
    getRecordPagos()
      .then(data => setRecordPagos(data))
      .catch(error => console.error("Error al obtener los registros de pago:", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoRecordPago({ ...nuevoRecordPago, [name]: value });
  };

  const agregarRecordPago = () => {
    createRecordPago(nuevoRecordPago)
      .then(() => {
        cargarRecordPagos();
        setNuevoRecordPago({
          id_Record: '',
          id_Deuda: '',
          fechaPago: '',
          montoPagado: '',
          metodoPago: '',
          estadoPago: 'pendiente'
        });
      })
      .catch(error => console.error("Error al agregar el registro de pago:", error));
  };

  const eliminarRecordPago = (id_Record) => {
    deleteRecordPago(id_Record)
      .then(() => cargarRecordPagos())
      .catch(error => console.error("Error al eliminar el registro de pago:", error));
  };

  const iniciarEdicion = (record) => {
    setEditandoRecordPago(record); // Establecer el registro seleccionado en estado de edición
    setNuevoRecordPago({ ...record }); // Rellenar el formulario con los datos actuales del registro de pago
  };

  const actualizarRecordPago = () => {
    updateRecordPago(editandoRecordPago.id_Record, nuevoRecordPago)
      .then(() => {
        cargarRecordPagos();
        setEditandoRecordPago(null); // Salir del modo de edición
        setNuevoRecordPago({
          id_Record: '',
          id_Deuda: '',
          fechaPago: '',
          montoPagado: '',
          metodoPago: '',
          estadoPago: 'pendiente'
        });
      })
      .catch(error => console.error("Error al actualizar el registro de pago:", error));
  };

  return (
    <div className="record-pagos-container">
      <div className="record-header">
        <h2>Gestión de Registros de Pago</h2>
        <button className="button-create" onClick={() => setEditandoRecordPago(null)}>Crear Registro de Pago</button>
      </div>

      <div className="record-list">
        {recordPagos.map((record, index) => (
          <div key={record.id_Record} className="record-item">
            <div>
              <strong>Registro {index + 1}:</strong>
              <p>
                ID Record: {record.id_Record}
                <br />
                ID Deuda: {record.id_Deuda}
                <br />
                Fecha de Pago: {new Date(record.fechaPago).toLocaleDateString()}
                <br />
                Monto Pagado: {record.montoPagado}
                <br />
                Método de Pago: {record.metodoPago}
                <br />
                Estado: {record.estadoPago}
              </p>
            </div>
            <div className="record-actions">
              <button className="button-edit" onClick={() => iniciarEdicion(record)}>Editar</button>
              <button className="button-delete" onClick={() => eliminarRecordPago(record.id_Record)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      <h3>{editandoRecordPago ? 'Editar Registro de Pago' : 'Agregar Nuevo Registro de Pago'}</h3>
      <div className="record-form">
        {/* Campo para ingresar el ID Record */}
        <input
          type="text"
          name="id_Record"
          placeholder="ID Record"
          value={nuevoRecordPago.id_Record}
          onChange={handleChange}
        />
        <input
          type="text"
          name="id_Deuda"
          placeholder="ID Deuda"
          value={nuevoRecordPago.id_Deuda}
          onChange={handleChange}
        />
        <input
          type="date"
          name="fechaPago"
          placeholder="Fecha de Pago"
          value={nuevoRecordPago.fechaPago}
          onChange={handleChange}
        />
        <input
          type="number"
          name="montoPagado"
          placeholder="Monto Pagado"
          value={nuevoRecordPago.montoPagado}
          onChange={handleChange}
        />
        <input
          type="text"
          name="metodoPago"
          placeholder="Método de Pago"
          value={nuevoRecordPago.metodoPago}
          onChange={handleChange}
        />
        <select name="estadoPago" value={nuevoRecordPago.estadoPago} onChange={handleChange}>
          <option value="pendiente">Pendiente</option>
          <option value="pagado">Pagado</option>
          <option value="devuelto">Devuelto</option>
        </select>
        <button className="button-submit" onClick={editandoRecordPago ? actualizarRecordPago : agregarRecordPago}>
          {editandoRecordPago ? 'Actualizar Registro de Pago' : 'Agregar Registro de Pago'}
        </button>
        {editandoRecordPago && (
          <button className="button-cancel" onClick={() => setEditandoRecordPago(null)}>Cancelar Edición</button>
        )}
      </div>
    </div>
  );
};

export default RecordPagos;
