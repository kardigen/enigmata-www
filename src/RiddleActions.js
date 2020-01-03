export const RIDDLE_FETCH_REQUEST = "RIDDLE_FETCH_REQUEST";
export const RIDDLE_RESULT_FETCH_REQUEST = "RIDDLE_RESULT_FETCH_REQUEST";
export const RIDDLE_FETCH_ERROR = "RIDDLE_FETCH_ERROR";
export const RIDDLE_FETCH_SUCCESS = "RIDDLE_FETCH_SUCCESS";
export const RIDDLE_RESULT_FETCH_ERROR = "RIDDLE_RESULT_FETCH_ERROR";
export const RIDDLE_RESULT_FETCH_SUCCESS = "RIDDLE_RESULT_FETCH_SUCCESS";
export const RIDDLE_VIEW_CLOSE = "RIDDLE_VIEW_CLOSE";
export const RIDDLE_VIEW_REFRESH = "RIDDLE_VIEW_REFRESH";
export const SEND_ANSWER_REQUEST = "SEND_ANSWER_REQUEST";
export const SEND_ANSWER_ERROR = "SEND_ANSWER_ERROR";
export const SEND_ANSWER_SEND = "SEND_ANSWER_SUCCESS";
export const SEND_ANSWER_CONFIRMATION = "SEND_ANSWER_CONFIRMATION";
export const SEND_ANSWER_CANCEL = "SEND_ANSWER_CANCEL";

export function fetchRiddle(riddleUrl) {
    return {
        type: RIDDLE_FETCH_REQUEST,
        riddleUrl: riddleUrl
    }
}

export function fetchRiddleResult(riddleId) {
    return {
        type: RIDDLE_RESULT_FETCH_REQUEST,
        riddleId: riddleId
    }
}

export function sendRiddleAnswer(riddleId, answer, user) {
    window.gtag && window.gtag('event', 'trySendRiddleAnswer', {});
    return {
        type: SEND_ANSWER_REQUEST,
        data: {riddleId: riddleId, answer: answer, user: user}
    }
}

export function openSendAnswerConfirmation(answer) {
    return {
        type: SEND_ANSWER_CONFIRMATION,
        answer: answer
    }
}

export function riddleViewClose() {
    return {
        type: RIDDLE_VIEW_CLOSE
    }
}

