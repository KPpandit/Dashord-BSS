import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute, PublicRoute } from '../helper';
import Loginform from '../Loginform';
import Sidenavbar from '../SidenaveBar/Sidenavbar';

import Agent from '../pages/Agent/Agent';
import Invoice from '../pages/INVOICE/Invoice';
import Orders from '../pages/ORDERS/Orders';
import Billing from '../pages/BILLING/Billing';
import Mediation from '../pages/MEDIATION/Mediation';
import Report from '../pages/Report/Report';
import Discount from '../pages/DISCOUNT/Discount';
import Customer from '../pages/Customer/Customer';
import AddNewCustomer from '../pages/Customer/AddNewCustomer';
import Payment from '../pages/Payment/Payment';
import Product from '../pages/Product/Product';
import AddAgent from '../pages/Agent/AddAgent';
import AddCustomerDetails from '../pages/Customer/AddCustomerDetails';
import DisplayBilling from '../pages/BILLING/DisplayBilling';
import Plan from '../pages/Plan/Plan';
import AddCategory from '../pages/Product/AddCategory';
import Configuration from '../pages/Configurations/Configuration';
import AddAccountType from '../pages/Configurations/AccountType/AddAccountType';
import AccountType from '../pages/Configurations/AccountType/AccountType';
import AddEnumeration from '../pages/Configurations/Enumeration/AddEnumeration';
import InvoiceDisplay from '../pages/Configurations/Invoice Display/InvoiceDisplay';
import AddCustomMetaField from '../pages/Configurations/CustomMetaField/AddCustomMetaField';
import AddmetaFieldGroup from '../pages/Configurations/MetaFieldGroup/AddmetaFieldGroup';
import AddCategoryNotification from '../pages/Configurations/Notification/AddCategory';
import Notification from '../pages/Configurations/Notification/Notification';
import AddOrderChangeType from '../pages/Configurations/OrderChangeType/AddOrderChangeType';
import AddUser from '../pages/Configurations/Users/AddUser';
import AddPlugin from '../pages/Configurations/Plugin/AddPlugin';
import AddPaymentMethod from '../pages/Configurations/Payment Method/AddPaymentMethod';
import ShowCommision from '../pages/Agent/ShowCommision';
import EditAgent from '../pages/Agent/EditAgent';
import AddSubAgent from '../pages/Agent/AddSubAgent';
import UserCodes from '../pages/Agent/UserCodes/UserCodes';
import AddUserCode from '../pages/Agent/UserCodes/AddUserCode';
import EditUserCode from '../pages/Agent/UserCodes/EditUserCode';
import AddPayment from '../pages/Payment/AddPayment';
import AvailablePlan from '../pages/Available Plan/AvailablePlan';
import EditCustomerDetails from '../pages/Customer/EditCustomerDetails';
import CreateOrder from '../pages/ORDERS/CreateOrder';
import RatingPlan from '../pages/Rating Plan/RatingPlan';
import RatesOffer from '../pages/Rating Plan/RatesOffer/RatesOffer';
import EditRatesOffer from '../pages/Rating Plan/RatesOffer/EditRatesOffer';
import AddRatesOffer from '../pages/Rating Plan/RatesOffer/AddRatesOffer';
import RatingProfile from '../pages/Rating Plan/RatingProfile/RatingProfile';
import AddRatingProfile from '../pages/Rating Plan/RatingProfile/AddRatingProfile';
import EditRatingProfile from '../pages/Rating Plan/RatingProfile/EditRatingProfile';
import AccountMang from '../pages/Account Management/AccountMang';
import Category from '../pages/Rating Plan/Category/Category';
import PrePaidAccount from '../pages/Account Management/PrepaidAccount.jsx/PrePaidAccount';
import PrePaidRoaming from '../pages/Account Management/PrePaidRoamingAccount/PrePaidRoaming';

import DataSession from '../pages/Session/DataSession';
import Volte from '../pages/Session/Volte';
import Hss2 from '../pages/Hss/Hss2';
import Addhss from '../pages/Hss/AddHss';
import Edithss from '../pages/Hss/EditHss';
import InventoryData from '../pages/Inventory/Inventory';
import AddInventory from '../pages/Inventory/AddINventory';
import Editinventory from '../pages/Inventory/EditInventory';
import Sim_manage from '../pages/Inventory/SimInventory/SimManagement';
import EditSim from '../pages/Inventory/SimInventory/EditSim';
import AddSim from '../pages/Inventory/SimInventory/AddSim';
import MSISDN_manage from '../pages/Inventory/MsisdnInvetory/MsisdnManagemnt';
import AddMSISDN from '../pages/Inventory/MsisdnInvetory/AddMsisdn';
import EditMSISDN from '../pages/Inventory/MsisdnInvetory/EditMsisdn';
import DeviceManagement from '../pages/Inventory/DeviceMangement/DeviceManagemt';
import AddDevice from '../pages/Inventory/DeviceMangement/AddDevice';
import EditDevice from '../pages/Inventory/DeviceMangement/EditDevice';
import VendorManagement from '../pages/Inventory/VendorMagement/VendorManagement';
import EditVendor from '../pages/Inventory/VendorMagement/EditVendor';
import LU from '../pages/Session/LU';
import AddVendor from '../pages/Inventory/VendorMagement/AddVendor';
import AllCustomerReport from '../pages/Report/AllcustomerReport';

import InvoiceSample from '../pages/Test/InvoiceSample';
import CustomerInvoice from '../pages/Customer/CustomerInvoice';
import AllAgentReport from '../pages/Report/AgentReport';
import PrepaidCustomerReport from '../pages/Report/PrepaidCustomerReport';
import PostpaidCustomerReport from '../pages/Report/PostPaidCustomerResport';
import ActiveCustomerReport from '../pages/Report/ActiveCustomerReport';
import InactiveCustomerReport from '../pages/Report/InactiveCustomerReport';

import Individualreport from '../pages/Report/IndividualReports';
import IndividualAgentReport from '../pages/Report/IndividualAgentReport';
import PCRF from '../pages/Session/PCRFSession';
import InterfaceRecords from '../pages/Session/IndividualInterfaceRecords';
import IMSSession from '../pages/Session/IMSSession';
import AudioCallSession from '../pages/Session/AudioCallSession';
import Test from '../SidenaveBar/Test';
import CustomerSignUp from '../pages/Report/CustomerSignup';
import TopCustomerReport from '../pages/Report/TopCustomersReport';
import AgentComission from '../pages/Report/AgentComission';
import PrePaidCustomerDataAvailable from '../pages/Report/PrePaidCustomerDataAvailable';
import OnBoardCustomerReports from '../pages/Report/OnBoardCustomerReport';
import TopPostPaidCallUsageReport from '../pages/Report/TopPostPaidCallUsageReport';
import TopPostpaidSMSUsageReport from '../pages/Report/TopPostpaidSMSUsageReport';
import AdddHssSubscriber from '../pages/Hss/AddHssSubscriber';
import SimFap from '../pages/Hss/SimFap';
import DeleteSubscriber from '../pages/Hss/DeleteSubscriber';
import SubscriberServiceCapability from '../pages/Hss/SubscriberServiceCapability';
import BlockingSubscriber from '../pages/Hss/BlockingSubscriber';
import UnBlockingSubscriber from '../pages/Hss/UnBlockingSubscriber';
import AgentReportByPayment from '../pages/Report/AgentsReportByPayment';
import SimBySellingPrice from '../pages/Report/SimInventoryReport/SimBySellingPrice';
import SimByActivation from '../pages/Report/SimInventoryReport/SimByActivation';
import SimReports from '../pages/Report/SimInventoryReport/SimReports';
import DeviceBySellingRates from '../pages/Report/DeviceInventoryReport/DeviceBySellinRates';
import AgentReportByProduct from '../pages/Report/AgnetReports/AgentReportbyProduct';
import PrepaidCustomerUsageReport from '../pages/Report/PrepaidCustomerUsageReport';
import SimByVendor from '../pages/Report/SimInventoryReport/SimBYVendor';
import SimByAgent from '../pages/Report/SimInventoryReport/SimByAgent';
import SimByStatus from '../pages/Report/SimInventoryReport/SimByStatus';
import DeviceByAgent from '../pages/Report/DeviceInventoryReport/DeviceByAgent';
import DeviceByVendor from '../pages/Report/DeviceInventoryReport/DeviceByVendor';
import AvailablePack from '../pages/Available Plan/AvailablePack';
import PackPayment from '../pages/Customer/Payment.jsx/PackPayment';
import SingleAgentCommission from '../pages/Agent/SingleAgentCommision';
import PackDetails from '../pages/Customer/PackDetails.jsx/PackDeails';
import CardDetails from '../pages/Customer/Payment.jsx/CardDetails';
import Specialoffers from '../pages/Voucher/SpecialOffers';
import AddNewVoucher from '../pages/Voucher/AddNewVoucher';
import Category1 from '../pages/Rating Plan/Category/Category1';
import NewTarrif from '../pages/Rating Plan/RatingProfile/NewTarrif';
import EditTarrif from '../pages/Rating Plan/RatingProfile/EditTarrif';
import PrepaidActivatedPlans from '../pages/Available Plan/PrepaidActivatedPlans';
import PrepaidDeActivatedPlan from '../pages/Available Plan/PrepaidDeActivatedPlan';
import PostpaidActivatedPlan from '../pages/Available Plan/PostpaidActivatedPlan';
import PostpaidDeActivatedPlan from '../pages/Available Plan/PostpaidDeActivatedPlan';
import PrepaidInProgressPlan from '../pages/Available Plan/PrepaidInProgressPack';
import PostpaidInProgressPlan from '../pages/Available Plan/PostpaidInProgressPacks';
import InvoicePayment from '../pages/Customer/InvoicePayment/InvoicePayment';
import PaymentConfirmation from '../pages/Customer/InvoicePayment/PaymentConfirmation';
import VoucherPayment from '../pages/Voucher/VoucherPayment';
import Broadband from '../pages/Inventory/Broadband/Broadband';
import Analysis from '../pages/Analitics/Analysis';
import ShowFamily from '../pages/Customer/ShowFamily';
import CreateChild from '../pages/Customer/Child/CreateChild';
import VideoCallSession from '../pages/Session/VideoCallSession';
import FourGSession from '../pages/Session/SessionOverView';
import ProductPayment from '../pages/Customer/ProductPayment';
import SessionDetails from '../pages/Session/SessionDetails';
import ShowProduct from '../pages/Agent/ShowProducts';
import CallSession from '../pages/Session/CallSesssion';
import CallSessionDetails from '../pages/Session/CallSessionDetails';

import DataDetailedView from '../pages/Session/DataDetailedView';
import BroadbandPlan from '../pages/BroadbandPlan/BroadbandPlan';
import AssignBalance from '../pages/Agent/AssignBalance';
import CoreBalanceMgmt from '../pages/Agent/CoreBalanceMgmt';
import AllTransaction from '../pages/Agent/AllTransaction';
import AddBroadbandPlan from '../pages/BroadbandPlan/AddBroadbandPlan';
import AssignProducts from '../pages/Agent/AssignProducts';
import ShowProductsPage from '../pages/Agent/ShowProductPage';

export const Routers = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<PublicRoute />}>
                    <Route path='/' element={<Navigate replace to="/login" />} />
                    <Route path='/login' element={<Loginform />} />
                </Route>
                <Route path="/" element={<ProtectedRoute />}>
                    <Route path="/" element={<Sidenavbar />} >
                        <Route path='/' element={<Navigate replace to="/analysis" />} />

                        {/* Default */}
                        <Route path='/analysis' element={<Analysis />} />
                        {/* customer */}
                        <Route path='/subscriber' element={<Customer />} />
                        <Route path='/subscriber/newSubscriber' element={<AddNewCustomer />} />
                        <Route path='/subscriber/newSubscriber/addSubscriberDetails' element={<AddCustomerDetails />} />
                        <Route path='/subscriber/editSubscriber' element={<EditCustomerDetails />} />
                        <Route path='/createOrder' element={<CreateOrder />} />
                        <Route path='/custInvoice' element={<CustomerInvoice/>}/>
                        <Route path='/showFamily' element={<ShowFamily/>}/>
                        <Route path='/subscriber/createChild' element={<CreateChild/>}/>
                        <Route path='/subscriber/productPayment' element={<ProductPayment/>}/>
                        {/* Agent */}
                        <Route path='/partner' element={<Agent />} />
                        <Route path='/partner/newPartner' element={<AddAgent />} />
                        <Route path='/partner/showCommison' element={<ShowCommision />} />
                        <Route path='/partner/editPartner' element={<EditAgent />} />
                        <Route path='/addSubAgent' element={<AddSubAgent />} />
                        <Route path='/userCodes' element={<UserCodes />} />
                        <Route path='/addUserCode' element={<AddUserCode />} />
                        <Route path='/editUserCode' element={<EditUserCode />} />
                        <Route path='/partner/singlePartnerComission' element={<SingleAgentCommission />} />
                        <Route path='/partner/showProducts' element={<ShowProduct />} />
                        <Route path='/partner/assignBalance' element={<AssignBalance />} />
                        <Route path='/partner/coreBalanceManagment' element={<CoreBalanceMgmt />} />
                        <Route path='/partner/allTransation' element={<AllTransaction />} />
                        <Route path='/partner/AssignProducts' element={<AssignProducts />} />
                        <Route path='/partner/showProductPage' element={<ShowProductsPage />} />


                        {/*Add  Payment */}
                        <Route path='/addPayment' element={<AddPayment />} />

                        <Route path='/invoice' element={<Invoice />} />
                        <Route path='/orders' element={<Orders />} />

                        {/* Billing  */}
                        <Route path='/billing' element={<Billing />} />
                        <Route path='/disbilling' element={<DisplayBilling />} />

                        <Route path='/mediation' element={<Mediation />} />
                        <Route path='/report' element={<Report />} />
                        <Route path='/discount' element={<Discount />} />
                        <Route path='/payment' element={<Payment />} />
                        <Route path='/product' element={<Product />} />

                        {/* Plan */}
                        <Route path='/plan' element={<Plan />} />
                        <Route path='/addCategory' element={<AddCategory />} />

                        {/* Congiguration */}
                        <Route path='/configuration' element={<Configuration />} />


                        {/* AccountType */}
                        <Route path='/accounttype' element={<AccountType />} />
                        <Route path='/AddaccountType' element={<AddAccountType />} />

                        {/* Enumeartion */}
                        <Route path='/addEnumeartion' element={<AddEnumeration />} />

                        {/* invoice detais */}
                        <Route path='/invoiceDisplay' element={<InvoiceDisplay />} />

                        {/* AddCustomMetaFields */}
                        <Route path='/customMetaField' element={<AddCustomMetaField />} />

                        <Route path='/addMetaFieldGroup' element={<AddmetaFieldGroup />} />

                        {/* Notification */}
                        <Route path='/addCategoryNotification' element={<AddCategoryNotification />} />
                        <Route path='/notification' element={<Notification />} />

                        {/* Order Change Type */}
                        <Route path='/addOrderChangeType' element={<AddOrderChangeType />} />

                        {/* Add User */}
                        <Route path='/addUsers' element={<AddUser />} />

                        {/* AddPlugin */}
                        <Route path='/addPlugin' element={<AddPlugin />} />

                        {/* Add Payment Method */}
                        <Route path='/addPaymentMethod' element={<AddPaymentMethod />} />


                        {/* Available Plan */}
                        <Route path='/availablePlan' element={<AvailablePlan />} />
                        <Route path='/availablePack' element={<AvailablePack />} />
                        <Route path='/prepaidActivatedPlan' element={<PrepaidActivatedPlans />} />
                        <Route path='/prepaidDeActivatedPlan' element={<PrepaidDeActivatedPlan />} />
                        <Route path='/prepaidInProgressPack' element={<PrepaidInProgressPlan />} />
                        <Route path='/postPaidActivatedPlan' element={<PostpaidActivatedPlan />} />
                        <Route path='/postpaidDeActivatedPlan' element={<PostpaidDeActivatedPlan/>} />
                        <Route path='/postpaidInProgressPack' element={<PostpaidInProgressPlan />} />
                        {/* Payment */}
                        <Route path='/packpayment' element={<PackPayment />} />
                        <Route path='/cardDetails' element={<CardDetails />} />
                         {/* Voucher */}
                         <Route path='/specialOffers' element={<Specialoffers />} />
                         <Route path='/addNewVoucher' element={<AddNewVoucher />} />
                         <Route path='/voucherPayment' element={<VoucherPayment />} />

                        {/* Rating Plan */}
                        <Route path='/ratingPlan' element={<RatingPlan />} />

                        {/* Category */}
                        {/* <Route path='/category' element={<Category />} /> */}
                        <Route path='/category' element={<Category1 />} />
                        

                        {/* Rates Offer */}
                        <Route path='/ratesOffer' element={<RatesOffer />} />
                        <Route path='/addRates' element={<AddRatesOffer />} />
                        <Route path='/editRates' element={<EditRatesOffer />} />

                        {/* Rating Profile */}
                        <Route path='/ratingProfile' element={<RatingProfile />} />
                        <Route path='/AddratingProfile' element={<AddRatingProfile />} />
                        <Route path='/editratingProfile' element={<EditRatingProfile />} />
                        <Route path='/newTarrif' element={<NewTarrif />} />
                        <Route path='/editTarrif' element={<EditTarrif />} />

                        {/* Account Mangement */}
                        <Route path='/accountMnagment' element={<AccountMang />} />
                        <Route path='/pre-paidAccount' element={<PrePaidAccount />} />
                        <Route path='/prepaidRoaming' element={<PrePaidRoaming />} />

                        {/* Session Management */}
                        {/* <Route path='/callMangent' element={<CallSession />} /> */}
                        <Route path='/dataSession' element={<DataSession />} />
                        <Route path='/volte' element={<Volte />} />
                        <Route path='/lu' element={<LU />} />
                        <Route path='/pcrf' element={<PCRF/>} />
                        <Route path='/individualinterfaceRecords' element={<InterfaceRecords/>} />
                        <Route path='/IMSSession' element={<IMSSession/>} />
                        <Route path='/AudioCallSession' element={<AudioCallSession/>} />
                        <Route path='/videoCallSession' element={<VideoCallSession/>} />
                        <Route path='/session' element={<FourGSession/>} />
                        <Route path="/session/:ratType" element={<SessionDetails />} />
                        <Route path="/callSession" element={<CallSession />} />
                        <Route path="/call-session-details" element={<CallSessionDetails />} />
                        <Route path="/detailed-view" element={<DataDetailedView />} />
                        {/* HSS */}
                        <Route path='/hss' element={<Hss2 />} />
                        <Route path='/addhss' element={<Addhss />} />
                        <Route path='/edithss' element={<Edithss />} />
                        <Route path='/addHssSubscriber' element={<AdddHssSubscriber />} />
                        <Route path='/simFap' element={<SimFap />} />
                        <Route path='/deleteSubscriber' element={<DeleteSubscriber/>} />
                        <Route path='/subscriberServiceCapability' element={<SubscriberServiceCapability/>} />
                        <Route path='/blockingSubscriber' element={<BlockingSubscriber/>} />
                        <Route path='/UnblockingSubscriber' element={<UnBlockingSubscriber/>} />
                        {/* Inventory */}
                        <Route path='/inventory' element={<InventoryData />} />
                        <Route path='/addinventory' element={<AddInventory />} />
                        <Route path='/editinventory' element={<Editinventory />} />

                        {/* simINventory */}
                        <Route path='/simManagement' element={<Sim_manage/>}/>
                        <Route path='/addsim_management' element={<AddSim/>}/>
                        <Route path='/editSim' element={<EditSim/>}/>
                        {/* Msisdn Inventoty */}
                        <Route path='/msisdnmanagement' element={<MSISDN_manage/>}/>
                        <Route path='/addmsisdn' element={<AddMSISDN/>}/>
                        <Route path='/editmsisdn' element={<EditMSISDN/>}/>
                            {/* Device Inventory */}
                        <Route path='/devicemanagement' element={<DeviceManagement/>}/>
                        <Route path='/adddevicemanagement' element={<AddDevice/>}/>
                        <Route path='/Editdevicemanagement' element={<EditDevice/>}/>
                            {/* Vendor Inventory */}
                        <Route path='/vendormanagement' element={<VendorManagement/>}/>
                        <Route path='/EditVendorManagement' element={<EditVendor/>}/>
                        <Route path='/addVendor' element={<AddVendor/>}/>

                        {/* BroadBand */}
                        <Route path='/broadband' element={<Broadband/>}/>
                        <Route path='/broadband-plan' element={<BroadbandPlan/>}/>
                        <Route path='/broadband-plan/addBroadbandPlan' element={<AddBroadbandPlan/>}/>


                        {/* Test */}
                           {/* <Route path='/test' element={<AllCustomerReport/>}/> */}
                           <Route path='/invoiceDesign' element={<InvoiceSample/>}/>
                           <Route path='/test' element={<Test/>}/>
                           <Route path="/invoice-payment" element={<InvoicePayment />} />
                           <Route path="/payment-confirmation" element={<PaymentConfirmation />} />

                           {/* Reports */}
                           <Route path='/allcustomerReport' element={<AllCustomerReport/>}/>
                           <Route path='/allagentreport' element={<AllAgentReport/>}/>
                           <Route path='/agentComission' element={<AgentComission/>}/>
                           <Route path='/prepaidcustomerReport' element={<PrepaidCustomerReport/>}/>
                           <Route path='/postpaidcustomerReport' element={<PostpaidCustomerReport/>}/>
                           <Route path='/activecustomerReport' element={<ActiveCustomerReport/>}/>
                           <Route path='/inactivecustomerReport' element={<InactiveCustomerReport/>}/>
                           <Route path='/individualReport' element={<Individualreport/>}/>
                           <Route path='/individualagentreport' element={<IndividualAgentReport/>}/>
                           <Route path='/customerSignUp' element={<CustomerSignUp/>}/>
                           <Route path='/topCustomerReport' element={<TopCustomerReport/>}/>
                           <Route path='/prepaidDataUsage' element={<PrePaidCustomerDataAvailable/>}/>
                           <Route path='/onBoardCustomers' element={<OnBoardCustomerReports/>}/>
                           <Route path='/topPostPaidCallUsage' element={<TopPostPaidCallUsageReport/>}/>
                           <Route path='/topPostPaidSMSUsage' element={<TopPostpaidSMSUsageReport/>}/>
                           <Route path='/agentReportByPayment' element={<AgentReportByPayment/>}/>
                           <Route path='/agentReportByProduct' element={<AgentReportByProduct/>}/>
                           <Route path='/prepaidUsageReport' element={<PrepaidCustomerUsageReport/>}/>


                           {/* Sim Invrntory Reports */}
                           <Route path='/simBysellingPrice' element={<SimBySellingPrice/>}/>
                           <Route path='/simByActivation' element={<SimByActivation/>}/>
                           <Route path='/simReports' element={<SimReports/>}/>
                           <Route path='/simByVendor' element={<SimByVendor/>}/>
                           <Route path='/simByAgent' element={<SimByAgent/>}/>
                           <Route path='/simByStatus' element={<SimByStatus/>}/>

                           {/* Device INventory Reports */}
                           <Route path='/deviceSellingReports' element={<DeviceBySellingRates/>}/>
                           <Route path='/deviceByAgent' element={<DeviceByAgent/>}/>
                           <Route path='/deviceByVendor' element={<DeviceByVendor/>}/>

                           {/* Pack  */}
                           <Route path='/packDetails' element={<PackDetails/>}/>
                        {/* <Route path='/add-Noc-sub' element={<AddNoc />} />
                        <Route path='/all-Noc-sub' element={<AllNoc />} />
                        <Route path='/all-Noc-query' element={<NOCQuery />} />
                        <Route path="/updateNoc/:imsi" element={<UpdateNoc/>}/> */}


                        {/* Super Section  */}

                        {/* <Route path='/add-Sup-sub' element={<AddSuperSub />} />
                        <Route path='/all-Sup-sub' element={<AllSuperSub />} />
                        <Route path='/all-Sup-query' element={<QuerySuper />} />
                        <Route path='/updateSuper/:msisdn' element={<UpdateSuper/>}/> */}


                        {/* all Destination routes */}
                        {/* <Route path='/add-ratePlane' element ={<AddRatePlane/>}/>
                        <Route path='/all-ratePlane' element ={<AllRatePlane/>}/>
                        <Route path='/update-ratePlane/:destination_id' element={<UpdateRatePlane/>}/> */}

                        {/* { Add Rate} */}
                        {/* <Route path='/add_rate' element={<AddRates/>}/>
                        <Route path='/all_rates' element={<AllRates/>}/>
                        <Route path='/upadte-rate/:rates_id' element={<UpdateRate/>}/> */}

                        {/* Add rating */}
                        {/* <Route path= '/addrating' element={<AddRating/>}/>
                        <Route path='/allratings' element={<AllRatings/>}/>
                        <Route path='/upadte-rating-plane/:rating_profile_id' element={<UpdateRatings/>}/> */}

                        {/* Admin section routes*/}
                        {/* <Route path='/admin' element={<Admin/>}/> */}



                        {/*  category */}
                        {/* <Route path='/addCategory' element={<AddCategory/>}/>
                        <Route path='/editCategory' element={<EditCategory/>}/>
                        <Route path='/updateCategory/:category_id' element={<UpdateCategory/>}/> */}



                        {/* pagination */}
                        {/* <Route path='/pagination' element={<CustomPagination/>}/> */}

                        {/* inventory */}
                        {/* <Route path='/inventory' element={<Inventory/>}/> */}
                        {/* sim mamagement */}
                        {/* <Route path='/simManagement' element={<SIMManagemet/>}/> */}

                        {/* MSISDN Management */}
                        {/* <Route path='/msisdnMangement' element={<MSISDNManagement/>}/> */}

                        {/* Device Management */}
                        {/* <Route path='/deviceManagement' element={<DeviceManagement/>}/> */}

                        {/* Vandor Management */}
                        {/* <Route path='/vendorManagement' element ={<VendorManagement/>}/> */}

                        {/* HSS */}
                        {/* <Route path='/hss' element={<HSS/>}/> */}


                        {/* Voucher Management */}

                        {/* Account Mangement */}
                        {/* <Route path='/prepaid_account' element={<PrepaidAccount/>}/> */}

                        {/* PrepaidAccount Roaming */}
                        {/* <Route path='/prepaid_roaming_account' element={<PrePaidRoaming/>}/> */}

                        {/* DashBoard */}
                        {/* <Route path='/dashboard' element={<DashBoard/>}/> */}

                        {/* SessionMngemt */}
                        {/* <Route path='/dataMangmet' element={<DataSession/>}/>
                        <Route path='/callMangmet' element={<CallSession/>}/> */}


                    </Route>
                </Route>
            </Routes>
            {/* <Footer design="Design & Developed By" name=" Technosters Technologies Pvt. Ltd." /> */}
        </>
    )
}
