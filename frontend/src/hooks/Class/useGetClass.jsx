import { useState } from "react";
import { getClass } from "@services/clase.service.js";

const useGetClass = () => {
    const [classData, setClassData] = useState([]);

    const fetchClass = async () => {
        try {
            const data = await getClass();
            setClassData(data);
        } catch (error) {
            console.error('Error al conseguir la clase data:', error);
        } 
    };

    return { classData, fetchClass };
};

export default useGetClass;
