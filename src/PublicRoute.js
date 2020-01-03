import React from 'react';
import idx from 'idx';
import { connect } from 'react-redux';
import {
    Route,
    withRouter
} from 'react-router-dom';

const PublicRoute =

    ({ component: Component, authenticated , ...rest }) => (
    <Route {...rest} render={ (props) => {
            window.jQuery('.modal').hide();
            window.jQuery('.modal-backdrop').remove();
            window.jQuery('.private').hide();
            window.jQuery('.public').show();
            setTimeout( ()=> {
                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            });

            return (<Component {...props}/>);
    }}/>
)


function mapStateToProps(state) {
    return { authenticated: (idx(state,_=>_.user.authenticated) === true) };
}

export default withRouter(connect(mapStateToProps)(PublicRoute));