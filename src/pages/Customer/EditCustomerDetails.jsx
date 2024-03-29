import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Snackbar, TextField, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useFormik } from 'formik';
import { Label } from '@mui/icons-material';
import axios from "axios";
import Notification from '../Components/Notification/Notification';
import MuiAlert from '@mui/material/Alert';
import { useLocation } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import blanPhoto from '../../assets/blanPhoto.png'
export default function EditCustomerDetails() {
    const location = useLocation();

    // Access the state object from the location
    const { state } = location;

    // Check if state is defined before accessing its properties
    const id = state?.id;
    const accountType = state?.type;



    // console.log('ID:', id);
    // console.log('Name:', name);
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success', // 'success', 'error', 'warning', 'info'
    });
    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotification({ ...notification, open: false });
    }
    const [showPaper, setShowPaper] = useState(false);

    const togglePaper = () => {
        setShowPaper(!showPaper);
    };
    const [showPaperPayment, setShowPaperPayment] = useState(false);

    const togglePaperPayment = () => {
        setShowPaperPayment(!showPaperPayment);
    };
    const [billingCycle, setBillingCycle] = useState('');
    const [showCreditCardFields, setShowCreditCardFields] = useState(false);

    const handleBillingCycleChange = (event) => {
        const selectedBillingCycle = event.target.value;
        setBillingCycle(selectedBillingCycle);
        setShowCreditCardFields(selectedBillingCycle === 'Credit Card');
    };
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        setSelectedPhoto(URL.createObjectURL(file));
        // You can perform additional actions with the file if needed
    };

    const tokenValue = localStorage.getItem('token');
    const [device, setDevice] = useState('');


    const { handleChange, handleSubmit, handleBlur, values, setValues: setValues1, submitForm: submitMainForm1, resetForm: resetForm1 } = useFormik({
        initialValues: {

            referralFeePaid: "",
            autoPaymentType: "",
            dueDateUnitId: "",
            dueDateValue: "",
            dfFm: "",
            parentId: "",
            isParent: "",
            excludeAging: "",
            invoiceChild: "",
            dynamicBalance: "",
            creditLimit: "",
            autoRecharge: "",
            useParentPricing: "",
            nextInvoiceDayOfPeriod: "",
            invoiceDesign: "",
            creditNotificationLimit1: "",
            creditNotificationLimit2: "",
            rechargeThreshold: "",
            monthlyLimit: "",
            currentMonthlyAmount: "",
            organizationName: "",
            streetAddres1: "",
            streetAddres2: "",
            city: "",
            stateProvince: "",
            postalCode: "",
            countryCode: "",
            lastName: "",
            firstName: "",
            personInitial: "",
            personTitle: "",
            phoneCountryCode: "",
            phoneAreaCode: "",
            phonePhoneNumber: "",
            faxCountryCode: "",
            faxAreaCode: "",
            faxPhoneNumber: "",
            email: "",
            deleted: "",
            notificationInclude: "",
            customerType: "",
            gender: "",
            ekycStatus: "",
            ekycToken: "",
            alternateNumber: "",
            landlineNumber: "",
            dateOfBirth: "",
            vatId: "",
            profession: "",
            maritalStatus: "",

        },

        onSubmit: async (values) => {
            console.log(values);

            console.log("from prev submit")

            const res1 = await axios.put('http://172.5.10.2:9090/api/updatecustomer/' + id,
                { ...values }, {

                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }

            ).then(res => {
                if (res.status === 200) {

                    setNotification({
                        open: true,
                        message: 'Customer Updated successfully!',
                        severity: 'success',
                    });
                    resetForm1();

                }
            }).catch(e => {
                setNotification({
                    open: true,
                    message: 'Failed to add Customer record. Please try again.',
                    severity: 'error',
                });
            })
            console.log("API 1 response :", res1)
        }
    })


    const { handleChange: handleChange2, handleSubmit: handleSubmit2, handleBlur: handleBlur2, values: values2, setValues: setValues2, submitForm: submitMainForm2, resetForm: resetForm2 } = useFormik({
        initialValues: {
            userId: "",
            customerId: '',
            attempt: "",
            amount: "",
            deleted: "",
            isRefund: "",
            isPreauth: "",
            payoutId: "",
            balance: "",
            paymentPeriod: "",
            paymentNotes: "",
            paymentStatus: ""
        },
        onSubmit: async (values2) => {
            // your submission logic for the second formik instance
            console.log("Form 2 submitted:", values2);
            // Your existing logic for the POST request
            try {
                const paymentResponse = await axios.put('http://172.5.10.2:9090/api/updatepayment/' + paymentId,
                    { ...values2 }, {
                    headers: {
                        Authorization: `Bearer ${tokenValue}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                });

                if (paymentResponse.status === 200) {
                    // setNotification({
                    //     open: true,
                    //     message: 'Payment Added successfully!',
                    //     severity: 'success',
                    // });
                    submitMainForm1();
                } else {
                    setNotification({
                        open: true,
                        message: 'Payment failed !',
                        severity: 'error',
                    });
                    submitMainForm1();
                }
            } catch (error) {
                console.error('Error during payment request:', error.message);
            }

        },
    });
    const [sim, setSim] = useState(null);
    const [msisdn, setMsisdn] = useState('');
    const [paymentId, setPaymentID] = useState('');
    useEffect(() => {
        const fetchCustomerDetails = async () => {
            console.log('Before fetchCustomerDetails - values:', values);
            try {
                const customerId = id;

                // Fetch customer details
                const customerResponse = await axios.get(`http://172.5.10.2:9090/api/customer/${customerId}`, {
                    headers: {
                        Authorization: `Bearer ${tokenValue}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                });



                if (customerResponse.status === 200) {
                    const customerDetails = customerResponse.data;
                    // Handle customer details
                    // console.log('Customer Details:----->', customerDetails.referralFeePaid);
                    // 
                    // console.log("maisdn set value ------->" + msisdn)
                    setValues1({
                        referralFeePaid: customerDetails.referralFeePaid,
                        autoPaymentType: customerDetails.autoPaymentType,
                        dueDateUnitId: customerDetails.dueDateUnitId,
                        dueDateValue: customerDetails.dueDateValue,
                        dfFm: customerDetails.dfFm,
                        parentId: customerDetails.parentId,
                        isParent: customerDetails.isParent,
                        excludeAging: customerDetails.excludeAging,
                        invoiceChild: customerDetails.invoiceChild,
                        dynamicBalance: customerDetails.dynamicBalance,
                        creditLimit: customerDetails.creditLimit,
                        autoRecharge: customerDetails.autoRecharge,
                        useParentPricing: customerDetails.useParentPricing,
                        nextInvoiceDayOfPeriod: customerDetails.nextInvoiceDayOfPeriod,
                        invoiceDesign: customerDetails.invoiceDesign,
                        creditNotificationLimit1: customerDetails.creditNotificationLimit1,
                        creditNotificationLimit2: customerDetails.creditNotificationLimit2,
                        rechargeThreshold: customerDetails.rechargeThreshold,
                        monthlyLimit: customerDetails.monthlyLimit,
                        currentMonthlyAmount: customerDetails.currentMonthlyAmount,
                        organizationName: customerDetails.organizationName,
                        streetAddres1: customerDetails.streetAddres1,
                        streetAddres2: customerDetails.streetAddres2,
                        city: customerDetails.city,
                        stateProvince: customerDetails.stateProvince,
                        postalCode: customerDetails.postalCode,
                        countryCode: customerDetails.countryCode,
                        lastName: customerDetails.lastName,
                        firstName: customerDetails.firstName,
                        personInitial: customerDetails.personInitial,
                        personTitle: customerDetails.personTitle,
                        phoneCountryCode: customerDetails.phoneCountryCode,
                        phoneAreaCode: customerDetails.phoneAreaCode,
                        phonePhoneNumber: customerDetails.phonePhoneNumber,
                        faxCountryCode: customerDetails.faxCountryCode,
                        faxAreaCode: customerDetails.faxAreaCode,
                        faxPhoneNumber: customerDetails.faxPhoneNumber,
                        email: customerDetails.email,
                        deleted: customerDetails.deleted,
                        notificationInclude: customerDetails.notificationInclude,
                        customerType: customerDetails.customerType,
                        gender: customerDetails.gender,
                        ekycStatus: customerDetails.ekycStatus,
                        ekycToken: customerDetails.ekycToken,
                        alternateNumber: customerDetails.alternateNumber,
                        landlineNumber: customerDetails.landlineNumber,
                        dateOfBirth: customerDetails.dateOfBirth,
                        vatId: customerDetails.vatId,
                        profession: customerDetails.profession,
                        maritalStatus: customerDetails.maritalStatus,

                    });
                    console.log('customerDetails:', customerDetails);
                    console.log('sim:', customerDetails.simInventory.msisdn);
                    // console.log('device:', customerDetails.deviceInventory.id);
                    // console.log('msisdn:', customerDetails.msisdnInventory.msisdn);

                    console.log('After setting values1 - values:', customerDetails.simInventory.msisdn);
                    if(customerDetails.simInventory.msisdn!==null){
                        setSim(customerDetails.simInventory.msisdn);
                    }
                    else if(customerDetails.deviceInventory.id !==null){
                        setDevice(customerDetails.deviceInventory.id)
                    }
                    else if(customerDetails.msisdnInventory.msisdn !==null){
                        setMsisdn(customerDetails.msisdnInventory.msisdn);
                    }
                    // setDevice(customerDetails.deviceInventory.id)
                    // setMsisdn(customerDetails.msisdnInventory.msisdn);
                    setSim(customerDetails.simInventory.msisdn);
                    console.log('siiiiiiimmmmmmm:', sim);
                } else {

                }
            } catch (error) {
                // console.error('Error during customer details fetch:', error.message);
                console.log('After setting values1 - values:', values);
            }

            // Fetch payment details
            try {
                const paymentResponse = await axios.get(`http://172.5.10.2:9090/api/payment/customer/${id}`, {
                    headers: {
                        Authorization: `Bearer ${tokenValue}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                });

                if (paymentResponse.status === 200) {
                    const paymentDetails = paymentResponse.data;
                    // Handle payment details
                    console.log('Payment Details:', paymentDetails);
                    console.log("Payment ID " + paymentDetails.id);
                    console.log('patment customer ID' + paymentDetails.customerId)
                    setPaymentID(paymentDetails.id);
                    setValues2({
                        userId: paymentDetails.userId,
                        customerId: paymentDetails.customerId,
                        attempt: paymentDetails.attempt,
                        amount: paymentDetails.amount,
                        deleted: paymentDetails.deleted,
                        isRefund: paymentDetails.isRefund,
                        isPreauth: paymentDetails.isPreauth,
                        payoutId: paymentDetails.payoutId,
                        balance: paymentDetails.balance,
                        paymentPeriod: paymentDetails.paymentPeriod,
                        paymentNotes: paymentDetails.paymentNotes,
                        paymentStatus: paymentDetails.paymentStatus
                    });
                } else {
                    console.error('Failed to fetch payment details.');
                }
            } catch (error) {
                console.error('Error during payment details fetch:', error.message);
            }

            // Fetch photo
            try {
                const photoResponse = await axios.get(`http://172.5.10.2:9090/api/image/${id}`, {
                    headers: {
                        Authorization: `Bearer ${tokenValue}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    responseType: 'arraybuffer',
                });

                if (photoResponse.status === 200) {
                    const imageBlob = new Blob([photoResponse.data], { type: 'image/jpeg' });
                    const imageUrl = URL.createObjectURL(imageBlob);
                    setSelectedPhoto(imageUrl);
                } else {
                    console.error('Failed to fetch photo details.');
                }
            } catch (error) {
                console.error('Error fetching photo:', error.message);
            }
        };

        // Call the function to fetch details when the component mounts or dependencies change
        fetchCustomerDetails();
    }, [paymentId]);


    return (
        <Box component="form" onSubmit={handleSubmit2} sx={{ marginTop: -3 }}>
            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleCloseNotification}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleCloseNotification}
                    severity={notification.severity}
                >
                    {notification.message}
                </MuiAlert>
            </Snackbar>
            <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
                <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0, marginRight: 0.2 }}>
                    <Grid>
                        <Typography
                            style={{

                                fontSize: '20px',
                                paddingLeft: 15,
                                fontWeight: 'bold',

                            }}
                        >Edit Customer</Typography>
                    </Grid>
                </Paper>
            </Box>
            <Paper elevation={10} sx={{ paddingLeft: 5, paddingRight: 5 }}> {/* Adjust the padding as needed */}
                <Box
                    sx={{
                        marginTop: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                    }}
                >

                    <Grid2 >
                        <Grid container justifyContent="space-between">


                            <Grid item xs={12} paddingBottom={2} sx={{ position: 'relative', display: 'center', flexDirection: 'column', alignItems: 'center', paddingBottom: '20px', paddingTop: '25px' }}>
                                {/* Display the selected photo */}
                                {selectedPhoto ? (
                                    <>
                                        {/* <CancelIcon sx={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer', color: '#1976D2' }} onClick={handleCancelPhoto} /> */}
                                        <img
                                            src={selectedPhoto}
                                            alt="Selected"
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '200px',
                                                paddingBottom: '0px',
                                                border: '5px solid Grey', // Set border style, adjust color and width as needed
                                                borderRadius: '15px', // Optional: Add border-radius for rounded corners
                                            }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        {/* <CancelIcon sx={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer', color: '#1976D2' }} onClick={handleCancelPhoto} /> */}
                                        <img
                                            src={blanPhoto}
                                            alt="Selected"
                                            style={{
                                                maxWidth: '80%',
                                                maxHeight: '200px',
                                                paddingBottom: '0px',
                                                border: '5px solid Grey', // Set border style, adjust color and width as needed
                                                borderRadius: '15px', // Optional: Add border-radius for rounded corners
                                            }}
                                        />
                                    </>
                                )}

                                {/* <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="upload-photo"
                                    type="file"
                                    name="photo"
                                    onChange={handlePhotoChange}
                                /> */}

                            </Grid>


                        </Grid>


                        <Divider />
                        <Grid
                            container
                            spacing={6} // Adjust the spacing between items as needed
                            paddingBottom={2} // Padding for the entire container
                            paddingTop={2} // Padding for the entire container


                        >

                            <Grid item lg={6}>

                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={4} sm={6} xs={12} > {/* Padding for individual items */}
                                        <TextField
                                            label="Account Type"
                                            name='customerType'
                                            type='text'
                                            fullWidth
                                            onChange={handleChange}
                                            value={accountType || values.customerType}
                                            onBlur={handleBlur}


                                        />
                                        <FormControlLabel control={<Checkbox
                                        // name='isParent'
                                        // value={values.isParent}
                                        // onChange={handleChange}
                                        // onBlur={handleBlur}
                                        />} label="Create credentials" />
                                    </Grid>
                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                        <TextField
                                            label="Status"
                                            type="text"
                                            value={"Active"}
                                            fullWidth
                                        // name="dueDateValue"
                                        // onChange={handleChange}
                                        // onBlur={handleBlur}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                        <FormControl fullWidth >
                                            <InputLabel id="demo-simple-select-label">Subscriber Status</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                // value={values.useParentPricing}
                                                label="useParentPricing"
                                            // onChange={handleChange}
                                            // onBlur={handleBlur}
                                            // name="useParentPricing"
                                            >
                                                <MenuItem value={"Active"}>Active</MenuItem>
                                                <MenuItem value={"Pending Subscription"}>Pending Subscription</MenuItem>
                                                <MenuItem value={"Unsubscribed"}>Unsubscribed</MenuItem>
                                                <MenuItem value={"Pending Expiration"}>Pending Expiration</MenuItem>
                                                <MenuItem value={"Expired"}>Expired</MenuItem>
                                                <MenuItem value={"Non-subscriber"}>Non-subscriber</MenuItem>
                                                <MenuItem value={"Discountinued"}>Discountinued</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                        <FormControl fullWidth >
                                            <InputLabel id="demo-simple-select-label">Language</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                // value={values.autoPaymentType}
                                                label="Language"
                                            // onChange={handleChange}
                                            // onBlur={handleBlur}
                                            // name="autoPaymentType"
                                            >
                                                <MenuItem value={"English"}>English</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                        <FormControl fullWidth >
                                            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                // value={values.currency}
                                                label="Currency"
                                            // onChange={handleChange}
                                            // onBlur={handleBlur}
                                            // name="currency"
                                            >
                                                <MenuItem value={"Australian Dollar"}>Australian Dollar</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                        <FormControl fullWidth >
                                            <InputLabel id="demo-simple-select-label">Preferred Payment Type</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                // value={values.currency}
                                                label="Preferred Payment Type"
                                            // onChange={handleChange}
                                            // onBlur={handleBlur}
                                            // name="currency"
                                            >
                                                <MenuItem value={"Credit Card"}>Credit Card</MenuItem>
                                                <MenuItem value={"ach"}>ACH</MenuItem>



                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                        <TextField

                                            label="Agent ID"
                                            type="number"

                                            fullWidth
                                        // name="creditNotificationLimit2"
                                        // value={values.creditNotificationLimit2}
                                        // onChange={handleChange}
                                        // onBlur={handleBlur}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                        <TextField

                                            label="Parent ID"
                                            type="number"
                                            required
                                            fullWidth
                                            name="parentId"
                                            value={values.parentId}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                    <Grid item lg={12} md={4} sm={6} xs={12} paddingBottom={2}>
                                        <Divider />
                                    </Grid >

                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                        <TextField

                                            label="Referral Fee Paid"
                                            type="number"
                                            required
                                            fullWidth
                                            name="referralFeePaid"
                                            value={values.referralFeePaid}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>


                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                        <TextField

                                            label="isParent"
                                            type="number"
                                            required
                                            fullWidth
                                            name="isParent"
                                            value={values.isParent}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>

                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                        <TextField

                                            label="invoiceChild"
                                            type="number"
                                            required
                                            fullWidth
                                            name="invoiceChild"
                                            value={values.invoiceChild}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>




                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                        <FormControl fullWidth >
                                            <InputLabel id="demo-simple-select-label">useParentPricing</InputLabel>
                                            <Select

                                                id="demo-simple-select"
                                                value={values.useParentPricing}
                                                label="useParentPricing"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="useParentPricing"
                                                required
                                            >
                                                <MenuItem value={true}>True</MenuItem>
                                                <MenuItem value={false}>False</MenuItem>



                                            </Select>
                                        </FormControl>
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item lg={6}>
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={4} sm={6} xs={12} >
                                        <TextField
                                            label="User Code"
                                            type="number"
                                            // value={values}
                                            fullWidth
                                        // name="autoPaymentType"
                                        // onChange={handleChange}
                                        // onBlur={handleBlur}
                                        />
                                    </Grid>

                                    <Grid item lg={6} md={4} sm={6} xs={12}>
                                        <FormControl fullWidth >
                                            <InputLabel id="demo-simple-select-label">Invoice Delivery Method</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                // value={values.useParentPricing}
                                                label="Invoice Delivery Method"
                                            // onChange={handleChange}
                                            // onBlur={handleBlur}
                                            // name="useParentPricing"
                                            >
                                                <MenuItem value={"Email"}>Email</MenuItem>
                                                <MenuItem value={"Paper"}>Paper</MenuItem>
                                                <MenuItem value={"Email & Paper"}>Email & Paper</MenuItem>


                                            </Select>
                                        </FormControl>
                                    </Grid>


                                    <Grid item lg={12} md={4} sm={6} xs={12}>
                                        {accountType === 'Post-Paid' && (
                                            <Grid container spacing={2}>
                                                <Grid item lg={6} md={4} sm={6} xs={12} fullWidth paddingBottom={2}>
                                                    <TextField

                                                        label="Billing Cycle Day"
                                                        type="text"

                                                        fullWidth
                                                    // name="invoiceDesign"
                                                    // value={values.invoiceDesign}
                                                    // onChange={handleChange}
                                                    // onBlur={handleBlur}
                                                    />
                                                </Grid>
                                                <Grid item lg={6} md={4} sm={6} xs={12} fullWidth paddingBottom={2}>
                                                    <Grid container spacing={0} alignItems="center">
                                                        <Grid item xs={8}>
                                                            {/* Left side for text input */}
                                                            <TextField
                                                                label="Due Date"
                                                                fullWidth
                                                                // name="creditLimit"
                                                                // value={values.creditLimit}
                                                                // onChange={handleChange}
                                                                // onBlur={handleBlur}
                                                                sx={{ width: 175 }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            {/* Right side for dropdown */}
                                                            <Select
                                                                // value={values.selectedOption}
                                                                // onChange={handleChange}
                                                                // name="selectedOption"
                                                                displayEmpty
                                                                sx={{ width: 90 }}
                                                            >
                                                                <MenuItem value={'month'}>Month</MenuItem>
                                                                <MenuItem value={'week'}>Week</MenuItem>
                                                                <MenuItem value={'day'}>Day</MenuItem>
                                                                <MenuItem value={'year'}>Year</MenuItem>
                                                                <MenuItem value={'semi-month'}>Semi-Month</MenuItem>
                                                            </Select>
                                                        </Grid>


                                                    </Grid>
                                                    <Grid item lg={6} md={4} sm={6} xs={12} >
                                                        <TextField
                                                            label="creditLimit"
                                                            type="number"
                                                            value={values.creditLimit}
                                                            fullWidth
                                                            name="creditLimit"
                                                            required
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Grid>
                                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                                        <TextField

                                                            label="Auto Recharge Amount"
                                                            type="number"
                                                            required
                                                            fullWidth
                                                            name="autoRecharge"
                                                            value={values.autoRecharge}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Grid>
                                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                                        <TextField
                                                            required
                                                            label="Auto-Recharge Threshold"
                                                            type="number"
                                                            fullWidth
                                                            name="rechargeThreshold"
                                                            value={values.rechargeThreshold}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Grid>
                                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                                        <TextField

                                                            label="Auto-Recharge Monthly Limit"
                                                            type="number"
                                                            name="monthlyLimit"
                                                            fullWidth
                                                            required
                                                            value={values.monthlyLimit}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Grid>
                                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                                        <TextField

                                                            label="autoPaymentType"
                                                            type="number"
                                                            required
                                                            fullWidth
                                                            name="autoPaymentType"
                                                            value={values.autoPaymentType}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Grid>
                                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                                        <TextField

                                                            label="dueDateUnitId"
                                                            type="number"
                                                            required
                                                            fullWidth
                                                            name="dueDateUnitId"
                                                            value={values.dueDateUnitId}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Grid>
                                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                                        <TextField

                                                            label="dueDateValue"
                                                            type="number"
                                                            required
                                                            fullWidth
                                                            name="dueDateValue"
                                                            value={values.dueDateValue}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Grid>
                                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                                        <TextField

                                                            label="dfFm"
                                                            type="number"
                                                            required
                                                            fullWidth
                                                            name="dfFm"
                                                            value={values.dfFm}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Grid>
                                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                                        <TextField

                                                            label="nextInvoiceDayOfPeriod"
                                                            type="number"
                                                            required
                                                            fullWidth
                                                            name="nextInvoiceDayOfPeriod"
                                                            value={values.nextInvoiceDayOfPeriod}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Grid>

                                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                                        <TextField

                                                            label="creditNotificationLimit1"
                                                            type="number"
                                                            required
                                                            fullWidth
                                                            name="creditNotificationLimit1"
                                                            value={values.creditNotificationLimit1}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Grid>
                                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                                        <TextField

                                                            label="creditNotificationLimit2"
                                                            type="number"
                                                            required
                                                            fullWidth
                                                            name="creditNotificationLimit2"
                                                            value={values.creditNotificationLimit2}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Grid>


                                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                                        <TextField
                                                            label="currentMonthlyAmount"
                                                            type="number"
                                                            required
                                                            fullWidth
                                                            name="currentMonthlyAmount"
                                                            value={values.currentMonthlyAmount}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            InputProps={{
                                                                inputProps: {
                                                                    inputMode: "numeric",
                                                                },
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                                        <TextField

                                                            label="excludeAging"
                                                            type="number"
                                                            required
                                                            fullWidth
                                                            name="excludeAging"
                                                            value={values.excludeAging}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Grid>
                                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                                        <TextField

                                                            label="dynamicBalance"
                                                            type="number"
                                                            required
                                                            fullWidth
                                                            name="dynamicBalance"
                                                            value={values.dynamicBalance}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                        )}

                                    </Grid>
                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2} >
                                        <TextField
                                            fullWidth
                                            label='Device ID'
                                            InputLabelProps={{ shrink: true }}
                                            name='device'
                                            value={device}
                                            type='number'
                                            disabled
                                        // onChange={e => setDevice(e.target.value)}
                                        />

                                    </Grid>


                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                        <TextField

                                            label="Invoice Design"
                                            type="text"
                                            required
                                            fullWidth
                                            name="invoiceDesign"
                                            value={values.invoiceDesign}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>




                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                        <TextField
                                            label="MSISDN"
                                            type="number"
                                            InputLabelProps={{ shrink: true }}
                                            fullWidth
                                            required
                                            name="msisdn"
                                            value={msisdn}
                                            onChange={e => setMsisdn(e.target.value)}
                                            disabled

                                        />
                                    </Grid>
                                    {/* <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                    <TextField

                                        label="currentMonthlyAmount"
                                        type="number"
                                        required
                                        fullWidth
                                        name="currentMonthlyAmount"
                                        value={values.currentMonthlyAmount}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid> */}

                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                        <TextField
                                            label="SIM - MSISDN"
                                            InputLabelProps={{ shrink: true }}
                                            type="number"
                                            fullWidth
                                            required
                                            name="sim"
                                            value={sim}
                                            // onChange={e => setMsisdn(e.target.value)}
                                            disabled

                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid2>

                </Box>
                <Box sx={{ paddingBottom: 5 }} >

                    <Box sx={{ backgroundColor: '#253A7D' }}>
                        <Button onClick={togglePaper}>
                            <Typography variant="body1" sx={{ marginRight: 1, color: 'white' }}>Contact</Typography>
                            {showPaper ? < RemoveIcon sx={{ color: 'white' }} /> : <AddIcon sx={{ color: 'white' }} />}
                        </Button>
                    </Box>
                    {showPaper && (
                        <Paper sx={{ padding: 2, marginTop: 2 }}>
                            <Grid container spacing={2}>

                                <Grid item xs={3}>

                                    <TextField
                                        label='email'
                                        type="email"
                                        required
                                        fullWidth
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>

                                <Grid item xs={3}>

                                    <TextField
                                        label="organizationName"
                                        type="text"
                                        required
                                        fullWidth
                                        name="organizationName"
                                        value={values.organizationName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>

                                <Grid item xs={3}>

                                    <TextField
                                        label='streetAddres1'
                                        type="text"
                                        required
                                        fullWidth
                                        name="streetAddres1"
                                        value={values.streetAddres1}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>

                                <Grid item xs={3}>

                                    <TextField
                                        label='streetAddres2'
                                        type="text"
                                        required
                                        fullWidth
                                        name="streetAddres2"
                                        value={values.streetAddres2}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>

                                <Grid item xs={3}>

                                    <TextField
                                        label='city'
                                        type="text"
                                        required
                                        fullWidth
                                        name="city"
                                        value={values.city}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>

                                <Grid item xs={3}>

                                    <TextField
                                        label='state / Province'
                                        type="text"
                                        required
                                        fullWidth
                                        name="stateProvince"
                                        value={values.stateProvince}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>

                                <Grid item xs={3}>

                                    <TextField
                                        label='postalCode'
                                        type="text"
                                        required
                                        fullWidth
                                        name="postalCode"
                                        value={values.postalCode}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>

                                <Grid item xs={3}>

                                    <TextField
                                        label='countryCode'
                                        type="text"
                                        required
                                        fullWidth
                                        name="countryCode"
                                        value={values.countryCode}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>

                                <Grid item xs={3}>

                                    <TextField
                                        label='firstName'
                                        type="text"
                                        required
                                        fullWidth
                                        name="firstName"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>

                                <Grid item xs={3}>

                                    <TextField
                                        label='lastName'
                                        type="text"
                                        required
                                        fullWidth
                                        name="lastName"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>

                                <Grid item xs={3}>

                                    <TextField
                                        label='personInitial'
                                        type="text"
                                        required
                                        fullWidth
                                        name="personInitial"
                                        value={values.personInitial}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>

                                <Grid item xs={3}>

                                    <TextField
                                        label='personTitle'
                                        type="text"
                                        required
                                        fullWidth
                                        name="personTitle"
                                        value={values.personTitle}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>

                                <Grid item xs={3}>

                                    <TextField
                                        label='phoneCountryCode'
                                        type="number"
                                        required
                                        fullWidth
                                        name="phoneCountryCode"
                                        value={values.phoneCountryCode}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>

                                <Grid item xs={3}>

                                    <TextField
                                        label='phoneAreaCode'
                                        type="number"
                                        required
                                        fullWidth
                                        name="phoneAreaCode"
                                        value={values.phoneAreaCode}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>

                                <Grid item xs={3}>

                                    <TextField
                                        label='phonePhoneNumber'
                                        type="text"
                                        required
                                        fullWidth
                                        name="phonePhoneNumber"
                                        value={values.phonePhoneNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>

                                <Grid item xs={3}>

                                    <TextField
                                        label='faxCountryCode'
                                        type="number"
                                        required
                                        fullWidth
                                        name="faxCountryCode"
                                        value={values.faxCountryCode}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>

                                <Grid item xs={3}>

                                    <TextField
                                        label='faxAreaCode'
                                        type="number"
                                        required
                                        fullWidth
                                        name="faxAreaCode"
                                        value={values.faxAreaCode}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>

                                <Grid item xs={3}>

                                    <TextField
                                        label='faxPhoneNumber'
                                        type="text"
                                        required
                                        fullWidth
                                        name="faxPhoneNumber"
                                        value={values.faxPhoneNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl fullWidth >
                                        <InputLabel id="demo-simple-select-label">Deleted ?</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={values.deleted}
                                            label="Deleted ?"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="deleted"
                                            required

                                        >
                                            <MenuItem value={1}>Yes</MenuItem>
                                            <MenuItem value={0}>No</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>

                                    <TextField
                                        label='notificationInclude'
                                        type="number"
                                        required
                                        fullWidth
                                        name="notificationInclude"
                                        value={values.notificationInclude}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                {/* <Grid item xs={3}>

                                <TextField
                                    label='customerType'
                                    type="text"
                                    required
                                    fullWidth
                                    name="customerType"
                                    value={values.customerType}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Grid> */}
                                <Grid item xs={3}>

                                    <FormControl fullWidth >
                                        <InputLabel id="demo-simple-select-label">gender</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={values.gender}
                                            label="useParentPricing"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="gender"
                                            required
                                        >
                                            <MenuItem value={'M'}>Male</MenuItem>
                                            <MenuItem value={'F'}>Female</MenuItem>
                                            <MenuItem value={'o'}>Others</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>

                                    <FormControl fullWidth >
                                        <InputLabel id="demo-simple-select-label">ekycStatus</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={values.ekycStatus}
                                            label="ekycStatus"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="ekycStatus"
                                            required
                                        >
                                            <MenuItem value={'Active'}>Active</MenuItem>
                                            <MenuItem value={'Incative'}>InActive</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>

                                    <TextField
                                        label='ekycToken'
                                        type="text"
                                        required
                                        fullWidth
                                        name="ekycToken"
                                        value={values.ekycToken}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={3}>

                                    <TextField
                                        label='alternateNumber'
                                        type="text"
                                        required
                                        fullWidth
                                        name="alternateNumber"
                                        value={values.alternateNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={3}>

                                    <TextField
                                        label='landlineNumber'
                                        type="text"
                                        required
                                        fullWidth
                                        name="landlineNumber"
                                        value={values.landlineNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={3}>

                                    <TextField
                                        label='vatId'
                                        type="text"
                                        required
                                        fullWidth
                                        name="vatId"
                                        value={values.vatId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={3}>

                                    <TextField
                                        label='profession'
                                        type="text"
                                        required
                                        fullWidth
                                        name="profession"
                                        value={values.profession}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>

                                <Grid item xs={3} >

                                    <FormControl fullWidth >
                                        <InputLabel id="demo-simple-select-label">ekycStatus</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={values.maritalStatus}
                                            label="maritalStatus"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="maritalStatus"
                                            required

                                        >
                                            <MenuItem value={'Married'}>Married</MenuItem>
                                            <MenuItem value={'Un Married'}>Un Married</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <InputLabel>Date of Birth</InputLabel>
                                    <TextField
                                        type="date"
                                        required
                                        fullWidth
                                        name="dateOfBirth"
                                        value={values.dateOfBirth}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>

                    )}
                </Box>
                <Grid sx={{ paddingBottom: 5 }}>
                    <Box sx={{ backgroundColor: '#253A7D' }}>
                        <Button onClick={togglePaperPayment}>
                            <Typography variant="body1" sx={{ marginRight: 1, color: 'white' }}>Payment Method</Typography>
                            {showPaperPayment ? < RemoveIcon sx={{ color: 'white' }} /> : <AddIcon sx={{ color: 'white' }} />}
                        </Button>
                    </Box>
                    {showPaperPayment && (
                        <Paper sx={{ padding: 2, marginTop: 2 }}>
                            <Grid container spacing={2}>
                                {/* Left side (40% of the screen) */}
                                <Grid item lg={5} md={5} sm={12} xs={12} paddingBottom={2} sx={{ marginRight: 2 }}>
                                    <Grid container spacing={2}>
                                        <Grid item lg={12} md={12} sm={12} xs={12} paddingBottom={2}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Billing Cycle Unit</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Billing Cycle Unit"
                                                    value={billingCycle}
                                                    onChange={handleBillingCycleChange}
                                                >
                                                    <MenuItem value={'---'}> -- </MenuItem>
                                                    <MenuItem value={'payment_gate_way'}>Payment Gate Way</MenuItem>
                                                    <MenuItem value={'Credit Card'}>Credit Card</MenuItem>
                                                    <MenuItem value={'cash'}>Cash</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} paddingBottom={2}>
                                            <TextField
                                                type="text"

                                                fullWidth
                                                name="description"
                                                label='Processing Order'
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* Right side (50% of the screen) */}
                                <Grid item lg={6} md={6} sm={12} xs={12} paddingBottom={2}>
                                    {showCreditCardFields && (
                                        <form onSubmit={handleSubmit2}>
                                            <Grid item lg={12} md={7} sm={12} xs={12} paddingBottom={2} sx={{ justifyContent: 'flex-end', display: 'flex', flexDirection: 'column' }}>
                                                <Grid container spacing={2}>
                                                    <Grid item lg={6}>
                                                        <TextField
                                                            label="userId"
                                                            sx={{ width: 210 }}
                                                            type="number"
                                                            value={values2.userId}
                                                            fullWidth
                                                            name="userId"
                                                            required
                                                            disabled
                                                            onChange={handleChange2}
                                                            onBlur={handleBlur2}
                                                        />
                                                    </Grid>
                                                    <Grid item lg={6}>
                                                        <TextField
                                                            label="customerId"
                                                            sx={{ width: 210 }}
                                                            type="number"
                                                            value={values2.customerId}
                                                            fullWidth
                                                            name="userId"
                                                            required
                                                            disabled
                                                            onChange={handleChange2}
                                                            onBlur={handleBlur2}
                                                        />
                                                    </Grid>
                                                    <Grid item lg={6}>
                                                        <TextField
                                                            label='attempt'
                                                            type='number'
                                                            value={values2.attempt}
                                                            name='attempt'
                                                            required
                                                            onChange={handleChange2}
                                                            onBlur={handleBlur2}

                                                        />
                                                    </Grid>
                                                    <Grid item lg={6}>
                                                        <TextField
                                                            label='Amount'
                                                            type='number'
                                                            value={values2.amount}
                                                            name='amount'
                                                            required
                                                            onChange={handleChange2}
                                                            onBlur={handleBlur2}

                                                        />
                                                    </Grid>
                                                    <Grid item lg={6}>
                                                        <FormControl sx={{ width: 210 }}>
                                                            <InputLabel id="demo-simple-select-label">Delete</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                label="Delete"
                                                                value={values2.deleted}
                                                                onChange={handleChange2}
                                                                name='deleted'
                                                            >

                                                                <MenuItem value={1}>Yes</MenuItem>
                                                                <MenuItem value={0}>No</MenuItem>

                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item lg={6}>
                                                        <FormControl sx={{ width: 210 }}>
                                                            <InputLabel id="demo-simple-select-label">Is Refund</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                label="Is Refund"
                                                                value={values2.isRefund}
                                                                onChange={handleChange2}
                                                                name='isRefund'
                                                            >

                                                                <MenuItem value={1}>Yes</MenuItem>
                                                                <MenuItem value={0}>No</MenuItem>

                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item lg={6}>
                                                        <FormControl sx={{ width: 210 }}>
                                                            <InputLabel id="demo-simple-select-label">isPreauth</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                label="isPreauth"
                                                                value={values2.isPreauth}
                                                                onChange={handleChange2}
                                                                name='isPreauth'
                                                            >

                                                                <MenuItem value={1}>Yes</MenuItem>
                                                                <MenuItem value={0}>No</MenuItem>

                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item lg={6}>
                                                        <TextField label='payout ID'
                                                            type='number'
                                                            value={values2.payoutId}
                                                            name='payoutId'
                                                            required
                                                            onChange={handleChange2}
                                                            onBlur={handleBlur2}

                                                        />
                                                    </Grid>
                                                    <Grid item lg={6}>
                                                        <TextField label='balance'
                                                            type='number'
                                                            value={values2.balance}
                                                            name='balance'
                                                            required
                                                            onChange={handleChange2}
                                                            onBlur={handleBlur2}
                                                        />
                                                    </Grid>
                                                    <Grid item lg={6}>
                                                        <TextField label='payment pariod'
                                                            type='number'
                                                            value={values2.paymentPeriod}
                                                            name='paymentPeriod'
                                                            required
                                                            onChange={handleChange2}
                                                            onBlur={handleBlur2}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <FormControl sx={{ width: 210 }}>
                                                            <InputLabel id="demo-simple-select-label">Payment Status</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                label="paymentStatus"
                                                                value={values2.paymentStatus}
                                                                onChange={handleChange2}
                                                                name='paymentStatus'
                                                            >

                                                                <MenuItem value={true}>True</MenuItem>
                                                                <MenuItem value={false}>False</MenuItem>

                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item lg={6}>
                                                        <TextField label='Payment Notes'

                                                            type='text'
                                                            value={values2.paymentNotes}
                                                            name='paymentNotes'
                                                            required
                                                            onChange={handleChange2}
                                                            onBlur={handleBlur2}
                                                        />
                                                    </Grid>


                                                </Grid>
                                            </Grid>
                                        </form>

                                    )}
                                </Grid>
                            </Grid>
                        </Paper>
                    )}
                </Grid>
            </Paper>
            <Grid padding={1} lg={4} md={4} sm={6} xs={12} sx={{ paddingTop: 4, textAlign: { lg: 'center', md: 'center', sm: 'center', xs: 'center' } }}>
                <Button
                    type="submit"

                    style={{ boxShadow: 20, width: '100px', backgroundColor: '#253A7D', color: 'white' }}
                    // onClick={submitMainForm2}
                    sx={{ mb: 5, textAlign: { sm: 'center' } }}
                >
                    Submit
                </Button>
            </Grid>


        </Box>
    )
}