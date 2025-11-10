"use strict";
import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function isAdmin(req, res, next) {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const userFound = await userRepository.findOneBy({
      email: req.user?.email,
    });
    if (!userFound) return res.status(404).json("Usuario no encontrado");

    const rolUser = userFound.role;

    if (rolUser !== "administrador")
      return res
        .status(403)
        .json({
          message:
            "Error al acceder al recurso. Se requiere un rol de administrador para realizar esta acción.",
        });

    next();
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error });
  }
}

export function authorizeRoles(rolesPermitidos) {
  return async (req, res, next) => {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ email: req.user?.email });

      if (!user)
        return res.status(404).json({ message: "Usuario no encontrado" });

      if (!rolesPermitidos.includes(user.role)) {
        return res.status(403).json({
          message: `Acceso denegado. Se requiere uno de los siguientes roles: ${rolesPermitidos.join(", ")}`,
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: "Error interno en autorización", error });
    }
  };
}

export async function isAdminOrProfesor(req, res, next) {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email: req.user?.email });

    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const rolUser = user.role?.toLowerCase();

    if (rolUser !== "administrador" && rolUser !== "profesor") {
      return res.status(403).json({
        message:
          "Acceso denegado. Solo administradores o profesores pueden realizar esta acción.",
      });
    }

    next();
  } catch (error) {
    console.error("Error en isAdminOrProfesor:", error);
    res.status(500).json({ message: "Error interno en autorización", error });
  }
}

