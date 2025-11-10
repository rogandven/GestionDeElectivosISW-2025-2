
import Swal from "sweetalert2";
import { updateElectivo } from "@services/electivo.service.js";

export const useEditElectivo = (fetchElectivos) => {
  const handleEditElectivo = async (electivo) => {
    const { value: formValues } = await Swal.fire({
      title: "Editar electivo",
      html: `
        <input id="nombre" class="swal2-input" value="${electivo.nombre}" placeholder="Nombre del electivo">
        <input id="cupos" class="swal2-input" type="number" value="${electivo.cupos}" placeholder="Cupos">
        <input id="apertura" class="swal2-input" type="date" value="${electivo.apertura?.split("T")[0]}" placeholder="Fecha de apertura">
        <input id="cierre" class="swal2-input" type="date" value="${electivo.cierre?.split("T")[0]}" placeholder="Fecha de cierre">
        <input id="area" class="swal2-input" value="${electivo.area}" placeholder="Área">
        <textarea id="descripcion" class="swal2-textarea" placeholder="Descripción del electivo">${electivo.descripcion}</textarea>
      `,
      confirmButtonText: "Guardar cambios",
      confirmButtonColor: "#4CAF50",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      focusConfirm: false,

      preConfirm: () => {
        const nombre = document.getElementById("nombre").value.trim();
        const cupos = parseInt(document.getElementById("cupos").value);
        const apertura = document.getElementById("apertura").value;
        const cierre = document.getElementById("cierre").value;
        const area = document.getElementById("area").value.trim();
        const descripcion = document.getElementById("descripcion").value.trim();

        if (!nombre || nombre.length < 3)
          return Swal.showValidationMessage("El nombre debe tener al menos 3 caracteres");

        if (isNaN(cupos) || cupos < 1)
          return Swal.showValidationMessage("Debe ingresar un número válido de cupos (mínimo 1)");

        if (!apertura)
          return Swal.showValidationMessage("Debe ingresar la fecha de apertura");

        if (!cierre)
          return Swal.showValidationMessage("Debe ingresar la fecha de cierre");

        if (new Date(cierre) <= new Date(apertura))
          return Swal.showValidationMessage("La fecha de cierre debe ser posterior a la apertura");

        if (!area || area.length < 3)
          return Swal.showValidationMessage("El área debe tener al menos 3 caracteres");

        if (!descripcion || descripcion.length < 10)
          return Swal.showValidationMessage("La descripción debe tener al menos 10 caracteres");

        return { nombre, cupos, apertura, cierre, area, descripcion };
      },
    });

    if (formValues) {
      const confirmUpdate = await Swal.fire({
        title: "¿Confirmar cambios?",
        text: "Se actualizarán los datos del electivo.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, actualizar",
        cancelButtonText: "Cancelar",
      });

      if (confirmUpdate.isConfirmed) {
        try {
          await updateElectivo(electivo.id, formValues);
          Swal.fire("Actualizado", "El electivo fue actualizado correctamente", "success");
          await fetchElectivos();
        } catch (error) {
          console.error("Error al actualizar electivo:", error);
          Swal.fire("Error", "No se pudo actualizar el electivo", "error");
        }
      }
    }
  };

  return { handleEditElectivo };
};

export default useEditElectivo;
