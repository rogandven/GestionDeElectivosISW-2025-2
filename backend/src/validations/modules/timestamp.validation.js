export const validateTimeStamp = (value, helper) => {
    const result = Date.parse(value, "yyyy/MM/dd HH:mm:ss");
    if (result === null || !result) {
        return helper.message("La fecha no es válida");
    }
    return true;
}

export default validateTimeStamp;