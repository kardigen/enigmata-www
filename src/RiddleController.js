import React from 'react';
import idx from 'idx';
import {connect} from 'react-redux';
import RiddleLayout from './RiddleLayout';
import {fetchRiddle} from "./RiddleActions";
import {parseRiddleHashId} from "./parseRiddleHashId";
import {Redirect} from 'react-router-dom';

import {
    RIDDLE_STAGE_BEFORE_START, RIDDLE_STAGE_FINISHED, RIDDLE_STAGE_INACTIVE, RIDDLE_STAGE_INACTIVE_AFTER_ANSWER,
    RIDDLE_STAGE_STARTED
} from "./RiddleStages";
import {fetchMainData} from "./HomeAction";
import GameRegisterModal from "./GameRegisterModal";
import LockedGameInfoModal from './LockedGameInfoModal';
import WaitingForRiddle from "./WaitingForRiddle";


class RiddleController extends React.Component {

    render() {

        const riddleHashObject = parseRiddleHashId(this.props.riddleHashId);
        if(!riddleHashObject) {
            return (<Redirect to="/"/>);
        }

        const now = Date.now() + this.props.system.serverTimeOffset;

        if (riddleHashObject.riddleId > 0 && riddleHashObject.endDate < now) {
            return (<Redirect to={"/result/" + this.props.riddleHashId}/>);
        }

        const {dispatch} = this.props;
        if (!this.props.riddles || this.props.riddles.length === 0) {
            dispatch(fetchMainData());
        } else {
            const riddleMainData = this.props.riddles.find(riddle => riddle.riddleHashId === this.props.riddleHashId);
            if (riddleMainData) {

                if(riddleMainData.locked){
                    return <LockedGameInfoModal riddle={riddleMainData}/>
                }

                const riddleIdKey = "" + riddleMainData.riddleId;
                const agreementRegistered = idx(this.props,_=>_.riddleAgreements[riddleIdKey]);
                const riddleUrl = idx(this.props,_=>_.riddleUrls[riddleIdKey]);
                if (!agreementRegistered || !riddleUrl) {
                    return <GameRegisterModal riddle={riddleMainData}/>
                }

                if( riddleMainData.startDate > now ){

                    return(<WaitingForRiddle riddleMainData={riddleMainData}/> );
                }

                const currentRiddleHashId = idx(this.props, _ => _.riddle.riddleHashId);
                if (currentRiddleHashId === this.props.riddleHashId) {
                    return (<RiddleLayout view={this.props.view} riddle={this.props.riddle}/>);
                } else {
                    const riddleUrl = idx(this.props,_=>_.riddleUrls[riddleIdKey]);
                    dispatch(fetchRiddle(riddleUrl));
                }
            }
        }

        return (<div id="loading" style={{color: 'white'}} className="r24">Ładuję zagadkę ...</div>);
    }

}

function checkRiddleStage(riddle, answeredAlready, serverTimeOffset) {

    if (riddle.riddleStatus === "finished") {
        return RIDDLE_STAGE_FINISHED;
    }


    if (answeredAlready) {
        return RIDDLE_STAGE_INACTIVE_AFTER_ANSWER;
    }

    const timeNow = Date.now() + serverTimeOffset;
    if (timeNow < riddle.startDate) {
        return RIDDLE_STAGE_BEFORE_START;
    } else if (timeNow < riddle.endDate) {
        return RIDDLE_STAGE_STARTED;
    } else {
        return RIDDLE_STAGE_INACTIVE;
    }
}

function mapStateToProps(state) {

    const currentRiddleId = idx(state,_=>_.currentRiddle.riddleId);
    const serverTimeOffset = idx(state,_=>_.system.serverTimeOffset) || 0;
    const answeredAlready = idx(state,_=>_.user.userStatistics.correctAnswerRiddleIds.includes(currentRiddleId));
    const riddleStage = checkRiddleStage(state.currentRiddle, answeredAlready, serverTimeOffset);
    const riddleView = idx(state,_=>_.view.riddle)

    return {
        riddles: state.riddles,
        riddle: state.currentRiddle,
        user: state.user,
        view: {...riddleView , riddleStage: riddleStage},
        system: state.system,
        riddleUrls: state.user.riddleUrls,
        riddleAgreements: state.user.riddleAgreements
    };
}

export default connect(mapStateToProps)(RiddleController);
