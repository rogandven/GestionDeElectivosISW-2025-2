"use strict";

import { EntitySchema } from "typeorm";

export const PreinscriptionEntity = new EntitySchema({
    name: "preinscription",
    tableName: "preinscription",
    columns: {
        id: {
            type: Number,
            primary: true,
            nullable: false,
            generated: true,
        },
        date: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
        },
        status: {
            type: String,
            nullable: false,
        },
        userId: {
            type: Number,
            nullable: false,
        },
        subjectId: {
            type: Number,
            nullable: false,
        }
    },
});

export default PreinscriptionEntity;