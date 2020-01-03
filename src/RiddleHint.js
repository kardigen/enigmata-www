import React from 'react'

function RiddleHint (props) {

    let hint = "Rozwiązaniem tej zagadki jest hasło składające się z ";

    let andSeparatorNeeded = false;
    if(props.hints.words ) {
        if( props.hints.words > 1) {
            hint += "" + props.hints.words + " wyrazów"
        } else {
            hint += "1 wyrazu"
        }

        andSeparatorNeeded = true;
    }

    if(props.hints.numbers !== undefined) {
        if( props.hints.numbers > 1) {
            hint += (andSeparatorNeeded ? " oraz " : "") + props.hints.numbers + " liczb"
        }else {
            hint += (andSeparatorNeeded ? " oraz " : "") + "1 liczby"
        }

        andSeparatorNeeded = true;
    }

    hint += ".";

    return(
        <p>{hint}</p>
    )
}

export default RiddleHint;