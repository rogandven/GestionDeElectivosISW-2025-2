import { EntitySchema } from "typeorm";

export const ElectivoEntity = new EntitySchema({
  name: "ElectivoEntity",
  tableName: "electivo",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    nombre: {
      type: "varchar",
      length: 255,
    },
    cupos: {
      type: "int",
    },
    inscritos: {
      type: "int",
      default: 0,
    },
    apertura: {
      type: "date",
    },
    cierre: {
      type: "date",
    },
    area: {
      type: "varchar",
      length: 100,
    },
    descripcion: {
      type: "text",
    },
  },
});
/*
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
*/

export default ElectivoEntity;
