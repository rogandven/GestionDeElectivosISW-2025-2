"use strict";

import { DataSource } from "typeorm";
import { DATABASE, DB_USERNAME, DB_PORT, HOST, PASSWORD } from "./configEnv.js";

import UserEntity from "../entity/user.entity.js";
import ElectivoEntity from "../entity/electivo.entity.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: `${HOST}`,
  port: `${DB_PORT}`,
  username: `${DB_USERNAME}`,
  password: `${PASSWORD}`,
  database: `${DATABASE}`,
  synchronize: true,
  logging: false,
  entities: [UserEntity, ElectivoEntity],
});

export async function connectDB() {
  try {
    
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("Conexión con la base de datos exitosa!");
    }
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    process.exit(1);
  }
}
