function isEmpty(value) {
    return !value || value.trim() === '';
}

function userCredentialsAreValid(email, password) {
    return email &&
    email.includes('@') &&
    password &&
    password.trim().length >= 6
}

function userDetailsAreValid(email, password, fullname, birthDate, gender, phone, address) {
    return (
        userCredentialsAreValid(email, password) &&
        !isEmpty(fullname) &&
        !isEmpty(birthDate) &&
        !isEmpty(gender) &&
        !isEmpty(phone) &&
        !isEmpty(address) 
    );
}

function emailIsConfirmed(email, confirmEmail) {
    return email === confirmEmail;
}

module.exports = {
    userDetailsAreValid: userDetailsAreValid,
    emailIsConfirmed: emailIsConfirmed
};