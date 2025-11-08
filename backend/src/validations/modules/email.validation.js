export const domainEmailValidator = (value, helpers) => {
  if (!value.endsWith("@gmail.com") && !value.endsWith("@gmail.cl")) {
    return helpers.message(
      "El correo electrónico debe finalizar en @gmail.com o @gmail.cl."
    );
  }
  return value;
};

export default domainEmailValidator;