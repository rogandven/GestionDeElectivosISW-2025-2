import { useState } from 'react';
import { getElectivos } from '@services/electivo.service.js';

export const GetElectivo = () => { 
    const [electivos, setElectivos] = useState([]);
    
    const fetchElectivos = async () => {
        try {
            const data = await getElectivos();
            setElectivos(data);
        } catch (error) {
            console.error("Error consiguiendo electivos:", error);
        }
    };
    
    const dataLogged = (data) => {
        try {
            const item = sessionStorage.getItem("electivo");
            const { nombre } = JSON.parse(item ? item : "{}") || "";
            for (let i = 0; i < data.length; i++) {
                console.log("DATA SUB " + String(i) + ": ");
                console.log(data[i]);
                try {
                    if(data[i].nombre === nombre) {
                        data.splice(i, 1);
                        break;
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    return { electivos, setElectivos, fetchElectivos };
}

export default GetElectivo;