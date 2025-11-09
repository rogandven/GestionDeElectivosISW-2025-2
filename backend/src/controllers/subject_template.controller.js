import { AppDataSource } from "../config/configDb.js";
import SubjectTemplate from "../entity/subject_template.entity.js";
import { subjectTemplateCreationValidation, subjectTemplateIntegrityValidation, subjectTemplateCreationValidation, subjectTemplateFindingValidation, subjectTemplateEditingValidation } from "../validations/subjectTemplate.validation.js";

export async function getSubjectTemplates(req, res) {
    try {
        const subjectTemplateRepository = AppDataSource.getRepository(SubjectTemplate);
        const subjectTemplates = await subjectTemplateRepository.find();
        res.status(200).json({ data: subjectTemplates });
    } catch (error) {
        console.error("Error al obtener las plantillaes", error);
        res.status(500).json({ message: "Error al obtener las plantillaes" });
    }
}

export async function createSubjectTemplate(req, res) {
    try {
        const data = req.body;
        const subjectTemplateRepository = AppDataSource.getRepository(SubjectTemplate);

        let result = subjectTemplateIntegrityValidation.validate(data);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }
        result = subjectTemplateCreationValidation.validate(data);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }
        if (subjectTemplateRepository.findOneBy({ start_time: data.start_time, end_time: data.end_time, classroom: data.classroom})) {
            return res.status(400).json({ message: "Plantilla ya existe" });
        }

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            subjectTemplateRepository.save(data);
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return res.status(500).json({ message: "Error al crear plantilla.", error: error });
        } 
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return res.status(200).json({ message: "¡Plantilla creada con éxito!", error: data });
    } catch (error) {
        console.error("Error al crear subjectTemplate", error);
        res.status(500).json({ message: "Error al crear plantilla.", error: error });
    }
}

export async function getSubjectTemplateById(req, res) {
    try {
        const subjectTemplateRepository = AppDataSource.getRepository(SubjectTemplate);
        const idObject = {id: req.params.id};
        var subjectTemplate = undefined;

        result = subjectTemplateFindingValidation.validate(idObject);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }
        if (!(subjectTemplate = await subjectTemplateRepository.findOneBy(idObject))) {
            return res.status(404).json({ message: "Plantilla no encontrada." });
        }
        return res.status(200).json({message: "Plantilla encontrada con éxito!", subjectTemplate: subjectTemplate});
    } catch (error) {
        console.error("Error al encontrar plantilla", error);
        return res.status(500).json({ message: "Error al encontrar plantilla.", error: error });
    }
}

export async function updateSubjectTemplate(req, res) {
    try {
        const data = req.body;
        const subjectTemplateRepository = AppDataSource.getRepository(SubjectTemplate);
        originalId = req.params.id;

        let result = subjectTemplateIntegrityValidation.validate(data);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }        
        result = subjectTemplateEditingValidation.validate(data);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }

        if (!subjectTemplateRepository.findOneBy({ id: originalId })) {
            return res.status(400).json({ message: "Plantilla no existe" });
        }
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            await subjectTemplateRepository.save(data);
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return res.status(500).json({ message: "Error al editar plantilla.", error: error });
        } 
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return res.status(200).json({ message: "¡Plantilla editada con éxito!", data: data });
    } catch (error) {
        console.error("Error al editar plantilla", error);
        res.status(500).json({ message: "Error al editar plantilla.", error: error });
    }
}

export async function deleteSubjectTemplate(req, res) {
    try {
        const subjectTemplateRepository = AppDataSource.getRepository(SubjectTemplate);
        const idObject = {id: req.params.id};

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const amount = await subjectTemplateRepository.delete(idObject);
            if (amount <= 0 || amount > 1) {
                throw new Error(`Se borraron ${toString(amount)} plantillaes`);
            }
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return res.status(500).json({ message: "Error al eliminar plantilla.", error: error });
        } 
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return res.status(200).json({ message: "¡Plantilla eliminada con éxito!" });
    } catch (error) {
        console.error("Error al eliminar plantilla", error);
        res.status(500).json({ message: "Error al eliminar plantilla" });
    }
}