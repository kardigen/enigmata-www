import React from 'react';
import idx from 'idx';
import { connect } from 'react-redux';
import DateTimeFormatter from "./DateTimeFormatter";
import {setTimerMinuteTick} from "./TimerActions";

import {logout} from "./LoginActions";

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

class Timer extends React.Component{

    constructor(props){
        super(props);
        this.setTimer = this.setTimer.bind(this);
        this.updateTimer = this.updateTimer.bind(this);
    }

    componentDidMount(){
        const now = Date.now() + this.props.serverTimeOffset;
        const minuteDate = this.getMinuteDate(now);

        const { dispatch } = this.props;
        dispatch(setTimerMinuteTick(minuteDate));
    }

    setTimer() {
        this.timerObject = window.jQuery(".navbar-clock");
        if(this.intervalHandle){
            clearInterval(this.intervalHandle);
            this.intervalHandle = null;
        }

        this.intervalHandle = setInterval(this.updateTimer, 1000);
    }

    getMinuteDate(time){
        return Math.floor(time / 60000) * 60000;
    }

    updateTimer() {
        const now = Date.now() + this.props.serverTimeOffset;
        if(this.timerObject) {
            this.timerObject.text(DateTimeFormatter.timeFormat(now));
        }

        const { dispatch } = this.props;

        if(this.props.authenticated
            && (!this.props.authenticationTokenExpire
                || this.props.authenticationTokenExpire && now > this.props.authenticationTokenExpire)){
            dispatch(logout());
            return;
        }

        const minuteDate = this.getMinuteDate(now);
        if(minuteDate > this.props.oneMinuteTick) {
            dispatch(setTimerMinuteTick(minuteDate));
        }
    }

    render(){
        this.setTimer();
        return (null);
    }
}

function mapStateToProps(state) {
    return { serverTimeOffset: idx(state, _=>_.system.serverTimeOffset) || 0,
        oneMinuteTick: idx(state, _=>_.system.oneMinuteTick) , authenticationTokenExpire: idx(state, _=>_.user.authenticationTokenExpire), authenticated: idx(state, _=>_.user.authenticated)
    };
}

export default connect(mapStateToProps)(Timer);