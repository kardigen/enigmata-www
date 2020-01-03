import React from 'react';
import {connect} from "react-redux";
import idx from "idx/lib/idx";
import {TRIAL_ACCOUNT_LOGIN} from "./LoginActions";
import {sendVerificationEmail} from "./VerificationActions"

const ID = "home-info-modal-id";

class InfoModal extends React.Component {

    sendNewVerificationEmail(button) {
        window.jQuery(button).attr("disabled", true);
        setTimeout(() => {
            window.jQuery(button).attr("disabled", false);
        }, 3000);

        const { dispatch } = this.props;
        dispatch(sendVerificationEmail(this.props.user.eid,this.props.user.authenticationToken))
    }

    render(){

        const accountNotActive = !this.props.user.activated;
        const trialMode = this.props.user.login === TRIAL_ACCOUNT_LOGIN;
        let notice = "";

        if(accountNotActive && !trialMode) {
            notice = <section className="row">
                <div className="col-md-offset-1 col-md-10 col-xs-offset-0 col-xs-12">
                    <div>
                        <h3>Konto nieaktywne!</h3>
                        <p className="r16">By korzystać w pełni z serwisu poszukaj email od nas i kliknij link potwierdzający email. Jeśli link wygasł albo nie możesz znaleźć email - kliknij przycisk "Wyślij email ponownie".</p>
                    </div>
                    <div className="button-wrapper">
                        <button type="button" className="btn btn-lg btn-primary vcenter" onClick={(e) => {
                            this.sendNewVerificationEmail(e.target);
                            e.preventDefault()
                        }}>
                            Wyślij email ponownie
                        </button>
                    </div>
                </div>
                <div className="hr col-xs-12"/>
            </section>
        }

        if(trialMode) {
            notice = <section>
                <div className="row">
                    <div className="col-lg-offset-1 col-lg-7 vcenter">
                        <h2>Konto Testowe!</h2>
                        <p className="r16">Tylko niektóre funkcje serwisu będą dostępne.<br/>Zarejestruj się by korzystać ze wszystkich funkcji.</p>
                    </div>
                </div>
                <div className="hr"/>
            </section>
        }

        return(

            <div className="modal fade" id={ID} role="dialog">
                <div className="modal-dialog modal-lg white-bg panel-padding block-of-text panel-group" role="tablist"
                     id="info_accordion">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                    <h3>Cieszymy się, że bawisz się z nami</h3>
                    <div className="hr" />
                    {notice}
                    <div className="panel panel-default">
                        <div role="tab"><a role="button" data-toggle="collapse" data-parent="#info_accordion"
                                           aria-expanded="true" href={'#game_rules'}>
                            <h4><span className="glyphicon glyphicon-chevron-right padr-1" />
                                Na czym polega gra</h4></a></div>
                        <div className="panel-collapse collapse in" role="tabpanel" id="game_rules">
                            <p className="r16">Każdego dnia o określonych godzinach ujawniane są zagadki.</p>
                            <p className="r16"><strong>Wygrywa ten, kto pierwszy odpowie poprawnie.</strong></p>
                            <p className="r16">Możesz próbować tyle razy ile chcesz, aż odgadniesz.</p>
                        </div>
                    </div>

                    {/*<div className="panel panel-default">*/}
                        {/*<div role="tab"><a role="button" data-toggle="collapse" data-parent="#info_accordion"*/}
                                           {/*aria-expanded="false" href={'#game_times'}>*/}
                            {/*<h4><span className="glyphicon glyphicon-chevron-right padr-1" />*/}
                                {/*Zagadki</h4></a></div>*/}
                        {/*<div className="panel-collapse collapse" role="tabpanel" id="game_times">*/}
                            {/*<p className="r16">Są dostępne dwa rodzaje zagadek: płatne i bezpłatne.*/}
                            {/*</p>*/}

                            {/*<p className="r16">Zagadki płatne są oznaczone napisem <b>Nagroda pieniężna</b>. Aby je zobaczyć i rozwiązać należy wcześniej <b>zakupić kredyty</b>.*/}
                            {/*</p>*/}

                            {/*<p className="r16">Zagadki <b>bez oznaczenia</b> Nagroda pieniężna są bezpłatne i odgadywanie ich nie wiąże się z żadnymi opłatami.*/}
                            {/*</p>*/}
                        {/*</div>*/}
                    {/*</div>*/}

                    <div className="panel panel-default">
                        <div role="tab"><a role="button" data-toggle="collapse" data-parent="#info_accordion"
                                           aria-expanded="false" href={'#game_points'}>
                            <h4><span className="glyphicon glyphicon-chevron-right padr-1" />
                                Zagadki</h4></a></div>
                        <div className="panel-collapse collapse" role="tabpanel" id="game_points">
                            <p className="r16">Odgadując zagadki możesz zdobywać punkty. Każda zagadka ma określone w jej regulaminie warunki gry.</p>
                            <p className="r16">Kliknij "Dołącz do gry" by dowiedzieć się więcej.</p>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div role="tab"><a role="button" data-toggle="collapse" data-parent="#info_accordion"
                                           aria-expanded="false" href={'#game_errors'}>
                            <h4><span className="glyphicon glyphicon-chevron-right padr-1" />
                                Pomoc</h4></a></div>
                        <div className="panel-collapse collapse" role="tabpanel" id="game_errors">
                            <p className="r16">Pomoc uzyskasz na stronie <a
                                href="/pomoc.html"
                                target="_blank"
                                rel="noopener noreferrer">Pomoc</a>, dostępnej również w stopce strony.</p>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="r18">Dobrej zabawy!</div>
                    </div>
                    <div className="hr"/>
                    <div className="button-wrapper">
                        <button type="button" className="btn-enigmata" data-dismiss="modal">OK</button>
                    </div>
                </div>
            </div>

        )
    }
}

InfoModal.ID = ID;

function mapStateToProps(state) {
    return { user: idx(state,_=>_.user) || {}};
}

export default connect(mapStateToProps)(InfoModal);
