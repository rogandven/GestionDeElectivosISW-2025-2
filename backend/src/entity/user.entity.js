"use strict";

import { EntitySchema } from "typeorm";

export const UserEntity = new EntitySchema({
    name: "user",
    tableName: "user",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        username: {
            type: String,
            unique: true,
            nullable: false,
        },
        rut: {
            type: String,
            unique: true,
            nullable: false,
        },
        full_name: {
            type: String,
            nullable: false,
        },
        email: {
            type: String,
            unique: true,
            nullable: false,
        },
        password: {
            type: String,
            nullable: false,
        },
        role: {
            type: String,
            default: "user",
        },
        generation: {
            type: "timestamp",
            nullable: false,
            default: () => "CURRENT_TIMESTAMP",
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
    },
    relations: {
        career: {
            type: 'many-to-one',
            target: 'career',
            inverseSide: 'career',
            joinColumn: true
        },
        subject: {
            type: 'many-to-many',
            target: 'subject',
            inverseSide: 'subject',
            joinTable: true
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
    },
});

export default UserEntity;