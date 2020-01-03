import React from 'react'
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';

function ThreeForFreeButton (props) {

    return(
        props.activated ?
            <button className="btn-green" onClick={()=>{props.history.push("/promo-3ForFree")}}>Promocja "Trzy dla Ciebie"</button>
            : null
    )
}

function mapStateToProps(state) {
    return {activated: state.user.activated};
}

export default withRouter(connect(mapStateToProps)(ThreeForFreeButton));