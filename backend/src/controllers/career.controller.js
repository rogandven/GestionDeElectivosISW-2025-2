import { AppDataSource } from "../config/configDb.js";
import Career from "../entity/career.entity.js";
import { careerIntegrityValidation, careerCreationValidation } from "../validations/career.validation.js";

const RELATIONS = ["subject", "user"];

export async function getCareers(req, res) {
    try {
        const careerRepository = AppDataSource.getRepository(Career);
        const careers = await careerRepository.find({
            relations: RELATIONS,
        });
        res.status(200).json({ data: careers });
    } catch (error) {
        console.error("Error al obtener las carreras", error);
        res.status(500).json({ message: "Error al obtener las carreras" });
    }
}

export async function createCareer(req, res) {
    try {
        const data = req.body;
        const careerRepository = AppDataSource.getRepository(Career);

        let result = careerIntegrityValidation.validate(data);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }
        result = careerCreationValidation.validate(data);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            data.career_subject_subject = data.subjects;
            data.subjects = undefined;
            careerRepository.save(data);
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return res.status(500).json({ message: "Error al crear carrera.", error: error });
        } 

        await queryRunner.release();
        return res.status(200).json({ message: "¡Carrera creada con éxito!", error: data });
    } catch (error) {
        console.error("Error al crear career", error);
        res.status(500).json({ message: "Error al crear carrera.", error: error });
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