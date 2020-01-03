// import React from 'react';
// import {withRouter} from "react-router-dom";
// import {connect} from 'react-redux';
// import idx from "idx/lib/idx";
// import {buyCreditsRequest, closeBuyCreditsView} from "./BuyCreditsActions";
// import BuyCreditsButton from './BuyCreditsButton';
//
// class ThreeForYouView extends React.Component {
//
//     constructor(props){
//         super(props);
//     }
//
//     clearView(){
//         window.jQuery('#promo-agreement').prop('checked',false);
//         window.jQuery('#accept-promo-button').prop('disabled', true);
//     }
//
//     closeView(){
//         this.clearView();
//         window.jQuery('#promo-343-view-error-id').modal('hide');
//         window.jQuery('#promo-343-view-success-id').modal('hide');
//         this.props.dispatch(closeBuyCreditsView());
//         this.props.history.push("/home")
//     }
//
//     onAcceptPromotion(){
//         window.jQuery('#accept-promo-button').attr("disabled", true);
//         setTimeout(() => {
//             window.jQuery('#accept-promo-button').attr("disabled", false);
//         }, 5000);
//
//         const { dispatch } = this.props;
//         dispatch(buyCreditsRequest('promo-3-for-you','000000000'))
//     }
//
//     componentDidMount() {
//         if(!idx(this.props,_=>_.user.activated)) {
//             this.clearView();
//             this.props.history.replace("/home")
//         }
//     }
//
//     componentDidUpdate() {
//         if(idx(this.props,_=>_.view.error) || idx(this.props,_=>_.view.transactionInProgress)){
//             window.jQuery('#promo-343-view-error-id').modal({backdrop: "static"});
//         } else if(idx(this.props,_=>_.view.redirect)) {
//             window.jQuery('#promo-343-view-success-id').modal({backdrop: "static"});
//         }
//     }
//
//     render(){
//
//         let available = false;
//
//         if(this.props.user.activated && this.props.user.currentCreditPlan
//             && this.props.user.currentCreditPlan.payment.statusCode === 'success'
//             && !(this.props.user.payments.find(p => p === 'promo-3-for-you'))
//             && !(this.props.user.currentCreditPlan && this.props.user.currentCreditPlan.creditPlan.planCode === 'promo-3-for-free')
//             && !(this.props.user.currentCreditPlan && this.props.user.currentCreditPlan.creditPlan.planCode === 'promo-3-for-you')) {
//
//             available = true;
//         }
//
//         return(
//                 <div className="white-bg panel-padding col-xs-12 col-md-offset-2 col-md-8 panel-group">
//                     <h1 className="text-center">Promocja<br/>"Trzy dla Ciebie"</h1>
//                     <div className="col-xs-12 hr" />
//                     <div className="col-xs-12">
//                         <p className="r18 text-center">Otrzymasz <strong>3 bezpłatne dodatkowe kredyty</strong> do twojego płatnego planu kredytów</p>
//                         <p className="r18 text-center">Aby skorzystać z promocji <strong>musisz posiadać wykupiony pakiet kredytów</strong>. Z oferty można skorzystać tylko raz. Szczegóły w regulaminie promocji.</p>
//                     </div>
//                     {available && <form onSubmit={(e) => { e.preventDefault();
//                         this.onAcceptPromotion();}} action="">
//                         <div className="col-xs-12">
//                             <div className="checkbox">
//                                 <label>
//                                     <input id="promo-agreement" type="checkbox" required style={{transform:'scale(1.2)'}}
//                                            onChange={ (e) => {
//                                                if (e.target.checked) {
//                                                    window.jQuery('#accept-promo-button').prop('disabled', false);
//                                                } else {
//                                                    window.jQuery('#accept-promo-button').prop('disabled', true);
//                                                }
//                                            }
//                                            }/>Akceptuje <a target="_blank" href="/regulamin_promocji_trzy_dla_ciebie.html">regulamin promocji</a> oraz <a target="_blank" href="/regulamin_zakupu_kredytow.html">regulamin zakupu kredytów</a>
//                                 </label>
//                             </div>
//                         </div>
//                         <div className="col-xs-12 hr"/>
//                         <div className="col-xs-12 button-wrapper">
//                             <button type="button" className="btn-enigmata" data-dismiss="modal"
//                                     onClick={(e)=>{e.preventDefault();this.closeView()}}>Powrót</button>
//                             <button id="accept-promo-button" type="submit" className="btn-enigmata ml-2" disabled={true}>
//                                 Start
//                             </button>
//                         </div>
//                     </form>}
//                     {!available && <section>
//                         <div className="col-xs-12">
//                             <div className="checkbox">
//                                 Zapoznaj się z <a target="_blank" href="/regulamin_promocji_trzy_dla_ciebie.html">regulaminem promocji</a> oraz <a target="_blank" href="/regulamin_zakupu_kredytow.html">regulamin zakupu kredytów</a>
//                             </div>
//                         </div>
//                         <div className="col-xs-12 hr"/>
//                         <div className="col-xs-12 button-wrapper">
//                             <button type="button" className="btn-enigmata mr-2" data-dismiss="modal"
//                                     onClick={(e) => {
//                                         e.preventDefault();
//                                         this.closeView()
//                                     }}>Powrót
//                             </button>
//                             <BuyCreditsButton />;
//                         </div>
//                         </section>
//                     }
//
//                     <div className="modal fade in" id="promo-343-view-success-id" role="dialog">
//                         <div className="modal-dialog">
//                             <div className="white-bg panel-padding">
//                                 <div className="keyline text-center"><h3>Gratulacje!</h3></div>
//                                 <div className="text-center">
//                                     <p className="r18">Twoje kredyty zostały uaktualnione.</p>
//                                     <p className="r18">Dobrej zabawy!</p>
//                                 </div>
//                                 <div className="hr" />
//                                 <div className="row">
//                                     <div className="col-xs-12 button-wrapper">
//                                         <button type="button" className="btn-green" data-dismiss="modal"
//                                                 onClick={(e)=>{e.preventDefault();this.closeView()}}
//                                         >OK</button>
//                                     </div>
//
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className="modal fade in" id="promo-343-view-error-id" role="dialog">
//                         <div className="modal-dialog">
//                             <div className="white-bg panel-padding">
//                                 <div className="keyline text-center"><h3>Przykro nam :-(</h3></div>
//                                 <div className="text-center">
//                                     <p className="r18">Konto nie spełnia warunków promocji.</p>
//                                     <p className="r18">Pamiętaj że możesz skorzystać z promocji tylko jeden raz.</p>
//                                 </div>
//                                 <div className="hr" />
//                                 <div className="row">
//                                     <div className="col-xs-12 button-wrapper">
//                                         <button type="button" className="btn-green" data-dismiss="modal"
//                                                 onClick={(e)=>{e.preventDefault();this.closeView()}}
//                                         >OK</button>
//                                     </div>
//
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//
//                 </div>
//         )
//     }
// }
//
// function mapStateToProps(state) {
//     return {user: state.user, view: state.view.buyCredits};
// }
//
// export default withRouter(connect(mapStateToProps)(ThreeForYouView));
