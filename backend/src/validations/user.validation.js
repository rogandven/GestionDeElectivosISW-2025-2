"use strict";
import Joi from "joi";
import { MIN_USERNAME, MAX_USERNAME, USERNAME_REGEXP, NAME_REGEXP, RUT_REGEXP, MIN_EMAIL, MAX_EMAIL, MIN_PASSWORD, MAX_PASSWORD, MIN_FULL_NAME, MAX_FULL_NAME } from "./constants/validationConstants.js";
import { validateRole } from "./modules/role.validation.js";
import { domainEmailValidator } from "./modules/email.validation.js";
import { validateTimeStamp } from "./modules/timestamp.validation.js";
import { acronymValidation } from "./modules/acronym.validation.js";

export const userIntegrityValidation = Joi.object({
    username: Joi.string()
        .min(MIN_USERNAME)
        .max(MAX_USERNAME)
        .pattern(USERNAME_REGEXP)
        .messages({
        "string.pattern.base":
            "El nombre de usuario solo puede contener letras, números y guiones bajos.",
        "string.min": "El nombre de usuario debe tener al menos 3 caracteres.",
        "string.max": "El nombre de usuario no puede exceder los 30 caracteres.",
        "string.empty": "El nombre de usuario es obligatorio.",
        }),
    full_name: Joi.string().min(MIN_FULL_NAME).max(MAX_FULL_NAME).pattern(NAME_REGEXP),
    rut: Joi.string()
        .pattern(RUT_REGEXP)
        .messages({
        "string.empty": "El rut no puede estar vacío.",
        "string.base": "El rut debe ser de tipo string.",
        "string.pattern.base": "Formato rut inválido. Debe ser xx.xxx.xxx-x.",
        }),
    email: Joi.string()
        .email()
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
        .messages({
        "string.empty": "La contraseña no puede estar vacía.",
        "any.required": "La contraseña es obligatorio.",
        "string.base": "La contraseña debe ser de tipo texto.",
        "string.min": "La contraseña debe tener al menos 8 caracteres.",
        "string.max": "La contraseña debe tener como máximo 26 caracteres.",
    }),
    role: Joi.string().custom(validateRole),
    generation: Joi.string().custom(validateTimeStamp),
    careerAcronym: acronymValidation,
});

export const userCreateValidation = () => Joi.object({
    username: Joi().any().required(),
    full_name: Joi().any().required(),
    rut: Joi().any().required(),
    email: Joi().any().required(),
    password: Joi().any().required(),
    role: Joi().any().required(),
    generation: Joi().any().required(),
}).unknown(false);

export const userUpdateValidation = () => Joi.object({
    username: Joi().any(),
    full_name: Joi().any(),
    rut: Joi().any(),
    email: Joi().any(),
    password: Joi().any(),
    role: Joi().any(),
    generation: Joi().any(),
}).unknown(false);

export const userLoginValidation = () => Joi.object({
    email: Joi().any(),
    password: Joi().any(),
}).unknown(false);