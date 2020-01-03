import React from 'react';

class ModalShowController extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        // eslint-disable-next-line
        window.jQuery('#' + this.props.showID).modal({
            backdrop: false,
            keyboard: false
        });
    }

    componentWillUnmount() {
        window.jQuery('#' + this.props.showID).modal('hide');
    }

    render(){
        return(<div>{this.props.children}</div>);
    }

}

export default ModalShowController;