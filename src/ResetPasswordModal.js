import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {logout, resetPasswordAction} from './LoginActions';


const ID = "reset-password-modal-id";
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

class ResetPasswordModal extends React.Component{

    constructor(props){
        super(props);
        this.state = { showWrongEmailMessage : false };

        this.onPasswordResetClick = this.onPasswordResetClick.bind(this);
        this.onPasswordResetSuccessClick = this.onPasswordResetSuccessClick.bind(this);

        const { dispatch } = this.props;
        dispatch(logout());
    }

    onPasswordResetClick() {

        let userEmail = this.userEmailHtml.value.trim().toLocaleLowerCase();

        if ( !userEmail.match(EMAIL_PATTERN) ) {
            this.setState({ showWrongEmailMessage : true });
        } else {
            const { dispatch } = this.props;
            dispatch(resetPasswordAction( {email: userEmail}));

            window.jQuery('#reset-password-modal-content-id').hide();
            window.jQuery('#reset-password-success-modal-content-id').show();
        }
    }

    onPasswordResetSuccessClick() {
        window.jQuery('#reset-password-success-modal-content-id').hide();
        this.props.history.push("/");
    }

    componentDidMount() {
        window.jQuery('#reset-password-success-modal-content-id').hide();
        window.jQuery('#wrong-email-content-id').hide();
        setTimeout(()=>{
            window.jQuery('#' + ID).modal();
        });
    }

    componentWillUnmount() {
        window.jQuery('#' + ID).modal('hide');
    }

    render() {
        let wrongEmailMessage = this.state.showWrongEmailMessage;

        return (
            <div>
                <div className="modal fade" id={ID} role="dialog">
                    <div className="modal-dialog">
                        <div className="white-bg panel-padding ">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={(e) => { this.props.history.push("/"); }}><span aria-hidden="true">&times;</span></button>
                            <div id="reset-password-modal-content-id">
                                <h2>Zapomniałem hasła</h2>
                                <div className="hr"/>
                                <div className="help-text pb-2">Wpisz swój email, a my wyślemy Ci link do resetu hasła.</div>
                                <div className="form-group">
                                    <input type="email" className="form-control"
                                           placeholder="Email"
                                           autoFocus=""
                                           required
                                           name="email"
                                           ref={ input => this.userEmailHtml = input }/>
                                </div>

                                { wrongEmailMessage &&
                                    <div id="wrong-email-content-id">
                                        <p className="help-text text-center pb-1">Niepoprawny email</p>
                                    </div>
                                }

                                    <div className="button-wrapper">
                                        <button type="button" className="btn btn-lg btn-primary" onClick={this.onPasswordResetClick}>
                                            Wyślij
                                        </button>
                                    </div>
                            </div>

                            <div id="reset-password-success-modal-content-id">
                                <div className="text-center"><h2>Zapomniałem hasła</h2></div>
                                <div className="hr" />
                                <div className="help-text">Jeśli mamy taki adres w bazie, otrzymasz email z linkiem do zmiany hasła.</div>
                                <div className="hr" />
                                <div className="button-wrapper">
                                    <button type="button" className="btn btn-lg btn-primary" data-dismiss="modal" onClick={this.onPasswordResetSuccessClick}>
                                        OK
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

ResetPasswordModal.ID = ID;

export default withRouter(connect()(ResetPasswordModal));