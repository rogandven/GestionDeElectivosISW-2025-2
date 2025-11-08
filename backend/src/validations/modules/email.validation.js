import { ALLOWED_EMAIL_1, ALLOWED_EMAIL_2 } from "../constants/validationConstants.js";

export const domainEmailValidator = (value, helpers) => {
  if (!value.endsWith(ALLOWED_EMAIL_1) && !value.endsWith(ALLOWED_EMAIL_2)) {
    return helpers.message(
      `El correo electrónico debe finalizar en ${ALLOWED_EMAIL_1} o ${ALLOWED_EMAIL_2}`
    );
  }
  return value;
};

export default domainEmailValidator;