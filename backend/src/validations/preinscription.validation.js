"use strict";
import Joi from "joi";
import { validateTimeStamp } from "./modules/timestamp.validation.js";
import { validateStatus } from "./modules/status.validation.js";

// Esquema de validación para el registro de usuarios
export const preinscriptionIntegrityValidation = Joi.object({
    status: Joi.string().custom(validateStatus),
    subjectId: Joi.number().integer().positive(),
    userId: Joi.number().integer().positive(),
});

export const preinscriptionCreationValidation = Joi.object({
    status: Joi.any().required(),
    subjectId: Joi.any().required(),
    user: Joi.any().required(),
}).unknown(false);

export const preinscriptionEditingValidation = Joi.object({
    date: Joi.string().custom(validateTimeStamp),
    status: Joi.any(),
    subjectId: Joi.any(),
    user: Joi.any(),
}).unknown(false);

export const preinscriptionFindingValidation = Joi.object({
    id: Joi.number().integer().positive().required(),
});

export default preinscriptionIntegrityValidation;