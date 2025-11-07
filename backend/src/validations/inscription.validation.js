"use strict";
import Joi from "joi";
import { VALID_STATUS_ARRAY } from "../constants/validationConstants.js";
import { validateTimeStamp } from "./timestamp.validation.js";


const validateStatus = (status, helper) => {
    if (!status) {
      return helper.message("Estado no proporcionado");
    }

    for (let i = 0; i < VALID_STATUS_ARRAY.length; i++) {
      if (status === VALID_STATUS_ARRAY[i]) {
        return true;
      }
    }
    return helper.message("Estado malformado"); 
}

// Esquema de validación para el registro de usuarios
export const inscriptionIntegrityValidation = Joi.object({
    status: Joi.string().custom(validateStatus),
    subjectId: Joi.number().integer().positive(),
    userId: Joi.number().integer().positive(),
});

export const inscriptionCreationValidation = Joi.object({
    status: Joi.any().required(),
    subjectId: Joi.any().required(),
    user: Joi.any().required(),
}).unknown(false);

export const inscriptionEditingValidation = Joi.object({
    date: Joi.string().custom(validateTimeStamp),
    status: Joi.any(),
    subjectId: Joi.any(),
    user: Joi.any(),
}).unknown(false);

export default inscriptionIntegrityValidation;