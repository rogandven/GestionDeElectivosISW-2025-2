import { AppDataSource } from "../config/configDb.js";
import { ElectivoEntity } from "../entity/electivo.entity.js";

// Repositorio TypeORM
const electivoRepository = AppDataSource.getRepository("Electivo");

// Obtener todos los electivos
export const getElectivos = async (req, res) => {
  try {
    const electivos = await electivoRepository.find();
    res.json({ ok: true, data: electivos });
  } catch (error) {
    console.error("Error al obtener electivos:", error);
    res.status(500).json({ ok: false, message: "Error interno del servidor" });
  }
};

// Crear un nuevo electivo (solo admin)
export const createElectivo = async (req, res) => {
  try {
    const nuevo = electivoRepository.create(req.body);
    const result = await electivoRepository.save(nuevo);
    res.status(201).json({ ok: true, data: result });
  } catch (error) {
    console.error("Error al crear electivo:", error);
    res.status(500).json({ ok: false, message: "Error interno" });
  }
};

export async function getElectivoById(req, res) {
  try {
    // Obtener el repositorio de electivos y buscar un electivo por ID
    const ElectivoEntityRepository = AppDataSource.getRepository(ElectivoEntity);
    const { id } = req.params;
    const electivos = await ElectivoEntityRepository.findOne({ where: { id } });

    // Si no se encuentra el electivo, devolver un error 404
    if (!electivos) {
      return res.status(404).json({ message: "Electivo no encontrado." });
    }

    res.status(200).json({ message: "Electivo encontrado: ", data: electivos });
  } catch (error) {
    console.error("Error en electivo.controller.js -> getUserById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function updateElectivo(req, res) {
  try {
    // Obtener el repositorio de electivos y buscar un electivo por ID
    const ElectivoEntityRepository = AppDataSource.getRepository(ElectivoEntity);
    const { id } = req.params;
    console.log(id);
    const { nombre, cupos, inscritos, apertura, cierre, area, descripcion } = req.body;
    // const { error } = updateValidation.validate(req.body);
    // if (error) return res.status(400).json({ message: error.message });
    const electivos = await ElectivoEntityRepository.findOne({ where: { id } });
    console.log(JSON.stringify(electivos));
    // Si no se encuentra el electivo, devolver un error 404
    if (!electivos) {
      return res.status(404).json({ message: "Electivo no encontrado." });
    }

    /*
      id: {
      primary: true,
      type: "int",
      generated: true,
    },
    nombre: {
      type: "varchar",
      length: 255,
    },
    cupos: {
      type: "int",
    },
    inscritos: {
      type: "int",
      default: 0,
    },
    apertura: {
      type: "date",
    },
    cierre: {
      type: "date",
    },
    area: {
      type: "varchar",
      length: 100,
    },
    descripcion: {
      type: "text",
    },  
    */

    // Validar que al menos uno de los campos a actualizar esté presente
    electivos.id = id;
    electivos.nombre = nombre || electivos.nombre;
    electivos.cupos = cupos || electivos.cupos;
    electivos.inscritos = inscritos || electivos.inscritos;
    electivos.apertura = apertura || electivos.apertura;
    electivos.cierre = cierre || electivos.cierre;
    electivos.area = area || electivos.area;
    electivos.descripcion = descripcion || electivos.descripcion;



    // electivos.profesor = profesor || electivos.profesor;
    // electivos.cupos = cupos || electivos.cupos;
    // electivos.creditos = creditos || electivos.creditos;
    // electivos.descripcion = descripcion || electivos.descripcion;

    // Guardar los cambios en la base de datos
    const result = await ElectivoEntityRepository.update({ id }, electivos);
    console.log(result);
    if (result.affected <= 0) {
      return res.status(400).json({message: "No se cambió ningún electivo"});
    }

    res
      .status(200)
      .json({ message: "Electivo actualizado exitosamente.", data: electivos });
  } catch (error) {
    console.error("Error en electivo.controller.js -> updateElectivoById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function deleteElectivo(req, res) {
  try {
    // Obtener el repositorio de electivos y buscar el electivo por ID
    const ElectivoEntityRepository = AppDataSource.getRepository(ElectivoEntity);
    const { id } = req.params;

    const electivos = await ElectivoEntityRepository.findOne({ where: { id } });

    // Si no se encuentra el electivo, devolver un error 404
    if (!electivos) {
      return res.status(404).json({ message: "Electivo no encontrado." });
    }

    // Eliminar el electivo de la base de datos
    await ElectivoEntityRepository.remove(electivos);

    res.status(200).json({ message: "Electivo eliminado exitosamente." });
  } catch (error) {
    console.error("Error en electivo.controller.js -> deleteElectivoById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}