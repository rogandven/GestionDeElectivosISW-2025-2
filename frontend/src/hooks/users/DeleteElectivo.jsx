import Swal from "sweetalert2";
import { deleteElectivo } from "@services/electivo.service";

async function confirmDeleteElectivo() {
  const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: "No podrás deshacer esta acción",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  });
  return result.isConfirmed;
}

async function confirmAlert() {
  await Swal.fire({
    title: "Electivo eliminado",
    text: "El electivo ha sido eliminado correctamente",
    icon: "success",
    confirmButtonText: "Aceptar",
  });
}

async function confirmError() {
  await Swal.fire({
    title: "Error",
    text: "No se pudo eliminar el electivo",
    icon: "error",
    confirmButtonText: "Aceptar",
  });
}

export const DeleteElectivo = (fetchUsers) => {
  const handleDeleteElectivo = async (electivoId) => {
    try {
      const isConfirmed = await confirmDeleteElectivo();
      if (isConfirmed) {
        const response = await deleteElectivo(electivoId);
        if (response) {
          confirmAlert();
          await fetchUsers();
        }
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      confirmError();
    }
  };

  return { handleDeleteElectivo };
};

export default DeleteElectivo;
