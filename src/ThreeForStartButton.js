import React from 'react'
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';

function ThreeForStartButton (props) {
    return(
        props.activated ?
            <button className="btn-green" onClick={()=>{props.history.push("/promo-3ForStart")}}>Promocja "Trzy na start"</button>
            : null
    )
}

function mapStateToProps(state) {
    return {activated: state.user.activated};
}

export default withRouter(connect(mapStateToProps)(ThreeForStartButton));