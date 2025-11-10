"use strict";

import ClaseEntity from "../entity/clase.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { findClaseById_electivo, updateClaseById_Electivo, findAllClases, deleteClaseById_Electivo } from "../services/clase.service.js";
import { assignationValidation, updateValidation } from "../validations/clase.validation.js";
import { handleSuccess, handleErrorClient, handleErrorServer } from "../handlers/response.handlers.js";

const isValidTimeFormat = (timeStr) => {
    const regex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
    if (!regex.test(timeStr)) return false;
    
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
};

export async function asignarClase(req, res) {
  try {
    
    const claseRepository = AppDataSource.getRepository(ClaseEntity);
    const { nombreEl, profesor, sala, horario, cupos } = req.body;
    const { error } = assignationValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
        
    const existingHorarioSala = await claseRepository.findOne({
      where: { horario, sala },
    });
    if (existingHorarioSala)
      return res.status(409).json({ message: "Horario y sala ya registrado." });


    
    const newClase = claseRepository.create({
      nombreEl,
      profesor,
      sala,
      horario,
      cupos,
      
    });
    await claseRepository.save(newClase);

    res
      .status(201)
      .json({ message: "Horario registrado exitosamente!", data: newClase });
  } catch (error) {
    console.error("Error en auth.controller.js -> register(): ", error);
    return res.status(500).json({ message: "Error al registrar el curso" });
  }
}

export function getPublicClass(req, res) {
  handleSuccess(res, 200, "Clases obtenidas exitosamente", {
    message: "¡Hola! Este es un perfil público. Cualquiera puede verlo.",
  });
}

export async function getClases(req, res) {
  // const clase = req.clase;
  // console.log(user);
  // console.log(JSON.stringify(user));
  const claseData = await findAllClases();
  if (!claseData) {
    return handleErrorClient(res, 400, "Clases no encontradas");
  }
  return handleSuccess(res, 200, "Clases obtenidas exitosamente", claseData);
}
  /* const additionalData = await findClaseById_electivo((clase && clase.id_electivo) || 0);
  if (!additionalData) {
    return handleErrorClient(res, 400, "Clase no encontrado");
  }
  */

  /* handleSuccess(res, 200, "Perfil privado obtenido exitosamente", {
    message: `¡Hola, ${clase.id_electivo}! Este es tu clase. Solo tú puedes verlo.`,
    userData: clase,
    additionalData: additionalData
  });
} */

export async function patchClase(req, res) {
  // const claseId = req.clase.sub;
  const claseRepository = AppDataSource.getRepository(ClaseEntity); 
  const { id } = req.params;
  const { nombreEl, profesor, sala, horario, cupos } = req.body;
  const { error } = updateValidation.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  const existingHorarioSala = await claseRepository.findOne({
      where: { horario, sala },
    });
    if (existingHorarioSala)
      return res.status(409).json({ message: "Horario y sala ya registrado." });

  try {
    const updatedClase = await updateClaseById_Electivo(id, { nombreEl, profesor, sala, horario, cupos });
    handleSuccess(res, 200, "Clase actualizada exitosamente", updatedClase)
  } catch (error) {
    handleErrorClient(res, 500, "Error al actualizar la clase.", error.message);
  }
}


export async function deleteClase(req, res) {
  // const claseId = req.clase.sub; 
  const { id } = req.params;
  console.log(id);
  try {
    await deleteClaseById_Electivo(id);
    handleSuccess(res, 200, "Clase eliminada exitosamente");
  } catch (error) {
    handleErrorServer(res, 500, "Error al eliminar la clase", error.message);
  }
}



