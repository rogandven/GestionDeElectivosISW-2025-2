"use strict";
import Joi from "joi";
import { MIN_NAME_LENGTH, MAX_NAME_LENGTH, MIN_DESC_LENGTH, MAX_DESC_LENGTH, MIN_SPOTS, MAX_SPOTS, MIN_CREDITS, MAX_CREDITS } from "./constants/validationConstants";
import { validateTimeStamp } from "./modules/timestamp.validation.js";

export const subjectIntegrityValidation = Joi.object({
    name: Joi.string().min(MIN_NAME_LENGTH).max(MAX_NAME_LENGTH),
    description: Joi.string().min(MIN_DESC_LENGTH).max(MAX_DESC_LENGTH),
    spots_per_career: Joi.number().integer().min(MIN_SPOTS).max(MAX_SPOTS),
    required_credits: Joi.number().integer().min(MIN_CREDITS).max(MAX_CREDITS),
    minimum_semester: Joi.string().custom(validateTimeStamp),
    subjectTemplateId: Joi.number().integer(),
    students: Joi.array().items(Joi.integer().positive().required()), 
});

export const subjectCreationValidation = Joi.object({
    name: Joi.any().required(),
    description: Joi.any().required(),
    spots_per_career: Joi.any().required(),
    required_credits: Joi.any().required(),
    minimum_semester: Joi.any().required(),
    subjectTemplateId: Joi.any().required(),
    students: Joi.any().required(),
}).unknown(false);

export const subjectEditingValidation = Joi.object({
    name: Joi.any(),
    description: Joi.any(),
    spots_per_career: Joi.any(),
    required_credits: Joi.any(),
    minimum_semester: Joi.any(),
    subjectTemplateId: Joi.any(),
    students: Joi.any(),
}).unknown(false);

export default subjectIntegrityValidation;