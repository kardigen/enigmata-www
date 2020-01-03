import idx from 'idx'
import React from 'react'

function RiddleResultUserStatistics (props) {

    const userRegistered = idx(props.user,_=>_.riddleAgreements[props.riddleId]) !== undefined;
    if( userRegistered ) {
        const userRankRseults = props.results && props.results.filter( (result) => {
            return result.eid === props.user.eid
        });
        const userRank = userRankRseults && userRankRseults.length > 0 && userRankRseults[0];

        let resultQuote = "";
        const rankNo = (userRank && userRank.rankNo) || 101;
        const correctAnswer = props.user.userStatistics.correctAnswerRiddleIds.filter((id) => id === props.riddleId).length === 1;
        const wonPrize = (userRank && userRank.prize) || 0;
        const wonPoints = (userRank && userRank.points) || (correctAnswer ? 5 : 0);

        if (rankNo === 1) {
            resultQuote = <span>Brawo! Wygrałeś główną nagrodę</span>
        } else if (rankNo > 1 && rankNo <= 100) {
            resultQuote = <span>Brawo! Osiągnąłeś {rankNo} miejsce w rankingu</span>
        } else if (correctAnswer) {
            resultQuote = <span>Brawo! Zdobyłeś 5 punktów</span>
        } else {
            resultQuote = <span>Spróbuj jeszcze raz</span>
        }

        return (
            <section className="col-xs-12 pt-2">
                <div className="keyline text-center"><h2>{resultQuote}</h2></div>
                <div className="">
                    <h4 className="space-left">Wygrana: {wonPrize} zł</h4>
                    <h4 className="space-left">Ilość punktów: {wonPoints}</h4>
                </div>
            </section>
        )
    }

    return(null);
}

export default RiddleResultUserStatistics;