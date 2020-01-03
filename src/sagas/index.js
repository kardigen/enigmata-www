import {call, put, takeLatest, select, delay} from 'redux-saga/effects';

import {
    ACCOUNT_EXISTS_ALREADY,
    CHANGE_PASSWORD_ACTION,
    REGISTER_USER,
    RESET_PASSWORD_ACTION,
    TRY_LOGIN, USER_LOGGED,
    WRONG_PASSWORD
} from '../LoginActions';

import {
    MAIN_DATA_FETCH_REQUEST,
    MAIN_DATA_FETCH_SUCCESS,
    MAIN_DATA_FETCH_ERROR,
    USER_REGISTERED_TO_RIDDLE_REQUEST,
    USER_REGISTERED_TO_RIDDLE_ERROR,
    USER_REGISTERED_TO_RIDDLE_SUCCESS,
    USER_REGISTERED_TO_RIDDLE_NOT_ENOUGH_CREDITS
} from "../HomeAction";

import {
    RANKS_DATA_FETCH_SUCCESS,
    RANKS_DATA_FETCH_ERROR,
    RANKS_DATA_FETCH_REQUEST,
    USER_STATS_DATA_FETCH_REQUEST
} from '../RankingsAction'
import Api from '../Api';
import {
    RIDDLE_FETCH_ERROR,
    RIDDLE_FETCH_REQUEST,
    RIDDLE_FETCH_SUCCESS,
    RIDDLE_RESULT_FETCH_ERROR,
    RIDDLE_RESULT_FETCH_REQUEST,
    RIDDLE_RESULT_FETCH_SUCCESS,
    SEND_ANSWER_ERROR,
    SEND_ANSWER_REQUEST,
    SEND_ANSWER_SEND
} from "../RiddleActions";
import {
    USER_PROFILE_DATA_FETCH_ERROR,
    USER_PROFILE_DATA_FETCH_REQUEST,
    USER_PROFILE_DATA_FETCH_SUCCESS,
    USER_PROFILE_DATA_UPDATE_ERROR,
    USER_PROFILE_DATA_UPDATE_REQUEST,
    USER_PROFILE_DATA_UPDATE_SUCCESS
} from "../ProfileAction";
import {
    SEND_VERIFICATION_EMAIL,
    VERIFY_TOKEN_ERROR,
    VERIFY_TOKEN_REQUEST,
    VERIFY_TOKEN_SUCESS,
    CHANGE_PASSWORD_TOKEN_SUCESS,
    CHANGE_PASSWORD_TOKEN_ERROR
} from "../VerificationActions";
import {ERR_CONNECTION_FAILED} from "../ErrorActions";

import * as selectors from '../selectors/selectors';
import {
    BUY_CREDITS_REQUEST,
    BUY_CREDITS_REQUEST_ERROR,
    BUY_CREDITS_REQUEST_SUCCESS,
    DISMISS_PAYMENT_ERROR,
    DISMISS_PAYMENT_REQUEST,
    DISMISS_PAYMENT_SUCCESS
} from "../BuyCreditsActions";
import {
    PAYMENT_VERIFY_STATUS_ERROR, PAYMENT_VERIFY_STATUS_POSPONED,
    PAYMENT_VERIFY_STATUS_REQUEST,
    PAYMENT_VERIFY_STATUS_SUCCESS
} from "../PaymentActions";

function* loginSaga(action) {
    try {
        const data = yield call(Api.tryLogin, action.loginData);
        const user = {...data.user, authenticationToken: data.authenticationToken, authenticationTokenExpire: data.authenticationTokenExpire};
        yield put({type: USER_LOGGED, user: user, maindataUrl: data.maindataUrl, statisticsUrl: data.statisticsUrl, serverTimeOffest: data.serverTimeOffest});
    } catch (reason) {
        if (reason === WRONG_PASSWORD) {
            yield put({type: WRONG_PASSWORD, reason: reason});
        } else {
            yield put({type: ERR_CONNECTION_FAILED, reason: reason});
        }
    }
}

function* registerSaga(action) {
    try {
        const data = yield call(Api.registerNewUser, action.loginData);
        const user = {...data.user, authenticationToken: data.authenticationToken, authenticationTokenExpire: data.authenticationTokenExpire};
        yield put({type: USER_LOGGED, user: user, firstTimeLogin: true, maindataUrl: data.maindataUrl, statisticsUrl: data.statisticsUrl, serverTimeOffest: data.serverTimeOffest});
    } catch (reason) {
        if (reason === ACCOUNT_EXISTS_ALREADY) {
            yield put({type: ACCOUNT_EXISTS_ALREADY, reason: reason});
        } else {
            yield put({type: ERR_CONNECTION_FAILED, reason: reason});
        }
    }
}

function* fetchMainDataSaga(action) {
    try {
        const maindataUrl = yield select(selectors.maindataUrl);
        const mainData = yield call(Api.fetchMainData,maindataUrl);
        yield put({type: MAIN_DATA_FETCH_SUCCESS, mainData: mainData});
    } catch (reason) {
        yield put({type: MAIN_DATA_FETCH_ERROR, reason: reason});
    }
}

function* fetchRanksDataSaga(action) {
    try {
        const statisticsUrl = yield select(selectors.statisticsUrl);
        const data = yield call(Api.fetchRanksData,statisticsUrl);
        yield put({type: RANKS_DATA_FETCH_SUCCESS, data: data});
    } catch (reason) {
        yield put({type: RANKS_DATA_FETCH_ERROR, reason: reason});
    }
}

function* fetchUserProfileDataSaga(action) {
    try {
        const authToken = yield select(selectors.authenticationToken);
        const data = yield call(Api.fetchUserProfile, authToken);
        yield put({type: USER_PROFILE_DATA_FETCH_SUCCESS, data: data});
    } catch (reason) {
        yield put({type: USER_PROFILE_DATA_FETCH_ERROR, reason: reason});
    }
}

function* updateUserProfileDataSaga(action) {
    try {
        action.authenticationToken = yield select(selectors.authenticationToken);
        const user = yield select(selectors.currentUser);
        action.userUpdateData.eid = user.eid;
        const data = yield call(Api.updateUserProfile, action);
        yield put({type: USER_PROFILE_DATA_UPDATE_SUCCESS, data: data});
    } catch (reason) {
        yield put({type: USER_PROFILE_DATA_UPDATE_ERROR, reason: reason});
    }
}

function* fetchRiddleSaga(action) {
    try {
        let countDown = 20;
        while (true) {
            try {
                const data = yield call(Api.fetchRiddle, action.riddleUrl);

                yield put({type: RIDDLE_FETCH_SUCCESS, data: data});
                break;
            } catch (reason) {
                if( countDown <= 0 ) {
                    break;
                }
                if( reason === 403 || reason === 404 ){
                    countDown--;
                    yield delay(1000)
                } else {
                    yield put({type: RIDDLE_FETCH_ERROR, reason: reason});
                    break;
                }
            }
        }

        if( countDown <= 0 ) {
            yield put({type: RIDDLE_FETCH_ERROR, reason: 404});
        }
    } catch (reason) {
        yield put({type: RIDDLE_FETCH_ERROR, reason: reason});
    }
}

function* fetchRiddleResultSaga(action) {
    try {
        const resultsUrl = yield select(selectors.resultsUrl, action.riddleId);
        const data = yield call(Api.fetchRiddleResults, resultsUrl);

        yield put({type: RIDDLE_RESULT_FETCH_SUCCESS, data: data});
    } catch (reason) {
        yield put({type: RIDDLE_RESULT_FETCH_ERROR, reason: reason});
    }
}

function* sendRiddleAnswerSaga(action) {
    try {
        const data = yield call(Api.sendRiddleAnswer, action.data);

        yield put({type: SEND_ANSWER_SEND, data: data});
    } catch (reason) {
        yield put({type: SEND_ANSWER_ERROR, reason: reason});
    }
}

function* registerUserToRiddleSaga(action) {
    try {
        const authenticationToken = yield select(selectors.authenticationToken);
        const data = yield call(Api.registerUserToRiddle, authenticationToken, action.data);

        if(data.status === 200 && data.user && data.riddleUrl) {
            yield put({type: USER_REGISTERED_TO_RIDDLE_SUCCESS,
                data: data.user, riddleUrl: data.riddleUrl, riddleId: action.data.riddleId, serverTimeOffest: data.serverTimeOffest});
        } else if(data.status === 403) {
            yield put({type: USER_REGISTERED_TO_RIDDLE_NOT_ENOUGH_CREDITS});
        } else {
            yield put({type: USER_REGISTERED_TO_RIDDLE_ERROR, reason: data.status});
        }
    } catch (reason) {
        yield put({type: USER_REGISTERED_TO_RIDDLE_ERROR, reason: reason});
    }
}

function* verifyEmailTokenSaga(action) {
    try {
        yield call(Api.verifyUserEmail, action.token );

        yield put({type: VERIFY_TOKEN_SUCESS});
    } catch (reason) {
        yield put({type: VERIFY_TOKEN_ERROR, reason: reason});
    }
}

function* sendUserVerificationEmailSaga(action) {
    try {
        yield call(Api.sendUserVerificationEmail, action);
    } catch (reason) {
    }
}

function* resetPasswordSaga(action) {
    try {
        yield call(Api.sendResetPasswordEmail, action.resetPasswordData);
    } catch (reason) {
        if (reason) {
            yield put({type: ERR_CONNECTION_FAILED, reason: reason});
        }
    }
}

function* changePasswordSaga(action) {
    try {
        yield call(Api.changeUserPassword, action);
        yield put({type: CHANGE_PASSWORD_TOKEN_SUCESS});
    } catch (reason) {
        yield put({type: CHANGE_PASSWORD_TOKEN_ERROR, reason: reason});
    }
}

function* buyCreditRequestSaga(action) {
    try {
        const authToken = yield select(selectors.authenticationToken);
        const data = yield call(Api.buyCreditRequest, authToken, action.creditsPlanCode, action.userPhoneNo);

        yield put({type: BUY_CREDITS_REQUEST_SUCCESS, data: data.user});
    } catch (reason) {
        yield put({type: BUY_CREDITS_REQUEST_ERROR, reason: reason});
    }
}

function* dismissPaymentRequestSaga(action) {
    try {
        const authToken = yield select(selectors.authenticationToken);
        const currentPaymentTransactionId = yield select(selectors.currentPaymentTransactionId);
        const data = yield call(Api.dismissPaymentRequest, authToken, currentPaymentTransactionId);

        yield put({type: DISMISS_PAYMENT_SUCCESS, data: data.user});
    } catch (reason) {
        yield put({type: DISMISS_PAYMENT_ERROR, reason: reason});
    }
}

function* verifyPaymentRequestSaga(action) {
    try {
        let countDown = 12;
        while (true) {
            const authenticationToken = yield select(selectors.authenticationToken);
            const data = yield call(Api.fetchUserProfile, authenticationToken);
            yield put({type: USER_PROFILE_DATA_FETCH_SUCCESS, data: data});

            const payment = data.currentCreditPlan && data.currentCreditPlan.payment;
            if(payment && payment.transactionId === action.paymentId){

                if (payment.statusCode === 'success') {
                    yield put({type: PAYMENT_VERIFY_STATUS_SUCCESS});
                    break;
                }
                
                if(payment.statusCode === 'error') {
                    yield put({type: PAYMENT_VERIFY_STATUS_ERROR, reason: 'error'});
                    break;
                }
            }

            if( countDown <= 0 ) {
                break;
            }

            countDown--;
            yield delay(5000)
        }

        if( countDown <= 0 ) {
            yield put({type: PAYMENT_VERIFY_STATUS_POSPONED});
        }

    } catch (reason) {
        yield put({type: PAYMENT_VERIFY_STATUS_ERROR, reason: reason});
    }
}

function* mySaga() {
    yield takeLatest(TRY_LOGIN, loginSaga);
    yield takeLatest(REGISTER_USER, registerSaga);
    yield takeLatest(MAIN_DATA_FETCH_REQUEST, fetchMainDataSaga);
    yield takeLatest(RIDDLE_FETCH_REQUEST, fetchRiddleSaga);
    yield takeLatest(RIDDLE_RESULT_FETCH_REQUEST, fetchRiddleResultSaga);
    yield takeLatest(RANKS_DATA_FETCH_REQUEST, fetchRanksDataSaga);
    yield takeLatest(USER_STATS_DATA_FETCH_REQUEST, fetchUserProfileDataSaga);
    yield takeLatest(USER_PROFILE_DATA_FETCH_REQUEST, fetchUserProfileDataSaga);
    yield takeLatest(USER_PROFILE_DATA_UPDATE_REQUEST, updateUserProfileDataSaga);
    yield takeLatest(SEND_ANSWER_REQUEST, sendRiddleAnswerSaga);
    yield takeLatest(USER_REGISTERED_TO_RIDDLE_REQUEST, registerUserToRiddleSaga);
    yield takeLatest(VERIFY_TOKEN_REQUEST, verifyEmailTokenSaga);
    yield takeLatest(SEND_VERIFICATION_EMAIL, sendUserVerificationEmailSaga);
    yield takeLatest(BUY_CREDITS_REQUEST, buyCreditRequestSaga);
    yield takeLatest(DISMISS_PAYMENT_REQUEST, dismissPaymentRequestSaga);
    yield takeLatest(PAYMENT_VERIFY_STATUS_REQUEST, verifyPaymentRequestSaga);
    yield takeLatest(RESET_PASSWORD_ACTION, resetPasswordSaga);
    yield takeLatest(CHANGE_PASSWORD_ACTION, changePasswordSaga);
}

export default mySaga;