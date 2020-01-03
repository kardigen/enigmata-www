
export const CHANGE_PASSWORD_ACTION = 'CHANGE_PASSWORD_ACTION';
export const RESET_PASSWORD_ACTION = 'RESET_PASSWORD_ACTION';
export const PASSWORD_CHANGED_ACTION = 'PASSWORD_CHANGED_ACTION';
export const TRY_LOGIN = 'TRY_LOGIN';
export const LOGOUT = 'LOGOUT';
export const FIRST_TIME_LOGIN_DONE = 'FIRST_TIME_LOGIN_DONE';
export const REGISTER_USER = 'REGISTER_USER';
export const USER_LOGGED = 'USER_LOGGED';
export const WRONG_PASSWORD = 'WRONG_PASSWORD';
export const ACCOUNT_EXISTS_ALREADY = 'ACCOUNT_EXISTS_ALREADY';


export function changePasswordAction(password, token, newTerms) {
    return {
        type:  CHANGE_PASSWORD_ACTION,
        password: password,
        token: token,
        newTerms: newTerms
    }
}

export function passwordChangedAction() {
    return {
        type:  PASSWORD_CHANGED_ACTION
    }
}

export function resetPasswordAction( resetPasswordData ) {
    return {
        type: RESET_PASSWORD_ACTION,
        resetPasswordData: resetPasswordData
    }
}

export function tryLogin( loginObject ) {
    return {
        type: TRY_LOGIN,
        loginData: loginObject
    }
}

export function registerUser( loginObject ) {
    return {
        type: REGISTER_USER,
        loginData: loginObject
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}

export function firstTimeLoginDone() {
    return {
        type: FIRST_TIME_LOGIN_DONE
    }
}


export const TRIAL_ACCOUNT_LOGIN = 'info@enigmata.pl';
export const TRIAL_ACCOUNT_PASS = '$info@En1gmata.pl$';