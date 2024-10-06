// src/pages/Inicio-Deudas.js
import Deudas from '../components/Deudas';
import RecordPagos from '../components/RecordPagos';

const InicioDeudas = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Gestión de Deudas y Pagos</h1>
      <Deudas />
      <RecordPagos />
    </div>
  );
};

export default InicioDeudas;
