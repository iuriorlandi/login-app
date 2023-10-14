const validatePassword = (password) => {
    const fieldName = 'Password'
    return validateRequired(password, fieldName)
        || validateMinLength(password, 6, fieldName) 
        || validateMaxLength(password, 50, fieldName);
};

const validateUsername = (username) => {
    const fieldName = 'Username'
    return validateRequired(username, fieldName)
        || validateMinLength(username, 6, fieldName) 
        || validateMaxLength(username, 50, fieldName);
};

const validateEmail = (email) => {
    const fieldName = 'E-mail'
    return validateRequired(email, fieldName)
        || validateMaxLength(email, 200, fieldName);
};

const validateRequired = (value, fieldName) => {
    return value ? '' : `${fieldName} is required.`;
};

const validateMinLength = (value, minLength, fieldName) => {
    return value.length >= minLength ? '' : `${fieldName} minimum length is ${minLength} characters.`;
};

const validateMaxLength = (value, maxLength, fieldName) => {
    return value.length <= maxLength ? '' : `${fieldName} maximum length is ${maxLength} characters.`;
};


const validation = {
    validatePassword,
    validateUsername,
    validateEmail
}

export default validation;