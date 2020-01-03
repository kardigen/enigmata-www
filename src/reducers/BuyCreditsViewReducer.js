import idx from 'idx'
import {BUY_CREDITS_REQUEST_SUCCESS, BUY_CREDITS_REQUEST_ERROR, BUY_CREDITS_REDIRECTED, BUY_CREDITS_VIEW_CLOSE} from "../BuyCreditsActions";

export const buyCreditsViewReducer = (state = {}, action) => {
    switch (action.type) {
        case BUY_CREDITS_REQUEST_SUCCESS: {
            const redirectUrl = idx(action,_=>_.data.currentCreditPlan.payment.externalRedirectUrl);
            return {...state, redirect: !!redirectUrl, redirectUrl: redirectUrl};
        }

        case BUY_CREDITS_REDIRECTED: {
            return {...state, redirect: false};
        }

        case BUY_CREDITS_REQUEST_ERROR: {
            if (typeof action.reason === 'number' && action.reason === 403)
                return {transactionInProgress: true};
            else
            if (typeof action.reason === 'number' && action.reason >= 400 && action.reason <= 500)
                return {error: true};
            else
                return state;
        }

        case BUY_CREDITS_VIEW_CLOSE: {
            return {};
        }

        default:
            return state;
    }
};
