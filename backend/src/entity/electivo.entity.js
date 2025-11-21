import { EntitySchema } from "typeorm";

export const ElectivoEntity = new EntitySchema({
  name: "Electivo",
  tableName: "electivos",
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
    descripcion: {
      type: "text",
    },
    cupos: {
      type: "int",
    },
    inscritos: {
      type: "int",
      default: 0,
    }, 
    creditos_requeridos:{
      type: "int",
      default: 0,
    },
    semestre_minimo:{
      type: "string",
      length: 10,
    },
    estado:{
      type: "boolean",
      default: true,
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
  },
});

export default ElectivoEntity;