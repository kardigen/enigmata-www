import idx from 'idx';
import {RIDDLE_FETCH_SUCCESS} from "../RiddleActions";
import {LOGOUT} from "../LoginActions";

const currentRiddleReducer = (state = {}, action) => {
    switch (action.type) {
        case RIDDLE_FETCH_SUCCESS:
            const riddle = idx(action,_=>_.data.riddle);
            return {...state, ...riddle};

        case LOGOUT:
            return {};

        default:
            return state;
    }
};

export default currentRiddleReducer;