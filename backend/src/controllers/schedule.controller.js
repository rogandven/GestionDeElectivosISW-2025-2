import { AppDataSource } from "../config/configDb.js";
import Schedule from "../entity/schedule.entity.js";
import { scheduleCreationValidation, scheduleIntegrityValidation, scheduleCreationValidation, scheduleFindingValidation, scheduleEditingValidation } from "../validations/schedule.validation.js";

const RELATIONS = ['subject'];

export async function getSchedules(req, res) {
    try {
        const scheduleRepository = AppDataSource.getRepository(Schedule);
        const schedules = await scheduleRepository.find({
            relations: RELATIONS,
        });
        res.status(200).json({ data: schedules });
    } catch (error) {
        console.error("Error al obtener las horarioes", error);
        res.status(500).json({ message: "Error al obtener las horarioes" });
    }
}

export async function createSchedule(req, res) {
    try {
        const data = req.body;
        const scheduleRepository = AppDataSource.getRepository(Schedule);

        let result = scheduleIntegrityValidation.validate(data);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }
        result = scheduleCreationValidation.validate(data);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }
        if (scheduleRepository.findOneBy({ start_time: data.start_time, end_time: data.end_time, classroom: data.classroom})) {
            return res.status(400).json({ message: "Horario ya existe" });
        }

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            scheduleRepository.save(data);
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return res.status(500).json({ message: "Error al crear horario.", error: error });
        } 
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return res.status(200).json({ message: "¡Horario creada con éxito!", error: data });
    } catch (error) {
        console.error("Error al crear schedule", error);
        res.status(500).json({ message: "Error al crear horario.", error: error });
    }
}

export async function getScheduleById(req, res) {
    try {
        const scheduleRepository = AppDataSource.getRepository(Schedule);
        const idObject = {id: req.params.id};
        var schedule = undefined;

        result = scheduleFindingValidation.validate(idObject);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }
        if (!(schedule = await scheduleRepository.findOneBy(idObject))) {
            return res.status(404).json({ message: "Horario no encontrada." });
        }
        return res.status(200).json({message: "Horario encontrada con éxito!", schedule: schedule});
    } catch (error) {
        console.error("Error al encontrar horario", error);
        return res.status(500).json({ message: "Error al encontrar horario.", error: error });
    }
}

export async function updateSchedule(req, res) {
    try {
        const data = req.body;
        const scheduleRepository = AppDataSource.getRepository(Schedule);
        originalId = req.params.id;

        let result = scheduleIntegrityValidation.validate(data);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }        
        result = scheduleEditingValidation.validate(data);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }

        if (!scheduleRepository.findOneBy({ id: originalId })) {
            return res.status(400).json({ message: "Horario no existe" });
        }
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            await scheduleRepository.save(data);
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return res.status(500).json({ message: "Error al editar horario.", error: error });
        } 
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return res.status(200).json({ message: "¡Horario editada con éxito!", data: data });
    } catch (error) {
        console.error("Error al editar horario", error);
        res.status(500).json({ message: "Error al editar horario.", error: error });
    }
}

export async function deleteSchedule(req, res) {
    try {
        const scheduleRepository = AppDataSource.getRepository(Schedule);
        const idObject = {id: req.params.id};

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const amount = await scheduleRepository.delete(idObject);
            if (amount <= 0 || amount > 1) {
                throw new Error(`Se borraron ${toString(amount)} horarioes`);
            }
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return res.status(500).json({ message: "Error al eliminar horario.", error: error });
        } 
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return res.status(200).json({ message: "¡Horario eliminada con éxito!" });
    } catch (error) {
        console.error("Error al eliminar horario", error);
        res.status(500).json({ message: "Error al eliminar horario" });
    }
}