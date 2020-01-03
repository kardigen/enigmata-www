import React from 'react';

function RiddleNumber(props) {
    return(
        <div className="col-xs-12 col-sm-6 one-line riddle-number">
            <h2>Zagadka</h2><p>nr {props.value}</p>
        </div>
    )
}

export default RiddleNumber;
