import React from 'react';

const ID = "answer-sent-modal-id";

class RiddleIncorrectAnswerModal extends React.Component {

    render() {
        return (
            <div className="modal fade" id={ID} role="dialog">
                <div className="modal-dialog">
                    <div className="white-bg panel-padding">
                        <div className="keyline"><h2>Odpowiedź niepoprawna</h2></div>
                        <div className="answer-text">Zabawa trwa. Spróbuj jeszcze raz.</div>
                        <div className="hr"/>
                        <div className="button-wrapper">
                            <button type="button" className="btn-enigmata" data-dismiss="modal">OK</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount(){
        window.jQuery('#' + ID).modal({backdrop: 'static'});
    }

    componentWillUnmount() {
        window.jQuery('#' + ID).modal('hide');
    }
}

export default RiddleIncorrectAnswerModal;