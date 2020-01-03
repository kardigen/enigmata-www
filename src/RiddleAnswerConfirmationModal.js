import React from 'react';
import idx from 'idx';
import { connect } from 'react-redux';
import {SEND_ANSWER_CANCEL, sendRiddleAnswer} from "./RiddleActions";

const ID = "answer-send-confirmation-modal-id";

class RiddleAnswerConfirmationModal extends React.Component{

    constructor(params){
        super(params);
        this.handleRiddleSendConfirmed = this.handleRiddleSendConfirmed.bind(this);
        this.handleRiddleSendCancel = this.handleRiddleSendCancel.bind(this);
    }

    handleRiddleSendConfirmed(e){
        const button = e.target;
        window.jQuery(button).attr("disabled", true);
        setTimeout(() => {
            window.jQuery(button).attr("disabled", false);
        }, 5000);

        const { dispatch } = this.props;
        dispatch( sendRiddleAnswer(idx(this.props,_=>_.riddle.riddleId),idx(this.props,_=>_.view.userAnswer),this.props.user ));
    }

    handleRiddleSendCancel(){
        const { dispatch } = this.props;
        dispatch( {type: SEND_ANSWER_CANCEL});
    }




    render() {
        var answer = 'Odpowiedź pusta! Popraw i wyślij ponownie.';
        const userAnswer = idx(this.props,_=>_.view.userAnswer);
        const isAnswerValid = userAnswer && typeof userAnswer === 'string' && userAnswer.length > 0;
        if (isAnswerValid) {
            answer = '"' + userAnswer + '"';
        }
        var optionalButton = "";
        if (isAnswerValid) {
            optionalButton =
                <button type="button" className="btn-enigmata ml-3" onClick={this.handleRiddleSendConfirmed}>
                    Wyślij</button>;
        }

        return (
            <div className="modal fade" id={ID} role="dialog">
                <div className="modal-dialog">
                    <div className="white-bg panel-padding">
                        <div className="keyline"><h2>Sprawdź odpowiedź</h2></div>
                        <div className="answer-text">{answer}</div>
                        <div className="hr"/>
                        <div className="button-wrapper">
                            <button type="button" className="btn-enigmata" data-dismiss="modal" onClick={this.handleRiddleSendCancel} >Anuluj</button>
                            {optionalButton}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount(){
        // eslint-disable-next-line
        window.jQuery('#' + ID).modal({backdrop: 'static'});
    }

    componentWillUnmount() {
        // eslint-disable-next-line
        window.jQuery('#' + ID).modal('hide');
    }
}

//RiddleAnswerConfirmationModal.ID = ID;

function mapStateToProps(state) {
    return { riddle: state.currentRiddle, user: state.user,  view: idx(state,_=>_.view.riddle) };
}

export default connect(mapStateToProps)(RiddleAnswerConfirmationModal);