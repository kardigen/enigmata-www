import {VERIFY_TOKEN_ERROR, VERIFY_TOKEN_SUCESS} from "../VerificationActions";
import {LOGOUT} from "../LoginActions";

export const verificationViewReducer = (state = {}, action) => {
    switch (action.type) {
        case VERIFY_TOKEN_SUCESS: {
            return {verified:true, tokenExpired:false};
        }

        case VERIFY_TOKEN_ERROR: {
            if (typeof action.reason === 'number' && action.reason >= 400 && action.reason < 500)
                return {verified:false, tokenExpired:true};
            else
                return state;
        }

        case LOGOUT:
            return {};

        default:
            return state;
    }
};
