"use strict";

import { EntitySchema } from "typeorm";

export const SubjectTemplateEntity = new EntitySchema({
    name: "subject_template",
    tableName: "subject_template",
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
});

export default SubjectTemplateEntity;