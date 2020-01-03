
export const USER_PROFILE_DATA_FETCH_REQUEST = "USER_PROFILE_DATA_FETCH_REQUEST";
export const USER_PROFILE_DATA_FETCH_ERROR = "USER_PROFILE_DATA_FETCH_ERROR";
export const USER_PROFILE_DATA_FETCH_SUCCESS = "USER_PROFILE_DATA_FETCH_SUCCESS";

export const fetchUserProfileData = (user) => {
    return {
        type: USER_PROFILE_DATA_FETCH_REQUEST,
        user: user
    }
};


export const USER_PROFILE_DATA_UPDATE_REQUEST = "USER_PROFILE_DATA_UPDATE_REQUEST";
export const USER_PROFILE_DATA_UPDATE_ERROR = "USER_PROFILE_DATA_UPDATE_ERROR";
export const USER_PROFILE_DATA_UPDATE_SUCCESS = "USER_PROFILE_DATA_UPDATE_SUCCESS";

export const updateUserProfileData = (updateUserData) => {
    return {
        type: USER_PROFILE_DATA_UPDATE_REQUEST,
        userUpdateData: updateUserData
    }
};

export const USER_PROFILE_VIEW_RESET = "USER_PROFILE_VIEW_RESET";
export const profileViewReset = () => {
    return {
        type: USER_PROFILE_VIEW_RESET
    }
};
