"use strict";
import Joi from "joi";
import { MIN_ACRONYM_LENGTH, MAX_ACRONYM_LENGTH } from "../constants/validationConstants";

const acronymValidation = Joi.string()
    .min(MIN_ACRONYM_LENGTH)
    .max(MAX_ACRONYM_LENGTH)
    .pattern(/^[A-Z]+$/)
    .messages({
      "string.pattern.base":
        "El acrónimo solo debe tener letras mayúsculas.",
      "string.min": `El acrónimo debe tener al menos ${String(MIN_ACRONYM_LENGTH)} caracteres.`,
      "string.max": `El acrónimo no puede exceder los ${String(MAX_ACRONYM_LENGTH)} caracteres.`,
      "string.empty": "El acrónimo es obligatorio.",
    }).alphanum
;

export default acronymValidation;