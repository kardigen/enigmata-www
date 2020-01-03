import React from 'react';
import idx from 'idx';
import { connect } from 'react-redux';
import RiddleAnswerConfirmationModal from "./RiddleAnswerConfirmationModal";
import RiddleIncorrectAnswerModal from "./RiddleIncorrectAnswerModal";
import {
    openSendAnswerConfirmation, SEND_ANSWER_CONFIRMATION, SEND_ANSWER_SEND
} from "./RiddleActions";

class RiddleAnswerForm extends React.Component {
    constructor(props){
        super(props);
        this.state = { answer :'' };
    }

    handleRiddleSend(answer){
        const { dispatch } = this.props;
        dispatch( openSendAnswerConfirmation(answer));
    }

    render() {

        let modalComponent = "";
        const viewStatus = idx(this.props,_=>_.view.status);
        switch (viewStatus)
        {
            case SEND_ANSWER_CONFIRMATION: {
                modalComponent = <RiddleAnswerConfirmationModal/>;
                break;
            }

            case SEND_ANSWER_SEND: {
                modalComponent = <RiddleIncorrectAnswerModal/>;
                break;
            }

            default:
                break;
        }

        let answerInput;
        return(
            <div className="col-xs-12">
                <form onSubmit={ (e) => {e.preventDefault();}} >
                    <div className="form-group">
                        <label>Twoja odpowiedź</label>
                        <input  type="text" className="form-control" maxLength="100" ref={node => {answerInput = node}}/>
                    </div>

                    <hr/>
                    <div className="button-wrapper">
                        <button className="btn-enigmata"
                                onClick={ (e) => { e.preventDefault(); this.handleRiddleSend(answerInput.value.trim())}}
                            >Wyślij Odpowiedź</button>
                    </div>
                    {modalComponent}
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { riddle: state.currentRiddle, user: state.user,  view: idx(state,_=>_.view.riddle) };
}

export default connect(mapStateToProps)(RiddleAnswerForm);
