"use strict";

import { EntitySchema } from "typeorm";

export const CareerEntity = new EntitySchema({
    name: "career",
    tableName: "career",
    columns: {
        acronym: {
            type: String,
            primary: true,
            nullable: false,
        },
        name: {
            type: String,
            nullable: false,
        },
    },
    relations: {
        subject: {
            type: 'many-to-many',
            target: 'subject',
            inverseSide: 'career-subject',
            joinTable: true
        },   
        user: {
            type: 'one-to-many',
            target: 'user',
            inverseSide: 'career-user',
            joinColumn: true
        },             
    },
});

export default CareerEntity;