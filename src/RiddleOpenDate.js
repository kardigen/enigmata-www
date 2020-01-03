import React from 'react';
import DateTimeFormatter from './DateTimeFormatter';

function RiddleOpenDate(props) {
    return(
        <div className="col-xs-12 col-sm-6 one-line text-right">
            <p>data otwarcia: {DateTimeFormatter.timeFormat(props.value)}</p>
        </div>
    )
}

export default RiddleOpenDate;