"use strict";

import {EntitySchema} from "typeorm";

export const InscripcionEntity = new EntitySchema({
   name:"InscripcionEntity",
   tableName:"inscripcion",
   columns:{
      id:{
           type: Number,
           primary: true,
           generated: true,
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
      estado: {
        type: String,
      },

    estadoDetalle: {
    type: String,
    },
    periodo:{
     type: String,
     nullable: true
    },
    userId: {
      type: "int",
      nullable: false,
    },
    electivoId: {
      type: "int",
      nullable: false,
    },
    electivoNombre:{
     type: "varchar",
     nullable: true,
    },
 }

});

export default InscripcionEntity;