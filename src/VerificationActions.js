
export const VERIFY_TOKEN_REQUEST = "VERIFY_TOKEN_REQUEST";
export const VERIFY_TOKEN_SUCESS = "VERIFY_TOKEN_SUCESS";
export const VERIFY_TOKEN_ERROR = "VERIFY_TOKEN_ERROR";
export const CHANGE_PASSWORD_TOKEN_SUCESS = "CHANGE_PASSWORD_TOKEN_SUCESS"
export const CHANGE_PASSWORD_TOKEN_ERROR = "CHANGE_PASSWORD_TOKEN_ERROR"


export const SEND_VERIFICATION_EMAIL = "SEND_VERIFICATION_EMAIL";

export function verifyToken(token) {
    return {
        type: VERIFY_TOKEN_REQUEST,
        token: token
    }
}

export function sendVerificationEmail(eid,authToken) {
    return {
        type: SEND_VERIFICATION_EMAIL,
        eid: eid,
        authToken:authToken
    }
}