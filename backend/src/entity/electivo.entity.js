"use strict";

import { EntitySchema } from "typeorm";

export const ElectivoEntity = new EntitySchema({
    name: "Electivo",
    tableName: "Electivo",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        nombre: {
            type: String,
            unique: false,
            nullable: false,
        },
        profesor: {
            type: String,
            unique: false,
            nullable: false,
        },
        cupos: {
            type: Number,
            unique: false,
            nullable: false,
        },
        creditos: {
            type: Number,
            unique: false,
            nullable: false
        },
        descripcion: {
            type: String,
            nullable: false,
        },
    },
});

export default ElectivoEntity;