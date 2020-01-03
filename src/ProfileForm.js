import React from 'react';
import {withRouter} from "react-router-dom";
import idx from 'idx';
import PasswordValidator from './PasswordValidator';
import {connect} from 'react-redux';
import {
    profileViewReset,
    updateUserProfileData,
    USER_PROFILE_DATA_UPDATE_ERROR,
    USER_PROFILE_DATA_UPDATE_SUCCESS
} from "./ProfileAction";
import {logout, TRIAL_ACCOUNT_LOGIN} from "./LoginActions";
import {sendVerificationEmail} from "./VerificationActions";

const MAX_NICK_LENGTH = 24;

class ProfileForm extends React.Component {

    constructor(props) {
        super(props);
        this.onUpdateUserData.bind(this);
    }

    sendNewVerificationEmail(button) {
        window.jQuery(button).attr("disabled", true);
        setTimeout(() => {
            window.jQuery(button).attr("disabled", false);
        }, 5000);

        const { dispatch } = this.props;
        dispatch(sendVerificationEmail(this.props.user.eid,this.props.user.authenticationToken))
    }

    componentDidUpdate() {
        if(this.nick) this.nick.value = this.props.user.nick;
        if(this.login) this.login.value = this.props.user.login;
        if(this.oldPass) this.oldPass.value = "";
        if(this.pass1) this.pass1.value = "";
        if(this.pass2) this.pass2.value = "";

        const {dispatch} = this.props;
        if (this.props.view.status && this.props.view.status === USER_PROFILE_DATA_UPDATE_SUCCESS) {
            this.dialogTitle.innerHTML = "Profil uaktualniony";
            this.dialogMessage.innerHTML = "Twój profil został uaktualniony";
            window.jQuery('#profile-msg-modal-id').modal('show');
            dispatch(profileViewReset());
        } else if (this.props.view.status && this.props.view.status === USER_PROFILE_DATA_UPDATE_ERROR) {
            this.dialogTitle.innerHTML = "Profil nie mógł być uaktualniony";
            this.dialogMessage.innerHTML = "Podano złe hasło";
            window.jQuery('#profile-msg-modal-id').modal('show');
            dispatch(profileViewReset());
        }
    }

    componentDidMount() {

        if(this.nick) this.nick.value = this.props.user.nick;
        if(this.login) this.login.value = this.props.user.login;
        if(this.oldPass) this.oldPass.value = "";
        if(this.pass1) this.pass1.value = "";
        if(this.pass2) this.pass2.value = "";
    }


    onUpdateUserData() {
        window.jQuery('#profile-form-submit-button').attr("disabled", true);
        setTimeout(() => {
            window.jQuery('#profile-form-submit-button').attr("disabled", false);
        }, 5000);

        this.dialogMessage.innerHTML = "";
        this.dialogTitle.innerHTML = "";


        if (this.oldPass.value && this.pass1.value && this.pass2.value) {
            if (this.pass1.value !== this.pass2.value) {
                this.dialogMessage.innerHTML = "Sprawdź nowe i powtórzone hasło";
                this.dialogTitle.innerHTML = "Nowe hasło inne niż powtórzone";
                window.jQuery('#profile-msg-modal-id').modal('show');
                return;
            }

            if (this.oldPass.value === this.pass1.value) {
                this.dialogMessage.innerHTML = "Sprawdź jeszcze raz wszystkie hasła";
                this.dialogTitle.innerHTML = "Nowe i aktualne hasło musi się różnić";
                window.jQuery('#profile-msg-modal-id').modal('show');
                return;
            }

            if( !PasswordValidator.validatePassword(this.pass1.value)){
                this.dialogTitle.innerHTML = "Nowe hasło jest niepoprawne";
                this.dialogMessage.innerHTML = "Hasło powinno zawierać co najmniej 8 znaków, w tym przynajmniej jedną wielką litere, jedną małą litere oraz jedną cyfrę.";
                window.jQuery('#profile-msg-modal-id').modal('show');
                return;
            }


        } else if (!this.oldPass.value && !this.pass1.value && !this.pass2.value) {
            // no password is changed

        } else {
            if (!this.oldPass.value) {
                this.dialogMessage.innerHTML = "Wypełnij aktualne hasło";
                this.dialogTitle.innerHTML = "Brak aktualnego hasła";
                window.jQuery('#profile-msg-modal-id').modal('show');
                return;
            }

            if (!this.pass1.value) {
                this.dialogMessage.innerHTML = "Wypełnij nowe hasło";
                this.dialogTitle.innerHTML = "Brak nowego hasła";
                window.jQuery('#profile-msg-modal-id').modal('show');
                return;
            }

            if (!this.pass2.value) {
                this.dialogMessage.innerHTML = "Wypełnij powtórzone hasło";
                this.dialogTitle.innerHTML = "Brak powtórzonego hasła";
                window.jQuery('#profile-msg-modal-id').modal('show');
                return;
            }
        }


        const updateData = {
            nick: this.nick.value.trim(),
            oldPassword: this.oldPass.value,
            newPassword: this.pass1.value
        };

        const {dispatch} = this.props;
        dispatch(updateUserProfileData(updateData))
    }

    onDeleteAccount(){
        window.jQuery('#profile-modal-delete-account-id').modal('show');
    };

    onDeleteAccountConfirmation(e){
        const button = e.target;
        window.jQuery(button).attr("disabled", true);
        setTimeout(() => {
            window.jQuery(button).attr("disabled", false);
        }, 5000);

        const {dispatch} = this.props;
        const updateData = {
            deleteAccount: true
        };
        dispatch(updateUserProfileData(updateData));
        dispatch(logout());
        window.location.assign('/koniec.html');
    };

    render() {
        const trialMode = this.props.user.login === TRIAL_ACCOUNT_LOGIN;
        if(trialMode) {
            return (<section>
                <div className="row text-center">
                    <div className="col-sx-12 vcenter text-center">
                        <h2>Konto Testowe!</h2>
                        <p>Tylko niektóre funkcje serwisu są dostępne.<br/>Zarejestruj się by korzystać ze wszystkich funkcji.</p>
                    </div>
                </div>
                <div className="hr"/>
                <div className="button-wrapper">
                    <button type="button" className="btn-enigmata" onClick={()=>{this.props.history.push('/register')}}>
                        Rejestruj się teraz
                    </button>
                </div>
            </section>)
        }


        const accountNotActive = !this.props.user.activated;
        let notice = "";

        if(accountNotActive && !trialMode) {
            notice = <section className="row">
                <div className="col-md-offset-1 col-md-10 col-xs-offset-0 col-xs-12">
                    <div>
                        <h3>Konto nieaktywne!</h3>
                        <p>Poszukaj email od nas i kliknij link potwierdzający. Jeśli link wygasł albo nie możesz znaleźć email - kliknij przycisk "Wyślij email ponownie".</p>
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

        const readOnlyMode = accountNotActive || trialMode;

        return (<form onSubmit={(e) => {
            e.preventDefault();
            this.onUpdateUserData();
            }} autoComplete="new-password">
            {notice}
            <div className="row">
                <div className="col-md-offset-1 col-md-10 col-xs-offset-0 col-xs-12">
                    <div className="form-group">
                        <label>login:</label>
                        <input id="profileEmailField" type="text" className="form-control"
                               placeholder="Email"
                               required
                               readOnly={true}
                               ref={ node => this.login = node}/>
                    </div>
                    <div className="form-group">
                        <label>nick:</label>
                        <input id="profileNickField" type="text" className="form-control"
                               aria-describedby="Nick"
                               placeholder="minimum 5 znaków"
                               pattern=".{5,24}"
                               title="minimum 5 znaków"
                               required
                               maxLength={MAX_NICK_LENGTH}
                               autoFocus=""
                               readOnly={readOnlyMode}
                               ref={node => this.nick = node}
                        />
                    </div>
                    <div className="form-group">
                        <label>zmień hasło:</label>
                        <input id="profilePasswordOldField" type="password" className="form-control"
                               pattern=".{8,64}"
                               title="minimum 8 znaków"
                               placeholder="Aktualne hasło"
                               readOnly={readOnlyMode}
                               ref={node => this.oldPass = node}
                        />
                    </div>
                    <div className="form-group">
                        <input id="profilePassword1Field" type="password" className="form-control"
                               pattern=".{8,64}"
                               placeholder="Nowe hasło - min. 8 znaków (w tym wielka litera, mała litera i cyfra)"
                               title="minimum 8 znaków (w tym wielka litera, mała litera i cyfra)"
                               readOnly={readOnlyMode}
                               ref={node => this.pass1 = node}
                        />
                    </div>
                    <div className="form-group">
                        <input id="profilePassword2Field" type="password" className="form-control"
                               placeholder="Powtórz nowe hasło"
                               title="Powtórz nowe hasło"
                               pattern=".{8,64}"
                               readOnly={readOnlyMode}
                               ref={node => this.pass2 = node}
                        />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
                        <button disabled={readOnlyMode} type="button" className="btn btn-link"
                            onClick={()=>{this.onDeleteAccount()}}>Usuń konto</button>
                    </div>
                </div>
            </div>
            <div className="hr"/>
            <div className="align-cente text-center">
                <button disabled={readOnlyMode} id="profile-form-submit-button" type="submit" className="btn-enigmata">Zapisz</button>
                {/*{ this.props.user.userStatistics.assets > 0 &&*/}
                    {/*<button type="button" onClick={() => {this.props.history.push('/prize-payment')}} className="btn-enigmata ml-2">Wypłać wygrane</button> }*/}
            </div>
            <div className="modal fade" id="profile-msg-modal-id" role="dialog">
                <div className="modal-dialog">
                    <div className="white-bg panel-padding">
                        <div className="keyline text-center"><h2 ref={node => this.dialogTitle = node} /></div>
                        <div className="help-text" ref={node => this.dialogMessage = node} />
                        <div className="hr"/>
                        <div className="button-wrapper">
                            <button type="button" className="btn-enigmata" data-dismiss="modal">
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="profile-modal-delete-account-id" role="dialog">
                <div className="modal-dialog">
                    <div className="white-bg panel-padding">
                        <div className="keyline text-center"><h2>Usuń konto</h2></div>
                        <div className="help-text"><strong>UWAGA!</strong> Usunięcie konta spowoduje utratę wszystkich wygranych oraz punktów.</div>
                        <h3>Czy na pewno chcesz usunąć konto?</h3>
                        <div className="hr"/>
                        <div className="button-wrapper">
                            <button type="button" className="btn-enigmata" onClick={(e)=>{this.onDeleteAccountConfirmation(e)}}>
                                Usuń
                            </button>
                            <button type="button" className="btn-green ml-2" data-dismiss="modal">
                                Anuluj
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>);
    }
}

function mapStateToProps(state) {
    return {user: idx(state, _ => _.user), view: idx(state, _ => _.view.profile)};
}

export default withRouter(connect(mapStateToProps)(ProfileForm));

