import React from 'react'
import {connect} from "react-redux"
import idx from "idx/lib/idx";
import {dismissCurrentPaymentRequest} from "./BuyCreditsActions";

function DismissPaymentButton (props) {

    return(<button onClick={(e) => {
        props.dispatch(dismissCurrentPaymentRequest())
        if(props.onClick){
            props.onClick();
        }
    }} className="btn-green">Anuluj Płatność</button>)
}

function mapStateToProps(state) {
    return {
        isMobile: idx(state,_=>_.browser.lessThan.medium)
    };
}

export default connect(mapStateToProps)(DismissPaymentButton);