import React from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import {parseRiddleHashId} from "./parseRiddleHashId";
import {fetchRiddleResult} from "./RiddleActions";
import RiddleResultLayout from "./RiddleResultLayout";
import RiddleAwaitResultLayout from "./RiddleAwaitResults";

class RiddleResultController extends React.Component {
    render () {
        const riddleHashObject = parseRiddleHashId(this.props.riddleHashId);
        if( riddleHashObject.endDate > Date.now() + this.props.system.serverTimeOffset ){
            return (<Redirect to={"/riddle/" + this.props.riddleHashId}/>);
        } else{
            const results = this.props.riddleResults;
            if(results.cache && results.cache[this.props.riddleHashId]) {
                return(<RiddleResultLayout riddle={results.cache[this.props.riddleHashId]} user={this.props.user}/>);
            } else {
                const { dispatch } = this.props;
                dispatch( fetchRiddleResult(riddleHashObject.riddleId));
                return(<RiddleAwaitResultLayout riddleNo={riddleHashObject.riddleNo} riddleEndDate={riddleHashObject.endDate}/>)
            }
        }
    }
}

function mapStateToProps(state) {
    return {riddleResults: state.riddleResults, system: state.system, user: state.user};
}

export default connect(mapStateToProps)(RiddleResultController);
