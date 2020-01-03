import React from 'react';
import idx from 'idx';
import DismissPaymentButton from './DismissPaymentButton';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import {buyCreditsRequest, closeBuyCreditsView} from "./BuyCreditsActions";

class BuyCreditsView extends React.Component {

    constructor(props){
        super(props);
        this.onConfirmPayment = this.onConfirmPayment.bind(this);
        this.onPay = this.onPay.bind(this);
        this.creditPakietName = null;
        this.creditPakietPrise = null;
        this.userPhoneNo = null;
        this.selectedPlan = {}

        this.setUserPhoneNoRef = element => {
            this.userPhoneNo = element;
        };

        this.setCreditPakietName = element => {
            this.creditPakietName = element;
        };

        this.setCreditPakietPrise = element => {
            this.creditPakietPrise = element;
        };
    }

    onConfirmPayment(plan){
        this.selectedPlan = plan;
        this.creditPakietName.innerHTML = this.selectedPlan.header + " (" + this.selectedPlan.headerHint +')';
        this.creditPakietPrise.innerText = this.selectedPlan.priceFormatted;

        window.jQuery('#buy-credits-confirmation-modal').modal({
            backdrop: true,
            keyboard: false
        });
    }

    onPay(){
        window.jQuery("#payment-button").attr("disabled", true);
        setTimeout(() => {
            window.jQuery("#payment-button").attr("disabled", false);
        }, 5000);

        const userPhoneNo = this.userPhoneNo.value.trim();
        this.props.dispatch(buyCreditsRequest(this.selectedPlan.planCode, userPhoneNo));
    }

    componentDidMount() {
        if(!idx(this.props,_=>_.user.activated)) {
            this.props.dispatch(closeBuyCreditsView());
            this.props.history.replace("/home")
        }
    }

    componentDidUpdate() {
        if(idx(this.props,_=>_.view.redirect) && idx(this.props,_=>_.view.redirectUrl)) {
            this.props.dispatch(closeBuyCreditsView());
            window.location.assign(this.props.view.redirectUrl)
        }
    }

    render(){
        if(!idx(this.props,_=>_.user.activated)) {
            return (null);
        }

        if(this.props.user.currentCreditPlan && (this.props.user.userStatistics.credits > 0 || this.props.user.userStatistics.assets > 0)) {
            return (
                <div className="modal-dialog white-bg panel-padding">
                        <div className="col-xs-12">
                            <div className="keyline text-center">
                                <h3>Posiadasz pakiet kredytów</h3>
                            </div>
                            <div className="text-center">
                                <p className="r18">Twój pakiet: <br className="visible-xs"/>"
                                    {this.props.user.currentCreditPlan.creditPlan.header + " " + this.props.user.currentCreditPlan.creditPlan.headerHint}"</p>
                                <p className="r14">Aby zakupić nowy pakiet, musisz wykorzystałeś wszystkie kredyty z aktualnego pakietu oraz zgłosić prośbę o wypłatę wygranych w profilu użytkownika.</p>
                            </div>
                            <div className="hr" />
                            <div className="row">
                                <div className="col-xs-12 button-wrapper">
                                    <button type="button" className="btn-green"
                                        onClick={()=>{this.props.history.push("/home")}}>
                                        Powrót
                                    </button>
                                </div>

                            </div>
                        </div>
                </div>
            )
        }

        if(idx(this.props,_=>_.view.redirect) && idx(this.props,_=>_.view.redirectUrl)) {
            return (null);
        }

        if(idx(this.props,_=>_.view.error)) {
            setTimeout(() => {
                window.jQuery('#buy-credits-confirmation-modal').modal('hide');
                window.jQuery('#buy-credits-in-progress-modal').modal({backdrop: 'static'});
            });
        }

        if(idx(this.props,_=>_.view.transactionInProgress)){
            setTimeout(() => {
                window.jQuery('#buy-credits-confirmation-modal').modal('hide');
                window.jQuery('#buy-credits-in-progress-modal').modal({backdrop: 'static'});
            });
        }


        const creditPlansHtml = this.props.creditPlans.map((plan,idx)=>{
            return (<div key={plan.planCode} className={"col-xs-12 col-sm-offset-" + (idx % 2 ? "2" : "1") + " col-sm-4 credit-option"}>
                <div className="header r18">
                    <span>{plan.header}</span>
                </div>
                <div className="under-header r18">
                    <span>{plan.headerHint}</span>
                </div>
                <div className="credit-value r38">
                    <span>{plan.priceFormatted}</span>
                </div>
                <div className="credit-hint r18">
                    <span>{plan.priceHint}</span>
                </div>
                <div className="buy-credit-button button-wrapper">
                    <button onClick={(e)=>{ e.stopPropagation(); this.onConfirmPayment(plan)}} className="btn-green">Kupuję</button>
                </div>
            </div>)
        });

        return (
            <div className="white-bg panel-padding container buy-credit-view">
                <h1 className="text-center">Zakup kredytów</h1>
                <div className="hr"></div>
                <h3 className="text-center">Dostępne pakiety</h3>
                {creditPlansHtml}
                <div className="modal fade in" id="buy-credits-confirmation-modal" role="dialog">
                    <div className="modal-dialog">
                        <div className="white-bg panel-padding">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                this.onPay()
                            }} action="">
                            <div className="text-center"><h3><strong>WYBRANY PAKIET:</strong></h3></div>
                            <div className="text-center"><span className="r18" ref={this.setCreditPakietName}/></div>
                            <div className="hr"/>
                            <div className="text-left r18 mb-1 mt-1">
                                <strong>Cena pakietu <span ref={this.setCreditPakietPrise}/></strong>
                            </div>
                            <div className="text-justify">
                            <p>Po kliknięciu na Płacę zostaniesz przekierowany do serwisu CashBill,
                               gdzie będziesz mógł wybrać sposób płatności.</p>
                            <p>Po dokonaniu opłaty zostaniesz przekierowany z powrotem do serwisu Enigmata.pl,
                               a twój stan kredytów zostanie uaktualniony. Szczegóły w regulaminie zakupu kredytów.</p>
                            </div>

                                <div className="checkbox">
                                    {/*disabled={cantJoinGame}*/}
                                    <label>
                                        <input id="promo-agreement" type="checkbox" required style={{transform:'scale(1.2)'}}
                                               onChange={ (e) => {
                                                   if (e.target.checked) {
                                                       window.jQuery('#phone-form').show('slow');
                                                       window.jQuery('#payment-button').prop('disabled', false);
                                                   } else {
                                                       window.jQuery('#phone-form').hide('slow');
                                                       window.jQuery('#payment-button').prop('disabled', true);
                                                   }
                                               }
                                               }/>Akceptuje <a target="_blank" href="/regulamin_zakupu_kredytow.html">Regulamin zakupu kredytów</a>
                                    </label>
                                </div>

                                <div id="phone-form" style={{display: 'none'}}>
                                    <p>Podaj numer telefonu komórkowego, który posłuży do weryfikacji tożsamości podczas wypłaty wygranej.</p>
                                    <div className="form-group">
                                        {/*<label>Numer konta:</label>*/}
                                        {/*<input id="account-no" name="ac" type="text" className="form-control" required={true}*/}
                                               {/*ref={this.setUserAccountNoRef}*/}
                                               {/*pattern="[0-9]{2}[ ]?[0-9]{4}[ ]?[0-9]{4}[ ]?[0-9]{4}[ ]?[0-9]{4}[ ]?[0-9]{4}[ ]?[0-9]{4}[ ]?"*/}
                                               {/*title="Nr konta w formacie: xx xxxx xxxx xxxx xxxx xxxx xxxx"*/}
                                               {/*placeholder="xx xxxx xxxx xxxx xxxx xxxx xxxx"/>*/}
                                        <label>Numer telefonu komórkowego:</label>
                                        <input id="phone-no" autoComplete="tel" type="tel" name="phone" className="form-control" required={true}
                                            ref={this.setUserPhoneNoRef}
                                            pattern="[0-9]{9}" placeholder="xxxxxxxxx"
                                            title="Nr telefonu w formacie: xxxxxxxxx"/>
                                    </div>
                                </div>
                            <div className="hr" />
                            <div className="row">
                                <div className="col-xs-6 button-wrapper">
                                    <button type="button" className="btn-green" data-dismiss="modal">
                                        Powrót
                                    </button>
                                </div>
                                <div className="col-xs-6 button-wrapper">
                                    <button id="payment-button" type="submit" className="btn-enigmata" disabled={true}>
                                        Płacę
                                    </button>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="modal fade in" id="buy-credits-error-modal" role="dialog">
                    <div className="modal-dialog">
                        <div className="white-bg panel-padding">
                            <div className="keyline text-center">
                                <h3>Wystąpił błąd połączenia z serwerem</h3>
                            </div>
                            <div className="text-center">
                                <p>Wystąpił błąd - spróbuj jeszcze raz lub zgłoś błąd. Więcej w na stronie <a href="/pomoc.html">Pomoc</a>.</p>
                            </div>
                            <div className="hr" />
                            <div className="row">
                                <div className="col-xs-12 button-wrapper">
                                    <button type="button" className="btn-green" data-dismiss="modal">
                                        Powrót
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade in" id="buy-credits-in-progress-modal" role="dialog">
                    <div className="modal-dialog">
                        <div className="white-bg panel-padding">
                            <div className="keyline text-center">
                                <h3>Błąd transakcji</h3>
                                <p className="r18">Transakcja w trakcie przetwarzania.</p>
                            </div>
                            <div className="text-center">
                                <p className="r14">Jeśli chciałeś zakupić kredyty i coś poszło nie tak, to sprawdź email i dokończ bierzącą transakcje lub anuluj ją i spróbój ponownie.</p>
                                <DismissPaymentButton onClick={() => {
                                    window.jQuery('#buy-credits-in-progress-modal').modal('hide');
                                }}/>
                            </div>
                            <div className="hr" />
                            <div className="row">
                                <div className="col-xs-12 button-wrapper">
                                    <button type="button" className="btn-green" data-dismiss="modal">
                                        Powrót
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

function mapStateToProps(state) {
    return {user: state.user, creditPlans: state.creditPlans, view: state.view.buyCredits};
}

export default withRouter(connect(mapStateToProps)(BuyCreditsView));