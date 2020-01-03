import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import idx from "idx";
// import BuyCreditsButton from './BuyCreditsButton';
import Svg from './Svg'
import DateTimeFormatter from "./DateTimeFormatter";
import {TRIAL_ACCOUNT_LOGIN} from "./LoginActions";

const ID = "locked-game-info-modal-id";

class LockedGameInfoModal extends React.Component {

    componentDidMount() {
        window.jQuery('#' + ID).modal({backdrop: "static"});
    }

    render() {

        const riddle = this.props.riddle;
        let creditsSection = "";
        let headSection = "";

        if(this.props.trialMode) {
            headSection =
            <div className="col-sx-12 text-center">
                <h2>Konto Testowe!</h2>
                <p>Tylko niektóre funkcje serwisu są dostępne.<br/>Zarejestruj się by korzystać ze wszystkich funkcji.</p>
                <button type="button" className="btn-enigmata" onClick={()=>{this.props.history.push('/register')}}>
                    Rejestruj się teraz
                </button>
                <div className="col-xs-12 hr"/>
            </div>
        } else if (!this.props.userActivated) {
            creditsSection =
                <div className="col-xs-12 user-credits r18 mt-1 mb-1 modal-content-fix" style={{paddingTop: '15px'}}>
                    <div className="text-center pb-2">
                        <span className="text-warning padl-2">
                            Twoje konto jest nieaktywne.<br/>
                            Aktywuj konto aby brać udział w grze.</span>
                    </div>
                </div>
        } else {
            const notEnoughCreditsOrPoints =
                this.props.userCredits < riddle.creditsCost || this.props.userPoints < riddle.pointsCost;
            if(notEnoughCreditsOrPoints) {

                creditsSection = <div className="col-xs-12 user-credits pb-2 r18 mt-1 mb-1 modal-content-fix" style={{paddingTop: '15px'}}>
                    { this.props.userCredits >= riddle.creditsCost ? null :
                        <article>
                            <div className="text-center">
                                <span className="text-warning">Posiadasz za mało kredytów</span>
                            </div>
                            {/*{ !this.props.userCreditPlan &&*/}
                            {/*<div className="button-wrapper mt-1 mb-1"><BuyCreditsButton /></div>}*/}
                        </article>
                    }
                    { this.props.userPoints >= riddle.pointsCost ? null :
                        <article>
                            <div className="text-center">
                                <span className="text-warning">Posiadasz za mało punktów</span>
                            </div>
                            <div className="text-center">
                                <span className="r14">Graj w inne gry by zdobyć punkty</span>
                            </div>
                        </article>
                    }

                </div>
            }
        }

        const rulesList = riddle.rules.map( (text, idx) => <li key={idx}>{text}</li>);
        const pointsToWin = (riddle.winPointsMax || 0) + (riddle.winPointsRiddleSolve || 0);
        return (
            <div className="modal fade" id={ID} role="dialog">
                <div className="modal-dialog white-bg panel-padding">
                    <h3 className="text-center">Odblokuj grę</h3>
                    <div className="text-center r18 col-xs-12">"{riddle.name}"</div>
                    <div className="col-xs-12 hr-xs"/>
                    {headSection}
                    { riddle.firstStartDate > 0 &&
                        <div className="col-xs-12 r14">{"Następna gra " + DateTimeFormatter.dateFormat(riddle.firstStartDate)}</div>}
                    <div className="col-xs-12 r18">
                        <div className="mt-1 mb-1">
                            <Svg style={{width: '24px', height: '24px', marginRight: '20px', verticalAlign: 'sub'}} href={'#gwiazda'}/>
                            <span>Do wygrania</span>
                        </div>
                    </div>
                    <div className="col-xs-12" style={{display: 'flex', justifyContent: 'space-around', alignItems: 'stretch'}}>
                        { !!riddle.winPrize &&
                        <div className="credits col-xs-5 col-md-4 pb-1 pt-1 text-center r18"
                             style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <span>{riddle.winPrize + " zł"}</span></div>}
                        { !!pointsToWin &&
                        <div className="points col-xs-5 col-md-4 pb-1 pt-1 text-center r18"
                             style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <span>{pointsToWin +  (pointsToWin > 1 ? ' punktów' : ' punkt') }</span></div>}
                    </div>

                    { (!!riddle.pointsCost || !!riddle.creditsCost) &&
                    <div className="col-xs-12 r18">
                        <div className="mt-1 mb-1">
                            <Svg style={{width: '24px', height: '24px', marginRight: '20px', verticalAlign: 'sub'}} href={'#odblokuj'}/>
                            <span>Koszt zagadki</span>
                        </div>
                    </div>}


                    <div className="col-xs-12" style={{display: 'flex', justifyContent: 'space-around', alignItems: 'stretch'}}>
                        { !!riddle.pointsCost &&
                        <div className="points col-xs-5 col-md-4 pb-1 pt-1 text-center r18"
                             style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <span>{riddle.pointsCost +  (riddle.pointsCost > 1 ? ' punktów' : ' punkt') }</span></div>}
                        { !!riddle.creditsCost &&
                        <div className="credits col-xs-5 col-md-4 pb-1 pt-1 text-center r18"
                             style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <span>{riddle.creditsCost +  (riddle.creditsCost > 1 ? ' kredytów' : ' kredyt') }</span></div>}
                    </div>


                    {creditsSection}
                    <div className="col-xs-12">
                        <p>Skrócone zasady:</p>
                        <ul>
                            {rulesList}
                        </ul>
                    </div>
                    <div className="hr col-xs-12"/>
                    <div className="button-wrapper col-xs-12">
                        <button type="button" onClick={(e) => {
                            this.props.history.push('/home')
                        }} className="btn-enigmata" data-dismiss="modal">Powrót
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

LockedGameInfoModal.ID = ID;

function mapStateToProps(state) {
    return {
        riddleAgreements: idx(state,_=>_.user.riddleAgreements),
        userCredits: idx(state,_=>_.user.userStatistics.credits),
        userPoints: idx(state,_=>_.user.userStatistics.points),
        userActivated: idx(state,_=>_.user.activated),
        userCreditPlan: idx(state,_=>_.user.currentCreditPlan),
        trialMode: idx(state,_=>_.user.login) === TRIAL_ACCOUNT_LOGIN
    };
}

export default withRouter(connect(mapStateToProps)(LockedGameInfoModal));