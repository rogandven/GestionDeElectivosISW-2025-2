import { VALID_STATUS_ARRAY } from "../constants/validationConstants.js";

export const validateStatus = (status, helper) => {
    if (!status) {
      return helper.message("Estado no proporcionado");
    }

    for (let i = 0; i < VALID_STATUS_ARRAY.length; i++) {
      if (status === VALID_STATUS_ARRAY[i]) {
        return true;
      }
    }
    return helper.message("Estado malformado"); 
}

export default validateStatus;