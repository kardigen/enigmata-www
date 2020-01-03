import React from 'react';
import idx from 'idx';
import { connect } from 'react-redux';


import ProfileLayout from "./ProfileLayout";
import {fetchUserProfileData} from "./ProfileAction";

class ProfileController extends React.Component {

    componentDidMount() {

        const {dispatch} = this.props;
        dispatch(fetchUserProfileData(this.props.user));
    }

    render () {
        return(<ProfileLayout user={this.props.user}/>)
    }
}

function mapStateToProps(state) {
    return {user: idx(state,_=>_.user)} ;
}

export default connect(mapStateToProps)(ProfileController);
