"use strict";
import { useState, useCallback } from "react";
import { getElectivos } from "@services/electivo.service.js";

export const useGetElectivos = () => {
  const [electivos, setElectivos] = useState([]);

  const fetchElectivos = useCallback(async (query = "") => {
    try {
      const data = await getElectivos(query);
      if (Array.isArray(data)) {
        setElectivos(data);
      } else if (data?.data && Array.isArray(data.data)) {
        setElectivos(data.data);
      } else {
        setElectivos([]);
      }
    } catch (error) {
      console.error("Error al obtener electivos:", error);
      setElectivos([]);
    }
  }, []);

  return { electivos, fetchElectivos };
};

export default useGetElectivos;
