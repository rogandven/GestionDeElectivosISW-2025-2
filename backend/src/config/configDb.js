"use strict";
import { DataSource } from "typeorm"
import { DATABASE, DB_USERNAME, DB_PORT, HOST, PASSWORD } from "./configEnv.js";
import UserEntity from "../entity/user.entity.js";
import CareerEntity from "../entity/career.entity.js";
import InscriptionEntity from "../entity/inscription.entity.js";
import PreinscriptionEntity from "../entity/preinscription.entity.js";
import ScheduleEntity from "../entity/schedule.entity.js";
import SubjectEntity from "../entity/subject.entity.js";
import SubjectTemplateEntity from "../entity/subject_template.entity.js";

// Configuración de la conexión a la base de datos
export const AppDataSource = new DataSource({
    type: "postgres",
    host: `${HOST}`,
    port: `${DB_PORT}`,
    username: `${DB_USERNAME}`,
    password: `${PASSWORD}`,
    database: `${DATABASE}`,
    entities: [UserEntity, CareerEntity, InscriptionEntity, PreinscriptionEntity, ScheduleEntity, SubjectEntity, SubjectTemplateEntity],
    synchronize: true,
    logging: false,
});

// Función para conectar a la base de datos
export async function connectDB() {
    try {
        await AppDataSource.initialize();
        console.log("=> Conexión con la base de datos exitosa!");
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
        process.exit(1);
    }
}