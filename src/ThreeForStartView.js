import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import idx from "idx/lib/idx";
import {buyCreditsRequest, closeBuyCreditsView} from "./BuyCreditsActions";

class ThreeForStartView extends React.Component {

    constructor(props){
        super(props);
        this.userPhoneNo = null;

        this.setUserPhoneNoRef = element => {
            this.userPhoneNo = element;
        };
    }

    clearView(){
        this.userPhoneNo.value = '';
        window.jQuery('#promo-agreement').prop('checked',false);
        window.jQuery('#promo-form').hide();
        window.jQuery('#accept-promo-button').prop('disabled', true);
    }

    closeView(){
        this.clearView();
        window.jQuery('#promo-343-view-error-id').modal('hide');
        window.jQuery('#promo-343-view-success-id').modal('hide');
        this.props.dispatch(closeBuyCreditsView());
        this.props.history.push("/home")
    }

    onAcceptPromotion(phoneNo){
        window.jQuery('#accept-promo-button').attr("disabled", true);
        setTimeout(() => {
            window.jQuery('#accept-promo-button').attr("disabled", false);
        }, 5000);

        phoneNo = phoneNo.trim();
        if(! phoneNo.match(/^[0-9]{9}$/)) {

        }

        const { dispatch } = this.props;
        dispatch(buyCreditsRequest('promo-3-for-free',phoneNo))
    }

    componentDidMount() {
        if(!idx(this.props,_=>_.user.activated)) {
            this.clearView();
            this.props.history.replace("/home")
        }
    }

    componentDidUpdate() {
        if(idx(this.props,_=>_.view.error) || idx(this.props,_=>_.view.transactionInProgress)){
            window.jQuery('#promo-343-view-error-id').modal({backdrop: "static"});
        } else if(idx(this.props,_=>_.view.redirect)) {
            window.jQuery('#promo-343-view-success-id').modal({backdrop: "static"});
        }
    }

    render(){

        return(
                <div className="white-bg panel-padding col-xs-12 col-md-offset-2 col-md-8 panel-group">
                    <h1 className="text-center">Promocja<br/>"Trzy na start"</h1>
                    <div className="col-xs-12 hr" />
                    <div className="col-xs-12">
                        <p className="r18 text-center">Otrzymasz <strong>3 bezpłatne</strong> kredyty na gry z nagrodą pieniężną.</p>
                        <p className="r18 text-center">Z oferty można skorzystać tylko raz. Szczegóły w regulaminie promocji.</p>
                    </div>
                    <form onSubmit={(e) => { e.preventDefault();
                        this.onAcceptPromotion(this.userPhoneNo.value.trim());}} action="">
                    <div className="col-xs-12">
                        <div className="checkbox">
                            {/*disabled={cantJoinGame}*/}
                            <label>
                                <input id="promo-agreement" type="checkbox" required style={{transform:'scale(1.2)'}}
                                       onChange={ (e) => {
                                           if (e.target.checked) {
                                               window.jQuery('#promo-form').show('slow');
                                               window.jQuery('#accept-promo-button').prop('disabled', false);
                                           } else {
                                               window.jQuery('#promo-form').hide('slow');
                                               window.jQuery('#accept-promo-button').prop('disabled', true);
                                           }
                                       }
                                       }/>Akceptuje <a target="_blank" href="/regulamin_promocji_trzy_na_start.html">regulamin promocji</a> oraz <a target="_blank" href="/regulamin_zakupu_kredytow.html">regulamin zakupu kredytów</a>
                            </label>
                        </div>
                    </div>

                    <div id="promo-form" className="col-xs-12" style={{display: 'none'}}>
                        <p>Podaj numer telefonu komórkowego, który posłuży do weryfikacji tożsamości podczas wypłaty wygranej.</p>
                        <div className="form-group">
                            <label>Numer telefonu komórkowego:</label>
                            <input autoComplete="tel" type="tel" name="phone" className="form-control" required={true}
                                   ref={this.setUserPhoneNoRef}
                                   pattern="[0-9]{9}" placeholder="xxxxxxxxx"
                                   title="Nr telefonu w formacie: xxxxxxxxx"/>
                        </div>
                    </div>
                    <div className="col-xs-12 hr"/>
                    <div className="col-xs-12 button-wrapper">
                        <button type="button" className="btn-enigmata" data-dismiss="modal"
                                onClick={(e)=>{e.preventDefault();this.closeView()}}>Powrót</button>
                        <button id="accept-promo-button" type="submit" className="btn-enigmata ml-2" disabled={true}>
                            Start
                        </button>
                    </div>
                    </form>
                    <div className="modal fade in" id="promo-343-view-success-id" role="dialog">
                        <div className="modal-dialog">
                            <div className="white-bg panel-padding">
                                <div className="keyline text-center"><h3>Gratulacje!</h3></div>
                                <div className="text-center">
                                    <p className="r18">Twoje kredyty zostały uaktualnione.</p>
                                    <p className="r18">Dobrej zabawy!</p>
                                </div>
                                <div className="hr" />
                                <div className="row">
                                    <div className="col-xs-12 button-wrapper">
                                        <button type="button" className="btn-green" data-dismiss="modal"
                                                onClick={(e)=>{e.preventDefault();this.closeView()}}
                                        >OK</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade in" id="promo-343-view-error-id" role="dialog">
                        <div className="modal-dialog">
                            <div className="white-bg panel-padding">
                                <div className="keyline text-center"><h3>Przykro nam :-(</h3></div>
                                <div className="text-center">
                                    <p className="r18">Konto nie spełnia warunków promocji.</p>
                                    <p className="r18">Pamiętaj że możesz skorzystać z promocji tylko jeden raz.</p>
                                </div>
                                <div className="hr" />
                                <div className="row">
                                    <div className="col-xs-12 button-wrapper">
                                        <button type="button" className="btn-green" data-dismiss="modal"
                                                onClick={(e)=>{e.preventDefault();this.closeView()}}
                                        >OK</button>
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
    return {user: state.user, view: state.view.buyCredits};
}

export default withRouter(connect(mapStateToProps)(ThreeForStartView));
