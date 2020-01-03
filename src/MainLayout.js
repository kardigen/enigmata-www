import React from 'react';
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import idx from 'idx';
import Svg from "./Svg";
// import BuyCreditsButton from './BuyCreditsButton';
// import DismissPaymentButton from './DismissPaymentButton';
import RiddleListLayout from "./RiddleListLayout";
import {TRIAL_ACCOUNT_LOGIN} from "./LoginActions";
// import ThreeForStartButton from './ThreeForStartButton';
// import ThreeForFreeButton from './ThreeForFreeButton';

function MainLayout(props) {
    const currentRiddles = props.riddles || [];
    const userCredits = props.user.userStatistics.credits;
    const userCreditPlan = props.user.activated && props.user.currentCreditPlan;
    const trialMode = props.user.login === TRIAL_ACCOUNT_LOGIN;

    const userHavePayments =  !!userCreditPlan || !!props.user.payments && props.user.payments.length > 0;

    let currentCreditPlanSection = "";
    let dismissPayment = false;
    // let promoSection = "";

    if(userCreditPlan) {
        const paymentStatusCode = idx(userCreditPlan,_=>_.payment.statusCode);
        if(paymentStatusCode === 'init'){
            currentCreditPlanSection = 'Oczekuje na potwierdzenie płatności...';
            dismissPayment = true;
        } else if(paymentStatusCode === 'success' && userCredits > 0){
                currentCreditPlanSection = 'Pakiet: "' + idx(userCreditPlan,_=>_.creditPlan.header)
                    + " " + idx(userCreditPlan,_=>_.creditPlan.headerHint) + '"';
        } else if(paymentStatusCode === 'error'){
            currentCreditPlanSection = 'Płatność nie powiodła się.';
            dismissPayment = true;
        }
    }

    const trialSection =
    <div className="col-sx-12 text-center">
        <h2>Konto Testowe!</h2>
        <p>Tylko niektóre funkcje serwisu są dostępne.<br/>Zarejestruj się by korzystać ze wszystkich funkcji.</p>
        <button type="button" className="btn-enigmata" onClick={()=>{props.history.push('/register')}}>
            Rejestruj się teraz
        </button>
        <div className="col-xs-12 hr"/>
    </div>;

    // if(props.user.activated && !userHavePayments) {
    //     promoSection = <ThreeForStartButton/>
    // } else if(props.user.activated && userHavePayments
    //     && !(props.user.payments.find(p => p === 'promo-3-for-you'))
    //     && !(props.user.currentCreditPlan && props.user.currentCreditPlan.creditPlan.planCode === 'promo-3-for-you')) {
    //         promoSection = <ThreeForFreeButton/>
    // }

    let creditsSection = "";
    // let buyCreditsSection = "";
    if(props.isMobile) {

        // buyCreditsSection = <BuyCreditsButton />;
        //
        // if(dismissPayment){
        //     buyCreditsSection = <DismissPaymentButton />;
        // }

        // if(currentCreditPlanSection){
        //     currentCreditPlanSection = <div className="r14 text-center">{currentCreditPlanSection}</div>
        // }

        // creditsSection =
        //     <div className="row">
        //         {/*<div className="col-xs-12 user-credits r18">*/}
        //             {/*<div className="button-wrapper mt-1 mb-1">*/}
        //                 {/*{buyCreditsSection}*/}
        //             {/*</div>*/}
        //         {/*</div>*/}
        //         {/*{!!promoSection && <div className="hr-xs col-xs-12" />}*/}
        //         {/*{!!promoSection && <div className="col-xs-12 user-credits r18">*/}
        //                 {/*<div className="button-wrapper mt-1 mb-1">*/}
        //                     {/*{promoSection}*/}
        //                 {/*</div>*/}
        //             {/*</div> }*/}
        //         <div className="hr-xs col-xs-12" />
        //         <div className="col-xs-12 user-credits r18" style={{padding:'10px'}}>
        //             <div style={{display: 'flex', alignItems: 'flex-start'}}>
        //                 <Svg style={{width: '34px', height: '34px'}} href={'#kredyt-solo'}/>
        //                 <span className="padl-2">Twoje kredyty: {userCredits}</span>
        //             </div>
        //             {currentCreditPlanSection}
        //         </div>
        //     </div>
    } else {

        // buyCreditsSection = <BuyCreditsButton />;
        //
        // if(dismissPayment){
        //     buyCreditsSection=<DismissPaymentButton />;
        // }

        // if(currentCreditPlanSection){
        //     currentCreditPlanSection = <div className="padl-2 r14 text-center">{currentCreditPlanSection}</div>
        // }


        // creditsSection =
        //     <div className="row">
        //         <div className="col-md-5 col-sm-5 user-credits r18 pb-1 pt-1"
        //              style={{minHeight: '90px', display: 'flex',
        //                     alignItems: 'center', justifyContent: 'space-around', flexWrap:'wrap'}}>
        //             <Svg style={{width: '36px', height: '36px'}} href={'#kredyt-solo'}/>
        //             <span className="padl-2 padr-2">Twoje kredyty: {userCredits}</span>
        //             {currentCreditPlanSection}
        //         </div>
        //         {/*<div className="col-md-6 col-md-offset-1 col-sm-6 col-sm-offset-1 user-credits r18"*/}
        //              {/*style={{height: '90px',display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>*/}
        //             {/*{buyCreditsSection}*/}
        //             {/*/!*{promoSection}*!/*/}
        //         {/*</div>*/}
        //     </div>
    }

    return(
        <div className="white-bg panel-padding riddles-list">
            <h1>Zagadki</h1>
            {trialMode && <div className="hr"/>}
            {/*{!trialMode && creditsSection}*/}
            {trialMode && trialSection}

            <RiddleListLayout riddles={currentRiddles} />
        </div>
            );
}

function mapStateToProps(state) {
    return {
        isMobile: idx(state,_=>_.browser.lessThan.medium)
    };
}

export default withRouter(connect(mapStateToProps)(MainLayout));