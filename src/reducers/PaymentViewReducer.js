import {
    PAYMENT_VERIFY_STATUS_ERROR,
    PAYMENT_VERIFY_STATUS_POSPONED,
    PAYMENT_VERIFY_STATUS_REQUEST,
    PAYMENT_VERIFY_STATUS_SUCCESS
} from "../PaymentActions";
import {LOGOUT} from "../LoginActions";

const defaultState = {status:'in-progress'};

export const paymentViewReducer = (state = defaultState, action) => {
    switch (action.type) {
        case PAYMENT_VERIFY_STATUS_SUCCESS: {
            return {...state, status: 'OK'};
        }

        case PAYMENT_VERIFY_STATUS_REQUEST: {
            return {...state, status: 'in-progress'};
        }

        case PAYMENT_VERIFY_STATUS_POSPONED: {
            return {...state, status: 'postponed'};
        }

        case PAYMENT_VERIFY_STATUS_ERROR: {
            return {status: 'error'};
        }

        case LOGOUT:
            return defaultState;

        default:
            return state;
    }
};
