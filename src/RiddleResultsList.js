import React from 'react';
import DateTimeFormatter from './DateTimeFormatter';

const ID = "riddle-show-results-id";

function RiddleResultsList(props) {

    const rows = (props.results) ? props.results
        .sort((a, b) => {
            return a.rankNo - b.rankNo;
        })
        .map((result) => {
            return (
                <div key={result.rankNo} className="stats-row row">
                    <div className="col-xs-1 user-rank-no">{result.rankNo}</div>
                    <div className="col-xs-11 row data-row">
                        <div className="col-xs-12 col-sm-3 out-stat-header">
                            {result.nick}
                        </div>
                        <div className="col-xs-4 col-sm-3">
                            <div className="in-stat-list points text-center">
                                {result.points}
                            </div>
                        </div>
                        <div className="col-xs-4 col-sm-3">
                            <div className="in-stat-list answers text-center">
                                {DateTimeFormatter.timeSecondFormat(result.correctAnswerTime)}
                            </div>
                        </div>
                        <div className="col-xs-4 col-sm-3">
                            <div className="in-stat-list times text-center">
                                {result.allAnswers - 1}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }) : [];


    return (
        <div id={ID} className="col-xs-12 pt-2">

            <section className="mt-2">
                <div className="keyline"><h3>Ranking odpowiedzi</h3></div>
                <div className="mt-2">
                    <div className="stats-row row">
                        <div className="col-xs-1 user-rank-no">#</div>
                        <div className="col-xs-11 row data-row">
                            <div className="col-xs-12 col-sm-3 out-stat-header">
                                Gracz
                            </div>
                            <div className="col-xs-4 col-sm-3">
                                <div className="result-header-in-list points text-center">
                                    Zdobyte punkty
                                </div>
                            </div>
                            <div className="col-xs-4 col-sm-3 r14">
                                <div className="result-header-in-list answers text-center">
                                    Godzina poprawnej odpowiedzi
                                </div>
                            </div>
                            <div className="col-xs-4 col-sm-3 r14">
                                <div className="result-header-in-list times text-center">
                                    Ilość błędnych odpowiedzi
                                </div>
                            </div>
                        </div>
                    </div>
                    {rows}
                </div>
            </section>
        </div>)
}

RiddleResultsList.ID = ID;

export default RiddleResultsList;