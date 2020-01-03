import React from 'react';
import { connect } from 'react-redux';
import {Redirect,withRouter} from 'react-router-dom';
import {logout} from './LoginActions';


class Logout extends React.Component{

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch( logout() );
    }

    render() {
        return <Redirect to="/"/>

    }
}

function mapStateToProps(state) {
    return {  };
}

export default withRouter(connect(mapStateToProps)(Logout));
