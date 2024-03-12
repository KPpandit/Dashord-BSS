import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Snackbar, TextField, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { useEffect, useRef, useState } from 'react'
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
export default function AddCustomerDetails() {
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
        setSelectedPhoto(file);
        // You can perform additional actions with the file if needed
    };
    const handleImageUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('customerImage', selectedPhoto); // Use the correct key here

            // Append additional form data
            formData.append('key1', 'value1');
            formData.append('key2', 'value2');

            const imageResponse = await axios.post(
                `http://172.5.10.2:9090/api/saveimage/${customerId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${tokenValue}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('Image uploaded successfully:', imageResponse.data);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };


    const location = useLocation();
    const accountType = location.state?.accountType;
    const tokenValue = localStorage.getItem('token');

    const [msisdn, setMsisdn] = useState('');
<<<<<<< HEAD
    const [sim, setSim] = useState('');
=======
    const [partner, setpartner] = useState('');
>>>>>>> b0c96f111ac58fe1cd7281f9758c199b2a7910ac
    const [device, setDevice] = useState('');

    const [userId, setuserId] = useState('');
    const [customerId, setCustomerID] = useState('');
    const isFirstRender = useRef(true);
    useEffect(() => {
        console.log("Inside useEffect");
        console.log("customerId:", customerId);
        console.log("userId:", userId);

        if (!isFirstRender.current) {
            console.log("Calling submitMainForm2");
            submitMainForm2();
        } else {
            console.log("Initial render, skipping effect");
            isFirstRender.current = false;
        }
    }, [customerId, userId]);
    const { handleChange, handleSubmit, handleBlur, values, submitForm: submitMainForm1, resetForm: resetForm1 } = useFormik({
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
            customerType: accountType,
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

<<<<<<< HEAD


            console.log(values);
            console.log(msisdn + " Msisdn " + sim + " Sim " + device)
            // Define the base URL
            let baseUrl = 'http://172.5.10.2:9090/api/savecustomer/account/1/invoice/1/partner/11/baseuser/3/orderperiod/1?';
=======
            console.log(partner+"partner ID")

            console.log(values);
            console.log(msisdn + " Msisdn " + partner + " partner " + device)
            // Define the base URL
            let baseUrl = 'http://172.5.10.2:9090/api/savecustomer/account/1/invoice/2/baseuser/3/orderperiod/1?';
>>>>>>> b0c96f111ac58fe1cd7281f9758c199b2a7910ac

            // Check conditions and add parameters accordingly
            if (msisdn) {
                baseUrl += `msisdn=${msisdn}`;
                console.log("MSISDN WORK")
            }

<<<<<<< HEAD
            if (sim) {
                baseUrl += `&sim=${sim}`;
                console.log("SIM WORK")
=======
            if (partner) {
                baseUrl += `&partner=${partner}`;
                console.log("partner WORK")
>>>>>>> b0c96f111ac58fe1cd7281f9758c199b2a7910ac
            }

            if (device) {
                baseUrl += `&device=${device}`;
                console.log("Device WORK")
            }
<<<<<<< HEAD

=======
console.log(device+" device ID"+partner+" partner ID"+ msisdn +" Msisdn")
>>>>>>> b0c96f111ac58fe1cd7281f9758c199b2a7910ac
            const res1 = await axios.post(
                baseUrl,
                { ...values },
                {
                    headers: {
                        Authorization: `Bearer ${tokenValue}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }
            ).then(res => {
                if (res.status === 201) {

                    // setId(res.data.id);
                    // setCustomerID(res.data.baseUser.id);
                    const Cid = res.data.id;
                    const customerId = res.data.baseUser.id;
                    setCustomerID(res.data.id);
                    setuserId(res.data.baseUser.id);
                    setValues2({ ...values2, customerId: Cid, userId: customerId })
                    // setNotification({
                    //     open: true,
                    //     message: 'Customer Added successfully!',
                    //     severity: 'success',
                    // });

                    //  submitMainForm2();
                    // resetForm1();
                }
            }).catch(e => {
                setNotification({
<<<<<<< HEAD
                    open: true,
                    message: 'Failed to add Customer record. Please try again.',
                    severity: 'error',
                });
                if (e.response && e.response.status === 401) {
                    console.log("From inside if condition");
                    localStorage.removeItem('token');
                    navigate("/");
                }
                if (e.response && e.response.status === 409) {
                    setNotification({
                        open: true,
                        message: 'MSISDN Already Exist',
                        severity: 'error',
                    });
                }
                if (e.response && e.response.status === 404) {
                    setNotification({
                        open: true,
                        message: 'Please Provide Valid MSISDN',
                        severity: 'error',
                    });
                }
=======
                    open:true,
                    message:e.message,
                    severity: 'error',
                })


                // setNotification({
                //     open: true,
                //     message: 'Failed to add Customer record. Please try again.',
                //     severity: 'error',
                // });
                // if (e.response && e.response.status === 401) {
                //     console.log("From inside if condition");
                //     localStorage.removeItem('token');
                //     navigate("/");
                // }
                // if (e.response && e.response.status === 409) {
                //     setNotification({
                //         open: true,
                //         message: 'MSISDN Already Exist',
                //         severity: 'error',
                //     });
                // }
                // if (e.response && e.response.status === 404) {
                //     setNotification({
                //         open: true,
                //         message: 'Please Provide Valid MSISDN',
                //         severity: 'error',
                //     });
                // }
>>>>>>> b0c96f111ac58fe1cd7281f9758c199b2a7910ac
            })
            console.log("API 1 response :", res1)
        }
    })



    const handleCancelPhoto = () => {
        // Reset or clear the selected photo
        setSelectedPhoto(null);

        // Close the file input
        const fileInput = document.getElementById('upload-photo');
        if (fileInput) {
            fileInput.value = ''; // Clear the file input
        }
    };

    const { handleChange: handleChange2, handleSubmit: handleSubmit2, handleBlur: handleBlur2, values: values2, submitForm: submitMainForm2, setValues: setValues2, resetForm: resetForm2 } = useFormik({
        initialValues: {
            userId: "",
            customerId: "",
            attempt: "",
            amount: "",
            deleted: "",
            isRefund: "",
            isPreauth: "",
            payoutId: "",
            balance: "",
            paymentPeriod: "",
<<<<<<< HEAD
            paymentNotes: ""

=======
            paymentNotes: "",
            paymentStatus: ""
>>>>>>> b0c96f111ac58fe1cd7281f9758c199b2a7910ac
        },
        onSubmit: async (values2) => {


            if (selectedPhoto) {
                await handleImageUpload();
            }



            const res2 = await axios.post('http://172.5.10.2:9090/api/savepayment/currency/1/paymentrsult/1/paymentmethod/1?creditCard=1',
                { ...values2 }, {

                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }

            ).then(res => {
                if (res.status === 201) {

                    setNotification({
                        open: true,
                        message: 'Customer  Added successfully!',
                        severity: 'success',
                    });
                    // resetForm2()
                    // submitMainForm1();


                }
            }).catch(e => {
                if (e.response.status === 401) {
                    setNotification({
                        open: true,
                        message: 'Payment Filed',
                        severity: 'error',
                    });
                }
                // submitMainForm1();
            })

        },
    });


    const commonInputLabelProps = { shrink: true, style: { fontFamily: 'Roboto', } };
    return (
        <Box component="form" onSubmit={handleSubmit} >
            <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
                <Paper elevation={10} sx={{ padding: 1, paddingLeft: 3, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0, marginRight: 0.2 }}>
                    <Grid>
                        <Typography
                            style={{

                                fontSize: '20px',
                                paddingLeft: 15,
                                fontWeight: 'bold',

                            }}
                        >Add Customer</Typography>
                    </Grid>
                </Paper>
            </Box>
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
            <Paper elevation={15} sx={{ paddingLeft: 5, paddingRight: 5 }}> {/* Adjust the padding as needed */}
                <Box
                    sx={{
                        marginTop: 1.5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                    }}
                >

                    <Grid2 >
                        <Grid container justifyContent="space-between">
                            <Grid item lg={2} md={8} sm={6} xs={12} paddingBottom={2} sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {/* Display the selected photo */}
                                {selectedPhoto ? (
                                    <>
                                        <CancelIcon sx={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer', color: '#1976D2' }} onClick={handleCancelPhoto} />
                                        {/* Use URL.createObjectURL to display the image */}
                                        <img src={URL.createObjectURL(selectedPhoto)} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px', paddingBottom: '10px' }} />
                                    </>
                                ) : (
                                    <Typography variant="body1" color="textSecondary">
                                        No photo selected
                                    </Typography>
                                )}
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="upload-photo"
                                    type="file"
                                    name="photo"
                                    onChange={handlePhotoChange}
                                />
                                <label htmlFor="upload-photo">
                                    <Button variant="contained" sx={{ backgroundColor: '#253A7D' }} color="primary" component="span" fullWidth>
                                        Update Photo
                                    </Button>
                                </label>
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
                                            InputLabelProps={commonInputLabelProps}
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
                                            InputLabelProps={commonInputLabelProps}
                                        // name="dueDateValue"
                                        // onChange={handleChange}
                                        // onBlur={handleBlur}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                        <FormControl fullWidth >
<<<<<<< HEAD
                                            <InputLabel id="demo-simple-select-label">Subscriber Status</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
=======
                                            <InputLabel id="demo-partnerple-select-label">Subscriber Status</InputLabel>
                                            <Select
                                                labelId="demo-partnerple-select-label"
>>>>>>> b0c96f111ac58fe1cd7281f9758c199b2a7910ac
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

<<<<<<< HEAD
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
                                        <FormControl fullWidth >
                                            <InputLabel id="demo-simple-select-label">IS Parent ?</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={values.isParent}
                                                label="useParentPricing"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="isParent"
                                            >
                                                <MenuItem value={1}>Yes</MenuItem>
                                                <MenuItem value={0}>No</MenuItem>


                                            </Select>
                                        </FormControl>
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
=======
                                   


>>>>>>> b0c96f111ac58fe1cd7281f9758c199b2a7910ac
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
<<<<<<< HEAD
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
=======

                                    <Grid item lg={6} md={4} sm={6} xs={12} >
>>>>>>> b0c96f111ac58fe1cd7281f9758c199b2a7910ac
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


<<<<<<< HEAD
                                    <Grid item lg={12} md={4} sm={6} xs={12} paddingBottom={2}>
=======
                                    <Grid item lg={12} md={4} sm={6} xs={12} >
>>>>>>> b0c96f111ac58fe1cd7281f9758c199b2a7910ac
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
<<<<<<< HEAD
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
=======
                                                        <Grid item xs={12}>
                                                            <Grid container spacing={1}>
                                                                <Grid item xs={8}>
                                                                    {/* Left side for text input */}
                                                                    <TextField
                                                                        label="Due Date"
                                                                        fullWidth
                                                                    // name="creditLimit"
                                                                    // value={values.creditLimit}
                                                                    // onChange={handleChange}
                                                                    // onBlur={handleBlur}

                                                                    />
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    {/* Right side for dropdown */}
                                                                    <Select

                                                                        // value={values.selectedOption}
                                                                        // onChange={handleChange}
                                                                        // name="selectedOption"
                                                                        fullWidth
                                                                        displayEmpty

                                                                    >
                                                                        <MenuItem value={'month'}>Month</MenuItem>
                                                                        <MenuItem value={'week'}>Week</MenuItem>
                                                                        <MenuItem value={'day'}>Day</MenuItem>
                                                                        <MenuItem value={'year'}>Year</MenuItem>
                                                                        <MenuItem value={'semi-month'}>Semi-Month</MenuItem>
                                                                    </Select>
                                                                </Grid>
                                                            </Grid>
>>>>>>> b0c96f111ac58fe1cd7281f9758c199b2a7910ac
                                                        </Grid>

                                                    </Grid>
                                                </Grid>
<<<<<<< HEAD
=======
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
                                                <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                                    <FormControl fullWidth >
                                                        <InputLabel id="demo-simple-select-label">IS Parent ?</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={values.isParent}
                                                            label="useParentPricing"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            name="isParent"
                                                        >
                                                            <MenuItem value={1}>Yes</MenuItem>
                                                            <MenuItem value={0}>No</MenuItem>


                                                        </Select>
                                                    </FormControl>
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

>>>>>>> b0c96f111ac58fe1cd7281f9758c199b2a7910ac

                                            </Grid>
                                        )}

                                    </Grid>
                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2} >
                                        <TextField
                                            fullWidth
<<<<<<< HEAD
=======
                                            InputLabelProps={{ shrink: true }}
>>>>>>> b0c96f111ac58fe1cd7281f9758c199b2a7910ac
                                            label='Device ID'
                                            name='device'
                                            value={device}
                                            type='number'
                                            onChange={e => setDevice(e.target.value)}
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




<<<<<<< HEAD
                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
=======
                                    {/* <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
>>>>>>> b0c96f111ac58fe1cd7281f9758c199b2a7910ac
                                        <TextField
                                            label="MSISDN"
                                            type="number"
                                            fullWidth

                                            name="msisdn"
                                            value={msisdn}
                                            onChange={e => setMsisdn(e.target.value)}

                                        />
<<<<<<< HEAD
                                    </Grid>
=======
                                    </Grid> */}
>>>>>>> b0c96f111ac58fe1cd7281f9758c199b2a7910ac
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

<<<<<<< HEAD
                                            label="SIM"
                                            type="number"
                                            name='sim'
                                            value={sim}
                                            onChange={e => setSim(e.target.value)}

                                            fullWidth
                                        // name="accountType"
                                        // value={values.accountType}
                                        // onChange={handleChange}
                                        // onBlur={handleBlur}
                                        />
                                    </Grid>
=======
                                            label="Partner Id"
                                            InputLabelProps={{ shrink: true }}
                                            type="number"
                                            name='partner'
                                            value={partner}
                                            onChange={e => setpartner(e.target.value)}

                                            fullWidth
                                      
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
                                    <TextField
                                            label="MSISDN"
                                            type="number"
                                            fullWidth

                                            name="msisdn"
                                            value={msisdn}
                                            onChange={e => setMsisdn(e.target.value)}

                                        />
                                    </Grid>
                                   
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

>>>>>>> b0c96f111ac58fe1cd7281f9758c199b2a7910ac
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

                                    <FormControl fullWidth >
                                        <InputLabel id="demo-simple-select-label">Person Title</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={values.personTitle}
                                            label="Person Title"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="personTitle"
                                            required

                                        >
                                            <MenuItem value={'Mr'}>Mr.</MenuItem>
                                            <MenuItem value={'Ms'}>Ms.</MenuItem>
                                            <MenuItem value={'Miss'}>Miss.</MenuItem>

                                            <MenuItem value={'Mrs'}>Mrs.</MenuItem>


                                        </Select>
                                    </FormControl>
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
                        <Paper elevation={10} sx={{ padding: 2, marginTop: 2 }}>
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
                                                    <Grid item xs={6}>
                                                        <TextField

                                                            label="userId"
                                                            type="number"
                                                            value={values2.userId}
                                                            fullWidth
                                                            name='userId'
                                                            required
                                                            disabled
                                                            onChange={handleChange2}
                                                            onBlur={handleBlur2}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <TextField

                                                            label="customerId"
                                                            type="number"
                                                            value={values2.customerId}
                                                            fullWidth
                                                            name='customerId'
                                                            required
                                                            disabled
                                                            onChange={handleChange2}
                                                            onBlur={handleBlur2}
                                                        />
                                                    </Grid>

                                                    <Grid item xs={6}>
                                                        <TextField
                                                            label='attempt'
                                                            type='number'
                                                            value={values2.attempt}
                                                            name='attempt'
                                                            required
                                                            fullWidth
                                                            onChange={handleChange2}
                                                            onBlur={handleBlur2}

                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            label='Amount'
                                                            type='number'
                                                            value={values2.amount}
                                                            name='amount'
                                                            required
                                                            fullWidth
                                                            onChange={handleChange2}
                                                            onBlur={handleBlur2}

                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <FormControl fullWidth>
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
                                                    <Grid item xs={6}>
                                                        <FormControl fullWidth>
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
                                                    <Grid item xs={6}>
                                                        <FormControl fullWidth>
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
                                                    <Grid item xs={6}>
                                                        <TextField label='payout ID'
                                                            type='number'
                                                            fullWidth
                                                            value={values2.payoutId}
                                                            name='payoutId'
                                                            required
                                                            onChange={handleChange2}
                                                            onBlur={handleBlur2}

                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <TextField label='balance'
                                                            type='number'
                                                            value={values2.balance}
                                                            name='balance'
                                                            required
                                                            fullWidth
                                                            onChange={handleChange2}
                                                            onBlur={handleBlur2}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <TextField label='payment pariod'
                                                            type='number'
                                                            value={values2.paymentPeriod}
                                                            name='paymentPeriod'
                                                            required
                                                            fullWidth
                                                            onChange={handleChange2}
                                                            onBlur={handleBlur2}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
<<<<<<< HEAD
=======
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">Payment Status</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                label="paymentStatus"
                                                                value={values2.paymentStatus}
                                                                onChange={handleChange2}
                                                                name='paymentStatus'
                                                            >

                                                                <MenuItem value={1}>Yes</MenuItem>
                                                                <MenuItem value={0}>No</MenuItem>

                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12}>
>>>>>>> b0c96f111ac58fe1cd7281f9758c199b2a7910ac
                                                        <TextField label='Payment Notes'
                                                            fullWidth
                                                            type='text'
                                                            value={values2.paymentNotes}
                                                            name='paymentNotes'
<<<<<<< HEAD
=======
                                                            rows={4}
>>>>>>> b0c96f111ac58fe1cd7281f9758c199b2a7910ac
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

                    style={{ width: '100px', backgroundColor: '#253A7D', color: 'white' }}
                    // onClick={submitMainForm2}
                    sx={{ mb: 5, textAlign: { sm: 'center' }, boxShadow: 15 }}
                >
                    Submit
                </Button>
            </Grid>


        </Box>
    )
}