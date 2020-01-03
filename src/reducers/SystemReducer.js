import {USER_REGISTERED_TO_RIDDLE_SUCCESS} from "../HomeAction";
import {LOGOUT, USER_LOGGED} from "../LoginActions";
import {TIMER_MINUTE_TICK} from "../TimerActions";

const defaultState = {serverTimeOffset:0, oneMinuteTick:0};

const systemReducer = (state = defaultState, action) => {

    switch (action.type) {

        case USER_LOGGED: {
            const serverTimestamp = action.serverTimeOffest;
            return {...state, maindataUrl: action.maindataUrl, statisticsUrl: action.statisticsUrl, serverTimeOffset: serverTimestamp || 0 };
        }

        case USER_REGISTERED_TO_RIDDLE_SUCCESS: {
            const serverTimestamp = action.serverTimeOffest;
            return {...state, serverTimeOffset: serverTimestamp || 0 }
        }

        case TIMER_MINUTE_TICK:{
            return {...state, oneMinuteTick: action.oneMinuteTick };
        }

        case LOGOUT:
            return defaultState;

        default:
            return state;
    }
};

export default systemReducer;
