import {ERR_CONNECTION_FAILED, ERR_CONNECTION_FAILED_HANDLED} from '../ErrorActions'
import {MAIN_DATA_FETCH_ERROR, USER_REGISTERED_TO_RIDDLE_ERROR} from "../HomeAction";
import {USER_PROFILE_DATA_FETCH_ERROR, USER_PROFILE_DATA_UPDATE_ERROR} from "../ProfileAction";
import {RIDDLE_FETCH_ERROR, RIDDLE_RESULT_FETCH_ERROR, SEND_ANSWER_ERROR} from "../RiddleActions";
import {VERIFY_TOKEN_ERROR} from "../VerificationActions";

export const errorReducer = (state = {connectionError: false}, action) => {
    switch (action.type) {

        case VERIFY_TOKEN_ERROR:
        case RIDDLE_RESULT_FETCH_ERROR:
        case USER_REGISTERED_TO_RIDDLE_ERROR:
        case USER_PROFILE_DATA_UPDATE_ERROR:
        case USER_PROFILE_DATA_FETCH_ERROR:
        case MAIN_DATA_FETCH_ERROR:
        case RIDDLE_FETCH_ERROR:
        case SEND_ANSWER_ERROR: {
            if (typeof action.reason === 'number'&& action.reason > 201 && action.reason <= 500 && action.reason !== 409 && action.reason !== 401) {
                return {...state, connectionError: true};
            } else {
                return state; }
        }

        case ERR_CONNECTION_FAILED:{
            return { ...state, connectionError: true}
        }
        case ERR_CONNECTION_FAILED_HANDLED:{
            return { ...state, connectionError: false}
        }

        default:
            return state;
    }
};