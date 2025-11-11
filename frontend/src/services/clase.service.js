import axios from 'services/root.service';

export const getClass = async () => {
    try {
        const response = await axios.get('/api/clases');
        return response.data;
    } catch (error) {
        console.error('Error al obtener la clase:', error);
        throw error;
    }
};

export const assignClass = async (classData) => {
    try {
        const response = await axios.post('/api/clases/asignar', classData);
        return response.data;
    } catch (error) {
        console.error('Error al asignar la clase:', error);
        throw error;
    }
};


export const updateClass = async (classId, updatedData) => {
    try {
        const response = await axios.put(`/api/clases/${classId}`, updatedData);
        return response.data;
    } catch (error) {
        console.log(JSON.stringify(error));
        console.log(JSON.stringify(updatedData));
        console.error('Error al actualizar la clase:', error);
        throw error;
    }
};

export const deleteClass = async (classId) => {
    try {
        const response = await axios.delete(`/api/clases/${classId}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar la clase:', error);
        throw error;
    }
};
