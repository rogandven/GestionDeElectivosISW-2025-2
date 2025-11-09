import { VALID_ROLES } from "../../constants/roleConstants.js";

export const validateRole = (role, helper) => {
    if (!role) {
      return helper.message("Rol no proporcionado");
    }

    for (let i = 0; i < VALID_ROLES.length; i++) {
      if (role === VALID_ROLES[i]) {
        return true;
      }
    }
    return helper.message("Rol malformado"); 
}

export default validateRole;