"use strict";

import { EntitySchema } from "typeorm";

export const HorarioEntity = new EntitySchema({
    name: "HorarioEntity",
    tableName: "horarios",
    columns: {
        id_electivo: {
            type: Number,
            primary: true,
            generated: true,
        },
        
        profesor: {
            type: String,
            nullable: false,
        },
        nombreEl: {
            type: String,
            nullable: false,
        },
        hora_inicio: {
            type: String,
            nullable: false,
        },
        hora_termino: {
            type: String,
            nullable: false,
        },
        sala: {
            type: Number,
            nullable:false
        },
        dia: {
            type: String,
            nullable:false
        },

        status: {
            type: "varchar",
            default: "scheduled",
        },
        createdAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
        },
        updatedAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: () => "CURRENT_TIMESTAMP",
        },
        
    },
});

export default HorarioEntity;