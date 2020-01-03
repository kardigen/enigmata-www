import idx from 'idx';
import {ACCOUNT_EXISTS_ALREADY, WRONG_PASSWORD} from "./LoginActions";
import {syncCacheTime, syncAppTime} from "./syncTime";

const HTTP_TIMEOUT = 10000;

export default class Api {

    static sha1(str) {
        // We transform the string into an arraybuffer.
        const buffer = new TextEncoder("utf-8").encode(str);
        return crypto.subtle.digest("SHA-256", buffer).then((hash) => {
            return Api.hex(hash);
        });
    }

    static hex(buffer) {
        const hexCodes = [];
        const view = new DataView(buffer);
        for (let i = 0; i < view.byteLength; i += 4) {
            // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
            const value = view.getUint32(i);
            // toString(16) will give the hex representation of the number without padding
            const stringValue = value.toString(16);
            // We use concatenation and slice for padding
            const padding = '00000000';
            const paddedValue = (padding + stringValue).slice(-padding.length);
            hexCodes.push(paddedValue);
        }

        // Join all the hex strings into one
        return hexCodes.join("");
    }

    static createAuthToHash(login,password){
        // longer string decrease probability of collision
        return login +'$$$@@@$$$' + password + '||!!||' + login +'$$$&&&$$$' + password;
    }

    static tryLogin(loginData) {

        return new Promise((resolve,reject) => {

            const xhr = new XMLHttpRequest();
            xhr.open('POST', process.env.REACT_APP_AWS_API_URL + '/login', true);

            xhr.withCredentials = true;
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.timeout = HTTP_TIMEOUT;

            const validData = idx(loginData,_=>_.login.length) > 3 && idx(loginData,_=>_.password.length) >= 6;

            if (validData) {
                xhr.onloadend = function (e) {
                    try {
                        if (xhr.status === 200) {
                            let authResult;

                            if(process.env.NODE_ENV !== 'development') {
                                authResult = JSON.parse(JSON.parse(xhr.responseText));//prod
                            } else {
                                authResult = JSON.parse(xhr.responseText); // dev
                            }


                            if (authResult.statusCode === 200) {
                                const serverTimeOffest  = syncAppTime(authResult.serverTimestamp);
                                resolve({...authResult, serverTimeOffest});
                            } else {
                                reject(WRONG_PASSWORD);
                            }
                        }
                        else {
                            reject(xhr.status);
                        }
                    } catch (e) {
                        reject(xhr.status);
                    }
                };
                xhr.send(JSON.stringify({"login": loginData.login, "password": loginData.password}));
            } else {
                reject(WRONG_PASSWORD);
            }
        });
    }

    static registerNewUser(loginData) {

        return new Promise((resolve,reject) => {

            const xhr = new XMLHttpRequest();
            xhr.open('POST', process.env.REACT_APP_AWS_API_URL + '/register', true);
            xhr.withCredentials = true;
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.timeout = HTTP_TIMEOUT;

            const validData = idx(loginData,_=>_.login.length) > 3 && idx(loginData,_=>_.password.length) >= 6;

            if (validData) {
                xhr.onloadend = function (e) {
                    try {
                        if (xhr.status === 200) {
                            let authResult;

                            if(process.env.NODE_ENV !== 'development') {
                                authResult = JSON.parse(JSON.parse(xhr.responseText));
                            } else {
                                authResult = JSON.parse(xhr.responseText);
                            }

                            if (authResult.statusCode === 200) {
                                const serverTimeOffest  = syncAppTime(authResult.serverTimestamp);
                                resolve({...authResult, serverTimeOffest});
                            } else {
                                reject(ACCOUNT_EXISTS_ALREADY);
                            }
                        }
                        else {
                            reject(xhr.status);
                        }
                    } catch (e) {
                        reject(xhr.status);
                    }
                };

                        xhr.send(JSON.stringify({"login": loginData.login, "password": loginData.password, nick: loginData.nick}));
            } else {
                reject(WRONG_PASSWORD);
            }
        });
    }


    static fetchMainData(maindataUrl){

        return new Promise( (resolve,reject) => {
            const xhr = new XMLHttpRequest();

            // let requestUrlBase = window.location.protocol + '//' + window.location.host;
            //
            // if(process.env.NODE_ENV !== 'development') {
            //     requestUrlBase = process.env.REACT_APP_BASE_URL
            // }

            xhr.open('GET', maindataUrl, true);

            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Cache-Control", "no-cache");
            xhr.timeout = HTTP_TIMEOUT;
            const sentRequestTime = Date.now();

            xhr.onloadend = (e) => {
                if (e.target.status === 200) {
                    resolve(Api.handleMainDataRequest(e,sentRequestTime));
                } else {
                    reject(e.target.status);
                }
            };

            xhr.send();
        });
    }

    static handleMainDataRequest(e,sentRequestTime){
        const data = JSON.parse(e.target.responseText);
        const returnedDate = e.target.getResponseHeader("date");
        const returnedAge = e.target.getResponseHeader("age");
        const requestTime = Date.now() - sentRequestTime;
        const serverTimeOffset = syncCacheTime(returnedDate,returnedAge,requestTime);
        return {data:data, serverTimeOffset: serverTimeOffset};
    }

    static fetchRanksData(statisticsUrl){

        return new Promise( (resolve,reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', statisticsUrl, true);
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Cache-Control", "no-cache");
            xhr.timeout = HTTP_TIMEOUT;
            const sentRequestTime = Date.now();

            xhr.onloadend = (e) => {
                if (e.target.status === 200) {
                    resolve(Api.handleStatisticsDataRequest(e,sentRequestTime));
                } else {
                    reject(e.target.status);
                }
            };

            xhr.send();
        });
    }

    static fetchUserProfile(authenticationToken) {

        return new Promise( (resolve,reject) => {

            const xhr = new XMLHttpRequest();
            xhr.open('POST',  process.env.REACT_APP_AWS_API_URL + '/userprofile', true);
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Authorization",  authenticationToken);
            xhr.timeout = HTTP_TIMEOUT;

            xhr.onloadend =  (e) => {
                if (e.target.status === 200) {
                    const result = JSON.parse(xhr.responseText);
                    resolve(result);
                }
                else {
                    reject(e.target.status);
                }
            };

            xhr.send(JSON.stringify({}));
        });
    }

    static updateUserProfile(data) {

        return new Promise( (resolve,reject) => {

            const xhr = new XMLHttpRequest();
            xhr.open('POST',  process.env.REACT_APP_AWS_API_URL + '/updateuserprofile', true);
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Authorization",  data.authenticationToken);
            xhr.timeout = HTTP_TIMEOUT;

            xhr.onloadend =  (e) => {
                if (e.target.status === 200) {
                    const result = JSON.parse(xhr.responseText);
                    resolve(result);
                }
                else {
                    reject(e.target.status);
                }
            };

            if(data.userUpdateData.oldPassword && data.userUpdateData.newPassword) {
                const request =  {
                        eid: data.userUpdateData.eid,
                        nick: data.userUpdateData.nick,
                        oldPassword: data.userUpdateData.oldPassword,
                        newPassword: data.userUpdateData.newPassword
                    };

                xhr.send(JSON.stringify(request));
            } else {
                const request ={
                    eid: data.userUpdateData.eid,
                    nick: data.userUpdateData.nick,
                    deleteAccount: data.userUpdateData.deleteAccount,
                    requestPrizePayment: data.userUpdateData.requestPrizePayment
                };

                xhr.send(JSON.stringify(request));
            }
        });
    }

    static handleStatisticsDataRequest(e,sentRequestTime){
        const data = JSON.parse(e.target.responseText);
        const returnedDate = e.target.getResponseHeader("date");
        const returnedAge = e.target.getResponseHeader("age");
        const requestTime = Date.now() - sentRequestTime;
        const serverTimeOffset = syncCacheTime(returnedDate,returnedAge,requestTime);
        return {data:data, serverTimeOffset: serverTimeOffset};
    }


    static handleRiddleRequest(e,sentRequestTime){
        const riddle = JSON.parse(e.target.responseText);
        const returnedDate = e.target.getResponseHeader("date");
        const returnedAge = e.target.getResponseHeader("age");
        const requestTime = Date.now() - sentRequestTime;
        const serverTimeOffset = syncCacheTime(returnedDate,returnedAge,requestTime);
        return { riddle: riddle, serverTimeOffset:serverTimeOffset };
    }


    static fetchRiddleResults(resultsUrl) {

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', resultsUrl, true);
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Cache-Control", "no-cache");
            xhr.timeout = HTTP_TIMEOUT;

            const sentRequestTime = Date.now();
            xhr.onloadend = (e) => {
                if (e.target.status === 200) {
                    resolve(Api.handleRiddleRequest(e, sentRequestTime));
                } else {
                    reject(e.target.status);
                }
            };

            xhr.send();
        });
    }

    static fetchRiddle( riddleUrl ){

        if(!riddleUrl){
            return Promise.reject("Invalid riddle URL provided");
        }

        return new Promise((resolve,reject)=>{
            const xhr = new XMLHttpRequest();
            xhr.open('GET', riddleUrl, true);

            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Cache-Control", "no-cache");
            xhr.timeout = HTTP_TIMEOUT;

            const sentRequestTime = Date.now();
            xhr.onloadend = (e) => {
                if(e.target.status === 200) {
                    resolve(Api.handleRiddleRequest(e,sentRequestTime));
                } else {
                    reject(e.target.status);
                }
            };

            xhr.send();
        });
    }

    static sendRiddleAnswer({riddleId, answer, user} ) {

        return new Promise( (resolve,reject) => {

            const xhr = new XMLHttpRequest();
            xhr.open('POST',  process.env.REACT_APP_AWS_API_URL + '/riddleanswer', true);
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Authorization",  user.authenticationToken);
            xhr.timeout = HTTP_TIMEOUT;

            const request = {
                eid: user.eid,//TODO remove
                riddleId: riddleId,
                riddleAnswer: answer,
                userStatistics: user.userStatistics
            };


            xhr.onloadend =  (e) => {
                if (e.target.status === 200) {
                    const result = JSON.parse(xhr.responseText);
                    resolve(result);
                }
                else {
                    reject(e.target.status);
                }
            };

            xhr.send(JSON.stringify(request));
        });

    }

    static registerUserToRiddle(authToken, data ) {

        return new Promise( (resolve,reject) => {

            const xhr = new XMLHttpRequest();
            xhr.open('POST', process.env.REACT_APP_AWS_API_URL + '/registertoriddle', true);
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Authorization",  authToken);
            xhr.timeout = HTTP_TIMEOUT;

            const request = {
                agreementData: data,
            };

            xhr.onloadend =  (e) => {
                if (e.target.status === 200) {
                    const result = JSON.parse(xhr.responseText);
                    const serverTimeOffest  = syncAppTime(result.serverTimestamp);
                    resolve({...result, serverTimeOffest});
                }
                else {
                    reject(e.target.status);
                }
            };

            xhr.send(JSON.stringify(request));
        });

    }

    static verifyUserEmail(authToken) {

        return new Promise( (resolve,reject) => {

            const xhr = new XMLHttpRequest();
            xhr.open('POST', process.env.REACT_APP_AWS_API_URL + '/verifyemail', true);
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Authorization",  authToken);
            xhr.timeout = HTTP_TIMEOUT;

            xhr.onloadend =  (e) => {
                if (e.target.status === 200) {
                    resolve();
                }
                else {
                    reject(e.target.status);
                }
            };
            xhr.send(JSON.stringify({}));
        });
    }

    static sendUserVerificationEmail(data) {

        return new Promise( (resolve,reject) => {

            const xhr = new XMLHttpRequest();
            xhr.open('POST', process.env.REACT_APP_AWS_API_URL + '/sendverificationemail', true);
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Authorization",  data.authToken);
            xhr.timeout = HTTP_TIMEOUT;

            const request = {
                eid: data.eid,
            };

            xhr.onloadend =  (e) => {
                if (e.target.status === 200) {
                    resolve();
                }
                else {
                    reject(e.target.status);
                }
            };
            xhr.send(JSON.stringify(request));
        });

    }

    static buyCreditRequest(authToken, creditPlanCode, userPhoneNo) {

        return new Promise( (resolve,reject) => {

            const xhr = new XMLHttpRequest();
            xhr.open('POST', process.env.REACT_APP_AWS_API_URL + '/buycredits', true);
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Authorization", authToken);
            xhr.timeout = HTTP_TIMEOUT;

            const request = {
                creditPlanCode: creditPlanCode,
                userPhoneNo: userPhoneNo
            };

            xhr.onloadend =  (e) => {
                if (e.target.status === 200) {
                    const result = JSON.parse(xhr.responseText);
                    resolve(result);
                }
                else {
                    reject(e.target.status);
                }
            };
            xhr.send(JSON.stringify(request));
        });

    }

    static dismissPaymentRequest(authToken, transactionId) {

        return new Promise( (resolve,reject) => {

            const xhr = new XMLHttpRequest();
            xhr.open('POST', process.env.REACT_APP_AWS_API_URL + '/dismisspayment', true);
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Authorization", authToken);
            xhr.timeout = HTTP_TIMEOUT;

            const request = {
                transactionId: transactionId,
            };

            xhr.onloadend =  (e) => {
                if (e.target.status === 200) {
                    const result = JSON.parse(xhr.responseText);
                    resolve(result);
                }
                else {
                    reject(e.target.status);
                }
            };
            xhr.send(JSON.stringify(request));
        });

    }

    static verifyPaymentRequest(authToken, paymentId) {

        return new Promise( (resolve,reject) => {

            const xhr = new XMLHttpRequest();
            xhr.open('POST', process.env.REACT_APP_AWS_API_URL + '/verifypayment', true);
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Authorization", authToken);
            xhr.timeout = HTTP_TIMEOUT;

            const request = {
                paymentId: paymentId,
            };

            xhr.onloadend =  (e) => {
                if (e.target.status === 200) {
                    const result = JSON.parse(xhr.responseText);
                    resolve(result);
                }
                else {
                    reject(e.target.status);
                }
            };
            xhr.send(JSON.stringify(request));
        });

    }

    static sendResetPasswordEmail(resetPasswordData) {

        return new Promise( (resolve,reject) => {

            const xhr = new XMLHttpRequest();
            xhr.open('POST',  process.env.REACT_APP_AWS_API_URL + '/sendresetpasswordemail', true);
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.timeout = HTTP_TIMEOUT;

            const request = {
                login: resetPasswordData.email
            };

            xhr.onloadend =  (e) => {
                if (e.target.status === 200) {
                    resolve();
                }
                else {
                    reject(e.target.status);
                }
            };

            xhr.send(JSON.stringify(request));
        });
    }

    static changeUserPassword(changePasswordData) {
        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();
            xhr.open('POST', process.env.REACT_APP_AWS_API_URL + '/resetpassword', true);
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Authorization", changePasswordData.token);
            xhr.timeout = HTTP_TIMEOUT;

            const validData = idx(changePasswordData, _ => _.password.length) >= 8;

            if (validData) {
                xhr.onloadend = function (e) {
                    if (xhr.status === 200) {
                        resolve();
                    } else {
                        reject(xhr.status);
                    }
                };
                xhr.send(JSON.stringify({newPassword: changePasswordData.password, newTerms: changePasswordData.newTerms}));
            } else {
                reject(WRONG_PASSWORD);
            }
        });
    }

}