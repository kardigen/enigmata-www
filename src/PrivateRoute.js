import React from 'react';
import idx from 'idx';
import { connect } from 'react-redux';
import {
    Route,
    Redirect,
    withRouter
} from 'react-router-dom';


const PrivateRoute =

    ({ component: Component, authenticated, isMobile, noScroll, ...rest }) => (
        <Route {...rest} render={ (props) => {
            if (authenticated === true) {
                window.jQuery('.modal').hide();
                window.jQuery('.modal-backdrop').remove();
                window.jQuery('.public').hide();
                window.jQuery('.private').show();
                if(!noScroll) {
                    setTimeout(() => {
                        // scroll to top
                        const top = (isMobile ? 70 : 130);
                        if( isMobile || window.scrollY > top ) {
                            window.scroll({
                                top: top,
                                left: 0,
                                behavior: 'smooth'
                            });
                        }
                    });
                }

                return (<Component {...props}/>)
            } else {
                return (<Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>)
            }
        }}/>
);


function mapStateToProps(state) {
    return { authenticated: (idx(state,_=>_.user.authenticated) === true), isMobile: idx(state,_=>_.browser.lessThan.medium) };
}

export default withRouter(connect(mapStateToProps)(PrivateRoute));