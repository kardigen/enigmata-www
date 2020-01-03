
export const showRiddle = riddleId => {
    return {
        type: 'SHOW_RIDDLE',
        riddleId: riddleId
    }
}


export const fetchMainData = () => {
    return {
        type: MAIN_DATA_FETCH_REQUEST
    }
}

export const MAIN_DATA_FETCH_REQUEST = "MAIN_DATA_FETCH_REQUEST";
export const MAIN_DATA_FETCH_ERROR = "MAIN_DATA_FETCH_ERROR";
export const MAIN_DATA_FETCH_SUCCESS = "MAIN_DATA_FETCH_SUCCESS";

export const USER_REGISTERED_TO_RIDDLE_REQUEST = "USER_REGISTERED_TO_RIDDLE_REQUEST";
export const USER_REGISTERED_TO_RIDDLE_SUCCESS = "USER_REGISTERED_TO_RIDDLE_SUCCESS";
export const USER_REGISTERED_TO_RIDDLE_NOT_ENOUGH_CREDITS = "USER_REGISTERED_TO_RIDDLE_NOT_ENOUGH_CREDITS";
export const USER_REGISTERED_TO_RIDDLE_ERROR = "USER_REGISTERED_TO_RIDDLE_ERROR";

export const registerUserToRiddle = (riddleId) => {
    return {
        type: USER_REGISTERED_TO_RIDDLE_REQUEST,
        data: {
                riddleId: riddleId,
                agreed: true
        }
    }
};

export const RIDDLES_LIST_SAVE_Y_POSITION = "RIDDLES_LIST_SAVE_Y_POSITION";

export const saveRiddleListY = (yPosition) => {
    return {
        type: RIDDLES_LIST_SAVE_Y_POSITION,
        yPosition: yPosition
    }
};