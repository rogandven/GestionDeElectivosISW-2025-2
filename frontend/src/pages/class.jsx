import useGetClass from "@hooks/Class/useGetClass";
import CreateClass from "@hooks/Class/useCreateClass";
import { useEffect } from "react";

const Classes = () => {
    const { classData, fetchClass } = useGetClass();
    const { handleCreateClass } = CreateClass(fetchClass);

    useEffect(() => {
        fetchClass();
    }, []);

    return (<div className="class-page"> 
    <h2>Lista de electivos</h2>
    <button className="create"onClick={() => handleCreateClass(Classes.nombreEl,Classes.profesor,Classes.sala,Classes.horario,Classes.cupos,Classes)}>Crear clase</button></div>)
    <table className="class-table">
       <thead>
            <tr>
                <th>
                    Nombre del electivo
                </th>
              </tr>  
       </thead>
    </table>
}