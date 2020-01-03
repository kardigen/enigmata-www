import React from 'react';
import RiddleNumber from './RiddleNumber';
import RiddleOpenDate from './RiddleOpenDate';
import RiddleQuestion from './RiddleQuestion';
import RiddleFinishTime from './RiddleFinishTime';
import RiddleAnswerForm from './RiddleAnswerForm';
import RiddleHint from './RiddleHint';
import RiddleType from './RiddleType';
import RiddleWaitingForResults from './RiddleWaitingForResults';
import RiddleCorrectAnswerConfirmation from './RiddleCorrectAnswerConfirmation'
import InfoModal from './InfoModal';
import {
    RIDDLE_STAGE_INACTIVE,
    RIDDLE_STAGE_INACTIVE_AFTER_ANSWER,
    RIDDLE_STAGE_STARTED
} from "./RiddleStages";
import NotificationService from "./NotificationService";

function RiddleLayout (props){

    let body = <div/>;

    if(props.view.riddleStage === RIDDLE_STAGE_STARTED) {
        body =  <React.Fragment>
                    <RiddleQuestion value={ props.riddle.question }/>
                    <RiddleFinishTime value={props.riddle.endDate}/>
                    <div className="col-xs-12">
                        <RiddleHint hints={props.riddle.hints}/>
                        <RiddleType riddleType={props.riddle.riddleType}/>
                    </div>
                    <RiddleAnswerForm />
                </React.Fragment>

    } else if(props.view.riddleStage === RIDDLE_STAGE_INACTIVE) {
        NotificationService.promiseRequireNotification()

        body =  <React.Fragment>
                    <RiddleQuestion value={ props.riddle.question }/>
                    <RiddleFinishTime value={props.riddle.endDate}/>
                    <div className="col-xs-12 hr-placeholder" />
                    <RiddleWaitingForResults />
                    <div className="col-xs-12 hr-placeholder" />
                </React.Fragment>

    } else if (props.view.riddleStage === RIDDLE_STAGE_INACTIVE_AFTER_ANSWER) {
        NotificationService.promiseRequireNotification();

        body =  <React.Fragment>
                    <RiddleCorrectAnswerConfirmation />
                    <RiddleFinishTime value={props.riddle.endDate}/>
                    <div className="col-xs-12 hr-placeholder" />
                    <RiddleWaitingForResults />
                    <div className="col-xs-12 hr-placeholder" />
                </React.Fragment>
    }

    return(<div className="container white-bg panel-padding">
            <InfoModal/>
            <RiddleNumber value={ props.riddle.riddleNo }/>
            <RiddleOpenDate value={ props.riddle.startDate }/>
            {body}
        </div>);
}

export default RiddleLayout;
