import idx from 'idx';

import {WRONG_PASSWORD, USER_LOGGED, ACCOUNT_EXISTS_ALREADY, LOGOUT} from '../LoginActions'

const loginViewReducer = (state = {}, action) => {
    switch (action.type) {
        case WRONG_PASSWORD: {
            const reason = idx(action, action => action.reason);
            return {...state, status: WRONG_PASSWORD, reason: reason};
        }
        case ACCOUNT_EXISTS_ALREADY: {
            const reason = idx(action, action => action.reason);
            return {...state, status: ACCOUNT_EXISTS_ALREADY, reason: reason};
        }
        case USER_LOGGED: {
            return {...state, status: USER_LOGGED};
        }

        case LOGOUT:
            return {};

        default:
            return state;
    }
};

export default loginViewReducer;