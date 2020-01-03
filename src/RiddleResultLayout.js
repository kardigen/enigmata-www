import React from 'react'
import RiddleQuestion from "./RiddleQuestion";
import RiddleFinishTime from "./RiddleFinishTime";

import RiddleResultUserStatistics from "./RiddleResultUserStatistics";
import RiddleResultsList from "./RiddleResultsList";
import RiddleNumber from "./RiddleNumber";
import RiddleOpenDate from "./RiddleOpenDate";

function RiddleResultLayout (props) {
    return(
        <div className="container white-bg panel-padding" >
            <section>
            <RiddleNumber value={ props.riddle.riddleNo }/>
            <RiddleOpenDate value={ props.riddle.startDate }/>
            <RiddleQuestion value={ props.riddle.question }/>
            <RiddleFinishTime value={props.riddle.endDate}/>
            </section>
            <section>
            <div id="show-result-button-id" className="col-xs-12 button-wrapper mt-3 mb-2">
                <button type="button" className="btn-enigmata" onClick={ (e)=>{
                    window.jQuery('#show-result-button-id').hide();
                    window.jQuery('#show-results-id').show('slow');
                }} >Zobacz rozwiązanie</button>
            </div>
            </section>
            <section id="show-results-id" style={{display: 'none'}}>
                <div className="col-md-12 one-line text-left r14 mt-3">Poprawna odpowiedź:</div>
                <div className="col-xs-12 right-answer r32">{props.riddle.answer}</div>
                <RiddleResultUserStatistics results={props.riddle.results} user={props.user} riddleId={props.riddle.riddleId}/>
                <RiddleResultsList results={props.riddle.results} user={props.user} riddle={props.riddle}/>
            </section>
        </div>);
}

export default RiddleResultLayout;