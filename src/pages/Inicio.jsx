// src/pages/Inicio.js
import { useNavigate } from 'react-router-dom'; // Importar `useNavigate` para la navegación
import '../index.css'; // Importar el archivo CSS

const Inicio = () => {
  const navigate = useNavigate(); // Hook para la navegación

  return (
    <div className="inicio-container">
      <header className="header">
        <h1>Bienvenido a Banco Seguro</h1>
        <p>Tu confianza, nuestro compromiso.</p>
      </header>

      <main className="main-content">
        <section
          className="banner"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1565372912020-15023dd03a60?fit=crop&w=1350&q=80")',
          }}
        >
          <h2>Gestiona tus finanzas de manera segura y eficiente</h2>
          <p>Controla tus deudas, realiza pagos, y mucho más desde la comodidad de tu hogar.</p>
          <div className="button-group">
            <button className="button" onClick={() => navigate('/inicio-deudas')}>
              Gestionar Deudas y Pagos
            </button>
            <button className="button" onClick={() => navigate('/inicio-clientes')}>
              Gestionar Clientes
            </button>
            <button className="button" onClick={() => navigate('/inicio-transacciones')}>
              Gestionar Transacciones
            </button>
          </div>
        </section>

        <section className="services">
          <div className="service-card">
            <h3>Servicios Bancarios</h3>
            <p>
              Explora nuestros servicios financieros, desde cuentas de ahorro hasta préstamos personales. Todo lo que
              necesitas para manejar tus finanzas de manera efectiva.
            </p>
            <button className="button-blue">Conoce Más</button>
          </div>

          <div className="service-card">
            <h3>Historial de Pagos</h3>
            <p>Revisa el historial de tus pagos realizados y pendientes. Mantén un control detallado de todas tus transacciones.</p>
            <button className="button-blue">Ver Historial</button>
          </div>

          <div className="service-card">
            <h3>Soporte al Cliente</h3>
            <p>¿Tienes alguna pregunta? Nuestro equipo de soporte está disponible para ayudarte en cualquier momento.</p>
            <button className="button-blue">Contactar</button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 Banco Seguro. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Inicio;
