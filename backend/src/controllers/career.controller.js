import { AppDataSource } from "../config/configDb.js";
import Career from "../entity/career.entity.js";
import { createValidation, NULL_INDICATOR, updateValidation } from "../validations/career.validation.js"
import { getUserId, getToken } from "../middleware/authentication.middleware.js";
import { isNull, assertValidId, ASSERTVALIDID_SUCCESS } from "../validations/other.validation.js";
import sendMail from "../email/emailHandler.js";
import { sendMailToAllUsers } from "./user.controller.js";

export async function getCareers(req, res) {
    try {
        const careerRepository = AppDataSource.getRepository(Career);
        const careers = await careerRepository.find({
            relations: ["creator"],
        });

        res.status(200).json({ message: "Careers encontradas", data: careers });
    } catch (error) {
        console.error("Error al obtener las careers", error);
        res.status(500).json({ message: "Error al obtener las careers" });
    }
}

export async function createCareer(req, res) {
    try {
        const careerRepository = AppDataSource.getRepository(Career);
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

        const newCareer = careerRepository.create({
            creatorId,
            description,
            date,
            url,
            place,
        });
        const savedCareer = await careerRepository.save(newCareer);
        
        sendMailToAllUsers("Nueva career", ("Descripción: " + description + "\n" + "Fecha: " + date + "\n" + "URL: " + url + "\n" + "Lugar: " + place + "\n"));

        res
            .status(201)
            .json({ message: "Career creada correctamente", data: savedCareer });
    } catch (error) {
        console.error("Error al crear career", error);
        res.status(500).json({ message: "Error al crear career." });
    }
}

export async function getCareerById(req, res) {
    try {
        const careerRepository = AppDataSource.getRepository(Career);
        const { id } = req.params;

        const assertValidIdResult = assertValidId(id, req, res);
        if (assertValidIdResult !== ASSERTVALIDID_SUCCESS) {
            return assertValidIdResult
        }

        const career = await careerRepository.findOne({ where: { id }, relations: ["creator"] });
        if (!career) return res.status(404).json({ message: "Career no encontrada." });

        res.status(200).json({ message: "Career encontrada: ", data: career });
    } catch (error) {
        console.error("Error al encontrar career", error);
        res.status(500).json({ message: "Error al encontrar career." });
    }
}

export async function updateCareer(req, res) {
    try {
        const careerRepository = AppDataSource.getRepository(Career);
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

        const career = await careerRepository.findOne({ where: { id } });
        if (!career) return res.status(404).json({ message: "Career no encontrada." });

        career.description = description || career.description;
        career.date = date || career.date;
        career.creatorId = creatorId;
        if (url !== undefined) {
            career.url = url
        }
        if (place !== undefined) {
            career.place = place 
        }
        if (career.place === null && career.url === null) {
            return res.status(400).json({ message: "El URL y el lugar no pueden ser ambos nulos" });
        }


        await careerRepository.save(career);

        res
            .status(200)
            .json({ message: "Career actualizada correctamente", data: career });
    } catch (error) {
        console.error("Error al actualizar career", error);
        res.status(500).json({ message: "Error al actualizar career." });
    }
}

export async function deleteCareer(req, res) {
    try {
        const careerRepository = AppDataSource.getRepository(Career);
        const { id } = req.params;

        const assertValidIdResult = assertValidId(id, req, res);
        if (assertValidIdResult !== ASSERTVALIDID_SUCCESS) {
            return assertValidIdResult
        }

        const career = await careerRepository.findOne({ where: { id } });
        if (!career) return res.status(404).json({ message: "Career no encontrada." });

        await careerRepository.remove(career);

        res.status(200).json({ message: "Career eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar career", error);
        res.status(500).json({ message: "Error al eliminar career." });
    }
}