import React from 'react';
import DateTimeFormatter from './DateTimeFormatter'

function RiddleFinishTime (props) {
    return (
        <div className="col-xs-12 one-line text-right">
            <p>KONIEC GRY: <strong>{DateTimeFormatter.timeFormat(props.value)}</strong></p>
        </div>);
}

export default RiddleFinishTime;
