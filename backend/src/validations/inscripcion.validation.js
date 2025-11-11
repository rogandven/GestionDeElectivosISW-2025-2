"use strict";

import Joi from "joi";

export const inscripcionValidation = Joi.object({
  electivoId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "El ID del electivo debe ser un número",
      "number.integer": "El ID del electivo debe ser un número entero",
      "number.positive": "El ID del electivo debe ser positivo",
      "any.required": "El ID del electivo es obligatorio"
    })
});

export const cancelarInscripcionValidation = Joi.object({
  motivo: Joi.string()
    .max(500)
    .optional()
    .messages({
      "string.base": "El motivo debe ser texto",
      "string.max": "El motivo no puede exceder 500 caracteres"
    })
});

export const gestionarInscripcionValidation = Joi.object({
  accion: Joi.string()
    .valid("aprobar", "rechazar")
    .required()
    .messages({
      "string.base": "La acción debe ser texto",
      "any.only": "La acción debe ser 'aprobar' o 'rechazar'",
      "any.required": "La acción es obligatoria"
    }),
  motivo: Joi.string()
    .max(500)
    .when('accion', {
      is: 'rechazar',
      then: Joi.required(),
      otherwise: Joi.optional()
    })
    .messages({
      "string.base": "El motivo debe ser texto",
      "string.max": "El motivo no puede exceder 500 caracteres",
      "any.required": "El motivo es obligatorio cuando se rechaza una inscripción"
    })
});

export const consultarInscripcionesValidation = Joi.object({
  periodo: Joi.string()
    .pattern(/^\d{4}-[12]$/)
    .optional()
    .messages({
      "string.pattern.base": "El formato del período debe ser YYYY-1 o YYYY-2 (ej: 2024-1)"
    }),
  estado: Joi.string()
    .valid("en_espera", "activa", "rechazada", "retirada")
    .optional()
    .messages({
      "any.only": "El estado debe ser: en_espera, activa, rechazada o retirada"
    })
});