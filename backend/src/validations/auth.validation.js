"use strict";
import Joi from "joi";
import { MIN_USERNAME, MAX_USERNAME, USERNAME_REGEXP, MIN_EMAIL, MAX_EMAIL, MIN_PASSWORD, MAX_PASSWORD } from "./constants/validationConstants.js";
import domainEmailValidator from "./modules/email.validation.js";

// Función para validar que el correo electrónico termine en @gmail.com o @gmail.cl


// Esquema de validación para el registro de usuarios
export const registerValidation = Joi.object({
  username: Joi.string()
    .min(MIN_USERNAME)
    .max(MAX_USERNAME)
    .required()
    .pattern(USERNAME_REGEXP)
    .messages({
      "string.pattern.base":
        "El nombre de usuario solo puede contener letras, números y guiones bajos.",
      "string.min": "El nombre de usuario debe tener al menos 3 caracteres.",
      "string.max": "El nombre de usuario no puede exceder los 30 caracteres.",
      "string.empty": "El nombre de usuario es obligatorio.",
    }),
  rut: Joi.string()
    .required()
    .pattern(RUT_REGEXP)
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "string.base": "El rut debe ser de tipo string.",
      "string.pattern.base": "Formato rut inválido. Debe ser xx.xxx.xxx-x.",
    }),
  email: Joi.string()
    .email()
    .required()
    .min(MIN_EMAIL)
    .max(MAX_EMAIL)
    .messages({
      "string.email": "El correo electrónico debe ser válido.",
      "string.min": "El correo electrónico debe tener al menos 15 caracteres.",
      "string.max": "El correo electrónico no puede exceder los 50 caracteres.",
      "string.empty": "El correo electrónico es obligatorio.",
    })
    .custom(
      domainEmailValidator,
      "Validación de dominio de correo electrónico"
    ),
  password: Joi.string()
    .min(MIN_PASSWORD)
    .max(MAX_PASSWORD)
    .required()
    .messages({
      "string.empty": "La contraseña no puede estar vacía.",
      "any.required": "La contraseña es obligatorio.",
      "string.base": "La contraseña debe ser de tipo texto.",
      "string.min": "La contraseña debe tener al menos 8 caracteres.",
      "string.max": "La contraseña debe tener como máximo 26 caracteres.",
    }),
})
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten campos adicionales",
  });

// Esquema de validación para el inicio de sesión
export const loginValidation = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "El correo electrónico debe ser válido.",
      "string.empty": "El correo electrónico es obligatorio.",
    })
    .custom(
      domainEmailValidator,
      "Validación de dominio de correo electrónico"
    ),
  password: Joi.string().min(8).max(26).required().messages({
    "string.empty": "La contraseña no puede estar vacía.",
    "any.required": "La contraseña es obligatoria.",
    "string.min": "La contraseña debe tener al menos 8 caracteres.",
    "string.max": "La contraseña debe tener como máximo 26 caracteres.",
  }),
})
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten campos adicionales",
  });
