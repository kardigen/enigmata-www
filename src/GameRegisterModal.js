import React from 'react';
import {withRouter} from 'react-router-dom';
import {registerUserToRiddle} from "./HomeAction";
import {connect} from "react-redux";
import idx from "idx";
// import BuyCreditsButton from './BuyCreditsButton';
import Svg from "./Svg";
import {TRIAL_ACCOUNT_LOGIN} from "./LoginActions";

const ID = "game-register-modal-id";

class GameRegisterModal extends React.Component {

    onAgreement(e) {
        window.jQuery('#' + ID + '_join_button_id').prop("disabled", !e.target.checked)
    }

    redirectToRiddle(e) {

        const button = e.target;
        window.jQuery(button).attr("disabled", true);
        setTimeout(() => {
            window.jQuery(button).attr("disabled", false);
        }, 5000);

        window.jQuery('#' + ID).modal('hide');
        const {dispatch} = this.props;
        dispatch(registerUserToRiddle(this.props.riddle.riddleId))
    }

    componentDidMount() {
        const agreementRegistered = this.props.riddleAgreements["" + this.props.riddle.riddleId];
        window.jQuery('#' + ID + '_join_button_id').prop("disabled", !agreementRegistered);
        window.jQuery('#' + ID).modal('show');
    }

    render() {

        const riddle = this.props.riddle;
        let creditsSection = "";
        let notEnoughCreditsOrPoints = false;

        let headSection = "";

        if(this.props.trialMode) {
            headSection =
                <div className="col-sx-12 text-center">
                    <h2>Konto Testowe!</h2>
                    <p>Tylko niektóre funkcje serwisu są dostępne.<br/>Zarejestruj się by korzystać ze wszystkich funkcji.</p>
                    <button type="button" className="btn-enigmata ml-2" onClick={()=>{this.props.history.push('/register')}}>
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
        }
        // else {
            // notEnoughCreditsOrPoints =
            //     this.props.userCredits < riddle.creditsCost || this.props.userPoints < riddle.pointsCost;
            // if(notEnoughCreditsOrPoints) {
            //
            //     creditsSection = <div className="col-xs-12 user-credits pb-2 r18 mt-1 mb-1 modal-content-fix" style={{paddingTop: '15px'}}>
            //         { this.props.userCredits >= riddle.creditsCost ? null :
            //             <article>
            //                 <div className="text-center">
            //                     <span className="text-warning">Posiadasz za mało kredytów</span>
            //                 </div>
            //                 {/*{ !this.props.userCreditPlan &&*/}
            //                 {/*<div className="button-wrapper mt-1 mb-1"><BuyCreditsButton /></div>}*/}
            //             </article>
            //         }
            //         { this.props.userPoints >= riddle.pointsCost ? null :
            //             <article>
            //                 <div className="text-center">
            //                     <span className="text-warning">Posiadasz za mało punktów</span>
            //                 </div>
            //                 <div className="text-center">
            //                     <span className="r14">Graj w inne gry by zdobyć punkty</span>
            //                 </div>
            //             </article>
            //         }
            //
            //     </div>
            // }
        // }

        const cantJoinGame = notEnoughCreditsOrPoints || !this.props.userActivated;
        const rulesList = riddle.rules.map( (text, idx) => <li key={idx}>{text}</li>);
        const pointsToWin = (riddle.winPointsMax || 0) + (riddle.winPointsRiddleSolve || 0);

        return (
            <div className="modal fade" id={ID} role="dialog" >
                <div className="modal-dialog white-bg panel-padding panel-group">
                    <h3 className="text-center">Dołącz do gry</h3>
                    <div className="text-center r18">"{riddle.name}"</div>
                    <div className="col-xs-12 hr-xs"/>
                    {headSection}
                    <div className="col-xs-12 r14">Numer gry: {riddle.riddleNo}</div>
                    <div className="col-xs-12 r18">
                        <div className="mt-1 mb-1">
                            <Svg style={{width: '24px', height: '24px', marginRight: '20px', verticalAlign: 'sub'}} href={'#gwiazda'}/>
                            <span>Do wygrania:</span>
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
                                <span>Koszt zagadki:</span>
                            </div>
                        </div>}


                    <div className="col-xs-12" style={{display: 'flex', justifyContent: 'space-around', alignItems: 'stretch'}}>
                        { !!riddle.pointsCost &&
                        <div className="points col-xs-5 col-md-4 pb-1 pt-1 text-center r18"
                             style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <span>{riddle.pointsCost +  (riddle.pointsCost > 1 ? ' punktów' : ' punkt') }</span></div>}
                        {/*{ !!riddle.creditsCost &&*/}
                        {/*<div className="credits col-xs-5 col-md-4 pb-1 pt-1 text-center r18"*/}
                             {/*style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>*/}
                            {/*<span>{riddle.creditsCost +  (riddle.creditsCost > 1 ? ' kredytów' : ' kredyt') }</span>*/}
                        {/*</div>}*/}
                    </div>

                    {creditsSection}

                    <div className="panel panel-default col-xs-12">
                        <div><a role="button" data-toggle="collapse"
                                aria-expanded="false" href={'#riddle-rules-' + riddle.riddleId}>
                            <h4><span className="glyphicon glyphicon-chevron-right padr-1"/>Zasady</h4></a>
                        </div>
                        <div className="panel-collapse collapse in" id={'riddle-rules-' + riddle.riddleId}>
                            <ul>
                                {rulesList}
                            </ul>
                            {!this.props.trialMode && <p>Aby dołączyć do gry musisz zaakceptować regulamin usługi.</p>}
                        </div>
                    </div>
                    {!this.props.trialMode && <div>
                        <div className="checkbox">
                            <label>
                                <input id="agreement" type="checkbox" required disabled={cantJoinGame}
                                       onClick={e => {
                                           this.onAgreement(e)
                                       }
                                       }/>Zapoznałem się i akceptuje <a target="_blank"
                                            rel="noopener noreferrer"
                                            href={this.props.riddle.termsLink}>regulamin usługi</a>
                            </label>
                        </div>
                    </div>}
                    <div className="hr col-xs-12"/>
                    <div className="button-wrapper col-xs-12">
                            <button type="button" style={{float: 'right'}} onClick={(e) => {
                                this.props.history.push('/home')
                            }} className="btn-enigmata" data-dismiss="modal">Powrót
                            </button>
                            {!this.props.trialMode && <button id={ID + "_join_button_id"}
                                    onClick={e => {
                                        this.redirectToRiddle(e)
                                    }} type="button"
                                    className="btn-enigmata ml-2">Graj
                            </button>}

                    </div>

                </div>
            </div>
        )
    }
}

GameRegisterModal.ID = ID;

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

export default withRouter(connect(mapStateToProps)(GameRegisterModal));