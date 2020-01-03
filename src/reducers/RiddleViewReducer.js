import idx from 'idx';

import {
    RIDDLE_FETCH_SUCCESS, RIDDLE_VIEW_CLOSE, SEND_ANSWER_CANCEL, SEND_ANSWER_CONFIRMATION,
    SEND_ANSWER_SEND
} from '../RiddleActions'
import {LOGOUT} from "../LoginActions";

const riddleViewReduce = (state = {}, action) => {
    switch (action.type) {
        case RIDDLE_FETCH_SUCCESS: {
            return {...state, status: RIDDLE_FETCH_SUCCESS};
        }
            //TODO riddle fetch error

        case SEND_ANSWER_SEND: {
            const requestValid = idx(action, action => action.data.requestValid);
            const correctAnswer = idx(action, action => action.data.correctAnswer);
            return {...state, status: SEND_ANSWER_SEND, correctAnswer: (requestValid && correctAnswer)};
        }
        //TODO riddle answer send error


        case SEND_ANSWER_CONFIRMATION:
            return {...state, status:SEND_ANSWER_CONFIRMATION, userAnswer: action.answer};

        case SEND_ANSWER_CANCEL:
            return {...state, status:RIDDLE_FETCH_SUCCESS, userAnswer: undefined};

        case RIDDLE_VIEW_CLOSE:
            return {...state, status:undefined };

        case LOGOUT:
            return {};

        default:
            return state;
    }
};

export default riddleViewReduce;