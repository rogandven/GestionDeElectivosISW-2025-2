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
        }
    },
    relations: {
        user: {
            type: 'many-to-one',
            target: 'user',
            inverseSide: 'user',
            joinTable: true,
        },
        subject: {
            type: 'many-to-one',
            target: 'subject',
            inverseSide: 'subject',
            joinTable: true,
        },                         
    },
});

export default PreinscriptionEntity;