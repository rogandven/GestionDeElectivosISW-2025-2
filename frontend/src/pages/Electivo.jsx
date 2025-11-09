import "@styles/users.css";
import GetElectivo from "@hooks/users/GetElectivo.jsx";
import DeleteElectivo from "@hooks/users/DeleteElectivo.jsx";
import EditElectivo from "@hooks/users/EditElectivo.jsx";
import { useEffect } from "react";

const esDocente = () => {
  // ESTA FUNCION NO HACE NADA TODAVÍA
  return true;
}

const Electivo = () => {
  const { electivos, fetchElectivos } = GetElectivo();
  const { handleDeleteElectivo } = DeleteElectivo(fetchElectivos);
  const { handleEditElectivo } = EditElectivo(fetchElectivos);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    fetchElectivos();
  }, []);

  return (
    <div className="electivos-page">
      <h2>Lista de Electivos</h2>
      <table className="electivos-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Profesor</th>
            <th>Descripcion</th>
            <th>Cupos</th>
            <th>Creditos</th>
            { esDocente() &&
              (<th>Acciones</th>)
            }
          </tr>
        </thead>
        <tbody>
          {Array.isArray(electivos) && electivos.length > 0 ? (
            electivos.map((user) => (
              <tr key={user.id}>
                <td>{user.nombre}</td>
                <td>{user.profesor}</td>
                <td>{user.descripcion}</td>
                <td>{user.cupos}</td>
                <td>{user.creditos}</td>
                <td>
                  {/*Ahora edita el boton crear para que le pongas tus funciones que le diste en tu backend y en el hook*/
                  /*<button className="create" onClick={() => handleCreateElectivo(user.id, user)}>Crear</button>*/}
                  <button className="edit" onClick={() => handleEditElectivo(user.id, user)}>Editar</button>
                  <button className="delete" onClick={() => handleDeleteElectivo(user.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay electivos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Electivo;
