import React from 'react'
import DateTimeFormatter from "./DateTimeFormatter";
import {withRouter} from "react-router-dom";

function RankingsLayout(props) {
    const stats = props.statistics || {};
    const startRange = props.pageNo * 100;
    const endRange = props.pageNo * 100 + 100;

    const stats7Days = (stats.stats7Days || [])
        .slice(startRange,endRange)
        .map((item) => {
            return (
                <div key={item.rankNo} className="stats-row row">
                    <div className="col-xs-1 user-rank-no">{item.rankNo}</div>
                        <div className="col-xs-11 row data-row">
                            <div className="col-xs-12 col-sm-3 out-stat-header">
                                {item.nick}
                            </div>
                        <div className="col-xs-4 col-sm-3">
                            <div className="in-stat-list points text-center">
                                {item.last7DaysPoints}
                            </div>
                        </div>
                        <div className="col-xs-4 col-sm-3">
                            <div className="in-stat-list answers text-center">
                                {item.allRiddleCorrectAnswers}
                            </div>
                        </div>
                        <div className="col-xs-4 col-sm-3">
                            <div className="in-stat-list times text-center">
                                {DateTimeFormatter.formatTimeRange(item.averageCorrectAnswerTime)}
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    const stats30Days = (stats.stats30Days || [])
        .slice(startRange,endRange)
        .map((item) => {
            return (
                <div key={item.rankNo} className="stats-row row">
                    <div className="col-xs-1 user-rank-no">{item.rankNo}</div>
                    <div className="col-xs-11 row data-row">
                        <div className="col-xs-12 col-sm-3 out-stat-header">
                            {item.nick}
                        </div>
                        <div className="col-xs-4 col-sm-3">
                            <div className="in-stat-list points text-center">
                                {item.last30DaysPoints}
                            </div>
                        </div>
                        <div className="col-xs-4 col-sm-3">
                            <div className="in-stat-list answers text-center">
                                {item.allRiddleCorrectAnswers}
                            </div>
                        </div>
                        <div className="col-xs-4 col-sm-3">
                            <div className="in-stat-list times text-center">
                                {DateTimeFormatter.formatTimeRange(item.averageCorrectAnswerTime)}
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    const statsAllDays = (stats.statsAllDays || [])
        .slice(startRange,endRange)
        .map((item) => {
            return (
                <div key={item.rankNo} className="stats-row row">
                    <div className="col-xs-1 user-rank-no">{item.rankNo}</div>
                    <div className="col-xs-11 row data-row">
                        <div className="col-xs-12 col-sm-3 out-stat-header">
                            {item.nick}
                        </div>
                        <div className="col-xs-4 col-sm-3">
                            <div className="in-stat-list points text-center">
                                {item.points}
                            </div>
                        </div>
                        <div className="col-xs-4 col-sm-3">
                            <div className="in-stat-list answers text-center">
                                {item.allRiddleCorrectAnswers}
                            </div>
                        </div>
                        <div className="col-xs-4 col-sm-3">
                            <div className="in-stat-list times text-center">
                                {DateTimeFormatter.formatTimeRange(item.averageCorrectAnswerTime)}
                            </div>
                        </div>
                    </div>
                </div>
            );
        });

    const showNext = (stats.stats7Days || []).length > endRange;
    const showPrevious = props.pageNo > 0;
    const nextPage = () => {
        props.history.push("/statistics/" + (props.pageNo + 1));
    };
    const previousPage = () => {
        props.history.push("/statistics/" + (props.pageNo - 1));
    };

    let updateDateString = "";
    const dateCreated = stats.creationDate;
    if (dateCreated) {
        updateDateString = "Ranking odświeżony: " + DateTimeFormatter.dateTimeFormat(dateCreated);
    }

    return (<React.Fragment>
        <div className="col-xs-12 pad-l-25">
            <ul className="nav nav-tabs" role="tablist">
                <li role="presentation" className="col-xs-4 active" >
                    <button className="btn-tab" data-toggle="tab" data-target="#statsLast7Days">
                        Ranking 7 dni
                    </button>
                </li>
                <li role="presentation" className="col-xs-4">
                    <button className="btn-tab" data-toggle="tab" data-target="#statsLast30Days">
                        Ranking 30 dni
                    </button>
                </li>
                <li role="presentation" className="col-xs-4">
                    <button className="btn-tab" data-toggle="tab" data-target="#statsAllDays">
                        Ranking ogólny
                    </button>
                </li>
            </ul>
        </div>
        <div className="col-xs-12 white-bg panel-padding">
            <div className="col-xs-12 button-wrapper r24">
                {showPrevious && <button className="btn-link" onClick={previousPage}>
                    <span className="glyphicon glyphicon glyphicon-backward" aria-hidden="true" /></button>}
                {startRange + 1} do {endRange}
                {showNext && <button className="btn-link" onClick={nextPage}>
                    <span className="glyphicon glyphicon glyphicon-forward" aria-hidden="true" />
                </button>}
            </div>
            <div className="tab-content mb-2">
                <div role="tabpanel" className="tab-pane active" id="statsLast7Days">
                    <div className="stats-row row">
                        <div className="col-xs-1 user-rank-no">#</div>
                        <div className="col-xs-11 row data-row">
                            <div className="col-xs-12 col-sm-3 out-stat-header">
                                <div className="in-stat-header">Twoja pozycja: {props.userRankings.last7DaysRankNo}</div>
                            </div>
                            <div className="col-xs-4 col-sm-3">
                                <div className="in-stat-list points text-center">
                                    punkty
                                </div>
                            </div>
                            <div className="col-xs-4 col-sm-3">
                                <div className="in-stat-list answers text-center">
                                    odpowiedzi
                                </div>
                            </div>
                            <div className="col-xs-4 col-sm-3">
                                <div className="in-stat-list times text-center">
                                    czas odpowiedzi
                                </div>
                            </div>
                        </div>
                    </div>
                    {stats7Days}
                </div>
                <div role="tabpanel" className="tab-pane" id="statsLast30Days">
                    <div className="stats-row row">
                        <div className="col-xs-1 user-rank-no">#</div>
                        <div className="col-xs-11 row data-row">
                            <div className="col-xs-12 col-sm-3 out-stat-header">
                                <div className="in-stat-header">Twoja pozycja: {props.userRankings.last30DaysRankNo}</div>
                            </div>
                            <div className="col-xs-4 col-sm-3">
                                <div className="in-stat-list points text-center">
                                    punkty
                                </div>
                            </div>
                            <div className="col-xs-4 col-sm-3">
                                <div className="in-stat-list answers text-center">
                                    odpowiedzi
                                </div>
                            </div>
                            <div className="col-xs-4 col-sm-3">
                                <div className="in-stat-list times text-center">
                                    czas odpowiedzi
                                </div>
                            </div>
                        </div>
                    </div>
                    {stats30Days}
                </div>
                <div role="tabpanel" className="tab-pane" id="statsAllDays">
                    <div className="stats-row row">
                        <div className="col-xs-1 user-rank-no">#</div>
                        <div className="col-xs-11 row data-row">
                            <div className="col-xs-12 col-sm-3 out-stat-header">
                                <div className="in-stat-header">Twoja pozycja: {props.userRankings.generalRankNo}</div>
                            </div>
                            <div className="col-xs-4 col-sm-3">
                                <div className="in-stat-list points text-center">
                                    punkty
                                </div>
                            </div>
                            <div className="col-xs-4 col-sm-3">
                                <div className="in-stat-list answers text-center">
                                    odpowiedzi
                                </div>
                            </div>
                            <div className="col-xs-4 col-sm-3">
                                <div className="in-stat-list times text-center">
                                    czas odpowiedzi
                                </div>
                            </div>
                        </div>
                    </div>
                    {statsAllDays}
                </div>
            </div>
            <div>
                <div className="col-xs-12 text-right">
                    <p>{updateDateString}</p>
                </div>
            </div>
            <div>
                <div className="col-xs-12 button-wrapper r24">
                    {showPrevious && <button className="btn-link" onClick={previousPage}>
                        <span className="glyphicon glyphicon glyphicon-backward" aria-hidden="true" /></button>}
                    {startRange + 1} do {endRange}
                    {showNext && <button className="btn-link" onClick={nextPage}>
                        <span className="glyphicon glyphicon glyphicon-forward" aria-hidden="true" />
                    </button>}
                </div>
            </div>


        </div>
    </React.Fragment>);
}

export default withRouter(RankingsLayout);