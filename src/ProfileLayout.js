import React , {Fragment} from 'react'
import ProfileForm from "./ProfileForm";
import StatisticsLayout from "./StatisticsLayout";

function ProfileLayout(props) {

    return (<Fragment>
        <StatisticsLayout userStatistics={props.user.userStatistics} />
        <div className="white-bg panel-padding mb-4 pb-4 col-md-offset-2 col-md-8 col-xs-12">
            <div className="modal-body">
                <div><h1>Profil</h1></div>
                <div className="hr"/>
                <ProfileForm />
            </div>
        </div>
    </Fragment>);
}

export default ProfileLayout;