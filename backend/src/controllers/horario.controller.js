"use strict";

import HorarioEntity from "../entity/clase.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { findClaseById_electivo, updateHorarioById_Electivo, findAllHorarios, deleteHorarioById_Electivo } from "../services/horario.service.js";
import { assignationValidation, updateValidation } from "../validations/clase.validation.js";
import { handleSuccess, handleErrorClient, handleErrorServer } from "../handlers/response.handlers.js";

const isValidTimeFormat = (timeStr) => {
    const regex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
    if (!regex.test(timeStr)) return false;
    
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
};

export async function asignarHorario(req, res) {
  try {
    
    const horarioRepository = AppDataSource.getRepository(HorarioEntity);
    const electivoRepository= AppDataSource.getRepository(ElectivoEntity);
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "El ID del electivo es obligatorio" });
    }

    const electivo = await electivoRepository.findOneBy({ id_electivo: id });
    if (!electivo) {
      return res.status(404).json({ message: "Electivo no encontrado" });
    }
    
    const {hora_inicio, hora_termino, sala, dia } = req.body;
    const { error } = assignationValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
        
    const existingHorarioSala = await horarioRepository.findOne({
      where: { hora_inicio,hora_termino, sala },
    });
    if (existingHorarioSala)
      return res.status(409).json({ message: "Horario y sala ya registrado." });


    
    const newHorario = horarioRepository.create({
      hora_inicio,
      hora_termino,
      sala,
      dia 
      
    });
    await horarioRepository.save(newHorario);

    res
      .status(201)
      .json({ message: "Horario registrado exitosamente!", data: newHorario });
  } catch (error) {
    console.error("Error en auth.controller.js -> register(): ", error);
    return res.status(500).json({ message: "Error al registrar el curso" });
  }
}

export function getPublicClass(req, res) {
  handleSuccess(res, 200, "Horarios obtenidas exitosamente", {
    message: "¡Hola! Este es un perfil público. Cualquiera puede verlo.",
  });
}

export async function getHorarios(req, res) {
  // const clase = req.clase;
  // // console.log(user);
  // // console.log(JSON.stringify(user));
  const horarioData = await findAllHorarios();
  if (!horarioData) {
    return handleErrorClient(res, 400, "Horarios no encontradas");
  }
  return handleSuccess(res, 200, "Horarios obtenidas exitosamente", horarioData);
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

export async function patchHorario(req, res) {
  // const claseId = req.clase.sub;
  const horarioRepository = AppDataSource.getRepository(HorarioEntity);
  const { id } = req.params;
   if(!id){
    return res.status(400).json({ message: "El ID del horario es obligatorio" });
  }
  const { hora_inicio, hora_termino,sala, dia } = req.body;
  const { error } = updateValidation.validate(req.body);
 
  if (error) return res.status(400).json({ message: error.message });
  const existingHorarioSala = await horarioRepository.findOne({
      where: { hora_inicio, hora_termino, sala },
    });
    // console.log(existingHorarioSala);
    if (existingHorarioSala && existingHorarioSala.id_electivo != id)
      return res.status(409).json({ message: "Horario y sala ya registrado." });

  try {
    const updatedHorario = await updateHorarioById_Electivo(id, { hora_inicio, hora_termino, sala, dia });
    handleSuccess(res, 200, "Horario actualizado exitosamente", updatedHorario)
    // console.log(profesor);
  } catch (error) {
    handleErrorClient(res, 500, "Error al actualizar el horario.", error.message);
  } 
}


export async function deleteHorario(req, res) {
  // const claseId = req.clase.sub;
  const horarioRepository= AppDataSource.getRepository(HorarioEntity); 
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "El ID del horario es obligatorio" });
  }
  // console.log(id);
  try {
    await deleteHorarioById_Electivo(id);
    handleSuccess(res, 200, "Horario eliminado exitosamente");
  } catch (error) {
    handleErrorServer(res, 500, "Error al eliminar el horario", error.message);
  }
}



