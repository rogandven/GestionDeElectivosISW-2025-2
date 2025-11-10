"use strict";

import { AppDataSource } from "../config/configDb.js";
import InscripcionEntity from "../entity/inscripcion.entity.js";
import ElectivoEntity from "../entity/electivo.entity.js";

export async function CreateInscripciones(req, res) {
  try {
    const inscripcionRepository = AppDataSource.getRepository(InscripcionEntity);
    const electivoRepository = AppDataSource.getRepository(ElectivoEntity);
    
    const { electivoId } = req.body;
    const userId = req.user.id;

    if (!electivoId) {
      return res.status(400).json({ message: "El ID del electivo es obligatorio" });
    }

  
    const electivo = await electivoRepository.findOne({ where: { id: electivoId } });
    if (!electivo) {
      return res.status(404).json({ message: "Electivo no encontrado" });
    }

    const inscripcionExistente = await inscripcionRepository.findOne({
      where: { 
        userId: userId,
        electivoId: electivoId
      }
    });
    console.log(inscripcionExistente);

    if (inscripcionExistente) {
      if (inscripcionExistente.estado === "rechazada" || inscripcionExistente.estado === "retirada") {
        return res.status(400).json({ 
          message: "Ya tienes una solicitud rechazada o retirada para este electivo"
        });
      }
      return res.status(400).json({ 
        message: "Ya tienes una solicitud de inscripción para este electivo",
        estado: inscripcionExistente.estado
      });
    }

 
    const inscripcionesActivas = await inscripcionRepository.count({
      where: { electivoId: electivoId, estado: "activa" }
    });

    let estadoDetalle = "";
    let enListaEspera = false;

    if (inscripcionesActivas >= electivo.cupoMaximo) {
      estadoDetalle = "En lista de espera: No hay cupos disponibles. Pendiente de revisión";
      enListaEspera = true;
    } else {
      estadoDetalle = "Pendiente de revisión";
    }

   
    const nuevaInscripcion = inscripcionRepository.create({
      electivoNombre: electivo.nombre,
      userId: userId,
      electivoId: electivoId,
      estado: "en_espera",
      estadoDetalle: estadoDetalle,
      periodo: electivo.periodo
    });

    await inscripcionRepository.save(nuevaInscripcion);
   const {userId: a, electivoId: b, ...respuestaInscripcion} = nuevaInscripcion;
    res.status(201).json({
      message: "Solicitud de inscripción enviada exitosamente",
      data: {
        inscripcion: nuevaInscripcion,
        enListaEspera: enListaEspera,
        cuposDisponibles: electivo.cupoMaximo - inscripcionesActivas
      }
    });
  } catch (error) {
    console.error("Error en inscripcion.controller.js -> CreateInscripciones(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function getInscripciones(req, res) {
  try {
    const inscripcionRepository = AppDataSource.getRepository(InscripcionEntity);
    const userId = req.user.id;
    const { periodo, estado } = req.query;

    const where = { userId: userId }; 
    
    if (periodo) {
      where.periodo = periodo;
    }
    if (estado) {
      where.estado = estado;
    }

    const inscripciones = await inscripcionRepository.find({
      where,
      order: { createdAt: "DESC" }
    });

    res.status(200).json({ message: "Inscripciones encontradas", data: inscripciones });
  } catch (error) {
    console.error("Error en inscripcion.controller.js -> getInscripciones(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function DeleteInscripciones(req, res) {
  try {
    const inscripcionRepository = AppDataSource.getRepository(InscripcionEntity);
    const electivoRepository = AppDataSource.getRepository(ElectivoEntity);
    const { inscripcionId } = req.params;
    const { motivo } = req.body;
    const userId = req.user.id; 

    const inscripcion = await inscripcionRepository.findOne({
      where: { 
        id: inscripcionId,
        userId: userId 
      }
    });

    if (!inscripcion) {
      return res.status(404).json({ message: "Inscripción no encontrada" });
    }

    if (inscripcion.estado === "retirada" || inscripcion.estado === "rechazada") {
      return res.status(400).json({ message: "Esta inscripción ya fue cancelada" });
    }

  
    const electivo = await electivoRepository.findOne({ where: { id: inscripcion.electivoId } });
    
    if (electivo && electivo.fechaFinRetiro && inscripcion.estado === "activa") {
      const ahora = new Date();
      if (ahora > new Date(electivo.fechaFinRetiro)) {
        return res.status(400).json({ message: "El período de retiro ha finalizado" });
      }
    }

    const estadoAnterior = inscripcion.estado;
    inscripcion.estado = "retirada";
    inscripcion.estadoDetalle = motivo || "Retiro voluntario";
    await inscripcionRepository.save(inscripcion);

    
    if (estadoAnterior === "activa" && electivo) {
      await electivoRepository.decrement({ id: electivo.id }, "inscritosActuales", 1);
    }

    res.status(200).json({ message: "Inscripción cancelada exitosamente", data: inscripcion });
  } catch (error) {
    console.error("Error en inscripcion.controller.js -> DeleteInscripciones(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function getInscripcion(req, res) {
  try {
    const inscripcionRepository = AppDataSource.getRepository(InscripcionEntity);
    const { inscripcionId } = req.params;
    const userId = req.user.id;

    const inscripcion = await inscripcionRepository.findOne({
      where: { 
        id: inscripcionId,
        userId: userId 
      }
    });

    if (!inscripcion) {
      return res.status(404).json({ message: "Inscripción no encontrada" });
    }

    res.status(200).json({ message: "Inscripción encontrada", data: inscripcion });
  } catch (error) {
    console.error("Error en inscripcion.controller.js -> obtenerInscripcion(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function gestionarInscripcion(req, res) {
  try {
    const inscripcionRepository = AppDataSource.getRepository(InscripcionEntity);
    const electivoRepository = AppDataSource.getRepository(ElectivoEntity);
    const { inscripcionId } = req.params;
    const { accion, motivo } = req.body;
    console.log(accion);
    console.log(motivo);

    if (!accion || !["aprobar", "rechazar"].includes(accion)) {
      return res.status(400).json({ 
        message: "Acción inválida. Use 'aprobar' o 'rechazar'" 
      });
    }

    if (accion === "rechazar" && !motivo) {
      return res.status(400).json({ 
        message: "El motivo de rechazo es obligatorio" 
      });
    }

    const inscripcion = await inscripcionRepository.findOne({
      where: { id: inscripcionId }
    });

    if (!inscripcion) {
      return res.status(404).json({ message: "Inscripción no encontrada" });
    }

    if (inscripcion.estado !== "en_espera") {
      return res.status(400).json({ 
        message: "Esta inscripción no está en espera" 
      });
    }

    if (accion === "aprobar") {
      const inscripcionesActivas = await inscripcionRepository.count({
        where: { electivoId: inscripcion.electivoId, estado: "activa" }
      });

      const electivo = await electivoRepository.findOne({ where: { id: inscripcion.electivoId } });
      
      if (!electivo) {
        return res.status(404).json({ message: "Electivo no encontrado" });
      }

      if (inscripcionesActivas >= electivo.cupoMaximo) {
        return res.status(400).json({ 
          message: "No hay cupos disponibles para aprobar esta inscripción" 
        });
      }

      inscripcion.estado = "activa";
      inscripcion.estadoDetalle = "Inscripción aprobada";
      await inscripcionRepository.save(inscripcion);

      await electivoRepository.update(
        { id: electivo.id }, 
        { inscritosActuales: inscripcionesActivas + 1 }
      );

      return res.status(200).json({ 
        message: "Inscripción aprobada exitosamente", 
        data: inscripcion 
      });
    } else {
      inscripcion.estado = "rechazada";
      inscripcion.estadoDetalle = motivo;
      await inscripcionRepository.save(inscripcion);

      return res.status(200).json({ 
        message: "Inscripción rechazada", 
        data: inscripcion 
      });
    }
  } catch (error) {
    console.error("Error en inscripcion.controller.js -> gestionarInscripcion(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function getInscripcionesEnEspera(req, res) {
  try {
    const inscripcionRepository = AppDataSource.getRepository(InscripcionEntity);
    const { electivoId, periodo } = req.query;

    const where = { estado: "en_espera" };
    if (electivoId) {
      where.electivoId = parseInt(electivoId);
    }
    if (periodo) {
      where.periodo = periodo;
    }

    const inscripciones = await inscripcionRepository.find({
      where,
      order: { createdAt: "ASC" }
    });

    res.status(200).json({ 
      message: "Inscripciones en espera encontradas", 
      data: inscripciones,
      total: inscripciones.length 
    });
  } catch (error) {
    console.error("Error en inscripcion.controller.js -> getInscripcionesEnEspera(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function getNotificaciones(req, res) {
  try {
    const inscripcionRepository = AppDataSource.getRepository(InscripcionEntity);
    const userId = req.user.id; 

    const inscripciones = await inscripcionRepository.find({
      where: { userId: userId },
      order: { updatedAt: "DESC" }
    });

    const notificaciones = inscripciones.map(insc => ({
      id: insc.id,
      electivoId: insc.electivoId,
      estado: insc.estado,
      mensaje: insc.estadoDetalle,
      fecha: insc.updatedAt
    }));

    res.status(200).json({ 
      message: "Notificaciones obtenidas", 
      data: notificaciones,
      pendientes: notificaciones.filter(n => n.estado === "en_espera").length
    });
  } catch (error) {
    console.error("Error en inscripcion.controller.js -> getNotificaciones(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}