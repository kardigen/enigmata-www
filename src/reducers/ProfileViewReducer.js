import {LOGOUT} from "../LoginActions";
import {
    USER_PROFILE_DATA_UPDATE_ERROR,
    USER_PROFILE_DATA_UPDATE_SUCCESS, USER_PROFILE_VIEW_RESET,
} from "../ProfileAction";


const profileViewReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_PROFILE_DATA_UPDATE_SUCCESS: {
            return {status:USER_PROFILE_DATA_UPDATE_SUCCESS};
        }

        case USER_PROFILE_DATA_UPDATE_ERROR: {

            if (typeof action.reason === 'number' && action.reason >= 400 && action.reason < 500)
                return {status: USER_PROFILE_DATA_UPDATE_ERROR};
            else
                return state;

        }

        case USER_PROFILE_VIEW_RESET:
        case LOGOUT:
            return {};

        default:
            return state;
    }
};

export default profileViewReducer;