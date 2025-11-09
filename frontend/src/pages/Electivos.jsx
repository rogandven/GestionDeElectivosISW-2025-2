"use strict";
import { useState, useEffect } from "react";
import "@styles/electivos.css";
import Swal from "sweetalert2";
import { getElectivos } from "@services/electivo.service.js";

const Electivos = () => {
  const [electivos, setElectivos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [area, setArea] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await getElectivos();
      setElectivos(data);
      setFiltered(data);
    }
    fetchData();
  }, []);

  const handleFilter = (e) => {
    const value = e.target.value;
    setArea(value);
    if (value === "") setFiltered(electivos);
    else setFiltered(electivos.filter((el) => el.area === value));
  };

  const mostrarInfo = (electivo) => {
    Swal.fire({
      title: electivo.nombre,
      html: `
        <p><strong>Área:</strong> ${electivo.area}</p>
        <p><strong>Cupos:</strong> ${electivo.cupos}</p>
        <p><strong>Inscritos:</strong> ${electivo.inscritos}</p>
        <p><strong>Fechas:</strong> ${electivo.apertura} al ${electivo.cierre}</p>
        <hr/>
        <p>${electivo.descripcion}</p>
      `,
      icon: "info",
      confirmButtonText: "Cerrar",
    });
  };

  return (
    <div className="electivos-container">
      <h2>Electivos Disponibles</h2>

      <div className="filter-container">
        <label htmlFor="area">Filtrar por área:</label>
        <select id="area" value={area} onChange={handleFilter}>
          <option value="">Todas</option>
          <option value="Desarrollo">Desarrollo</option>
          <option value="Investigación">Investigación</option>
          <option value="Habilidades Sociales">Habilidades Sociales</option>
        </select>
      </div>

      <div className="table-container">
        <table className="electivos-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cupos</th>
              <th>Inscritos</th>
              <th>Apertura</th>
              <th>Cierre</th>
              <th>Área</th>
              <th>Información</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((electivo) => (
              <tr key={electivo.id}>
                <td>{electivo.nombre}</td>
                <td>{electivo.cupos}</td>
                <td>{electivo.inscritos}</td>
                <td>{electivo.apertura}</td>
                <td>{electivo.cierre}</td>
                <td>{electivo.area}</td>
                <td>
                  <button onClick={() => mostrarInfo(electivo)}>
                    Información
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Electivos;
