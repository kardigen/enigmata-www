import idx from 'idx';

import {FIRST_TIME_LOGIN_DONE, LOGOUT, PASSWORD_CHANGED_ACTION, TRIAL_ACCOUNT_LOGIN, USER_LOGGED} from '../LoginActions'
import {MAIN_DATA_FETCH_SUCCESS, MAIN_DATA_FETCH_ERROR, USER_REGISTERED_TO_RIDDLE_ERROR, USER_REGISTERED_TO_RIDDLE_SUCCESS} from "../HomeAction";
import {RIDDLE_FETCH_ERROR, SEND_ANSWER_ERROR, SEND_ANSWER_SEND} from "../RiddleActions";
import {
    USER_PROFILE_DATA_FETCH_ERROR,
    USER_PROFILE_DATA_FETCH_SUCCESS, USER_PROFILE_DATA_UPDATE_ERROR,
    USER_PROFILE_DATA_UPDATE_SUCCESS
} from "../ProfileAction";
import {BUY_CREDITS_REQUEST_SUCCESS, DISMISS_PAYMENT_SUCCESS} from "../BuyCreditsActions";

const userReducer = (state = {authenticated: false}, action) => {
    switch (action.type) {

        case PASSWORD_CHANGED_ACTION: {
            return {...state, firstTimeLogin: true};
        }

        case USER_LOGGED: {
            const result = idx(action, action => action.user);
            const firstTimeLogin = idx(action, action => action.firstTimeLogin)
                || result.login === TRIAL_ACCOUNT_LOGIN
                || !idx(action, action => action.user.activated)
                || state.firstTimeLogin;

            return {...state, ...result, authenticated: true, firstTimeLogin: firstTimeLogin, authenticationTokenExpire: result.authenticationTokenExpire};
        }

        case FIRST_TIME_LOGIN_DONE: {
            return {...state, firstTimeLogin: false};
        }

        case LOGOUT: {
            return {authenticated: false, firstTimeLogin: state.firstTimeLogin};
        }

        case SEND_ANSWER_SEND: {
            if (action.data.requestValid) {
                return {
                    ...state,
                    userStatistics: action.data.userStatistics
                }
            } else {
                return state;
            }
        }

        case DISMISS_PAYMENT_SUCCESS:{
            return {...state, currentCreditPlan: undefined, ...action.data}
        }
        case BUY_CREDITS_REQUEST_SUCCESS:
        case USER_REGISTERED_TO_RIDDLE_SUCCESS:
        case USER_PROFILE_DATA_UPDATE_SUCCESS:
        case USER_PROFILE_DATA_FETCH_SUCCESS: {
            return {...state, ...action.data}
        }

        case USER_REGISTERED_TO_RIDDLE_ERROR:
        case USER_PROFILE_DATA_UPDATE_ERROR:
        case USER_PROFILE_DATA_FETCH_ERROR:
        case MAIN_DATA_FETCH_ERROR:
        case RIDDLE_FETCH_ERROR:
        case SEND_ANSWER_ERROR: {
            if (action.reason === 401)
                return {authenticated: false};
            else
                return state;
        }

        case MAIN_DATA_FETCH_SUCCESS: {
            const riddles = idx(action, _ => _.mainData.data.riddles);
            let resultsUrls = {};
            if(riddles){
                resultsUrls = riddles.reduce((urls,riddle)=> {
                        urls[""+riddle.riddleId] = riddle.resultsUrl;
                        return urls;
                    },{});
            }
            return {...state, resultsUrls}
        }

        default:
            return state;
    }
};

export default userReducer;