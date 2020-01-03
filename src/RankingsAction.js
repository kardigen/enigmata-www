
export const fetchRankingsData = () => {
    return {
        type: RANKS_DATA_FETCH_REQUEST
    }
}

export const RANKS_DATA_FETCH_REQUEST = "RANKS_DATA_FETCH_REQUEST";
export const RANKS_DATA_FETCH_ERROR = "RANKS_DATA_FETCH_ERROR";
export const RANKS_DATA_FETCH_SUCCESS = "RANKS_DATA_FETCH_SUCCESS";

export const fetchUserStatisticData = (user) => {
    return {
        type: USER_STATS_DATA_FETCH_REQUEST,
        user: user
    }
};

export const USER_STATS_DATA_FETCH_REQUEST = "USER_STATS_DATA_FETCH_REQUEST";
