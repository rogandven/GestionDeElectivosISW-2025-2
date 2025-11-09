"use strict" ;
import Electivo from "../entity/electivo.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getElectivos(req, res) {
  try {
   
    const electivoRepository = AppDataSource.getRepository(Electivo);
    const electivos = await electivoRepository.find();
    res.status(200).json({ message: "Electivos encontrados: ", data: electivos });
    } catch (error) {
    console.error("Error en electivo.controller.js -> getElectivos(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}
export async function createElectivo(req, res) {
  try {
  
    const electivoRepository = AppDataSource.getRepository(Electivo);
    const { nombre, descripcion, creditos } = req.body;
   
    const newElectivo = electivoRepository.create({
      nombre,
      descripcion,
        creditos,
    });
   
    await electivoRepository.save(newElectivo);
    res.status(201).json({ message: "Electivo creado exitosamente.", data: newElectivo });
  } catch (error) {
    console.error("Error en electivo.controller.js -> createElectivo(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function deleteElectivo(req, res) {
  try {
   
    const electivoRepository = AppDataSource.getRepository(Electivo);
    const { id } = req.params;
    const electivo = await electivoRepository.findOne({ where: { id } });
 
    if (!electivo) {
      return res.status(404).json({ message: "Electivo no encontrado." });
    }

    await electivoRepository.remove(electivo);
    res.status(200).json({ message: "Electivo eliminado exitosamente." });
  } catch (error) {
    console.error("Error en electivo.controller.js -> deleteElectivoById(): ", error
    );
    res.status(500).json({ message: "Error interno del servidor." });
  }
  
}
export async function updateElectivo(req, res) {
    try {
      
        const electivoRepository = AppDataSource.getRepository(Electivo);
        const { id } = req.params;
        const { nombre, descripcion, creditos } = req.body;
        const electivo = await electivoRepository.findOne({ where: { id } });
      
        if (!electivo) {
            return res.status(404).json({ message: "Electivo no encontrado." });
        }
      
        electivo.nombre = nombre || electivo.nombre;
        electivo.descripcion = descripcion || electivo.descripcion;
        electivo.creditos = creditos || electivo.creditos;
      
        await electivoRepository.save(electivo);
        res.status(200).json({ message: "Electivo actualizado exitosamente.", data: electivo });
    } catch (error) {
        console.error("Error en electivo.controller.js -> updateElectivoById(): ", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

