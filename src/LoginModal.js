import React from 'react';
import idx from 'idx';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {tryLogin, WRONG_PASSWORD, logout} from './LoginActions';



const ID = "login-modal-id";

class LoginModal extends React.Component{

    constructor(props){
        super(props);
        this.onLogin = this.onLogin.bind(this);
    }

    onLogin(loginText,passwordText){

        loginText = loginText.trim().toLocaleLowerCase();

        const { dispatch } = this.props;
        dispatch( tryLogin( { login: loginText, password: passwordText }));
    }

    componentDidMount() {

        const { from } = this.props.location.state || { from: { pathname: '/home' } };
        const authenticated = idx(this.props, _ => _.user.authenticated);
        if( authenticated ) {
            window.jQuery('#' + ID).modal('hide');
            this.props.history.replace(from);
            return;
        }

        setTimeout(()=>{

            window.jQuery('#login-modal-wrong-pass-id').on('hidden.bs.modal', function (e) {
                //$('#login-modal-wrong-pass-id').off('show.bs.modal');
                window.jQuery('#' + ID).modal({backdrop: "static"});
            });
            // eslint-disable-next-line
            window.jQuery('#login-modal-wrong-pass-id').on('show.bs.modal', function (e) {
                //$('#login-modal-wrong-pass-id').off('show.bs.modal');
                window.jQuery('#' + ID).modal('hide');
            });

            window.jQuery('#' + ID).on('shown.bs.modal', function (e) {
                window.jQuery(this).find('[autofocus]').focus();
            });

            window.jQuery('#' +ID).modal({backdrop: "static"});
        });
    }

    componentWillUnmount() {
        window.jQuery('#' + ID).modal('hide');
    }

    componentDidUpdate(){
        const status = idx(this.props, _=>_.view.status);

        if(status && status === WRONG_PASSWORD){
            window.jQuery('#login-modal-wrong-pass-id').modal({backdrop: "static"});
        }

        const { from } = this.props.location.state || { from: { pathname: '/home' } };
        const authenticated = idx(this.props, _ => _.user.authenticated);
        if( authenticated ) {
            window.jQuery('#' + ID).modal('hide');
            this.props.history.replace(from)
        }
    }

    render() {

        let login;
        let password;

        return (
            <div>
                <div className="modal fade in" id={ID} role="dialog">
                    <div className="modal-dialog">
                        <div className="white-bg panel-padding ">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                    onClick={(e) => {
                                        this.props.history.push("/");
                                    }}><span aria-hidden="true">&times;</span></button>
                            <h2>Logowanie</h2>

                            <div className="hr"/>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                this.onLogin(login.value.trim(), password.value.trim());
                            }} action="">
                                <div className="form-group">
                                    <input id="loginText" type="text" className="form-control"
                                           required
                                           placeholder="Email"
                                           autoComplete="email"
                                           name="email"
                                           aria-describedby="Wpisz email użytkownika"
                                           autoFocus=""
                                           ref={node => {
                                               login = node
                                           }}/>
                                </div>
                                <div className="form-group">
                                    <input id="passwordText" type="password" className="form-control"
                                           required
                                           placeholder="Hasło"
                                           autoComplete="on"
                                           name="password"
                                           aria-describedby="Wpisz hasło użytkownika"
                                           ref={node => {
                                               password = node
                                           }}/>
                                </div>

                                <div className="form-group align-cente text-center">
                                    <button type="submit" className="btn btn-lg btn-primary">Zaloguj</button>
                                </div>
                                <div className="text-center"><a href="#/reset-password">Zapomniałem hasła</a></div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="login-modal-wrong-pass-id" role="dialog">
                    <div className="modal-dialog">
                        <div className="white-bg panel-padding">
                            <div className="keyline text-center"><h2>Nieprawidłowy email lub hasło!</h2></div>
                            <div className="help-text">Sprawdź email oraz podaj poprawne hasło.</div>
                            <div className="hr"/>
                            <div className="button-wrapper">
                                <button type="button" className="btn btn-lg btn-primary" data-dismiss="modal">
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

LoginModal.ID = ID;

export default withRouter(connect(mapStateToProps)(LoginModal));

