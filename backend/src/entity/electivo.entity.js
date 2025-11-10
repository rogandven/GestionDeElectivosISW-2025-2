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

export default ElectivoEntity;