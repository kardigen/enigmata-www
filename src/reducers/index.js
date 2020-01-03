import {combineReducers} from 'redux';
import {showRiddleListReducer} from './RiddleListRecuder';
import userReducer from './UserReducer';
import loginViewReducer from './LoginViewReducer';
import currentRiddleReducer from "./CurrentRiddleReducer";
import riddleViewReducer from "./RiddleViewReducer";
import profileViewReducer from "./ProfileViewReducer";
import systemReducer from "./SystemReducer";
import {resultsReducer} from "./ResultsReducer";
import {errorReducer} from "./ErrorReducer";
import {statisticsReducer} from "./StatisticsRecuder";
import {verificationViewReducer} from './VerificationViewReducer';
import {creditPlansReducer} from "./CreditPlansReducer";
import {buyCreditsViewReducer} from "./BuyCreditsViewReducer";
import {paymentViewReducer} from "./PaymentViewReducer";
import {responsiveStateReducer} from 'redux-responsive';
import {changePasswordViewReducer} from "./ChangePasswordViewReducer";
import {prizePaymentViewReducer} from "./PrizePaymentViewReducer";
import {homeViewReducer} from "./HomeViewReducer";

const appReducers = combineReducers({
    system: systemReducer,
    errors: errorReducer,
    riddles: showRiddleListReducer,
    statistics: statisticsReducer,
    user: userReducer,
    currentRiddle: currentRiddleReducer,
    creditPlans: creditPlansReducer,
    riddleResults: resultsReducer,
    view: combineReducers({
        login: loginViewReducer,
        riddle: riddleViewReducer,
        profile: profileViewReducer,
        verification: verificationViewReducer,
        buyCredits: buyCreditsViewReducer,
        payment: paymentViewReducer,
        changePassword: changePasswordViewReducer,
        prizePayment: prizePaymentViewReducer,
        home: homeViewReducer
    }),
    browser: responsiveStateReducer
});

export default appReducers;
