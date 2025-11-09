"use strict";
import Joi from "joi";

/* export const electivoCreationValidation = ({ data }) => {
  return;
}; */

export const createValidation = Joi.object({
    nombre: Joi.string().min(1).max(50).required().messages({
      "any.required": "El nombre del electivo es obligatorio",
      "string.base": "El nombre del electivo debe ser una cadena",
      "string.min": "El nombre del electivo no debe estar vacio",
      "string.max": "El nombre del electivo no puede exceder los 50 caracteres",
      "string.empty": "El nombre del electivo no debe estar vacio",
    }),

    profesor: Joi.string().min(1).max(50).messages({
      "any.required": "El nombre del profesor es obligatorio",
      "string.base": "El nombre del profesor debe ser una cadena",
      "string.min": "El nombre del profesor no debe estar vacio",
      "string.max": "El nombre del profesor no puede exceder los 50 caracteres",
      "string.empty": "El nombre del profesor no debe estar vacio",
    }),
    descripcion: Joi.string()
      .min(1)
      .max(50)
      .required()
      .messages({
        "string.base": "La descripcion debe ser una cadena",
        "string.max": "La descripcion no debe tener mas de 50 caracteres",
        "string.min": "La descripcion no puede estar vacia",
        "string.empty": "La descripcion no puede estar vacia",
        "any.required": "La descripcion es obligatoria",
      }),

    cupos: Joi.number().integer().min(1).max(100).messages({
      "any.required": "Los cupos son obligatorios",
      "number.base": "Los cupos deben ser un número",
      "number.min": "Los cupos deben ser al menos 1",
      "number.max": "Los cupos no pueden exceder 100",
    }),

    creditos: Joi.number().integer().min(2).max(8).required().messages({
      "any.required": "Los creditos son obligatorios",
      "number.base": "Los creditos deben ser un numero",
      "number.min": "Los creditos deben ser al menos 2",
      "number.max": "Los creditos no pueden exceder 8",
    }),
  });
  
export const updateValidation = Joi.object({
    nombre: Joi.string().min(1).max(50).required().messages({
      "any.required": "El nombre del electivo es obligatorio",
      "string.base": "El nombre del electivo debe ser una cadena",
      "string.min": "El nombre del electivo no debe estar vacio",
      "string.max": "El nombre del electivo no puede exceder los 50 caracteres",
      "string.empty": "El nombre del electivo no debe estar vacio",
    }),

    profesor: Joi.string().min(1).max(50).messages({
      "any.required": "El nombre del profesor es obligatorio",
      "string.base": "El nombre del profesor debe ser una cadena",
      "string.min": "El nombre del profesor no debe estar vacio",
      "string.max": "El nombre del profesor no puede exceder los 50 caracteres",
      "string.empty": "El nombre del profesor no debe estar vacio",
    }),
    descripcion: Joi.string()
      .min(1)
      .max(50)
      .required()
      .messages({
        "string.base": "La descripcion debe ser una cadena",
        "string.max": "La descripcion no debe tener mas de 50 caracteres",
        "string.min": "La descripcion no puede estar vacia",
        "string.empty": "La descripcion no puede estar vacia",
        "any.required": "La descripcion es obligatoria",
      }),

    cupos: Joi.number().integer().min(1).max(100).messages({
      "any.required": "Los cupos son obligatorios",
      "number.base": "Los cupos deben ser un número",
      "number.min": "Los cupos deben ser al menos 1",
      "number.max": "Los cupos no pueden exceder 100",
    }),

    creditos: Joi.number().integer().min(2).max(8).required().messages({
      "any.required": "Los creditos son obligatorios",
      "number.base": "Los creditos deben ser un numero",
      "number.min": "Los creditos deben ser al menos 2",
      "number.max": "Los creditos no pueden exceder 8",
    })
  }).unknown(false).messages({
    "object.unknown": "No se permiten campos adicionales",
});

export default createValidation;
