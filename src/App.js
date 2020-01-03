import React from 'react';
import { connect } from 'react-redux';
import {HashRouter as Router} from 'react-router-dom';
import InfoModal from './InfoModal';
import ConnectionErrorModal from './ConnectionErrorModal';
import Timer from './Timer'
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute'
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import LoginTest from './LoginTest';
import Logout from './Logout';
import MainController from "./MainController";
import RiddleController from "./RiddleController";
import ProfileController from "./ProfileController";
import RiddleResultController from './RiddleResultController';
import StatisticsController from "./StatisticsController";
import VerificationModal from './VerificationModal';
// import BuyCreditsView from './BuyCreditsView';
// import ThreeForStartView from "./ThreeForStartView";
// import ThreeForYouView from "./ThreeForYouView";
// import PaymentController from "./PaymentController";
import ResetPasswordModal from "./ResetPasswordModal";
import ChangePasswordModal from "./ChangePasswordModal";
// import PrizePaymentView from './PrizePaymentView';
import {closeBuyCreditsView} from "./BuyCreditsActions";
import {profileViewReset} from "./ProfileAction";
import {riddleViewClose} from "./RiddleActions";


class AppController extends React.Component {

    setNavOptionActive(option) {
        window.jQuery('.m-nav-btn').removeClass('m-nav-btn-active');
        window.jQuery('#' + option).addClass('m-nav-btn-active');
    }

    render(){

        const ShowLoginModalRule = () => {
            return(<LoginModal />)
        };

        const ShowRegisterModalRule = (props) => {
            return(<RegisterModal />)
        };

        const ChangePasswordRule = ({match}) => {
            return (<ChangePasswordModal token={match.params.token}/>);
        };

        const ShowResetPassword = () => {
            return(<ResetPasswordModal/>)
        };

        const LoginTestRule = () => {
                return (<LoginTest/>);
        };

        const LogoutRule = () => {
            return (<Logout/>);
        };

        const ShowHomeRule = () => {
            const {dispatch} = this.props;
            dispatch(riddleViewClose());
            dispatch(closeBuyCreditsView());
            this.setNavOptionActive('m-nav-home');
            return(<MainController/>)
        };


        const ShowProfile = () => {
            const {dispatch} = this.props;
            dispatch(riddleViewClose());
            dispatch(closeBuyCreditsView());
            this.setNavOptionActive('m-nav-profile');
            return(<ProfileController/>)
        };

        const ShowStatsRule = ({match}) => {
            const {dispatch} = this.props;
            dispatch(riddleViewClose());
            dispatch(closeBuyCreditsView());
            this.setNavOptionActive('m-nav-statistics');
            return (<StatisticsController pageNo={match.params.pageNo}/>)
        };

        // const BuyCreditsRule = () => {
        //     const {dispatch} = this.props;
        //     dispatch(closeBuyCreditsView());
        //     return(<BuyCreditsView />)
        // };

        // const PrizePaymentRule = () => {
        //     const {dispatch} = this.props;
        //     dispatch(profileViewReset());
        //     return(<PrizePaymentView />)
        // };

        // const ShowPaymentConfirmationRule = ({match}) => {
        //     return (<PaymentController paymentId={match.params.paymentTransactionId}/>);
        // };

        const ShowRiddle = ({match}) => {
            return (<RiddleController riddleHashId={match.params.riddleHashId}/>);
        };

        const ShowRiddleResultRule = ({match}) => {
            return (<RiddleResultController riddleHashId={match.params.riddleHashId}/>);
        };

        const ShowLandingPageRule = () => {
            return (null);
        };

        const VerifyRule = ({match}) => {
            return (<VerificationModal token={match.params.token}/>)
        };

        // const ShowThreeForStartRule = () => {
        //     return (<ThreeForStartView/>)
        // };
        //
        // const ShowThreeForYouRule = () => {
        //     return (<ThreeForYouView/>)
        // };

        return(
            <section>
                <Timer />
                <InfoModal/>
                <ConnectionErrorModal/>
                <Router>
                    <React.Fragment>
                        <PublicRoute exact path="/verify-email/:token" component={VerifyRule} />
                        <PublicRoute exact path="/register" component={ShowRegisterModalRule} />
                        <PublicRoute exact path="/login" component={ShowLoginModalRule} />
                        <PublicRoute exact path="/login-test" component={LoginTestRule} />
                        <PublicRoute exact path="/logout" component={LogoutRule} />
                        <PublicRoute exact path="/change-password/:token" component={ChangePasswordRule}/>
                        <PublicRoute exact path="/reset-password" component={ShowResetPassword}/>
                        <PublicRoute exact path="/" component={ShowLandingPageRule}/>
                        <PrivateRoute exact path="/home" noScroll={true} component={ShowHomeRule}  />
                        <PrivateRoute exact path="/profile" component={ShowProfile}  />
                        <PrivateRoute exact path="/statistics/:pageNo?" component={ShowStatsRule}  />
                        {/*<PrivateRoute exact path="/buy-credits" component={BuyCreditsRule}  />*/}
                        {/*<PrivateRoute exact path="/prize-payment" component={PrizePaymentRule}  />*/}
                        <PrivateRoute exact path="/riddle/:riddleHashId" component={ShowRiddle} />
                        <PrivateRoute exact path="/result/:riddleHashId" component={ShowRiddleResultRule} />
                        {/*<PrivateRoute exact path="/buy-credits-transaction/:paymentTransactionId" component={ShowPaymentConfirmationRule} />*/}
                        {/*<PrivateRoute exact path="/promo-3ForStart" component={ShowThreeForStartRule}/>*/}
                        {/*<PrivateRoute exact path="/promo-3ForFree" component={ShowThreeForYouRule}/>*/}

                    </React.Fragment>
                </Router>
            </section>
        )
    }
}

function mapStateToProps(state) {
    // return { authenticated: idx(state,_=>_.user.authenticated) };
    return {}
}

export default connect(mapStateToProps)(AppController);
