"use strict";

import { EntitySchema } from "typeorm";

export const SubjectEntity = new EntitySchema({
    name: "subject",
    tableName: "subject",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        name: {
            type: String,
            unique: true,
            nullable: false,
        },
        description: {
            type: String,
            unique: true,
            nullable: false,
        },        
        spots_per_career: {
            type: Number,
            nullable: false,
        },
        required_credits: {
            type: Number,
            nullable: true,
        },        
        minimum_semester: {
            type: "timestamp",
            nullable: true,
        },
    },
    relations: {
        schedule: {
            type: 'one-to-many',
            target: 'schedule',
            inverseSide: 'schedule',
            joinColumn: true
        },   
        preinscription: {
            type: 'one-to-many',
            target: 'preinscription',
            inverseSide: 'preinscription'
        },
        inscription: {
            type: 'one-to-many',
            target: 'inscription',
            inverseSide: 'inscription'
        },
        subject_template: {
            type: 'many-to-one',
            target: 'subject_template',
            inverseSide: 'subject_template'
        }
    },
});

export default SubjectEntity;