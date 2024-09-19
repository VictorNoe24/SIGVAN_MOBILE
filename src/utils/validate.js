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

export const validatePrice = (price) => {
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    return priceRegex.test(price) && price > 0;
}

export const validateInteger = (number) => {
    const integerRegex = /^-?\d+$/;
    return integerRegex.test(number);
}

export const validateAddress = (address) => {
    const addressRegex = /^[A-Za-z0-9ÁÉÍÓÚáéíóúñÑ'`.,#\- ]+$/;
    return addressRegex.test(address) && address.length >= 5 && address.length <= 200;
}

export const validateCountry = (country) => {
    const countryRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ'`-]+(?: [A-Za-zÁÉÍÓÚáéíóúñÑ'`-]+)*$/;
    return countryRegex.test(country) && country.length >= 2 && country.length <= 100;
}
