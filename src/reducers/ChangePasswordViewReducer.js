import {CHANGE_PASSWORD_TOKEN_SUCESS, CHANGE_PASSWORD_TOKEN_ERROR} from "../VerificationActions";

export const changePasswordViewReducer = (state = {}, action) => {
    switch (action.type) {
        case CHANGE_PASSWORD_TOKEN_SUCESS: {
            return {passwordChanged:true};
        }

        case CHANGE_PASSWORD_TOKEN_ERROR: {
            if (typeof action.reason === 'number' && action.reason >= 400 && action.reason < 500){
                return {passwordChanged:false};
            }
            else
                return state;
        }

        default:
            return state;
    }
};