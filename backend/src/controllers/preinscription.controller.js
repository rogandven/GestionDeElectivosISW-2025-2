import { AppDataSource } from "../config/configDb.js";
import Preinscription from "../entity/preinscription.entity.js";
import { preinscriptionIntegrityValidation, preinscriptionCreationValidation, preinscriptionFindingValidation, preinscriptionEditingValidation } from "../validations/preinscription.validation.js";

const RELATIONS = true;

export async function getPreinscriptions(req, res) {
    try {
        const preinscriptionRepository = AppDataSource.getRepository(Preinscription);
        const preinscriptions = await preinscriptionRepository.find({
            relations: RELATIONS,
        });
        res.status(200).json({ data: preinscriptions });
    } catch (error) {
        console.error("Error al obtener las preinscripciones", error);
        res.status(500).json({ message: "Error al obtener las preinscripciones" });
    }
}

export async function createPreinscription(req, res) {
    try {
        const data = req.body;
        if (!data) {
            throw new Error("Datos inválidos");
        }

        const preinscriptionRepository = AppDataSource.getRepository(Preinscription);

        let result = preinscriptionIntegrityValidation.validate(data);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }
        result = preinscriptionCreationValidation.validate(data);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }
        if (await preinscriptionRepository.findOneBy({ userId: data.userId, subjectId: data.subjectId })) {
            return res.status(400).json({ message: "Preinscripcion ya existe" });
        }

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            preinscriptionRepository.save(data);
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return res.status(500).json({ message: "Error al crear preinscripcion.", error: error });
        } 
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return res.status(200).json({ message: "¡Preinscripcion creada con éxito!", error: data });
    } catch (error) {
        console.error("Error al crear preinscription", error);
        res.status(500).json({ message: "Error al crear preinscripcion.", error: error });
    }
}

export async function getPreinscriptionById(req, res) {
    try {
        const preinscriptionRepository = AppDataSource.getRepository(Preinscription);
        const idObject = {id: req.params.id};
        var preinscription = undefined;

        let result = preinscriptionFindingValidation.validate(idObject);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }
        if (!(preinscription = await preinscriptionRepository.findOneBy(idObject))) {
            return res.status(404).json({ message: "Preinscripcion no encontrada." });
        }
        return res.status(200).json({message: "Preinscripcion encontrada con éxito!", preinscription: preinscription});
    } catch (error) {
        console.error("Error al encontrar preinscripcion", error);
        return res.status(500).json({ message: "Error al encontrar preinscripcion.", error: error });
    }
}

export async function updatePreinscription(req, res) {
    try {
        const data = req.body;
        const preinscriptionRepository = AppDataSource.getRepository(Preinscription);
        let originalId = req.params.id;
        let result = preinscriptionFindingValidation.validate({id: originalId});
        if (result.error) {
            return res.status(404).json({ message: result.error.message });
        }
        result = preinscriptionIntegrityValidation.validate(data);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }        
        result = preinscriptionEditingValidation.validate(data);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }

        const existingPreinscription = await preinscriptionRepository.findOneBy({ id: originalId });
        console.log(existingPreinscription);
        if (!existingPreinscription) {
            return res.status(400).json({ message: "Preinscripcion no existe" });
        }

        data.id = originalId;
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            await preinscriptionRepository.update({id: originalId}, data);
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return res.status(500).json({ message: "Error al editar preinscripcion.", error: error });
        } 
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return res.status(200).json({ message: "¡Preinscripcion editada con éxito!", data: data });
    } catch (error) {
        console.error("Error al editar preinscripcion", error);
        res.status(500).json({ message: "Error al editar preinscripcion.", error: error });
    }
}

export async function deletePreinscription(req, res) {
    try {
        const preinscriptionRepository = AppDataSource.getRepository(Preinscription);
        const idObject = {id: req.params.id};
        let result = preinscriptionFindingValidation.validate(idObject);
        if (result.error) {
            return res.status(404).json({ message: result.error.message });
        }
        const existingPreinscription = await preinscriptionRepository.findOneBy(idObject);
        console.log(existingPreinscription);
        if (!existingPreinscription) {
            return res.status(400).json({ message: "Preinscripcion no existe" });
        }

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const amount = await preinscriptionRepository.delete(idObject);
            if (amount <= 0 || amount > 1) {
                throw new Error(`Se borraron ${toString(amount)} preinscripciones`);
            }
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return res.status(500).json({ message: "Error al eliminar preinscripcion.", error: error });
        } 
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return res.status(200).json({ message: "¡Preinscripcion eliminada con éxito!" });
    } catch (error) {
        console.error("Error al eliminar preinscripcion", error);
        res.status(500).json({ message: "Error al eliminar preinscripcion" });
    }
}