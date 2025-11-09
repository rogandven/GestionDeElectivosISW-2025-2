import { AppDataSource } from "../config/configDb.js";
import Subject from "../entity/subject.entity.js";
import { subjectIntegrityValidation, subjectCreationValidation, subjectFindingValidation, subjectEditingValidation } from "../validations/subject.validation.js";

const RELATIONS = ['subjectTemplate'];

export async function getSubjects(req, res) {
    try {
        const subjectRepository = AppDataSource.getRepository(Subject);
        const subjects = await subjectRepository.find({
            relations: RELATIONS,
        });
        res.status(200).json({ data: subjects });
    } catch (error) {
        console.error("Error al obtener las ramoes", error);
        res.status(500).json({ message: "Error al obtener las ramoes" });
    }
}

export async function createSubject(req, res) {
    try {
        const data = req.body;
        const subjectRepository = AppDataSource.getRepository(Subject);

        let result = subjectIntegrityValidation.validate(data);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }
        result = subjectCreationValidation.validate(data);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }
        if (subjectRepository.findOneBy({ start_time: data.start_time, end_time: data.end_time, classroom: data.classroom})) {
            return res.status(400).json({ message: "Ramo ya existe" });
        }

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            subjectRepository.save(data);
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return res.status(500).json({ message: "Error al crear ramo.", error: error });
        } 
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return res.status(200).json({ message: "¡Ramo creada con éxito!", error: data });
    } catch (error) {
        console.error("Error al crear subject", error);
        res.status(500).json({ message: "Error al crear ramo.", error: error });
    }
}

export async function getSubjectById(req, res) {
    try {
        const subjectRepository = AppDataSource.getRepository(Subject);
        const idObject = {id: req.params.id};
        var subject = undefined;

        result = subjectFindingValidation.validate(idObject);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }
        if (!(subject = await subjectRepository.findOneBy(idObject))) {
            return res.status(404).json({ message: "Ramo no encontrada." });
        }
        return res.status(200).json({message: "Ramo encontrada con éxito!", subject: subject});
    } catch (error) {
        console.error("Error al encontrar ramo", error);
        return res.status(500).json({ message: "Error al encontrar ramo.", error: error });
    }
}

export async function updateSubject(req, res) {
    try {
        const data = req.body;
        const subjectRepository = AppDataSource.getRepository(Subject);
        originalId = req.params.id;

        let result = subjectIntegrityValidation.validate(data);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }        
        result = subjectEditingValidation.validate(data);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }

        if (!subjectRepository.findOneBy({ id: originalId })) {
            return res.status(400).json({ message: "Ramo no existe" });
        }
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            await subjectRepository.save(data);
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return res.status(500).json({ message: "Error al editar ramo.", error: error });
        } 
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return res.status(200).json({ message: "¡Ramo editada con éxito!", data: data });
    } catch (error) {
        console.error("Error al editar ramo", error);
        res.status(500).json({ message: "Error al editar ramo.", error: error });
    }
}

export async function deleteSubject(req, res) {
    try {
        const subjectRepository = AppDataSource.getRepository(Subject);
        const idObject = {id: req.params.id};

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const amount = await subjectRepository.delete(idObject);
            if (amount <= 0 || amount > 1) {
                throw new Error(`Se borraron ${toString(amount)} ramoes`);
            }
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return res.status(500).json({ message: "Error al eliminar ramo.", error: error });
        } 
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return res.status(200).json({ message: "¡Ramo eliminada con éxito!" });
    } catch (error) {
        console.error("Error al eliminar ramo", error);
        res.status(500).json({ message: "Error al eliminar ramo" });
    }
}
