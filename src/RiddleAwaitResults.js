import React from 'react';
import RiddleWaitingForResults from "./RiddleWaitingForResults";
import RiddleFinishTime from "./RiddleFinishTime";
import RiddleNumber from "./RiddleNumber";
import NotificationService from "./NotificationService";

function RiddleAwaitResultLayout (props) {

    NotificationService.promiseRequireNotification();

    return(<div className="container white-bg panel-padding" >
        <RiddleNumber value={ props.riddleNo }/>
        <RiddleFinishTime value={props.riddleEndDate}/>
        <div className="col-xs-12 hr-placeholder" />
        <div className="col-xs-12 riddle r38">Zagadka Zakończona</div>
        <div className="col-xs-12 hr-placeholder" />
        <RiddleWaitingForResults />
        <div className="col-xs-12 hr-placeholder" />
    </div>);
}


export default RiddleAwaitResultLayout;
