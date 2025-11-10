"use strict";

import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { encryptPassword } from "../helpers/bcrypt.helper.js";

//para cargar datos de electivos de prueba
import { ElectivoEntity } from "../entity/electivo.entity.js";

// Función para crear usuarios por defecto
// Se aplica sólo al iniciar la base de datos
export async function createUsers() {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const count = await userRepository.count();
        if (count > 0) return;
        const users = [
            {
                username: "Administrador",
                rut: "12345678-9",
                email: "admin@gmail.com",
                password: await encryptPassword("admin123"),
                role: "administrador"
            },
            {
                username: "Usuario",
                rut: "98765432-1",
                email: "usuario@gmail.com",
                password: await encryptPassword("usuario123"),
                role: "usuario"
            }
        ]

        console.log("Creando usuarios...");

        for (const user of users) {
            await userRepository.save((
                userRepository.create(user)
            ));
            console.log(`Usuario '${user.username}' creado exitosamente.`);
        }
    } catch (error) {
        console.error("Error al crear usuarios: ", error);
        process.exit(1);
    }
}


//Función para crear electivos de prueba
export async function createElectivos() {
    const electivoRepo = AppDataSource.getRepository(ElectivoEntity);
    const count = await electivoRepo.count();
    if (count === 0) {
        const electivosIniciales = [
            {
            nombre: "Desarrollo Web Avanzado",
            cupos: 30,
            inscritos: 22,
            apertura: "2025-03-01",
            cierre: "2025-03-15",
            area: "Desarrollo",
            descripcion:
                "Este electivo profundiza en frameworks modernos como React, Node y prácticas DevOps básicas.",
            },
            {
            nombre: "Investigación en Inteligencia Artificial",
            cupos: 25,
            inscritos: 20,
            apertura: "2025-04-10",
            cierre: "2025-04-30",
            area: "Investigación",
            descripcion:
                "En este electivo se revisan metodologías de investigación aplicadas al machine learning y deep learning.",
            },
            {
            nombre: "Comunicación y Liderazgo",
            cupos: 40,
            inscritos: 33,
            apertura: "2025-05-05",
            cierre: "2025-05-20",
            area: "Habilidades Sociales",
            descripcion:
                "El curso desarrolla habilidades interpersonales, trabajo en equipo y liderazgo efectivo.",
            },
        ];
        for (const electivo of electivosIniciales) {
            console.log(JSON.stringify(electivo));
            /* await electivoRepo.save((
                electivoRepo.create(electivo)
            ));
            console.log(`Elecitvo '${electivo.nombre}' creado exitosamente.`); */
        }

    await electivoRepo.save(electivosIniciales);
    console.log("Electivos insertados");
    }
}
/*
"use strict";

import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { encryptPassword } from "../helpers/bcrypt.helper.js";

// Función para crear usuarios por defecto
// Se aplica sólo al iniciar la base de datos
export async function createUsers() {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const count = await userRepository.count();
        if (count > 0) return;
        const users = [
            {
                username: "Administrador",
                rut: "12345678-9",
                email: "admin@gmail.com",
                password: await encryptPassword("admin123"),
                role: "administrador"
            },
            {
                username: "profesor",
                rut: "98765432-1",
                email: "lucho@gmail.com",
                password: await encryptPassword("usuario123"),
                role: "profesor"
            }
        ]

        console.log("Creando usuarios...");

        for (const user of users) {
            await userRepository.save((
                userRepository.create(user)
            ));
            console.log(`Usuario '${user.username}' creado exitosamente.`);
        }
    } catch (error) {
        console.error("Error al crear usuarios: ", error);
        process.exit(1);
    }
}
*/