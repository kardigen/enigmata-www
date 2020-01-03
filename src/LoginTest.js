import React from 'react';
import idx from 'idx';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import {tryLogin, TRIAL_ACCOUNT_LOGIN, TRIAL_ACCOUNT_PASS, logout} from './LoginActions';


class LoginTest extends React.Component{

    componentDidUpdate(){
        const authenticated = idx(this.props, _ => _.user.authenticated);
        if( authenticated ) {
            this.props.history.push("/home")
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(logout());
        dispatch( tryLogin( { login: TRIAL_ACCOUNT_LOGIN, password: TRIAL_ACCOUNT_PASS }));
    }

    render() {
        return (null)
    }
}

function mapStateToProps(state) {
    return { user: state.user, view: idx(state,_=>_.view.login) };
}

export default withRouter(connect(mapStateToProps)(LoginTest));

