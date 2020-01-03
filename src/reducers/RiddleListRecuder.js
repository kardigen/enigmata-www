import idx from 'idx';
import {MAIN_DATA_FETCH_SUCCESS} from "../HomeAction";
import {LOGOUT} from "../LoginActions";
import {TIMER_MINUTE_TICK} from "../TimerActions";
import NotificationService from "../NotificationService";

function groupRiddles(riddles, timeNow) {
    return riddles
        .sort(r => r.startDate)
        .map((r, x, list) => {
            const category = ((r.endDate <= timeNow) ? 'past' : ((r.endDate > timeNow && r.startDate <= timeNow) ? 'current' : 'future' ));
            const lastFinished =
                (x === list.length-1 && r.endDate < timeNow)
                || (x < list.length-1 && timeNow >= r.endDate && timeNow < list[x+1].endDate);
            return Object.assign(r, {'category': category, 'lastFinished': lastFinished});
        }
    );
}

const SECOND = 1000;

export const showRiddleListReducer = (state = [], action) => {
    switch (action.type) {

        case MAIN_DATA_FETCH_SUCCESS: {
            const serverTimeOffset = idx(action._state, _ => _.system.serverTimeOffset) || 0;
            const timeNow = Date.now() + serverTimeOffset;
            const riddles = idx(action, _ => _.mainData.data.riddles);
            return groupRiddles(riddles || [], timeNow);
        }

        case TIMER_MINUTE_TICK: {
            const serverTimeOffset = idx(action._state, _ => _.system.serverTimeOffset) || 0;
            const timeNow = Date.now() + serverTimeOffset;

            const riddleToNotify = state.find(
                riddle => timeNow > riddle.startDate - 70 * SECOND && timeNow < riddle.startDate - 50 * SECOND);
            if (riddleToNotify && !riddleToNotify.locked) {
                NotificationService.promiseSetNotification("Następna zagadka startuje już za minutę!");
            }

            return groupRiddles(state || [], timeNow);
        }

        case LOGOUT:
            return [];

        default:
            return state;
    }
};
