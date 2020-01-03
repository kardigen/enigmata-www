import React from 'react';
import idx from 'idx';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import {verifyToken} from "./VerificationActions";
import {logout} from "./LoginActions";

const ID = "verification-modal-id";

class VerificationModal extends React.Component{

    componentDidMount() {
        window.jQuery('#' +ID).modal('show');
    }

    componentWillUnmount() {
        window.jQuery('#' + ID).modal('hide');
    }

    relogin() {
        const { dispatch } = this.props;
        dispatch(logout());
        this.props.history.push('/login')
    }

    render() {

        let info = "Sprawdzam twój e-mail ..."
        let button = <button type="button" onClick={(e)=>{ this.props.history.push('/')}} className="btn-enigmata" data-dismiss="modal">Powrót</button>;
        const { dispatch } = this.props;
        const verified = idx(this.props, _=> _.view.verified);
        if( verified ) {
            info = "Twój email został zweryfikowany pomyślnie!";
            button = <button type="button" onClick={(e)=>{ this.relogin() }} className="btn-enigmata" data-dismiss="modal">Zaloguj</button>;
        } else {
            const tokenExpired = idx(this.props,_=>_.view.tokenExpired);
            if(tokenExpired) {
                info = <span>Werifikacja email nie udała się.<br/>Link potwierdzający stracił ważność.</span>;
            } else {

                if(this.props.token){
                    dispatch( verifyToken( this.props.token));
                } else {
                    info = "Nieprawidłowy link potwierdzający. Skopiuj cały link."
                }
            }
        }

        return (
            <div>
                <div className="modal fade" id={ID} role="dialog">
                    <div className="modal-dialog">
                        <div className="white-bg panel-padding ">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={(e) => { this.props.history.push(""); }}><span aria-hidden="true">&times;</span></button>
                            <h2>Weryfikacja e-mail</h2>
                            <div className="hr"/>
                            <div className="row">
                                <h3 className="text-center">{info}</h3>
                            </div>
                            <div className="button-wrapper" style={{padding:'20px 0px 15px 0px'}}>
                                {button}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { view: idx(state,_=>_.view.verification) , const_test:"ble" };
}

VerificationModal.ID = ID;

export default withRouter(connect(mapStateToProps)(VerificationModal));

