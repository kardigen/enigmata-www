import React from 'react'
import DateTimeFormatter from "./DateTimeFormatter";

function StatisticsLayout (props) {
    return (
        <div className="white-bg panel-padding mb-4 pb-4 col-md-offset-2 col-md-8 col-xs-12 statistics">
            <div><h1 className="r36">Twoje Statystyki</h1></div>
            <div className="col-xs-6 vr-md">
                <div className="col-xs-12 hr-md" />
                <div className="col-xs-12 stat-row1">
                    <span className="r24 desc">Wszystkie punkty: </span><span className="r24 value">{props.userStatistics.allPoints}</span>
                </div>
                <div className="col-xs-12 hr-md" />
                <div className="col-xs-12 stat-row1"><span className="r18 desc">Punkty ostatnie 7 dni</span>
                    <span className="r18 value">{props.userStatistics.last7DaysPoints}</span>
                </div>
                <div className="col-xs-12 stat-row1"><span className="r18 desc">Punkty ostatnie 30 dni</span>
                    <span className="r18 value">{props.userStatistics.last30DaysPoints}</span>
                </div>

            </div>
            <div className="col-xs-6 vl-md">

                {/*<div className="col-xs-12 stat-row2"><span className="r18 desc">Suma wygranych</span>*/}
                    {/*<span className="r18 value">{props.userStatistics.prizes} zł</span>*/}
                {/*</div>*/}
                <div className="col-xs-12 stat-row2"><span className="r18 desc">Średni czas odpowiedzi</span>
                    <span className="r18 value">{ DateTimeFormatter.formatTimeRange(props.userStatistics.averageCorrectAnswerTime)}</span>
                </div>
                <div className="col-xs-12 stat-row2"><span className="r18 desc">Wszystkie poprawne odpowiedzi</span>
                    <span className="r18 value">{props.userStatistics.allRiddleCorrectAnswers}</span>
                </div>
            </div>
            <div className="col-xs-12 col-md-6 vl-md">
                <div className="hr" />
                <div className="col-xs-12"><h4 className="r24">Twoje konto</h4></div>
                {/*<div className="stat-row2 col-xs-4 col-md-12"><span className="r18 desc">Wygrane do wypłaty</span>*/}
                    {/*<span className="r18 value">{props.userStatistics.assets} zł</span></div>*/}
                {/*<div className="stat-row2 col-xs-4 col-md-12"><span className="r18 desc">Kredyty do użycia</span>*/}
                    {/*<span className="r18 value">{props.userStatistics.credits}</span></div>*/}
                <div className="stat-row2 col-xs-4 col-md-12"><span className="r18 desc">Punkty do użycia</span>
                    <span className="r18 value">{props.userStatistics.points}</span></div>

            </div>
        </div>);
}

export default StatisticsLayout;