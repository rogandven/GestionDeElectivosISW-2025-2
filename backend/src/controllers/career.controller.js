import { AppDataSource } from "../config/configDb.js";
import Asamblea from "../entity/asamblea.entity.js";
import { createValidation, NULL_INDICATOR, updateValidation } from "../validations/asamblea.validation.js"
import { getUserId, getToken } from "../middleware/authentication.middleware.js";
import { isNull, assertValidId, ASSERTVALIDID_SUCCESS } from "../validations/other.validation.js";
import sendMail from "../email/emailHandler.js";
import { sendMailToAllUsers } from "./user.controller.js";

export async function getAsambleas(req, res) {
    try {
        const asambleaRepository = AppDataSource.getRepository(Asamblea);
        const asambleas = await asambleaRepository.find({
            relations: ["creator"],
        });

        res.status(200).json({ message: "Asambleas encontradas", data: asambleas });
    } catch (error) {
        console.error("Error al obtener las asambleas", error);
        res.status(500).json({ message: "Error al obtener las asambleas" });
    }
}

export async function createAsamblea(req, res) {
    try {
        const asambleaRepository = AppDataSource.getRepository(Asamblea);
        const { description, date, url, place } = req.body;

        const creatorId = getUserId(getToken(req))
        if (isNull(creatorId)) {
            return res.status(401).json({
                message: "No es un usuario válido"
            })
        }

        req.body.creatorId = creatorId;
        const { error } = createValidation.validate(req.body);

        if (error) return res.status(400).json({ message: error.message });

        if (isNull(url) && isNull(place)) {
            return res.status(400).json({
                message: "El link y el lugar no pueden ser ambos nulos"
            })
        }

        const newAsamblea = asambleaRepository.create({
            creatorId,
            description,
            date,
            url,
            place,
        });
        const savedAsamblea = await asambleaRepository.save(newAsamblea);
        
        sendMailToAllUsers("Nueva asamblea", ("Descripción: " + description + "\n" + "Fecha: " + date + "\n" + "URL: " + url + "\n" + "Lugar: " + place + "\n"));

        res
            .status(201)
            .json({ message: "Asamblea creada correctamente", data: savedAsamblea });
    } catch (error) {
        console.error("Error al crear asamblea", error);
        res.status(500).json({ message: "Error al crear asamblea." });
    }
}

export async function getAsambleaById(req, res) {
    try {
        const asambleaRepository = AppDataSource.getRepository(Asamblea);
        const { id } = req.params;

        const assertValidIdResult = assertValidId(id, req, res);
        if (assertValidIdResult !== ASSERTVALIDID_SUCCESS) {
            return assertValidIdResult
        }

        const asamblea = await asambleaRepository.findOne({ where: { id }, relations: ["creator"] });
        if (!asamblea) return res.status(404).json({ message: "Asamblea no encontrada." });

        res.status(200).json({ message: "Asamblea encontrada: ", data: asamblea });
    } catch (error) {
        console.error("Error al encontrar asamblea", error);
        res.status(500).json({ message: "Error al encontrar asamblea." });
    }
}

export async function updateAsamblea(req, res) {
    try {
        const asambleaRepository = AppDataSource.getRepository(Asamblea);
        const { description, date, url, place } = req.body;
        const { id } = req.params;

        const assertValidIdResult = assertValidId(id, req, res);
        if (assertValidIdResult !== ASSERTVALIDID_SUCCESS) {
            return assertValidIdResult
        }

        const creatorId = getUserId(getToken(req))
        if (isNull(creatorId)) {
            return res.status(401).json({
                message: "No es un usuario válido"
            })
        }

        const { error } = updateValidation.validate(req.body);

        if (error) return res.status(400).json({ message: error.message });

        const asamblea = await asambleaRepository.findOne({ where: { id } });
        if (!asamblea) return res.status(404).json({ message: "Asamblea no encontrada." });

        asamblea.description = description || asamblea.description;
        asamblea.date = date || asamblea.date;
        asamblea.creatorId = creatorId;
        if (url !== undefined) {
            asamblea.url = url
        }
        if (place !== undefined) {
            asamblea.place = place 
        }
        if (asamblea.place === null && asamblea.url === null) {
            return res.status(400).json({ message: "El URL y el lugar no pueden ser ambos nulos" });
        }


        await asambleaRepository.save(asamblea);

        res
            .status(200)
            .json({ message: "Asamblea actualizada correctamente", data: asamblea });
    } catch (error) {
        console.error("Error al actualizar asamblea", error);
        res.status(500).json({ message: "Error al actualizar asamblea." });
    }
}

export async function deleteAsamblea(req, res) {
    try {
        const asambleaRepository = AppDataSource.getRepository(Asamblea);
        const { id } = req.params;

        const assertValidIdResult = assertValidId(id, req, res);
        if (assertValidIdResult !== ASSERTVALIDID_SUCCESS) {
            return assertValidIdResult
        }

        const asamblea = await asambleaRepository.findOne({ where: { id } });
        if (!asamblea) return res.status(404).json({ message: "Asamblea no encontrada." });

        await asambleaRepository.remove(asamblea);

        res.status(200).json({ message: "Asamblea eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar asamblea", error);
        res.status(500).json({ message: "Error al eliminar asamblea." });
    }
}