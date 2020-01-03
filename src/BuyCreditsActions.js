
export const BUY_CREDITS_REQUEST            = "BUY_CREDITS_REQUEST";
export const BUY_CREDITS_REQUEST_SUCCESS    = "BUY_CREDITS_REQUEST_SUCCESS";
export const BUY_CREDITS_REQUEST_ERROR      = "BUY_CREDITS_REQUEST_ERROR";
export const BUY_CREDITS_REDIRECTED         = "BUY_CREDITS_REDIRECTED";
export const BUY_CREDITS_VIEW_CLOSE         = "BUY_CREDITS_VIEW_CLOSE";
export const DISMISS_PAYMENT_REQUEST        = "DISMISS_PAYMENT_REQUEST";
export const DISMISS_PAYMENT_SUCCESS        = "DISMISS_PAYMENT_SUCCESS";
export const DISMISS_PAYMENT_ERROR          = "DISMISS_PAYMENT_ERROR";


export const buyCreditsRequest = function(creditsPlanCode, userPhoneNo) {
  return {
      type: BUY_CREDITS_REQUEST,
      creditsPlanCode: creditsPlanCode,
      userPhoneNo: userPhoneNo
  }
};

export const closeBuyCreditsView = function() {
    return {
        type: BUY_CREDITS_VIEW_CLOSE
    }
};

export const dismissCurrentPaymentRequest = function() {
    return {
        type: DISMISS_PAYMENT_REQUEST
    }
};