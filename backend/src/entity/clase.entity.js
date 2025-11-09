"use strict";

import { EntitySchema } from "typeorm";

export const ClaseEntity = new EntitySchema({
    name: "Clase",
    tableName: "clases",
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
        sala: {
            type: String,
            nullable: false,
        },
        horario: {
            type: "varchar",
            nullable: false,
        },
        cupos: {
            type: Number,
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

export default ClaseEntity;