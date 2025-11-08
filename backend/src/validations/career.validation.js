"use strict";
import Joi from "joi";
import { MIN_ACRONYM_LENGTH, MAX_ACRONYM_LENGTH } from "../constants/validationConstants.js";
import { MIN_NAME_LENGTH, MAX_NAME_LENGTH } from "../constants/validationConstants.js";
import { acronymValidation } from "./modules/acronym.validation.js";
// Esquema de validación para el registro de usuarios
export const careerIntegrityValidation = Joi.object({
  acronym: acronymValidation(),
  name: Joi.string()
    .min(MIN_NAME_LENGTH)
    .max(MAX_NAME_LENGTH)
    .messages({
      "string.min": `El acrónimo debe tener al menos ${String(MIN_NAME_LENGTH)} caracteres.`,
      "string.max": `El acrónimo no puede exceder los ${String(MAX_NAME_LENGTH)} caracteres.`,
      "string.empty": "El acrónimo es obligatorio.",
    }),
  subjects: Joi.array().items(Joi.integer().positive().required()), 
});

export const careerCreationValidation = Joi.object({
  acronym: Joi.any().required(),
  name: Joi.any().required(),
  subjects: Joi.any().required(),
}).unknown(false);

export const careerEditingValidation = Joi.object({
  acronym: Joi.any(),
  name: Joi.any(),
  subjects: Joi.any(),
}).unknown(false);

export default careerIntegrityValidation;