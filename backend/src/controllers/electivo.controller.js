
"use strict";

import { AppDataSource } from "../config/configDb.js";
import ElectivoEntity from "../entity/electivo.entity.js";
import {
  createElectivoValidation,
  updateElectivoValidation,
} from "../validations/electivo.validation.js";

const electivoRepo = AppDataSource.getRepository(ElectivoEntity);

export async function getElectivos(req, res) {
  try {
    const { filtro, area, apertura, cierre } = req.query;

    let query = electivoRepo.createQueryBuilder("electivo");

    if (filtro) {
      query = query.andWhere(
        "(electivo.nombre ILIKE :filtro OR electivo.descripcion ILIKE :filtro)",
        { filtro: `%${filtro}%` }
      );
    }

    if (area) query = query.andWhere("electivo.area ILIKE :area", { area });
    if (apertura)
      query = query.andWhere("DATE(electivo.apertura) = :apertura", {
        apertura,
      });
    if (cierre)
      query = query.andWhere("DATE(electivo.cierre) = :cierre", { cierre });

    const resultados = await query.getMany();

    res.status(200).json({
      message: "Electivos obtenidos correctamente",
      data: resultados,
    });
  } catch (error) {
    console.error("Error al listar electivos:", error);
    res.status(500).json({ message: "Error al listar electivos" });
  }
}

export async function createElectivo(req, res) {
  try {
    const { error } = createElectivoValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const nuevoElectivo = electivoRepo.create(req.body);
    await electivoRepo.save(nuevoElectivo);

    res.status(201).json({
      message: "Electivo creado correctamente",
      data: nuevoElectivo,
    });
  } catch (error) {
    console.error("Error al crear electivo:", error);
    res.status(500).json({ message: "Error al crear electivo" });
  }
}

export async function updateElectivo(req, res) {
  try {
    const { id } = req.params;
    const electivo = await electivoRepo.findOneBy({ id });

    if (!electivo)
      return res.status(404).json({ message: "Electivo no encontrado" });

    const { error } = updateElectivoValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    Object.assign(electivo, req.body);
    await electivoRepo.save(electivo);

    res.status(200).json({
      message: "Electivo actualizado correctamente",
      data: electivo,
    });
  } catch (error) {
    console.error("Error al actualizar electivo:", error);
    res.status(500).json({ message: "Error al actualizar electivo" });
  }
}

export async function deleteElectivo(req, res) {
  try {
    const { id } = req.params;
    const electivo = await electivoRepo.findOneBy({ id });

    if (!electivo)
      return res.status(404).json({ message: "Electivo no encontrado" });

    await electivoRepo.remove(electivo);

    res.status(200).json({ message: "Electivo eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar electivo:", error);
    res.status(500).json({ message: "Error al eliminar electivo" });
  }
}

