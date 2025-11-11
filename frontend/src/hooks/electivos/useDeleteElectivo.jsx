import Swal from "sweetalert2";
import { deleteElectivo } from "@services/electivo.service.js";

export const useDeleteElectivo = (fetchElectivos) => {
  const handleDeleteElectivo = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar este electivo?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#e74c3c", 
      cancelButtonColor: "#6c757d", 
      reverseButtons: true,
    });

    if (confirm.isConfirmed) {
      try {
        await deleteElectivo(id);
        await Swal.fire({
          icon: "success",
          title: "Eliminado",
          text: "El electivo fue eliminado correctamente.",
          confirmButtonColor: "#4CAF50",
        });
        await fetchElectivos(); 
      } catch (error) {
        console.error("Error al eliminar electivo:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el electivo. Intenta nuevamente.",
          confirmButtonColor: "#e74c3c",
        });
      }
    }
  };

  return { handleDeleteElectivo };
};

export default useDeleteElectivo;
