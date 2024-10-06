import { useEffect, useState } from "react";
import {
  getClientes,
  editarCliente,
  eliminarCliente,
  createCliente,
} from "../service/api";
import "../index.css";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [nuevoCliente, setNuevoCliente] = useState({
    id_cliente: "",
    nombre: "",
    correo: "",
    numero: "",
    apellido: "",
    edad: "",
  });

  const [editandoCliente, setEditandoCliente] = useState(null); // Para manejar edición

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = () => {
    getClientes()
      .then((data) => setClientes(data))
      .catch((error) => console.error("Error al obtener los clientes:", error));
  };

  const handleChange = (nuevoCliente) => {
    // const { name, value } = nuevoCliente;
    setNuevoCliente(nuevoCliente);
  };

  const iniciarEdicion = (cliente) => {
    setEditandoCliente(cliente);
    setNuevoCliente(cliente);
  };

  const cancelarEdicion = () => {
    setEditandoCliente(null);
    setNuevoCliente({
      id_cliente: "",
      nombre: "",
      correo: "",
      numero: "",
      apellido: "",
    });
  };

  const handleEliminar = async (id_cliente) => {
    const confirm = window.confirm(
      "¿Estás seguro de que deseas eliminar este cliente?"
    );
    if (confirm) {
      try {
        const response = await eliminarCliente(id_cliente);
        console.log("Cliente eliminado:", response);
        cargarClientes(); // Recargar la lista después de eliminar
      } catch (error) {
        console.error("Error eliminando el cliente:", error);
      }
    }
  };

  const handleGuardar = async () => {
    try {
      if (editandoCliente) {
        // Actualiza el cliente
        await editarCliente(nuevoCliente.id_cliente, nuevoCliente);
        console.log("Cliente editado:", nuevoCliente);
      } else {
        await createCliente({
            nombre: nuevoCliente.nombre,
            correo: nuevoCliente.correo,
            numero: nuevoCliente.numero,
            apellido: nuevoCliente.apellido,
            edad: nuevoCliente.edad,
          });
      }
     
      cargarClientes(); // Recargar la lista después de la edición o creación
      cancelarEdicion(); // Resetear el formulario
    } catch (error) {
      console.error("Error guardando el cliente:", error);
    }
  };

  return (
    <div className="cliente-container">
      <div className="cliente-header">
        <h2>Gestión de Clientes</h2>
        <button className="button-create" onClick={() => cancelarEdicion()}>
          {editandoCliente ? "Cancelar Edición" : "Crear Nuevo Cliente"}
        </button>
      </div>

      <div className="cliente-list">
        {clientes.map((cliente) => (
          <div key={cliente.id_cliente} className="cliente-item">
            <div>
              <strong>Cliente:</strong>
              <p>
                Nombre: {cliente.nombre} {cliente.apellido}
                <br />
                Email: {cliente.correo}
                <br />
                Teléfono: {cliente.numero}
              </p>
            </div>
            <div className="cliente-actions">
              <button
                className="button-edit"
                onClick={() => iniciarEdicion(cliente)}
              >
                Editar
              </button>
              <button
                className="button-delete"
                onClick={() => handleEliminar(cliente.id_cliente)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <h3>{editandoCliente ? "Editar Cliente" : "Agregar Nuevo Cliente"}</h3>
      <div className="cliente-form">
        <form>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={nuevoCliente.nombre}
          onChange={(e) =>
            handleChange({ ...nuevoCliente, nombre: e.target.value })
          }
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={nuevoCliente.apellido}
          onChange={(e) =>
            handleChange({ ...nuevoCliente, apellido: e.target.value })
          }
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={nuevoCliente.correo}
          onChange={(e) =>
            handleChange({ ...nuevoCliente, correo: e.target.value })
          }
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={nuevoCliente.numero}
          onChange={(e) =>
            handleChange({ ...nuevoCliente, numero: e.target.value })
          }
        />
        <input
          type="text"
          name="edad"
          placeholder="Edad"
          value={nuevoCliente.edad}
          onChange={(e) =>
            handleChange({ ...nuevoCliente, edad: e.target.value })
          }
        />

        <button className="button-save" onClick={() => handleGuardar()}>
          {editandoCliente ? "Guardar Cambios" : "Agregar Cliente"}
        </button>
      </form>
      </div>
    </div>
  );
};

export default Clientes;
