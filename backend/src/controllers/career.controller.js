import { AppDataSource } from "../config/configDb.js";
import Career from "../entity/career.entity.js";
import { careerIntegrityValidation, careerCreationValidation, careerFindingValidation, careerEditingValidation } from "../validations/career.validation.js";

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
        if (careerRepository.findOneBy({ acronym: data.acronym })) {
            return res.status(400).json({ message: "Carrera ya existe" });
        }

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            data.subject = data.subjects;
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
        const idObject = {acronym: req.params.acronym};
        var career = undefined;

        let result = careerIntegrityValidation.validate(idObject);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }        
        result = careerFindingValidation.validate(idObject);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }
        if (!(career = await careerRepository.findOneBy(idObject))) {
            return res.status(404).json({ message: "Carrera no encontrada." });
        }
        return res.status(200).json({message: "Carrera encontrada con éxito!", career: career});
    } catch (error) {
        console.error("Error al encontrar carrera", error);
        return res.status(500).json({ message: "Error al encontrar carrera.", error: error });
    }
}

export async function updateCareer(req, res) {
    try {
        const data = req.body;
        const careerRepository = AppDataSource.getRepository(Career);
        originalAcronym = req.params.acronym;

        let result = careerIntegrityValidation.validate(data);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }        
        result = careerEditingValidation.validate(data);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }

        if (!careerRepository.findOneBy({ acronym: originalAcronym })) {
            return res.status(400).json({ message: "Carrera no existe" });
        }
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            data.subject = data.subjects;
            data.subjects = undefined;
            await careerRepository.save(data);
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return res.status(500).json({ message: "Error al editar carrera.", error: error });
        } 
        await queryRunner.release();
        return res.status(200).json({ message: "¡Carrera editada con éxito!", data: data });
    } catch (error) {
        console.error("Error al editar carrera", error);
        res.status(500).json({ message: "Error al editar carrera.", error: error });
    }
}

export async function deleteCareer(req, res) {
    try {
        const careerRepository = AppDataSource.getRepository(Career);
        const idObject = {acronym: req.params.acronym};

        if (await careerRepository.delete(idObject)) {

        }
    } catch (error) {
        console.error("Error al eliminar career", error);
        res.status(500).json({ message: "Error al eliminar career." });
    }
}