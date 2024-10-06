// src/service/api.js
import axios from 'axios';

// URL base de la API del backend
const API_URL = 'http://34.232.98.170:8000/api'; // Cambia localhost por tu IP de AWS

// Resto de tu código sigue igual...


// Función para obtener todas las deudas
export const getDeudas = async () => {
  try {
    const response = await axios.get(`${API_URL}/deudas`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo las deudas:', error);
    throw error;
  }
};

// Función para agregar una nueva deuda
export const createDeuda = async (deudaData) => {
  try {
    console.log("Enviando datos de nueva deuda:", deudaData); // Imprime los datos que se envían
    const response = await axios.post(`${API_URL}/deudas`, deudaData);
    return response.data;
  } catch (error) {
    console.error('Error creando la deuda:', error);
    throw error;
  }
};

// Función para actualizar una deuda por ID
export const updateDeuda = async (id_Deuda, updatedData) => {
  try {
    console.log("Actualizando deuda con ID:", id_Deuda, updatedData); // Imprime los datos que se envían
    const response = await axios.put(`${API_URL}/deudas/${id_Deuda}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error actualizando la deuda:', error);
    throw error;
  }
};

// Función para eliminar una deuda por ID
export const deleteDeuda = async (id_Deuda) => {
  try {
    const response = await axios.delete(`${API_URL}/deudas/${id_Deuda}`);
    return response.data;
  } catch (error) {
    console.error('Error eliminando la deuda:', error);
    throw error;
  }
};

// Función para obtener todos los registros de pago
export const getRecordPagos = async () => {
  try {
    const response = await axios.get(`${API_URL}/recordpago`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo los registros de pago:', error);
    throw error;
  }
};

// Función para crear un nuevo registro de pago
export const createRecordPago = async (recordPagoData) => {
  try {
    console.log("Enviando datos de nuevo registro de pago:", recordPagoData); // Imprime los datos que se envían
    const response = await axios.post(`${API_URL}/recordpago`, recordPagoData);
    return response.data;
  } catch (error) {
    console.error('Error creando el registro de pago:', error);
    throw error;
  }
};

// Función para eliminar un registro de pago por ID
export const deleteRecordPago = async (id_Record) => {
  try {
    const response = await axios.delete(`${API_URL}/recordpago/${id_Record}`);
    return response.data;
  } catch (error) {
    console.error('Error eliminando el registro de pago:', error);
    throw error;
  }
};

// Función para actualizar un registro de pago por ID
export const updateRecordPago = async (id_Record, updatedData) => {
  try {
    console.log("Actualizando registro de pago con ID:", id_Record, updatedData); // Imprime los datos que se envían
    const response = await axios.put(`${API_URL}/recordpago/${id_Record}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error actualizando el registro de pago:', error);
    throw error;
  }
};
