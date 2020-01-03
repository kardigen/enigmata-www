import React from 'react'
import Svg from './Svg'
import DismissPaymentButton from './DismissPaymentButton';

function PaymentLayout(props) {

    let message = <div className={'payment-layout'}>
        <Svg style={{width: '130px', height: '130px'}} href={'#platnosc_czekaj'}/>
        <div className={'r18 text-center'}>Poczekaj na potwierdzenie transakcji...</div>
        <div className="button-wrapper mt-1 mb-1">
            <button type="button" className="btn-green" onClick={props.onClose}>
                Powrót
            </button>
        </div>
    </div>;
    if(props.status === 'OK') {
        message = <div className={'payment-layout'}>
            <Svg style={{width: '130px', height: '130px'}} href={'#platnosc_zaplacono'}/>
            <div className={'r18 text-center'}>Płatność potwierdzona!</div>
            <div className="button-wrapper mt-1 mb-1">
                <button type="button" className="btn-green" onClick={props.onClose}>
                    Powrót
                </button>
            </div>
        </div>
    } else if (props.status ===  'postponed') {
        message = <div className={'payment-layout'}>
            <Svg style={{width: '130px', height: '130px'}} href={'#platnosc_brak'}/>
            <div className={'r18 text-center'}>Niestety nie mamy jeszcze informacji o twojej płatności. Poczekaj na e-mail z potwierdzeniem transakcji.</div>
            <div className="button-wrapper mt-1 mb-1">
                <button type="button" className="btn-green" onClick={props.onClose}>
                    Powrót
                </button>
            </div>
        </div>
    } else if (props.status ===  'error') {
        message = <div className={'payment-layout'}>
            <Svg style={{width: '130px', height: '130px'}} href={'#platnosc_brak'}/>
            <div className={'r18 text-center'}>Niestety płatność nie powiodła się. Anuluj płatność i spróbuj zakupić pakiet jeszcze raz lub skontaktuj się z nami w celu wyjaśnienia.</div>
            <div className="button-wrapper mt-1 mb-1">
                <DismissPaymentButton onClick={props.onClose}/>
                <button type="button" className="btn-green ml-2" onClick={props.onClose}>
                    Powrót
                </button>
            </div>
        </div>
    }

    return (
        <div className="white-bg panel-padding col-sx-12 col-lg-offset-1 col-lg-9">
            <div><h3 className="text-center">Status twojej płatności</h3></div>
            <div className="hr"/>
            {message}
        </div>);
}

export default PaymentLayout;