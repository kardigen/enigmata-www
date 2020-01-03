import React from 'react'
import LockedRiddlePanel from './LockedRiddlePanel';
import FutureRiddlePanel from './FutureRiddlePanel';
import PastRiddlePanel from './PastRiddlePanel';
import CurrentRiddlePanel from './CurrentRiddlePanel';

function RiddleListLayout( props ) {

    const riddleRows = props.riddles.map( (riddle, idx) => {
        if (riddle.locked) {
            return <LockedRiddlePanel key={idx} riddle={riddle} />
        } else if (riddle.category === 'past') {
            return <PastRiddlePanel key={idx} riddle={riddle} />
        } else if (riddle.category === 'current') {
            return <CurrentRiddlePanel key={idx} riddle={riddle} />
        } else if (riddle.category === 'future') {
            return <FutureRiddlePanel key={idx} riddle={riddle} />
        }
        return (null)
    }).reduce((prev,cur,idx) => {return [prev,<div key={-idx-1} className="hr" />,cur]},[]);
    return (
        <section>
            {riddleRows}
        </section>);
}


export default RiddleListLayout;
