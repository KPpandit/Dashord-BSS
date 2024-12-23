import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Snackbar, TextField, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { useEffect, useRef, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import * as Yup from 'yup'; // For validation schema
import { useFormik } from 'formik';
import { Label } from '@mui/icons-material';
import axios from "axios";
import { toast } from 'react-toastify';
import MuiAlert from '@mui/material/Alert';
import { useLocation } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
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



    


    const [billingCycle, setBillingCycle] = useState('');



    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        setSelectedPhoto(file);
        // You can perform additional actions with the file if needed
    };

    const location = useLocation();
    const accountType = location.state?.accountType;
    const tokenValue = localStorage.getItem('token');

    const [msisdn, setMsisdn] = useState('');
    const [partner, setpartner] = useState('');
    const [device, setDevice] = useState('');
    const [router, setRouter] = useState('');
    let photo_id;
    
    const isFirstRender = useRef(true);

    const savePhoto = async () => {
        try {
            // Step 1: Get the file input element and selected file
            const fileInput = document.getElementById('upload-photo');
            const file = fileInput?.files[0]; // Get the file from the input

            if (!file) {
                // toast.error('Please select a file before uploading.');
                return;
            }

            // Step 2: Create FormData and append the file
            const formData = new FormData();
            formData.append('customerImage', file);  // The key 'customerImage' should match the backend expectation

            // Step 3: Send POST request with the image
            const photoRes = await axios.post(
                `https://bssproxy01.neotel.nr/crm/api/update_image/${photo_id}`, // photo_id returned from the form submission
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${tokenValue}`,
                        "Accept": "application/json",
                        "Content-Type": "multipart/form-data"  // Ensure multipart/form-data for file uploads
                    }
                }
            );

            if (photoRes.status === 200) {
                toast.success('Photo uploaded successfully!', { autoClose: 2000 });
            } else {
                // toast.error('Photo upload failed.', { autoClose: 2000 });
            }
        } catch (error) {
            console.log(error, " -----> photo upload error");
            // toast.error('Photo upload failed.', { autoClose: 2000 });
        }
    };


   
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        postalCode: Yup.string()
            .matches(/^[0-9]{5}$/, 'Postal Code must be exactly 5 digits')
            .required('Postal Code is required'),
        ekycToken: Yup.string()
            .matches(/^[0-9]{10}$/, 'eKYC Token must be exactly 10 digits')
            .required('eKYC Token is required'),
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        phonePhoneNumber: Yup.string()
            .matches(/^[0-9]{10}$/, 'Phone Number must be exactly 10 digits'),
        dateOfBirth: Yup.date().required('Date of Birth is required'),
        gender: Yup.string().required('Gender is required'),
        maritalStatus: Yup.string(),
    });
    const { handleChange, handleSubmit, handleBlur, values, touched, errors, submitForm: submitMainForm1, resetForm: resetForm1 } = useFormik({
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
            serviceType: "",
            isVip: false
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(partner + "partner ID");
            console.log(values);
            console.log(msisdn + " Msisdn " + partner + " partner " + device);

            // Define the base URL
            let baseUrl = 'https://bssproxy01.neotel.nr/crm/api/savecustomer/account/1/invoice/2/baseuser/1/orderperiod/1?';

            // Check conditions and add parameters accordingly
            if (msisdn) {
                baseUrl += `msisdn=${msisdn}`;
                console.log("MSISDN WORK");
            }

            if (partner) {
                baseUrl += `&partner=${partner}`;
                console.log("partner WORK");
            }

            if (device) {
                baseUrl += `&device=${device}`;
                console.log("Device WORK");
            }
            if (router) {
                baseUrl += `&router=${router}`;
                console.log("Router  WORK");
            }

            console.log(device + " device ID" + partner + " partner ID" + msisdn + " Msisdn");

            try {
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
                );

                if (res1.status === 201) {
                    toast.success('Customer Added successfully!', { autoClose: 2000 });
                    console.log(res1.data.id, '   data value fomr respionse ')
                    photo_id = res1.data.id;
                    // Assuming the ID is returned in the response
                    console.log('value in photo id ', photo_id);
                    savePhoto();
                }

            } catch (e) {
                console.log(e, " -----> e");
                toast.error(e.response.data.message, { autoClose: 2000 });
            }
        }
    });




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
            msisdn: msisdn,
            attempt: "",
            amount: "",
            deleted: "",
            isRefund: "",
            isPreauth: "",
            payoutId: "",
            balance: "",
            paymentPeriod: "",
            paymentNotes: "",
            product: "",
            paymentStatus: ""
        },
        onSubmit: async (values2) => {
            // Check if billingCycle is 'cash'
            if (billingCycle === 'cash') {
                const res2 = await axios.post(`https://bssproxy01.neotel.nr/crm/api/savepayment/currency/1/paymentrsult/1/paymentmethod/1`, // Use different URL for cash
                    { ...values2 }, {
                    headers: {
                        Authorization: `Bearer ${tokenValue}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }).then(res => {
                    if (res.status === 201) {
                        toast.success('Customer  Added successfully!', { autoClose: 2000 });

                    }
                }).catch(e => {
                    if (e.response.status === 401) {
                        toast.error(e.response.data.message, { autoClose: 2000 });
                    }
                });
            } else {
                const res2 = await axios.post(`https://bssproxy01.neotel.nr/crm/api/savepayment/currency/1/paymentrsult/1/paymentmethod/1?creditCard=1`, // Use default URL for credit card
                    { ...values2 }, {
                    headers: {
                        Authorization: `Bearer ${tokenValue}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }).then(res => {
                    if (res.status === 201) {
                        console.log(" saved success fully")
                        toast.success('Customer  Added successfully!', { autoClose: 2000 });
                    }
                }).catch(e => {
                    if (e.response.status === 401) {
                        toast.error('Error! Please try again later', { autoClose: 2000 });
                    }
                });
            }
        },
    });
    const [userId, setuserId] = useState(null);
    const [customerId, setCustomerID] = useState(null);

    useEffect(() => {
        console.log("submit form useEffect working ")
        console.log("Inside useEffect");
        console.log("customerId:", customerId);
        console.log("userId:", userId);

        if (!isFirstRender.current && customerId !== null && userId !== null) {
            console.log("Calling submitMainForm2");
            // submitMainForm2();
        } else {
            console.log("Initial render or customerId/userId is null, skipping effect");
            isFirstRender.current = false;
        }
    }, [customerId, userId, submitMainForm2, msisdn, device]);
    const renderTextField = ({ label, value, onChange, name, type = "text", error = false, helperText = "", required = false, fullWidth = true }) => (
        <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
            <TextField
                label={label}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                fullWidth={fullWidth}
                error={error}
                helperText={helperText}
                InputLabelProps={commonInputLabelProps}
            />
        </Grid>
    );
    
    const renderSelectField = ({ label, value, onChange, name, options, required = false }) => (
        <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
            <FormControl fullWidth>
                <InputLabel id={label} required>{label}</InputLabel>
                <Select
                    labelId={label}
                    id={label}
                    value={value}
                    name={name}
                    label={label}
                    required={required}
                    onChange={onChange}
                >
                    {options.map(option => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    );
    const validateEmail = (value) => {
        let error;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!value) {
            error = "Email is required";
        } else if (!emailRegex.test(value)) {
            error = "Invalid email format";
        }
        return error;
    };
    
  
    const commonInputLabelProps = { shrink: true, style: { fontFamily: 'Roboto', } };
    return (
        <Box component="form" onSubmit={handleSubmit} >
            <ToastContainer position="bottom-left" />
            <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
                <Paper elevation={10} sx={{ padding: 1, paddingLeft: 3, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0, marginRight: 0.2 }}>
                    <Grid>
                        <Typography
                            style={{

                                fontSize: '20px',
                                paddingLeft: 15,
                                fontWeight: 'bold',

                            }}
                        >Add Subscriber</Typography>
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

                    <Grid >
                        <Grid container justifyContent="space-between">
                            <Grid item lg={2} md={8} sm={6} xs={12} paddingBottom={2} sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                                {/* Display the selected photo */}
                                {selectedPhoto ? (
                                    <>
                                        <CancelIcon sx={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer', color: '#1976D2' }} onClick={handleCancelPhoto} />
                                        {/* Use URL.createObjectURL to display the image */}
                                        <img src={URL.createObjectURL(selectedPhoto)} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px', paddingBottom: '10px' }} />
                                    </>
                                ) : (
                                    <Typography variant="body1" color="textSecondary" sx={{padding:1}}>
                                        {/* No photo selected */}
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
                                        Uploade Photo
                                    </Button>
                                </label>
                            </Grid>

                        </Grid>
                        <Divider />
                       

<Grid container spacing={6} paddingBottom={2} paddingTop={2}>
    <Grid item lg={6}>
        <Grid container spacing={2}>
            {renderTextField({ label: "Account Type", name: 'customerType', value: accountType || values.customerType, onChange: handleChange })}
            {renderTextField({ label: "Status", value: "Active", onChange: () => {}, required: false })}
            {renderSelectField({ label: "Service Type", value: values.serviceType, onChange: handleChange, name: 'serviceType', options: [{ value: "Mobility", label: "Mobility" }, { value: "FTTH", label: "FTTH" }, { value: "FWA", label: "FWA" }, { value: "VOIP", label: "VOIP" }] })}
            {renderTextField({ label: "Partner Id", name: 'partner', value: partner, onChange: e => setpartner(e.target.value), required: true, type: "number" })}
            
            {(accountType.toLowerCase() === 'postpaid' || accountType.toLowerCase() === 'post-paid') && renderSelectField({
                label: "Is VIP", value: values.isVip, onChange: handleChange, name: 'isVip', options: [{ value: true, label: "Yes" }, { value: false, label: "No" }]
            })}
            
            <Grid item lg={12} md={4} sm={6} xs={12} paddingBottom={2}>
                <Divider />
            </Grid>
        </Grid>
    </Grid>

    <Grid item lg={6}>
        <Grid container spacing={2}>
            {accountType === "Broadband" ? (
                renderTextField({
                    label: "Router ID",
                    name: "router",
                    value: router,
                    onChange: e => setRouter(e.target.value.replace(/[^0-9]/g, "")),
                    error: router && Number(router) < 0,
                    helperText: router && Number(router) < 0 ? "Router ID cannot be negative." : "",
                    type: "text"
                })
            ) : (
                <>
                    {renderTextField({
                        label: "Device ID",
                        name: "device",
                        value: device,
                        onChange: e => setDevice(e.target.value.replace(/[^0-9]/g, "")),
                        error: device && Number(device) < 0,
                        helperText: device && Number(device) < 0 ? "Device ID cannot be negative." : "",
                        type: "text"
                    })}
                    {renderTextField({
                        label: "MSISDN",
                        name: "msisdn",
                        value: `674 ${msisdn.slice(3)}`,
                        onChange: e => setMsisdn(e.target.value.replace(/[^0-9]/g, "")),
                        error: msisdn.length !== 10 || !msisdn.startsWith("674"),
                        helperText: msisdn.length !== 10 || !msisdn.startsWith("674") ? "MSISDN must be 10 digits starting with '674'." : ""
                    })}
                </>
            )}
        </Grid>
    </Grid>
</Grid>

                    </Grid>

                </Box>
                <Box sx={{ paddingBottom: 5 }} >

                    <Box sx={{ backgroundColor: '#253A7D' }}>
                        <Button>
                            <Typography variant="body1" sx={{ marginRight: 1, color: 'white' }}>Contact</Typography>

                        </Button>
                    </Box>

                    <Paper sx={{ padding: 2, marginTop: 2 }}>
                        <Grid container spacing={2}>
                            {/* Email Field */}
                            {[
                                { label: 'Email', type: 'email', name: 'email', required: true, validate: validateEmail },
                                { label: 'Organization Name', type: 'text', name: 'organizationName' },
                                { label: 'Street Address', type: 'text', name: 'streetAddres1' },
                                { label: 'Postal Code', type: 'text', name: 'postalCode', required: true },
                                { label: 'First Name', type: 'text', name: 'firstName', required: true },
                                { label: 'Last Name', type: 'text', name: 'lastName', required: true },
                                // { label: 'Phone Number', type: 'text', name: 'phonePhoneNumber' },
                                // { label: 'eKYC Token', type: 'text', name: 'ekycToken', required: true },
                                { label: 'Alternate Number', type: 'text', name: 'alternateNumber' },
                            ].map(({ label, type, name, required, validate }, index) => (
                                <Grid item xs={3} key={index}>
                                    <TextField
                                        label={label}
                                        type={type}
                                        fullWidth
                                        name={name}
                                        required={required}
                                        value={values[name]}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched[name] && !!errors[name]}
                                        helperText={touched[name] && errors[name]}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                            ))}

                            {/* Phone Number Validation */}
                            <Grid item xs={3}>
                                <TextField
                                    label="Phone Number"
                                    type="text"
                                    fullWidth
                                    name="phonePhoneNumber"
                                    required
                                    value={values.phonePhoneNumber}
                                    onChange={(e) => {
                                        if (e.target.value.length <= 10) {
                                            handleChange(e);
                                        }
                                    }}
                                    onBlur={handleBlur}
                                    error={touched.phonePhoneNumber && !!errors.phonePhoneNumber}
                                    helperText={touched.phonePhoneNumber && errors.phonePhoneNumber}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>

                            {/* eKYC Token Validation */}
                            <Grid item xs={3}>
                                <TextField
                                    label="eKYC Token"
                                    type="text"
                                    fullWidth
                                    name="ekycToken"
                                    required
                                    value={values.ekycToken}
                                    onChange={(e) => {
                                        if (e.target.value.length <= 10) {
                                            handleChange(e);
                                        }
                                    }}
                                    onBlur={handleBlur}
                                    error={touched.ekycToken && !!errors.ekycToken}
                                    helperText={touched.ekycToken && errors.ekycToken}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>

                            {/* City Dropdown */}
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel id="city-label">City</InputLabel>
                                    <Select
                                        value={values.city}
                                        onChange={handleChange}
                                        label="City"
                                        onBlur={handleBlur}
                                        name="city"
                                        required
                                        error={touched.city && !!errors.city}
                                    >
                                        {[
                                            "Aiwo", "Anabar", "Anetan", "Anibare", "Baitsi",
                                            "Boe", "Buada", "Denigomodu", "Ewa", "Ijuw",
                                            "Meneng", "Nibok", "Uaboe", "Yaren"
                                        ].map((cityOption, index) => (
                                            <MenuItem key={index} value={cityOption}>
                                                {cityOption}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {touched.city && errors.city && <FormHelperText error>{errors.city}</FormHelperText>}
                                </FormControl>
                            </Grid>

                            {/* Dropdown for Gender */}
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel id="gender-label">Gender</InputLabel>
                                    <Select
                                        labelId="gender-label"
                                        value={values.gender}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="gender"
                                        error={touched.gender && !!errors.gender}
                                    >
                                        <MenuItem value="M">Male</MenuItem>
                                        <MenuItem value="F">Female</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Dropdown for Marital Status */}
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel id="marital-status-label">Marital Status</InputLabel>
                                    <Select
                                        labelId="marital-status-label"
                                        value={values.maritalStatus}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="maritalStatus"
                                    >
                                        <MenuItem value="Married">Married</MenuItem>
                                        <MenuItem value="Un Married">Un Married</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Date Picker */}
                            <Grid item xs={3}>
                                <TextField
                                    type="date"
                                    required
                                    fullWidth
                                    name="dateOfBirth"
                                    label="Date of Birth"
                                    value={values.dateOfBirth}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.dateOfBirth && !!errors.dateOfBirth}
                                    helperText={touched.dateOfBirth && errors.dateOfBirth}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                        </Grid>


                    </Paper>



                </Box>




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