import idx from 'idx';
import {RANKS_DATA_FETCH_SUCCESS} from "../RankingsAction";
import {LOGOUT} from "../LoginActions";

export const statisticsReducer = (state = [], action) => {
    switch (action.type) {

        case RANKS_DATA_FETCH_SUCCESS: {
            const stats = idx(action, _ => _.data);
            return stats || [];
        }

        case LOGOUT:
            return [];

        default:
            return state;
    }
};
