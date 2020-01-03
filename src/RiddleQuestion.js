import React from 'react';

function RiddleQuestion(props){

    let riddleStyleName = "col-xs-12 riddle";

    if(props.value.length <= 40) {
        riddleStyleName += " r54";
    } else if(props.value.length <= 115) {
        riddleStyleName += " r38";
    } else if(props.value.length <= 140) {
        riddleStyleName += " r32";
    } else {
        riddleStyleName += " r24";
    }

    return(
        <div className={riddleStyleName} >{props.value}</div>
    )
}

export default RiddleQuestion;