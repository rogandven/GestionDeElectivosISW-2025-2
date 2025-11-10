
import axios from "@services/root.service.js";


export async function getElectivos(query = "") {
  try {
    const response = await axios.get(`/electivos${query}`);
    return response.data.data || [];
  } catch (error) {
    console.error("Error al obtener electivos:", error);
    throw error;
  }
}

export async function createElectivo(electivoData) {
  try {
    const response = await axios.post("/electivos", electivoData);
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error al crear electivo:", error);
    throw error;
  }
}

export async function updateElectivo(id, electivoData) {
  try {
    const response = await axios.put(`/electivos/${id}`, electivoData);
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error al actualizar electivo:", error);
    throw error;
  }
}


export async function deleteElectivo(id) {
  try {
    const response = await axios.delete(`/electivos/${id}`);
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error al eliminar electivo:", error);
    throw error;
  }
}
