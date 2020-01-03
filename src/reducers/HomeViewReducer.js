import {RIDDLES_LIST_SAVE_Y_POSITION} from "../HomeAction";
import {LOGOUT} from "../LoginActions";

export const homeViewReducer = (state = {}, action) => {
    switch (action.type) {
        case RIDDLES_LIST_SAVE_Y_POSITION: {
            if (action.yPosition !== undefined) {
                return {yPosition: action.yPosition};
            } else {
                return {};
            }
        }

        case LOGOUT:
            return {};

        default:
            return state;
    }
};
