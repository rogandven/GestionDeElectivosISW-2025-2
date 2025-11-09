"use strict";

import { EntitySchema } from "typeorm";

export const ElectivoEntity = new EntitySchema({
    name: "Electivo",
    tableName: "electivos",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        nombre: {
            type: String,
            unique: true,
            nullable: false,
        },
        descripcion: { 
            type: String,
            nullable: true,
        },
        creditos: {
            type: Number,
            nullable: false,   
        },
    }
});

export default ElectivoEntity;