export const validateEmail = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
}

export const validatePassword = (password) => {
    const passwordRegexAdvanced = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return passwordRegexAdvanced.test(password);
}

export const validateName = (name) => {
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ'`-]+(?: [A-Za-zÁÉÍÓÚáéíóúñÑ'`-]+)*$/;
    return nameRegex.test(name) && name.length >= 1 && name.length <= 100;
}

export const validateLastname = (lastname) => {
    const lastnameRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ'`-]+(?: [A-Za-zÁÉÍÓÚáéíóúñÑ'`-]+)*$/;
    return lastnameRegex.test(lastname) && lastname.length >= 1 && lastname.length <= 100;
}

export const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(phoneNumber);
}

export const validatePasswordConfirm = (password, confirmPassword) => {
    return password === confirmPassword && validatePassword(confirmPassword);
}