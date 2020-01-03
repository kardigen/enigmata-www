import React from 'react'
import DateTimeFormatter from './DateTimeFormatter'
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import idx from "idx"
import {saveRiddleListY} from "./HomeAction";

function PastRiddlePanel(props) {
    const riddle = props.riddle;

    const redirect = () => {
        props.dispatch(saveRiddleListY(window.pageYOffset));
        props.history.push("/riddle/" + riddle.riddleHashId);
    };

    if (props.isMobile) {
        let paidRiddleMobileHeader = "";
        if (riddle.creditsCost > 0) {
            paidRiddleMobileHeader =
                <div className="col-xs-12 paid-riddle-mobile-header r18">NAGRODA PIENIĘŻNA {riddle.winPrize}ZŁ</div>
        }

        return (
            <div key={riddle.riddleId} className="visible-xs-block row darkish-bg out-list-padding past-riddle" data-riddle-last-finished={riddle.lastFinished}>
                {paidRiddleMobileHeader}
                <div className="col-sm-4 col-xs-12">
                    <div className="col-xs-6 col-md-6 col-sm-12 in-list">
                        <div className="one-line">
                            <p>start</p>
                            <p className="riddle-time">{DateTimeFormatter.timeFormat(riddle.startDate)}</p>
                        </div>
                    </div>
                    <div className="col-xs-6 col-md-6 col-sm-12 in-list">
                        <div className="one-line">
                            <p>koniec</p>
                            <p className="riddle-time">{DateTimeFormatter.timeFormat(riddle.endDate)}</p>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-4 col-md-3 col-lg-5 vl">
                    <div className="col-xs-12 col-lg-6 in-list">
                        <div className="one-line riddle-status space-left">
                            Zakończona
                        </div>
                    </div>
                    <div className="col-xs-12 col-lg-6 in-list">
                        <div className="one-line game-nbr">Numer gry: {riddle.riddleNo}</div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-4 col-md-5 col-lg-3">
                    <div className="button-wrapper">
                        <button onClick={(e) => {
                            redirect();
                        }} className="btn-enigmata">Zobacz odpowiedź
                        </button>
                    </div>
                </div>
            </div>
        )
    } else { // desktop
        let paidRiddleDesktopHeader = "";
        let paidRiddleDesktopDescription = "";
        if (riddle.creditsCost > 0) {
            paidRiddleDesktopHeader = <div className="riddle-paid-desktop-header"/>;
            paidRiddleDesktopDescription =
                <div className="riddle-paid-desktop-description r18">NAGRODA PIENIĘŻNA {riddle.winPrize}ZŁ</div>;
        }

        return (
            <div key={riddle.riddleId}
                 className="hidden-xs row darkish-bg out-list-padding past-riddle riddle-desktop-panel" data-riddle-last-finished={riddle.lastFinished}>
                {paidRiddleDesktopHeader}
                <div className="col-sm-3">
                    {paidRiddleDesktopDescription}
                    <div className="in-list">
                        <div className="riddle-status">
                            Zakończona
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="col-md-6 col-sm-12 in-list">
                        <div className="one-line">
                            <p>start</p>
                            <p className="riddle-time">{DateTimeFormatter.timeFormat(riddle.startDate)}</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 in-list">
                        <div className="one-line">
                            <p>koniec</p>
                            <p className="riddle-time">{DateTimeFormatter.timeFormat(riddle.endDate)}</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-2 vl">
                    <div className="in-list">
                        <div className="game-nbr">Numer gry: {riddle.riddleNo}</div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="button-wrapper">
                        <button onClick={(e) => {
                            redirect();
                        }} className="btn-enigmata">Zobacz odpowiedź
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isMobile: idx(state, _ => _.browser.lessThan.medium)
    };
}

export default withRouter(connect(mapStateToProps)(PastRiddlePanel));