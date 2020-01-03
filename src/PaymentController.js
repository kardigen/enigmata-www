import React from 'react';
import idx from 'idx';
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom"

import PaymentLayout from "./PaymentLayout";
import {verifyPaymentStatus} from "./PaymentActions";

class PaymentController extends React.Component {

    componentDidMount() {

        const {dispatch} = this.props;
        dispatch(verifyPaymentStatus(this.props.paymentId));
    }

    render () {
        return(<PaymentLayout
            status={this.props.paymentStatus}
            currentCreditPlan={this.props.currentCreditPlan}
            onClose={()=>{this.props.history.push('/home')}}
        />)
    }
}

function mapStateToProps(state) {
    return {
        paymentStatus: idx(state, _ => _.view.payment.status),
        currentCreditPlan: idx(state, _ => _.user.currentCreditPlan)
    };
}

export default withRouter(connect(mapStateToProps)(PaymentController));