import React, {Fragment} from 'react';
import idx from 'idx';
import { connect } from 'react-redux';

import StatisticsLayout from "./StatisticsLayout";
import RankingsLayout from "./RankingsLayout";
import {fetchRankingsData, fetchUserStatisticData} from "./RankingsAction";

class StatisticsController extends React.Component {

    componentDidMount() {

        const {dispatch} = this.props;
        dispatch(fetchRankingsData());
        dispatch(fetchUserStatisticData(this.props.user));
    }

    render () {
        const pageNo = +(this.props.pageNo || 0);
        return(<RankingsLayout statistics={ this.props.statistics} userStatistics={this.props.user.userStatistics} userRankings={this.props.userRankings} pageNo={pageNo}/>)
    }
}

function mapStateToProps(state) {
    const statistics = idx(state,_=>_.statistics.data);
    const user = idx(state,_=>_.user);

    const userGeneralRanking = idx(statistics,_=>_.statsAllDays.filter( ranking => ranking.eid === user.eid ));
    const last7DaysRank = idx(statistics,_=>_.stats7Days.filter( ranking => ranking.eid === user.eid ));
    const last30DaysRank = idx(statistics,_=>_.stats30Days.filter( ranking => ranking.eid === user.eid ));

    const userRankings = {
        generalRankNo : idx(userGeneralRanking,_=>_[0].rankNo),
        last7DaysRankNo : idx(last7DaysRank,_=>_[0].rankNo),
        last30DaysRankNo : idx(last30DaysRank,_=>_[0].rankNo)
    };

    return {statistics:statistics, user: user,userRankings: userRankings } ;
}

export default connect(mapStateToProps)(StatisticsController);
