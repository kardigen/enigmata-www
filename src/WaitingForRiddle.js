import React from "react";
import RiddleNumber from "./RiddleNumber";
import InfoModal from './InfoModal'
import RiddleOpenDate from "./RiddleOpenDate";
import DateTimeFormatter from "./DateTimeFormatter";
import idx from "idx/lib/idx";
import {connect} from "react-redux";
import NotificationService from "./NotificationService";

class WaitingForRiddle extends React.Component {

    componentDidMount() {

        window.jQuery('#riddleCountDown').text(DateTimeFormatter.formatTimeRange(this.props.riddleMainData.startDate - (Date.now() + this.props.serverTimeOffset)))

        this.timerId = setInterval(() => {
            window.jQuery('#riddleCountDown').text(DateTimeFormatter.formatTimeRange(this.props.riddleMainData.startDate - (Date.now() + this.props.serverTimeOffset)))
        }, 1000);

        NotificationService.promiseRequireNotification()
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    render() {
        return (<div className="white-bg panel-padding">
            <div className="row">
                <RiddleNumber value={this.props.riddleMainData.riddleId}/>
                <RiddleOpenDate value={this.props.riddleMainData.startDate}/>
            </div>
            <div className='row'>
                <div className='hr'/>
                <div className='text-center'>
                    <p className='r32'>Zagadka zostanie ujawniona za</p>
                    <p id='riddleCountDown' className='r54'>&nbsp;</p>
                </div>
                <div className='hr'/>
            </div>
            <div className='row'>
                <div className='text-center'>
                    <p className='r24'>Poczekaj na rozpoczęcie zagadki.</p>
                </div>
            </div>
            <InfoModal/>
        </div>)
    }
}

function mapStateToProps(state) {
    return {serverTimeOffset: idx(state, _ => _.system.serverTimeOffset) || 0};
}

export default connect(mapStateToProps)(WaitingForRiddle);

