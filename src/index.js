/* eslint-disable import/first */
import React from 'react';
import ReactDOM from 'react-dom';
import AppController from "./App";
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import appReducers from "./reducers";
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas'
import {responsiveStoreEnhancer} from 'redux-responsive'

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;


let state = {riddles: [], user: {}, view: {}};

let serializedState = null;
try { //deserialize lst state
    serializedState = localStorage.getItem('appState');
    const persistedData = JSON.parse(serializedState);

    state = persistedData.state;
    // // if last update is valid and was today - use persisted state
    // if (persistedData.updateDate && Math.floor(persistedData.updateDate / DAY) === Math.floor(Date.now() / DAY)) {
    //
    //
    //     state = persistedData.state;
    //
    //     // if update was more then one hour ago - invalidate all data beside user data
    //     if (persistedData.updateDate >= Date.now() - HOUR) {
    //
    //
    //     } else {
    //         state.user = persistedData.state.user;
    //         state.system = persistedData.state.system;
    //         //invalidate rest
    //     }
    // }
} catch (e) {
}

const actionStateEnchancer = store => next => action => {
    return next({ ...action, _state: store.getState()});
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    appReducers,
    state,
    compose(
        responsiveStoreEnhancer,
        applyMiddleware(sagaMiddleware, actionStateEnchancer)
    ));

store.subscribe(() => {
    try {
        const exclude = {view:{verification:{}}};
        const stateToSave = {...store.getState(),...exclude};
        localStorage.setItem('appState', JSON.stringify({state: stateToSave, updateDate: Date.now()}));
    } catch (e) {
    }
});

sagaMiddleware.run(mySaga);

ReactDOM.render(
    <Provider store={store}>
        <AppController/>
    </Provider>,
    document.getElementById('appRoot')
);


