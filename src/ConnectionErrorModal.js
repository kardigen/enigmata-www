import React from 'react';
import idx from 'idx';
import { connect } from 'react-redux';
import {clearConnectionError} from "./ErrorActions";

const ID = "connection-error-modal-id";

class ConnectionErrorModal extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(clearConnectionError());

        // window.jQuery('#' + ID).on('show.bs.modal', (e) => {
        //     this.jQmodalsToHide = window.jQuery(".modal").filter(function() { return window.jQuery(this).css("display") === "block" });
        //     if (this.jQmodalsToHide) this.jQmodalsToHide.modal('hide');
        // });
        //
        // window.jQuery('#' + ID).on('hide.bs.modal', (e) => {
        //     if (this.jQmodalsToHide) this.jQmodalsToHide.modal('show');
        //     dispatch(clearConnectionError());
        //     this.jQmodalsToHide = null;
        // });

    }

    componentDidUpdate() {
        if(this.props.errors.connectionError) {
            window.jQuery('#' + ID).modal({backdrop: 'static'});
        }
    }

    render() {
        return (

            <div className="modal fade" id={ID} role="dialog">
                <div className="modal-dialog">
                    <div className="white-bg panel-padding">
                        <div className="text-center"><h2>Błąd połączenia z serwisem</h2></div>
                        <div className="hr"/>
                        <div className="help-text">Sprawdź połączenie z internetem i spróbuj ponownie.</div>
                        <div className="hr"/>
                        <div className="button-wrapper">
                            <button type="button" className="btn btn-lg btn-primary" data-dismiss="modal"
                                onClick={()=>{
                                    const { dispatch } = this.props;
                                    dispatch(clearConnectionError());
                                }}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ConnectionErrorModal.ID = ID;

function mapStateToProps(state) {
    return { errors: idx(state,_=>_.errors) || {}};
}

export default connect(mapStateToProps)(ConnectionErrorModal);
