import { AppDataSource } from "../config/configDb.js";
import ClaseEntity from "../entity/clase.entity.js";
import bcrypt from "bcrypt";

const claseRepository = AppDataSource.getRepository(ClaseEntity);

export async function createClase(data) {

  const newClase = claseRepository.create({
    sala,
    horario,
    fecha_inicio_clases
  });

  return await claseRepository.save(newClase);
}

export async function findAllClases() {
  return await claseRepository.find();
}

export async function findClaseById_electivo(id_electivo) {
  return await claseRepository.findOneBy({ id_electivo });
}

export async function updateClaseById_Electivo(id_electivo, updateData) {
  const clase = await claseRepository.findOneBy({ id_electivo } );
  console.log(clase);

  if (!clase) {
    throw new Error("Usuario no encontrado");
  }


  Object.assign(clase, updateData);

  return await claseRepository.save(clase);
}

export async function deleteClaseById_Electivo(id_electivo) {
  console.log(id_electivo);
  const clase = await claseRepository.findOneBy({  id_electivo });

  if (!clase) {
    throw new Error("Clase no encontrada");
  }
  // console.log(user);
  // await userRepository.delete(user);
  await claseRepository.delete({id_electivo: clase.id_electivo});
}