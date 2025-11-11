"use strict";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

//Conseguir la ruta del archivo
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const envFilePath = path.resolve(_dirname, ".env");

dotenv.config({ path: envFilePath })

//Exportar variables de entorno
export const PORT = process.env.PORT;
export const HOST = process.env.HOST;
export const DB_USERNAME = process.env.DB_USERNAME;
export const PASSWORD = process.env.PASSWORD;
export const DATABASE = process.env.DATABASE;
export const DB_PORT = process.env.DB_PORT;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const EMAIL=process.env.EMAIL;
export const EMAIL_PROVIDER=process.env.EMAIL_PROVIDER;
export const EMAIL_PASSWORD=process.env.EMAIL_PASSWORD;
export const JWT_SECRET=process.env.JWT_SECRET;
export const DB_HOST = process.env.DB_HOST;

