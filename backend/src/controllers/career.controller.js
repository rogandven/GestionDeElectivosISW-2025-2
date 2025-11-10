import { AppDataSource } from "../config/configDb.js";
import Career from "../entity/career.entity.js";
import { careerIntegrityValidation, careerCreationValidation, careerFindingValidation, careerEditingValidation } from "../validations/career.validation.js";
import { subjectExists } from "./subject.controller.js";

const RELATIONS = true;

export async function getCareers(req, res) {
    try {
        const careerRepository = AppDataSource.getRepository(Career);
        const careers = await careerRepository.find({
            relations: RELATIONS,
        });
        res.status(200).json({ data: careers });
    } catch (error) {
        throw error;
        console.error("Error al obtener las carreras", error);
        res.status(500).json({ message: "Error al obtener las carreras", error: error.message });
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
        if (await careerRepository.findOne({where: { acronym: data.acronym }})) {
            return res.status(400).json({ message: "Carrera ya existe" });
        }

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            data.subject = data.subjects;
            if (data.subject instanceof Array) {
                for (let i = 0; i < data.subject.length; i++) {
                    if (!(await subjectExists(data.subject[i]))) {
                        throw new Error("Ramo no existe");
                    }    
                }
            } else {
                throw new Error("Arreglo invalido");
            }
            careerRepository.save(data);
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return res.status(500).json({ message: "Error al crear carrera.", error: error.message ? error.message : "Error desconocido" });
        } 
        await queryRunner.commitTransaction();
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
        
        const originalAcronym = req.params.acronym;
        console.log(originalAcronym);

        let result = careerFindingValidation.validate({acronym: originalAcronym});
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }    
        result = careerIntegrityValidation.validate(data);
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
        await queryRunner.commitTransaction();
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

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const deleteResult = await careerRepository.delete(idObject);
            const amount = Number(deleteResult.affected);
            console.log(amount);
            if (isNaN(amount) || amount <= 0 || amount > 1) {
                throw new Error(`Se borraron ${amount} carreras`);
            }
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return res.status(500).json({ message: "Error al eliminar carrera.", error: error.message ? error.message : "Error desconocido" });
        } 
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return res.status(200).json({ message: "¡Carrera eliminada con éxito!" });
    } catch (error) {
        console.error("Error al eliminar carrera", error);
        res.status(500).json({ message: "Error al eliminar carrera" });
    }
}

export async function doesCareerExist(career) {
    if (!career || typeof(career) !== 'string') {
        return false;
    }
    const careerRepository = AppDataSource.getRepository(Career);
    const condition = {
        acronym: career.toString()
    }
    if(!(await careerRepository.findOne({where: condition}))) {
        return false;
    }
    return true;
}