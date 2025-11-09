import { AppDataSource } from "../config/configDb.js";
import Inscription from "../entity/inscription.entity.js";
import { inscriptionIntegrityValidation, inscriptionCreationValidation, inscriptionFindingValidation, inscriptionEditingValidation } from "../validations/inscription.validation.js";

const RELATIONS = ['user', 'subject'];

export async function getInscriptions(req, res) {
    try {
        const inscriptionRepository = AppDataSource.getRepository(Inscription);
        const inscriptions = await inscriptionRepository.find({
            relations: RELATIONS,
        });
        res.status(200).json({ data: inscriptions });
    } catch (error) {
        console.error("Error al obtener las inscripciones", error);
        res.status(500).json({ message: "Error al obtener las inscripciones" });
    }
}

export async function createInscription(req, res) {
    try {
        const data = req.body;
        const inscriptionRepository = AppDataSource.getRepository(Inscription);

        let result = inscriptionIntegrityValidation.validate(data);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }
        result = inscriptionCreationValidation.validate(data);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }
        if (inscriptionRepository.findOneBy({ userId: data.userId, subjectId: data.subjectId })) {
            return res.status(400).json({ message: "Inscripcion ya existe" });
        }

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            inscriptionRepository.save(data);
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return res.status(500).json({ message: "Error al crear inscripcion.", error: error });
        } 
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return res.status(200).json({ message: "¡Inscripcion creada con éxito!", error: data });
    } catch (error) {
        console.error("Error al crear inscription", error);
        res.status(500).json({ message: "Error al crear inscripcion.", error: error });
    }
}

export async function getInscriptionById(req, res) {
    try {
        const inscriptionRepository = AppDataSource.getRepository(Inscription);
        const idObject = {id: req.params.id};
        var inscription = undefined;

        result = inscriptionFindingValidation.validate(idObject);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }
        if (!(inscription = await inscriptionRepository.findOneBy(idObject))) {
            return res.status(404).json({ message: "Inscripcion no encontrada." });
        }
        return res.status(200).json({message: "Inscripcion encontrada con éxito!", inscription: inscription});
    } catch (error) {
        console.error("Error al encontrar inscripcion", error);
        return res.status(500).json({ message: "Error al encontrar inscripcion.", error: error });
    }
}

export async function updateInscription(req, res) {
    try {
        const data = req.body;
        const inscriptionRepository = AppDataSource.getRepository(Career);
        originalId = req.params.id;

        let result = inscriptionIntegrityValidation.validate(data);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }        
        result = inscriptionEditingValidation.validate(data);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }

        if (!inscriptionRepository.findOneBy({ id: originalId })) {
            return res.status(400).json({ message: "Inscripcion no existe" });
        }
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            await inscriptionRepository.save(data);
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return res.status(500).json({ message: "Error al editar inscripcion.", error: error });
        } 
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return res.status(200).json({ message: "¡Inscripcion editada con éxito!", data: data });
    } catch (error) {
        console.error("Error al editar inscripcion", error);
        res.status(500).json({ message: "Error al editar inscripcion.", error: error });
    }
}

export async function deleteInscription(req, res) {
    try {
        const inscriptionRepository = AppDataSource.getRepository(Inscription);
        const idObject = {id: req.params.id};

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const amount = await inscriptionRepository.delete(idObject);
            if (amount <= 0 || amount > 1) {
                throw new Error(`Se borraron ${toString(amount)} inscripciones`);
            }
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return res.status(500).json({ message: "Error al eliminar inscripcion.", error: error });
        } 
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return res.status(200).json({ message: "¡Inscripcion eliminada con éxito!" });
    } catch (error) {
        console.error("Error al eliminar inscripcion", error);
        res.status(500).json({ message: "Error al eliminar inscripcion" });
    }
}