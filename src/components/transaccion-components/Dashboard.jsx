import { useState } from "react";
import { useEffect } from "react";
import { getTransacciones, createTransaccion, deleteTransaccion } from "../../service/api";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [initCreate, setInitCreate] = useState(false);

  const [transaccion, setTransaccion] = useState({
    monto: "",
    fecha: "",
    estado: "",
    tipoTransaccionDto: {
      id: Math.floor(Math.random() * 1000000),
      tipo: "",
      descripcion: "",
    },
  });

  const getListTransacciones = async () => {
    try {
      const transacciones = await getTransacciones();
      setData(transacciones);
    } catch (error) {
      console.error("Error obteniendo las transacciones:", error);
    }
  };

  function subForm(e) {
    e.preventDefault();
    setInitCreate(false);
    setTransaccion({
        ...transaccion,
        tipoTransaccionDto: {
          ...transaccion.tipoTransaccionDto,
          id: Math.floor(Math.random() * 1000000)
        },
        monto: parseInt(transaccion.monto),
    });
    console.log(transaccion);
    createTransaccion(transaccion);
    getListTransacciones();
  }

  useEffect(() => {
    getListTransacciones();
  }, []);

  return (
    <div>
      <div>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>  
            <h1>Transaciones</h1>
            <div>
            <button className="button-create-transaction" onClick={() => setInitCreate(!initCreate)}>
            Crear Transacción
            </button>
            </div>
        </div>
        {initCreate && (
          <div>
            <form onSubmit={(e) => subForm(e)}>
              <label>Monto</label>
              <input
                type="number"
                value={transaccion.monto}
                onChange={(e) =>
                  setTransaccion({ ...transaccion, monto: e.target.value })
                }
                required
              />
              <label>Fecha</label>
              <input
                type="datetime-local"
                value={transaccion.fecha}
                onChange={(e) =>
                  setTransaccion({ ...transaccion, fecha: e.target.value })
                }
                required
              />
              <label>Estado</label>
              <select
                value={transaccion.estado}
                onChange={(e) =>
                  setTransaccion({ ...transaccion, estado: e.target.value })
                }
              >
                <option value="">Seleccione</option>
                <option value="pendiente">Pendiente</option>
                <option value="completado">Completado</option>
                <option value="devuelto">Devuelto</option>
                <option value="cancelado">Cancelado</option>
                <option value="anulado">Anulado</option>
              </select>
              <label>Tipo</label>
              <select
                value={transaccion.tipoTransaccionDto.tipo}
                onChange={(e) =>
                  setTransaccion({
                    ...transaccion,
                    tipoTransaccionDto: {
                      ...transaccion.tipoTransaccionDto,
                      tipo: e.target.value,
                    },
                  })
                }
              >
                <option value="">Seleccione</option>
                <option value="cheque">Cheque</option>
                <option value="transferencia">Transferencia</option>
                <option value="pago">Pago</option>
                <option value="depósito">Depósito</option>
                <option value="retiro">Retiro</option>
                <option value="otro">Otro</option>
              </select>
              <label>Descripcion</label>
              <input
                type="text"
                value={transaccion.tipoTransaccionDto.descripcion}
                onChange={(e) =>
                  setTransaccion({
                    ...transaccion,
                    tipoTransaccionDto: {
                      ...transaccion.tipoTransaccionDto,
                      descripcion: e.target.value,
                    },
                  })
                }
              />
              <button onClick={() => setInitCreate(false)}>Cancelar</button>
              <button type="submit">Crear</button>
            </form>
          </div>
        )}
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Tipo</th>
              <th>Descripcion</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((transaccion) => (
              <tr key={transaccion.id}>
                <td>{transaccion.id}</td>
                <td>{transaccion.monto}</td>
                <td>{transaccion.fecha}</td>
                <td>{transaccion.estado}</td>
                <td>{transaccion.tipoTransaccionDto.tipo}</td>
                <td>{transaccion.tipoTransaccionDto.descripcion}</td>
                <td><button onClick={() => deleteTransaccion(transaccion.id)}>x</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// const Dashboard = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {

//     };

//     console.log(listTransacciones);
//   }, []);

//   const listTransacciones = async () => {
//     try {
//       const transacciones = await getTransacciones();
//       setData(transacciones);
//     } catch (error) {
//       console.error('Error obteniendo las transacciones:', error);
//     }
// }

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <p>{data}</p>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Fecha</th>
//             <th>Tipo</th>
//             <th>Monto</th>
//             <th>Estado</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((transaccion) => (
//             <tr key={transaccion.id}>
//               <td>{transaccion.id}</td>
//               <td>{transaccion.fecha}</td>
//               <td>{transaccion.tipo}</td>
//               <td>{transaccion.monto}</td>
//               <td>{transaccion.estado}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

export default Dashboard;
