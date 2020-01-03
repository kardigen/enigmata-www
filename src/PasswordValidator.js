
class PasswordValidator {

    static validatePassword(password) {
        return password && password.length >= 8
            && password.toUpperCase() !== password && password.toLowerCase() !== password
            && password.match(/[0-9]+/)
    }
}

export default PasswordValidator;