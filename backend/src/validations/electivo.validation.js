"use strict" ;
import Joi from "joi";
// Esquema de validación para la creación y actualización de electivos
export const electivoValidation = Joi.object({
  nombre: Joi.string()
  .min(3)
  .max(100)
  .requeired()
  .messages({
   "string.min": "El nombre del electivo debe tener al menos 3 caracteres.",
   "string.max": "El nombre del electivo no puede exceder los 100 caracteres.",
   "string.empty": "El nombre del electivo es obligatorio.",
  }),
    descripcion: Joi.string()
    .max(255)
    .min(0)
    .messages({
      "string.min":" La descripción del electivo debe tener al menos 3 caracteres.",
      "string.max": "La descripción del electivo no puede exceder los 255 caracteres.",
    }),
    creditos: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "Los créditos deben ser un número entero.", 
      "number.min": "Los créditos deben ser al menos 1.",
      "any.required": "Los créditos son obligatorios.",
    })
})
