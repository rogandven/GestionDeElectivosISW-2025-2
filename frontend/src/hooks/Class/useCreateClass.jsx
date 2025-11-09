import { assignClass } from "@services/clase.service.js";
import Swal from "sweetalert2";

async function CreateClass() {
    const {value: formValues} = await Swal.fire({
        title: 'Crear Nueva Clase',
        html: `
        <div>
            <label for="swal2-input1">Nombre del electivo</label>
            <label for="swal2-input3">Tiene que tener entre 3 y 20 caracteres (no se puede exceder de los 20)</label>
            <input id="swal2-input3" class="swal2-input" placeholder="Nombre del electivo" value="${""}">

        </div>

        <div>
            <label for="swal2-input1">Profesor</label>
            <label for="swal2-input3">Tiene que tener entre 8 y 20 caracteres (no se puede exceder de los 20)</label>
            <input id="swal2-input3" class="swal2-input" placeholder="Nombre del profesor" value="${""}">
        </div>

        <div>
            <label for="swal2-input1">Sala</label>
            <input id="swal2-input3" class="swal2-input" placeholder="Nombre de la sala" value="${""}">
        </div>

        <div>
            <label for="swal2-input2">Ingrese el horario del electivo: </label>
            <label for="swal2-input2">Tiene que estar en formato 24 horas HH:MM</label>
            <input id="swal2-input2" class="swal2-input" placeholder="HH:MM" value = "${""}">
        </div>

        <div>
            <label for="swal2-input1">Cupos</label>
            <input id="swal2-input1" class="swal2-input" placeholder="Cantidad de cupos" value="${""}">
        </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Crear',
        preConfirm: () => {
            const nombreEl = document.getElementById('swal2-input3').value;
            const profesor = document.getElementById('swal2-input3').value;
            const sala = document.getElementById('swal2-input3').value;
            const horario = document.getElementById('swal2-input2').value;
            const cupos = document.getElementById('swal2-input1').value;

        if(!nombreEl || !profesor || !sala || !horario || !cupos) {
            Swal.showValidationMessage('Por favor, completa todos los campos');
            return false;
        }

        if(nombreEl.length < 3 || nombreEl.length > 20) {
            Swal.showValidationMessage('El nombre del electivo debe tener entre 3 y 20 caracteres');
            return false;
        }

        if(profesor.length < 8 || profesor.length > 20) {
            Swal.showValidationMessage('El nombre del profesor debe tener entre 8 y 20 caracteres');
            return false;
        }

        if(!sala) {
            Swal.showValidationMessage('Por favor, ingresa el nombre de la sala');
            return false;
        }

        if(!horario) {
            Swal.showValidationMessage('Por favor, ingresa el horario del electivo');
            return false;
        }

        if(!cupos) {
            Swal.showValidationMessage('Por favor, ingresa la cantidad de cupos');
            return false;
        }

            return { nombreEl, profesor, sala, horario, cupos };
        },     
 });

    if(formValues) {
    
    return {
        nombreEl: formValues.nombreEl,
        profesor: formValues.profesor,
        sala: formValues.sala,
        horario: formValues.horario,
        cupos: formValues.cupos
    };
}
}

export const useCreateClass = () => {
    const handleCreateClass = async () => {
        try {
            const formValues = await CreateClass();
            if(!formValues) return;

            await assignClass(formValues);
        } catch (error) {
            console.error('Error creating class:', error);
        }
    };

    return {
        handleCreateClass
    };
};
export default useCreateClass;
