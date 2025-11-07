"use strict";
import Joi from "joi";
import { validateTimeStamp } from "./modules/timestamp.validation.js";

// Esquema de validación para el registro de usuarios
/*
    columns: {
        id: {
            type: Number,
            generated: true,
            primary: true,
        },
        start_time: {
            type: "timestamp",
            nullable: false,
        },
        end_time: {
            type: "timestamp",
            nullable: false,
        },
        classroom: {
            type: String,
            nullable: false,
        },
    },
    relations: {
        subject: {
            type: 'many-to-one',
            target: 'subject',
            inverseSide: 'subject',
            joinColumn: true
        },     
    },
*/
export const scheduleIntegrityValidation = Joi.object({
    start_time: Joi.string().custom(validateTimeStamp),
    end_time: Joi.string().custom(validateTimeStamp),
    classroom: Joi.string().uppercase().alphanum().min(1).max(10),
    subjectId: Joi.number().integer().positive(),
});

export const scheduleCreationValidation = Joi.object({
    start_time: Joi.any.required(),
    end_time: Joi.any.required(),
    classroom: Joi.any.required(),
    subjectId: Joi.any.required(),
}).unknown(false);

export const scheduleEditingValidation = Joi.object({
    start_time: Joi.any(),
    end_time: Joi.any(),
    classroom: Joi.any(),
    subjectId: Joi.any(),
}).unknown(false);

export default scheduleIntegrityValidation;