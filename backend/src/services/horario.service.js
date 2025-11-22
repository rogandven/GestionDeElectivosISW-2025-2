import { AppDataSource } from "../config/configDb.js";
import HorarioEntity from "../entity/clase.entity.js";
import bcrypt from "bcrypt";

const horarioRepository = AppDataSource.getRepository(HorarioEntity);

export async function createHorario(data) {

  const newClase = claseRepository.create({
    sala,
    horario,
    fecha_inicio_clases
  });

  return await claseRepository.save(newClase);
}

export async function findAllHorarios() {
  return await horarioRepository.find();
}

export async function findClaseById_electivo(id_electivo) {
  return await horarioRepository.findOneBy({ id_electivo });
}

export async function updateClaseById_Electivo(id_electivo, updateData) {
  const horario = await horarioRepository.findOneBy({ id_electivo } );
  // console.log(clase);

  if (!horario) {
    throw new Error("Usuario no encontrado");
  }


  Object.assign(horario, updateData);

  return await horarioRepository.save(horario);
}

export async function deleteClaseById_Electivo(id_electivo) {
  // console.log(id_electivo);
  const horario = await horarioRepository.findOneBy({  id_electivo });

  if (!horario) {
    throw new Error("Clase no encontrada");
  }
  // // console.log(user);
  // await userRepository.delete(user);
  await horarioRepository.delete({id_electivo: horario.id_electivo});
}