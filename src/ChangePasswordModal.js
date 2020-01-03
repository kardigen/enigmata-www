import React from 'react';
import idx from 'idx';
import PasswordValidator from './PasswordValidator';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {changePasswordAction, passwordChangedAction} from './LoginActions';

const ID = "change-password-modal-id";

class ChangePasswordModal extends React.Component {

    constructor(props){
        super(props);
        this.onSubmitClick = this.onSubmitClick.bind(this);
    }

    onSubmitClick (e) {
        e.preventDefault();
        let password = this.passwordHtml.value.trim();
        let retypedPassword = this.retypedPasswordHtml.value.trim();

        if(!PasswordValidator.validatePassword(password)) {
            window.jQuery('#change-password-modal-wrong-pass-id').modal('show');
            return;
        }

        if(password !== retypedPassword) {
            window.jQuery('#change-password-modal-wrong-retyped-pass-id').modal('show');
            return;
        }

        const {dispatch} = this.props;
        dispatch(changePasswordAction(password, this.props.token, this.props.newTerms));
    }

    componentDidMount() {
        setTimeout(() => {

            window.jQuery('#' + ID).on('shown.bs.modal', function (e) {
                window.jQuery(this).find('[autofocus]').focus();
            });

            window.jQuery('#' + ID).modal('show');

            // eslint-disable-next-line
            window.jQuery('#change-password-modal-wrong-pass-id').on('hide.bs.modal', function (e) {
                window.jQuery('#' + ID).modal('show');
            });

            // eslint-disable-next-line
            window.jQuery('#change-password-modal-wrong-pass-id').on('show.bs.modal', function (e) {
                window.jQuery('#' + ID).modal('hide');
            });

            // eslint-disable-next-line
            window.jQuery('#change-password-modal-wrong-pass-id').on('shown.bs.modal', function (e) {
                window.jQuery(this).find('[autofocus]').focus();
            });

            // eslint-disable-next-line
            window.jQuery('#change-password-modal-wrong-retyped-pass-id').on('hide.bs.modal', function (e) {
                window.jQuery('#' + ID).modal('show');
            });

            // eslint-disable-next-line
            window.jQuery('#change-password-modal-wrong-retyped-pass-id').on('show.bs.modal', function (e) {
                window.jQuery('#' + ID).modal('hide');
            });

            // eslint-disable-next-line
            window.jQuery('#change-password-modal-wrong-retyped-pass-id').on('shown.bs.modal', function (e) {
                window.jQuery(this).find('[autofocus]').focus();
            });

            // eslint-disable-next-line
            window.jQuery('#verification-modal-id').on('show.bs.modal', function (e) {
                window.jQuery('#' + ID).modal('hide');
            });

            // eslint-disable-next-line
            window.jQuery('#verification-modal-id').on('hide.bs.modal', function (e) {
                window.jQuery('#' + ID).modal('show');
            });

        });
    }

    componentDidUpdate(){
        const passwordChanged = idx(this.props,_=>_.view.passwordChanged);
        if( passwordChanged ) {
            const {dispatch} = this.props;
            dispatch(passwordChangedAction())
        }
        window.jQuery('#verification-modal-id').modal('show');
    }

    componentWillUnmount() {
        window.jQuery('#' + ID).modal('hide');
        window.jQuery('#verification-modal-id').modal('hide');
        window.jQuery('#change-password-modal-wrong-retyped-pass-id').modal('hide');
        window.jQuery('#change-password-modal-wrong-pass-id').modal('hide');
    }

    onAgreement(e) {
        window.jQuery('#confirm-change-pass-button').prop("disabled", !e.target.checked);
    }

    render () {
        let canChangePass = true;
        let info = "Zaczekaj ...";
        let button = <button type="button" onClick={(e)=>{ this.props.history.push('/')}} className="btn-enigmata" data-dismiss="modal">Powrót</button>;
        let acceptTermsCheckbox = '';

        if(this.props.newTerms){
            canChangePass = false;
            acceptTermsCheckbox =
                <div className="checkbox">
                    <label>
                        <input id="new-tems-agreement" type="checkbox" required
                               onClick={e => {
                                   this.onAgreement(e)
                               }
                               }/>Zapoznałem się i zgadzam się z <a target="_blank" href="/regulamin.html">Regulaminem serwisu</a>.
                    </label>
                </div>
        }

        const passwordChanged = idx(this.props,_=>_.view.passwordChanged);
        if( passwordChanged ) {
            info = "Hasło zmienione pomyślnie!";
            button = <button type="button" onClick={(e)=>{ this.props.history.push('/login')}} className="btn-enigmata" data-dismiss="modal">Zaloguj</button>;
            window.jQuery("#verification-modal-id").modal('show');
        } else {
            info = "Wystąpił błąd. Sprawdź połączenie z internetem i spróbuj ponownie.";
            window.jQuery("#verification-modal-id").modal('show');
        }

        return (
            <div>
                {/* modal z formularzem do ustalenia nawego hasła */}
                <div className="modal fade" id={ID} role="dialog">
                    <div className="modal-dialog">
                        <div className="white-bg panel-padding ">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                    onClick={(e) => {
                                        this.props.history.push("/");
                                    }}><span aria-hidden="true">&times;</span></button>
                            <h2>Zmień hasło</h2>

                            <div className="hr"/>

                            <form onSubmit={this.onSubmitClick}>
                                <div className="form-group">
                                    <input id="passwordText" type="password" className="form-control"
                                           required
                                           autofocus=""
                                           placeholder="Hasło min. 8 znaków (w tym wielka litera, mała litera i cyfra)"
                                           autoComplete="on"
                                           name="passwordText"
                                           aria-describedby="Wpisz hasło użytkownika"
                                           ref={input => this.passwordHtml = input}
                                    />
                                </div>
                                <div className="form-group">
                                    <input id="retypePasswordText" type="password" className="form-control"
                                           required
                                           placeholder="Powtórz hasło"
                                           autoComplete="off"
                                           name="retypePasswordText"
                                           aria-describedby="Powtórz hasło użytkownika"
                                           ref={input => this.retypedPasswordHtml = input}
                                    />
                                </div>
                                {acceptTermsCheckbox}

                                <div className="hr"/>
                                <div className="form-group align-cente text-center">
                                    <button id="confirm-change-pass-button" type="submit"
                                            disabled={!canChangePass}
                                            className="btn btn-lg btn-enigmata">Zapisz
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* modal informujący o niepoprawnym haśle */}
                <div className="modal fade" id="change-password-modal-wrong-pass-id" role="dialog">
                    <div className="modal-dialog">
                        <div className="white-bg panel-padding">
                            <div className="keyline text-center"><h2>Nieprawidłowe hasło</h2></div>
                            <div className="help-text">Hasło powinno zawierać co najmniej 8 znaków, w tym
                                przynajmniej jedną wielką litere, jedną małą litere oraz jedną cyfrę.
                            </div>
                            <div className="hr"/>
                            <div className="button-wrapper">
                                <button type="button" autoFocus="" className="btn btn-lg btn-primary"
                                        data-dismiss="modal">
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                {/* modal informujący o niepoprawnym powtórzeniu hasła*/}
                <div className="modal fade" id="change-password-modal-wrong-retyped-pass-id" role="dialog">
                    <div className="modal-dialog">
                        <div className="white-bg panel-padding">
                            <div className="keyline text-center"><h2>Hasła różnią się</h2></div>
                            <div className="help-text">Hasło oraz powtórzone hasło powinny być takie same.
                                Spróbuj wpisać oba ponownie.
                            </div>
                            <div className="hr"/>
                            <div className="button-wrapper">
                                <button type="button" autoFocus="" className="btn btn-lg btn-primary"
                                        data-dismiss="modal">
                                    OK
                                </button>
                            </div>

                        </div>
                    </div>
                </div>




                {/* modal o pomyślnej lub nie - zmianie hasła */}
                <div className="modal fade" id="verification-modal-id" role="dialog">
                    <div className="modal-dialog">
                        <div className="white-bg panel-padding ">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={(e) => { this.props.history.push(""); }}><span aria-hidden="true">&times;</span></button>
                            <h2>Zmień hasło</h2>
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
    return { view: idx(state,_=>_.view.changePassword)};
}


export default withRouter(connect(mapStateToProps)(ChangePasswordModal));