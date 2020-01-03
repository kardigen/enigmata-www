import React from 'react';
import idx from 'idx';
import {profileViewReset, updateUserProfileData} from './ProfileAction';
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';

const MAX_NAME_LENGTH = 70;
const MAX_ADDRESS_LENGTH = 140;

class PrizePaymentView extends React.Component {

    constructor(props){
        super(props);
        this.onConfirmPayment = this.onConfirmPayment.bind(this);
        this.onPay = this.onPay.bind(this);
        this.accountNo = null;
        this.address = null;
        this.name = null;

        this.setAccountNoRef = element => {
            this.accountNo = element;
        };

        this.setNameRef = element => {
            this.name = element;
        };

        this.setAddressRef = element => {
            this.address = element;
        };


    }

    onConfirmPayment(plan){
        window.jQuery("#payoff-prize-confirm-button").attr("disabled", true);
        setTimeout(() => {
            window.jQuery("#payoff-prize-confirm-button").attr("disabled", false);
        }, 5000);

        const prizePayment = {
            requestPrizePayment: {
                accountNo: this.accountNo.value.trim(),
                address: this.address.value.trim(),
                name: this.name.value.trim()
            }
        };
        this.props.dispatch(updateUserProfileData(prizePayment));
    }

    onPay(){
        this.forceUpdate();
        window.jQuery('#payoff-prize-confirmation-modal').modal({backdrop: 'static'});
    }

    onClear(){
        const {dispatch} = this.props;
        dispatch(profileViewReset());
    }

    componentDidMount() {
        if(!idx(this.props,_=>_.user.activated)) {
            this.props.history.replace("/home")
        }
    }

    componentDidUpdate() {
        if(idx(this.props,_=>_.view.error)) {
            setTimeout(() => {

                window.jQuery('#payoff-prize-confirmation-modal').modal('hide');
                window.jQuery('#payoff-prize-error-modal').modal({backdrop: 'static'});
            });
        }

        if(idx(this.props,_=>_.view.success)) {
            setTimeout(() => {

                window.jQuery('#payoff-prize-confirmation-modal').modal('hide');
                window.jQuery('#payoff-prize-success-modal').modal({backdrop: 'static'});
            });
        }
    }

    render(){
        if(!idx(this.props,_=>_.user.activated)) {
            return (null);
        }

        return (
            <div className="white-bg panel-padding col-xs-12 col-md-8 col-md-offset-2">
                <h1 className="text-center">Wypłata wygranych</h1>
                <div className="hr"/>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.onPay()
                }} action="">
                    <div className="row">
                        <div className="col-md-offset-1 col-md-10 col-xs-offset-0 col-xs-12">
                            <p>Suma wygranych do wypłaty: {this.props.user.userStatistics.assets}</p>
                            <div className="form-group">
                                <label>Nr rachunku (IBAN):</label>
                                <input id="paymentAccountNoField" type="text" className="form-control"
                                       aria-describedby="Nr rachunku IBAN"
                                       pattern="PL([0-9][ ]?){26}"
                                       title="Nr rachunku IBAN (PLXX XXXX XXXX XXXX XXXX XXXX XXXX)"
                                       placeholder="PLXX XXXX XXXX XXXX XXXX XXXX XXXX"
                                       required
                                       ref={this.setAccountNoRef}
                                />
                            </div>
                            <div className="form-group">
                                <label>Imię i nazwisko:</label>
                                <input id="paymentName" type="text" className="form-control"
                                       placeholder="Imię i nazwisko"
                                       required
                                       maxLength={MAX_NAME_LENGTH}
                                       ref={this.setNameRef}
                                />
                            </div>
                            <div className="form-group">
                                <label>Adres korespondencyjny:</label>
                                <textarea id="paymentAddressField" type="text" className="form-control"
                                       aria-describedby="Adres korespondencyjny"
                                       placeholder="Adres korespondencyjny"
                                       required
                                       maxLength={MAX_ADDRESS_LENGTH}
                                       ref={this.setAddressRef}
                                />
                            </div>

                            <div className="button-wrapper">
                                <button id="payoff-prize-button" type="submit" className="btn-enigmata">Wypłać</button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="modal fade in" id="payoff-prize-success-modal" role="dialog">
                    <div className="modal-dialog">
                        <div className="white-bg panel-padding">
                            <div className="text-center"><h3>Sukces!</h3></div>
                            <div className="hr" />
                            <div className="text-center">
                                <p>Dokonano zlecenia wypłaty i wysłano e-mail potwierdzający.</p>
                                <p>Postaramy się wypłacić wygraną jak najszybciej :-)</p>
                            </div>
                            <div className="hr" />
                            <div className="row">
                                <div className="col-xs-12 button-wrapper">
                                    <button type="button" className="btn-green" data-dismiss="modal"
                                            onClick={() => {this.onClear(); this.props.history.push('/home');}}>
                                        OK
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade in" id="payoff-prize-error-modal" role="dialog">
                    <div className="modal-dialog">
                        <div className="white-bg panel-padding">
                            <div className="text-center"><h3>Błąd</h3></div>
                            <div className="hr" />
                            <div className="text-center">
                                <p>Wystąpił błąd - sprawdź dane i spróbuj jeszcze.</p>
                                <p>Gdy błąd będzie się powtarzał, zgłoś błąd poprzez <a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/forms/d/e/1FAIpQLSdjJHAvIkKzehAjW2Bq597NX4w-a-FReLjFcRg_bHl__w5Quw/viewform">formularz</a>.</p>
                            </div>
                            <div className="hr" />
                            <div className="row">
                                <div className="col-xs-12 button-wrapper">
                                    <button type="button" className="btn-green" data-dismiss="modal"
                                        onClick={() => {this.onClear();}}>
                                        Powrót
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade in" id="payoff-prize-confirmation-modal" role="dialog">
                    <div className="modal-dialog">
                        <div className="white-bg panel-padding">
                            <div className="text-center"><h3>Potwierdzenie zlecania wypłaty</h3></div>
                            <div className="hr" />
                            <div>
                                <p>Suma wygranych do wypłaty: {this.props.user.userStatistics.assets}</p>
                                <p>Imię i nazwisko: {this.name? this.name.value.trim() : ''}</p>
                                <p>Adres: {this.address ? this.address.value.trim() : ''}</p>
                                <p>Nr Rachunku: {this.accountNo ? this.accountNo.value.trim() : ''}</p>
                            </div>
                            <div className="hr" />
                            <div className="row">
                                <div className="col-xs-12 button-wrapper">
                                    <button type="button" className="btn-green" data-dismiss="modal"
                                            onClick={() => {this.onClear();}}>
                                        Powrót
                                    </button>
                                    <button id="payoff-prize-confirm-button" type="button" className="btn-enigmata ml-2" onClick={() => { this.onConfirmPayment();}}>
                                        Wypłacam wygraną
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
    return {user: state.user, view: state.view.prizePayment};
}

export default withRouter(connect(mapStateToProps)(PrizePaymentView));