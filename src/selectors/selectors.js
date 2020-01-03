import idx from "idx";

export const maindataUrl = (state) => state.system.maindataUrl;
export const statisticsUrl = (state) => state.system.statisticsUrl;
export const resultsUrl = (state,riddleId) => state.user.resultsUrls[""+riddleId];
export const authenticationToken = (state) => state.user.authenticationToken;
export const currentUser = (state) => state.user;
export const currentPaymentTransactionId = (state) => idx(state,_=>_.user.currentCreditPlan.payment.transactionId);

