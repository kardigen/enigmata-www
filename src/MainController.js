
import {firstTimeLoginDone} from "./LoginActions";
import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";
import idx from 'idx';
import MainLayout from './MainLayout';
import {fetchMainData, saveRiddleListY} from "./HomeAction";
import {fetchUserProfileData} from "./ProfileAction";


class MainController extends React.Component {

    constructor(props) {
        super(props);
        this.showInfoModal = this.showInfoModal.bind(this);
    }

    componentDidMount() {

        const { dispatch } = this.props;
        dispatch(fetchMainData());
        // dispatch(fetchUserProfileData());

        const firstTimeLogin = idx(this.props,_=>_.user.firstTimeLogin);
        if(firstTimeLogin) {
           this.showInfoModal();
        }
        dispatch(firstTimeLoginDone());

        setTimeout( () => {
            const scrollToElement = window.jQuery("div[data-riddle-last-finished='true']");
            const topScroll = this.props.view.yPosition
                || scrollToElement.length > 0 && scrollToElement && scrollToElement.offset().top - 15
                || this.props.isMobile && 70 || 150;
            window.scroll({
                top: topScroll,
                left: 0,
                behavior: 'smooth'
            });
            dispatch(saveRiddleListY());
        });
    }

    showInfoModal(){
        window.jQuery('#home-info-modal-id').modal({backdrop: "static"});
    }

    render(){
        return (<div>
            <MainLayout riddles={this.props.riddles} user={this.props.user} />;
        </div>);
    }

}

function mapStateToProps(state) {
    return { riddles: state.riddles, user: state.user,  view: idx(state,_=>_.view.home), isMobile: idx(state, _=>_.browser.lessThan.medium) };
}

export default withRouter(connect(mapStateToProps)(MainController));
