import {RIDDLE_RESULT_FETCH_SUCCESS} from "../RiddleActions";

export const resultsReducer = (state =  { cache: {} }, action) => {
    switch (action.type) {

        case RIDDLE_RESULT_FETCH_SUCCESS:{
            if(!state.cache){
                state.cache={};
            }
            state.cache[action.data.riddle.riddleHashId] = action.data.riddle ;
            return {...state};
        }

        default:
            return state;
    }
};

