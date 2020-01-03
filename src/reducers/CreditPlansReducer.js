import idx from 'idx'
import {MAIN_DATA_FETCH_SUCCESS} from "../HomeAction";

export const creditPlansReducer = function(state = [], action){
    switch (action.type) {
        case MAIN_DATA_FETCH_SUCCESS: {
            return idx(action,_=>_.mainData.data.creditPlans) || [];
        }

        default:
            return state;
    }

};
