
"use strict";
import Joi from "joi";

export const createValidation = Joi.object({
  nombre: Joi.string()
    .min(3)
    .max(255)
    .required()
    .messages({
      "string.empty": "El nombre del electivo es obligatorio.",
      "string.min": "El nombre debe tener al menos 3 caracteres.",
      "string.max": "El nombre no puede superar los 255 caracteres.",
      "any.required": "Debe ingresar el nombre del electivo.",
    }),

  cupos: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "El campo 'cupos' debe ser un número.",
      "number.min": "Debe haber al menos 1 cupo disponible.",
      "any.required": "El campo 'cupos' es obligatorio.",
    }),

  inscritos: Joi.number()
    .integer()
    .min(0)
    .default(0)
    .messages({
      "number.base": "El campo 'inscritos' debe ser un número.",
      "number.min": "El número de inscritos no puede ser negativo.",
    }),

  apertura: Joi.date()
    .required()
    .messages({
      "date.base": "La fecha de apertura debe tener un formato válido (AAAA-MM-DD).",
      "any.required": "Debe ingresar una fecha de apertura.",
    }),

  cierre: Joi.date()
    .greater(Joi.ref("apertura"))
    .required()
    .messages({
      "date.base": "La fecha de cierre debe tener un formato válido (AAAA-MM-DD).",
      "date.greater": "La fecha de cierre debe ser posterior a la de apertura.",
      "any.required": "Debe ingresar una fecha de cierre.",
    }),

  area: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.empty": "El área del electivo es obligatoria.",
      "string.min": "El área debe tener al menos 3 caracteres.",
      "string.max": "El área no puede exceder los 100 caracteres.",
      "any.required": "Debe ingresar el área del electivo.",
    }),

  descripcion: Joi.string()
    .min(10)
    .max(500)
    .required()
    .messages({
      "string.empty": "La descripción es obligatoria.",
      "string.min": "La descripción debe tener al menos 10 caracteres.",
      "string.max": "La descripción no puede superar los 500 caracteres.",
      "any.required": "Debe ingresar una descripción para el electivo.",
    }),
});

export const updateValidation = Joi.object({
  nombre: Joi.string().min(3).max(255).messages({
    "string.min": "El nombre debe tener al menos 3 caracteres.",
    "string.max": "El nombre no puede superar los 255 caracteres.",
  }),

  cupos: Joi.number().integer().min(1).messages({
    "number.base": "El campo 'cupos' debe ser un número.",
    "number.min": "Debe haber al menos 1 cupo disponible.",
  }),

  inscritos: Joi.number().integer().min(0).messages({
    "number.base": "El campo 'inscritos' debe ser un número.",
    "number.min": "El número de inscritos no puede ser negativo.",
  }),

  apertura: Joi.date().messages({
    "date.base": "La fecha de apertura debe tener un formato válido (AAAA-MM-DD).",
  }),

  cierre: Joi.date().greater(Joi.ref("apertura")).messages({
    "date.base": "La fecha de cierre debe tener un formato válido (AAAA-MM-DD).",
    "date.greater": "La fecha de cierre debe ser posterior a la de apertura.",
  }),

  area: Joi.string().min(3).max(100).messages({
    "string.min": "El área debe tener al menos 3 caracteres.",
    "string.max": "El área no puede exceder los 100 caracteres.",
  }),

  descripcion: Joi.string().min(10).max(500).messages({
    "string.min": "La descripción debe tener al menos 10 caracteres.",
    "string.max": "La descripción no puede superar los 500 caracteres.",
  }),
})
  .min(1)
  .messages({
    "object.min": "Debe proporcionar al menos un campo para actualizar.",
  });
"use strict";
// import Joi from "joi";

/* export const electivoCreationValidation = ({ data }) => {
  return;
}; */

export const createValidation_OLD = Joi.object({
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
  
export const updateValidation_OLD = Joi.object({
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
  });

export default createValidation;
