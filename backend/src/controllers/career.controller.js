import { AppDataSource } from "../config/configDb.js";
import Career from "../entity/career.entity.js";

const RELATIONS = ["subject", "user"];

export async function getCareers(req, res) {
    try {
        const careerRepository = AppDataSource.getRepository(Career);
        const careers = await asambleaRepository.find({
            relations: RELATIONS,
        });
        return res.status(200).json({ message: "Carreras encontradas", data: careers });
    } catch (error) {
        console.error("Error al obtener las carreras", error);
        res.status(500).json({ message: "Error al obtener las carreras" });
    }
}

export async function createCareer(req, res) {
    try {
        const careerRepository = AppDataSource.getRepository(Career);
        

    } catch (error) {
        console.error("Error al crear career", error);
        res.status(500).json({ message: "Error al crear career." });
    }
}

export async function getCareerById(req, res) {
    try {
        const careerRepository = AppDataSource.getRepository(Career);
        const { id } = req.params;
    } catch (error) {
        console.error("Error al encontrar career", error);
        res.status(500).json({ message: "Error al encontrar career." });
    }
}

export async function updateCareer(req, res) {
    try {
        const careerRepository = AppDataSource.getRepository(Career);
        const { } = req.body;
        const { id } = req.params;

    } catch (error) {
        console.error("Error al actualizar career", error);
        res.status(500).json({ message: "Error al actualizar career." });
    }
}

export async function deleteCareer(req, res) {
    try {
        const careerRepository = AppDataSource.getRepository(Career);
        const { id } = req.params;

    } catch (error) {
        console.error("Error al eliminar career", error);
        res.status(500).json({ message: "Error al eliminar career." });
    }
}