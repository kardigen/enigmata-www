import React from 'react';
import idx from 'idx';
import PasswordValidator from './PasswordValidator'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {registerUser, logout, USER_LOGGED, ACCOUNT_EXISTS_ALREADY} from './LoginActions';
import Svg from "./Svg";


const ID = "register-modal-id";

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

class RegisterModal extends React.Component{

    constructor(props){
        super(props);
        this.onRegister = this.onRegister.bind(this);
        this.registered = false;
    }

    onRegister(emailText,passwordText,retypedPasswordText,agreement, nick){

        window.jQuery('#registerButton').attr("disabled", true);
        setTimeout(()=>{ window.jQuery('#registerButton').attr("disabled", false);}, 3000)

        emailText = emailText.trim().toLocaleLowerCase();

        if( !emailText.match(EMAIL_PATTERN)) {
            window.jQuery('#register-modal-wrong-email-id').modal('show');
            return;
        }

        if(!PasswordValidator.validatePassword(passwordText)) {
            window.jQuery('#register-modal-wrong-pass-id').modal('show');
            return;
        }

        if(passwordText !== retypedPasswordText) {
            window.jQuery('#register-modal-wrong-retyped-pass-id').modal('show');
            return;
        }

        if(!agreement) {
            window.jQuery('#register-modal-agreement-id').modal('show');
            return;
        }

        const { dispatch } = this.props;

        dispatch( logout());
        dispatch( registerUser( { login: emailText, password: passwordText, nick: nick }));

        this.registered = true;
    }

    componentWillUnmount() {
        window.jQuery('#' + ID).modal('hide');
    }

    componentDidMount() {

        setTimeout(()=>{

            window.jQuery('#' + ID).on('shown.bs.modal', function (e) {
                window.jQuery(this).find('[autofocus]').focus();
            });

            window.jQuery('#' + ID).modal({backdrop: "static"});

            // eslint-disable-next-line
            window.jQuery('#register-modal-wrong-email-id').on('hide.bs.modal', function (e) {
                window.jQuery('#' + ID).modal({backdrop: "static"});
            });
            // eslint-disable-next-line
            window.jQuery('#register-modal-wrong-email-id').on('show.bs.modal', function (e) {
                window.jQuery('#' + ID).modal('hide');
            });

            window.jQuery('#register-modal-wrong-email-id').on('shown.bs.modal', function (e) {
                window.jQuery(this).find('[autofocus]').focus();
            });


            // eslint-disable-next-line
            window.jQuery('#register-modal-wrong-pass-id').on('hide.bs.modal', function (e) {
                window.jQuery('#' + ID).modal({backdrop: "static"});
            });
            // eslint-disable-next-line
            window.jQuery('#register-modal-wrong-pass-id').on('show.bs.modal', function (e) {
                window.jQuery('#' + ID).modal('hide');
            });

            window.jQuery('#register-modal-wrong-pass-id').on('shown.bs.modal', function (e) {
                window.jQuery(this).find('[autofocus]').focus();
            });


            // eslint-disable-next-line
            window.jQuery('#register-modal-wrong-retyped-pass-id').on('hide.bs.modal', function (e) {
                //$('#register-modal-wrong-pass-id').off('show.bs.modal');
                window.jQuery('#' + ID).modal({backdrop: "static"});
            });
            // eslint-disable-next-line
            window.jQuery('#register-modal-wrong-retyped-pass-id').on('show.bs.modal', function (e) {
                //$('#register-modal-wrong-pass-id').off('show.bs.modal');
                window.jQuery('#' + ID).modal('hide');
            });

            window.jQuery('#register-modal-wrong-retyped-pass-id').on('shown.bs.modal', function (e) {
                window.jQuery(this).find('[autofocus]').focus();
            });

            // eslint-disable-next-line
            window.jQuery('#register-modal-agreement-id').on('hide.bs.modal', function (e) {
                //$('#register-modal-wrong-pass-id').off('show.bs.modal');
                window.jQuery('#' + ID).modal({backdrop: "static"});
            });
            // eslint-disable-next-line
            window.jQuery('#register-modal-agreement-id').on('show.bs.modal', function (e) {
                //$('#register-modal-wrong-pass-id').off('show.bs.modal');
                window.jQuery('#' + ID).modal('hide');
            });

            window.jQuery('#register-modal-agreement-id').on('shown.bs.modal', function (e) {
                window.jQuery(this).find('[autofocus]').focus();
            });

            // eslint-disable-next-line
            window.jQuery('#register-modal-account-exists-id').on('hide.bs.modal', function (e) {
                //$('#register-modal-wrong-pass-id').off('show.bs.modal');
                window.jQuery('#' + ID).modal({backdrop: "static"});
            });
            // eslint-disable-next-line
            window.jQuery('#register-modal-account-exists-id').on('show.bs.modal', function (e) {
                //$('#register-modal-wrong-pass-id').off('show.bs.modal');
                window.jQuery('#' + ID).modal('hide');
            });

            window.jQuery('#register-modal-account-exists-id').on('shown.bs.modal', function (e) {
                window.jQuery(this).find('[autofocus]').focus();
            });

        });
    }

    componentDidUpdate(){
        const status = idx(this.props, _=>_.view.status);

        if(status && status === ACCOUNT_EXISTS_ALREADY){
            window.jQuery('#register-modal-account-exists-id').modal({backdrop: "static"});
        }
    }

    render() {

        const status = idx(this.props, _=>_.view.status);
        if(this.registered && status && status === USER_LOGGED) {
            const authenticated = idx(this.props, _ => _.user.authenticated);
            if (authenticated) {
                window.jQuery('#' + ID).modal('hide');
                this.props.history.replace("/home");
                return null;
            }
        }

        let startPromotion = false;


        let login;
        let password;
        let retypedPassword;
        let agreement;
        let nick;

        return (
            <div>
                <div className="modal fade" id={ID} role="dialog">
                    <div className="modal-dialog">
                        <div className="white-bg panel-padding ">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={(e) => { this.props.history.push("/"); }}><span aria-hidden="true">&times;</span></button>
                            <h2>Rejestracja</h2>

                            <div className="hr"/>
                            <form onSubmit={(e) => { e.preventDefault();
                                    this.onRegister(login.value.trim(),password.value.trim(),retypedPassword.value.trim(), agreement.checked, nick.value.trim());}} action="">
                                <div className="form-group">
                                    <input id="nickText" autofocus="" type="text" className="form-control"
                                           required
                                           placeholder="Nick (min. 5 znaków)"
                                           name="name"
                                           autoComplete="name"
                                           aria-describedby="Wpisz nick użytkownika"
                                           pattern=".{5,24}"
                                           maxLength="24"
                                           title="Minimum 5 znaków"
                                           ref={node => {
                                               nick = node
                                           }}/>
                                </div>
                                <div className="form-group">
                                    <input id="loginText" type="email" className="form-control"
                                           required
                                           autoComplete="email"
                                           name="email"
                                           aria-describedby="Wpisz email użytkownika"
                                           placeholder="Email"
                                           ref={node => {
                                               login = node
                                           }}/>
                                </div>
                                <div className="form-group">
                                    <input id="passwordText" type="password" className="form-control"
                                           required
                                           placeholder="Hasło (8 znaków, cyfra, wielka i mała litera)"
                                           autoComplete="on"
                                           name="passwordText"
                                           aria-describedby="Wpisz hasło użytkownika"
                                           ref={node => {
                                               password = node
                                           }}/>
                                </div>
                                <div className="form-group">
                                    <input id="retypePasswordText" type="password" className="form-control"
                                           required
                                           placeholder="Powtórz hasło"
                                           autoComplete="off"
                                           name="retypePasswordText"
                                           aria-describedby="Powtórz hasło użytkownika"
                                           ref={node => {
                                               retypedPassword = node
                                           }}/>
                                </div>
                                <div className="checkbox">
                                    <label>
                                    <input id="agreement" type="checkbox"
                                           required
                                           ref={node => {
                                               agreement = node
                                           }}/> Akceptuje <a target="_blank" href="/regulamin.html">regulaminem serwisu</a> oraz <a target="_blank" href="/polityka_prywatnosci.html">polityką prywatności</a>.
                                    </label>
                                </div>
                                <div className="hr"/>
                                <div className="form-group align-cente text-center">
                                    <button id="registerButton" type="submit" className="btn btn-lg btn-primary">Rejestruj</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="register-modal-wrong-pass-id" role="dialog">
                    <div className="modal-dialog">
                        <div className="white-bg panel-padding">
                            <div className="keyline text-center"><h2>Nieprawidłowe hasło</h2></div>
                            <div className="help-text">Hasło powinno zawierać co najmniej 8 znaków, w tym przynajmniej jedną wielką litere, jedną małą litere oraz jedną cyfrę.</div>
                            <div className="hr" />
                            <div className="button-wrapper">
                                <button type="button" autofocus="" className="btn btn-lg btn-primary"  data-dismiss="modal">
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="register-modal-wrong-retyped-pass-id" role="dialog">
                    <div className="modal-dialog">
                        <div className="white-bg panel-padding">
                            <div className="keyline text-center"><h2>Hasła różnią się</h2></div>
                            <div className="help-text">Hasło oraz powtórzone hasło powinny być takie same. Spróbuj wpisać oba ponownie.</div>
                            <div className="hr" />
                            <div className="button-wrapper">
                                <button type="button" autofocus="" className="btn btn-lg btn-primary" data-dismiss="modal">
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="register-modal-wrong-email-id" role="dialog">
                    <div className="modal-dialog">
                        <div className="white-bg panel-padding">
                            <div className="keyline text-center"><h2>Nieprawidłowy email</h2></div>
                            <div className="help-text">Podaj prawidłowy adress e-mail</div>
                            <div className="hr" />
                            <div className="button-wrapper">
                                <button type="button" autofocus="" className="btn btn-lg btn-primary" data-dismiss="modal">
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="register-modal-agreement-id" role="dialog">
                    <div className="modal-dialog">
                        <div className="white-bg panel-padding">
                            <div className="keyline text-center"><h2>Wymagana zgoda</h2></div>
                            <div className="help-text">Aby korzystać z usługi enigmata.pl wymagana jest zgoda na postanowienia <a>regulaminu&nbsp;usługi</a>.</div>
                            <div className="hr" />
                            <div className="button-wrapper">
                                <button type="button" autofocus="" className="btn btn-lg btn-primary" data-dismiss="modal">
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="register-modal-account-exists-id" role="dialog">
                    <div className="modal-dialog">
                        <div className="white-bg panel-padding">
                            <div className="keyline text-center"><h2>Konto o podanym e-mail już istnieje</h2></div>
                            <div className="help-text">Podaj inny email lub skorzystaj z opcji resetuj hasło.</div>
                            <div className="hr" />
                            <div className="button-wrapper">
                                <button type="button"autofocus="" className="btn btn-lg btn-primary" data-dismiss="modal">
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { user: state.user, view: idx(state,_=>_.view.login) };
}

RegisterModal.ID = ID;

export default withRouter(connect(mapStateToProps)(RegisterModal));

