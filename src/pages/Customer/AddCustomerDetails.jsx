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
import { useLocation, useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
export default function AddCustomerDetails() {
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success', // 'success', 'error', 'warning', 'info'
    });
    const navigate=useNavigate();
    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotification({ ...notification, open: false });
    }
    const [loading, setLoading] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const [photoError, setPhotoError] = useState('');

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const fileType = file.type;
            if (fileType === 'image/jpeg' || fileType === 'image/png') {
                setSelectedPhoto(file); // Set the file if valid
                setPhotoError(''); // Clear the error if valid
            } else {
                setPhotoError('Please select a valid format (jpg or png).'); // Set error message
                setSelectedPhoto(null); // Clear any previously selected file
            }
        }
    };


    const location = useLocation();
    const accountType = location.state?.accountType;
    const tokenValue1 = localStorage.getItem('token');

    const [msisdn, setMsisdn] = useState('');
    const [partner, setpartner] = useState('');
    const [device, setDevice] = useState('');
    const [router, setRouter] = useState('');
    let photo_id;



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
                        Authorization: `Bearer ${tokenValue1}`,
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
        email: Yup.string()
            .email('Invalid email format') // This checks for general email format
            .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'Invalid email format. Please include a valid domain.')
            .required(),
        postalCode: Yup.string()
            .matches(/^[0-9]{1,5}$/, 'Postal Code must be between 1 and 5 digits')
            .notRequired(),
        ekycToken: Yup.string()
            .matches(/^[0-9]{10}$/, 'eKYC Token must be exactly 10 digits')
            .notRequired(), // Optional field
        firstName: Yup.string().required('First Name is required'),
        streetAddres1: Yup.string().required('Address is Required is required'),
        lastName: Yup.string().notRequired(),
        phonePhoneNumber: Yup.string()
            .matches(/^[0-9]{10}$/, 'Phone Number must be exactly 10 digits'),
        dateOfBirth: Yup.date()
            .required('Date of Birth is required')
            .max(new Date(), 'Date of Birth cannot be a future date')
            .test('age', 'You must be at least 16 years old', value => {
                const today = new Date();
                const age = today.getFullYear() - value.getFullYear();
                const month = today.getMonth() - value.getMonth();
                return month > 0 || (month === 0 && today.getDate() >= value.getDate()) ? age >= 16 : age > 16;
            }),
        gender: Yup.string().required('Gender is required'),
        alternateNumber: Yup.string()
            .matches(/^674\s\d{7,10}$/, "Alternate Number must start with '674' followed by a space and 7-10 digits.")
            .required('Alternate Number is required'),
        maritalStatus: Yup.string(),
    });

    const {
        handleChange, handleSubmit, handleBlur, values, touched, errors, isValid, dirty, setFieldValue
    } = useFormik({
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
            ekycToken: "", // To be updated with the generated token
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
        onSubmit: async (formValues) => {
            try {
                // Step 1: Generate eKYC Token
                const kycPayload = {
                    countryCode: "673",
                    dob: formValues.dateOfBirth,
                    firstName: formValues.firstName,
                    gender: formValues.gender,
                    id: "",
                    lastName: formValues.lastName || "",
                    address: `${formValues.streetAddres1} ${formValues.streetAddres2}`.trim(),
                    email: formValues.email,
                    alternateNumber: formValues.alternateNumber
                };

                const kycResponse = await axios.post(
                    "https://bssproxy01.neotel.nr/kyc/api/processMinimalKYC/CRM",
                    kycPayload,
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }
                    }
                );

                if (kycResponse.data.httpCode === 200 && kycResponse.data.data.token) {
                    const tokenValue = kycResponse.data.data.token;
                    console.log("Token generated from API:", tokenValue);

                    // Add the token directly to the values object
                    const updatedValues = { ...formValues, ekycToken: tokenValue };
                    let baseUrl = 'https://bssproxy01.neotel.nr/crm/api/savecustomer/account/1/invoice/2/baseuser/1/orderperiod/1?';

                    if (msisdn) baseUrl += `msisdn=${msisdn}`;
                    if (partner) baseUrl += `&partner=${partner}`;
                    if (device) baseUrl += `&device=${device}`;
                    if (router) baseUrl += `&router=${router}`;
                    // Proceed with the next API call
                    // const baseUrl = 'https://bssproxy01.neotel.nr/crm/api/savecustomer/account/1/invoice/2/baseuser/1/orderperiod/1?';
                    const res1 = await axios.post(
                        baseUrl,
                        updatedValues, // Pass updated values
                        {
                            headers: {
                                Authorization: `Bearer ${tokenValue1}`,
                                "Accept": "application/json",
                                "Content-Type": "application/json"
                            }
                        }
                    );

                    if (res1.status === 201) {
                        toast.success('Customer Added successfully!', { autoClose: 2000 });
                        savePhoto();
                    }
                } else {
                    throw new Error("Failed to generate token");
                }
            } catch (error) {
                console.error(error);
                toast.error(error.response?.data?.message || "An error occurred", { autoClose: 2000 });
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
    const [msisdnDisplay, setMsisdnDisplay] = useState("");
    const [showHelperText, setShowHelperText] = useState(false);

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
                        // alignItems: 'center',

                    }}
                >

                    <Grid >
                        <Grid container justifyContent="space-between">
                            <Grid
                                item
                                lg={2}
                                md={8}
                                sm={6}
                                xs={12}
                                paddingBottom={2}
                                sx={{
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'left',
                                }}
                            >
                                {/* Display the selected photo */}
                                {selectedPhoto ? (
                                    <>
                                        <CancelIcon
                                            sx={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer', color: '#1976D2' }}
                                            onClick={handleCancelPhoto}
                                        />
                                        <img
                                            src={URL.createObjectURL(selectedPhoto)}
                                            alt="Selected"
                                            style={{ maxWidth: '100%', maxHeight: '200px', paddingBottom: '10px' }}
                                        />
                                    </>
                                ) : (
                                    <Typography variant="body1" color="textSecondary" sx={{ padding: 1 }}>
                                        No photo selected
                                    </Typography>
                                )}
                                <input
                                    accept=".jpg,.jpeg,.png"
                                    style={{ display: 'none' }}
                                    id="upload-photo"
                                    type="file"
                                    name="photo"
                                    onChange={handlePhotoChange}
                                />
                                <label htmlFor="upload-photo">
                                    <Button
                                        variant="contained"
                                        sx={{ backgroundColor: '#253A7D' }}
                                        color="primary"
                                        component="span"
                                        fullWidth
                                    >
                                        Upload Photo
                                    </Button>
                                </label>
                                {/* Error message for invalid file format */}
                                {photoError && (
                                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                        {photoError}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>

                        <Divider />


                        <Grid container spacing={6} paddingBottom={2} paddingTop={2}>
                            <Grid item lg={6}>
                                <Grid container spacing={2}>
                                    {renderTextField({ label: "Account Type", name: 'customerType', value: accountType || values.customerType, onChange: handleChange })}
                                    {renderTextField({ label: "Status", value: "Active", onChange: () => { }, required: false })}
                                    {renderSelectField({
                                        label: "Service Type",
                                        value: values.serviceType,
                                        onChange: handleChange,
                                        name: 'serviceType',
                                        options: [
                                            { value: "Mobility", label: "Mobility" },
                                            { value: "FTTH", label: "FTTH" },
                                            { value: "FWA", label: "FWA" },
                                            { value: "VOIP", label: "VOIP" }
                                        ]
                                    })}
                                    {renderTextField({
                                        label: "Partner ID",
                                        name: "partner",
                                        value: partner,
                                        onChange: (e) => {
                                            const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                                            if (value.length <= 4) {
                                                setpartner(value); // Allow only up to 4 digits
                                            }
                                        },
                                        onFocus: () => setShowHelperText(true), // Show helper text on focus
                                        onBlur: () => setShowHelperText(false), // Hide helper text on blur
                                        error: showHelperText && (partner === "" || partner.length !== 4), // Validate length
                                        helperText:
                                            showHelperText && (partner === "" || partner.length !== 4)
                                                ? "Partner ID must be exactly 4 digits."
                                                : "",
                                        required: true,
                                        type: "text",
                                    })}



                                    {(accountType.toLowerCase() === 'postpaid' || accountType.toLowerCase() === 'post-paid') && renderSelectField({
                                        label: "Is VIP",
                                        value: values.isVip,
                                        onChange: handleChange,
                                        name: 'isVip',
                                        options: [{ value: true, label: "Yes" }, { value: false, label: "No" }]
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
                                            onChange: (e) => {
                                                const value = e.target.value.replace(/[^0-9]/g, "");
                                                setRouter(value);
                                            },
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
                                                onChange: (e) => {
                                                    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numeric input
                                                    if (value.length <= 10) {
                                                        setDevice(value); // Update state only if length <= 10
                                                    }
                                                    // setDevice(value); // Update state regardless of length
                                                },
                                                onFocus: () => setShowHelperText(true), // Show helper text on focus
                                                onBlur: () => setShowHelperText(false), // Hide helper text on blur
                                                error: device.length > 9, // Trigger error when length exceeds 10
                                                helperText: device.length > 9 ? "Cannot enter more than 10 digits." : "", // Display helper text if length > 10
                                                type: "text", // Use text for flexibility
                                            })}




                                            {renderTextField({
                                                label: "MSISDN",
                                                name: "msisdn",
                                                value: msisdnDisplay, // Use the formatted display value
                                                onChange: (e) => {
                                                    let value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numeric input

                                                    if (!value.startsWith("674")) {
                                                        value = "674" + value.slice(0, 7); // Enforce '674' prefix and ensure only 10 digits in total
                                                    } else if (value.length > 10) {
                                                        value = value.slice(0, 10); // Restrict to 10 digits max
                                                    }

                                                    setMsisdn(value); // Store the raw value (no spaces)
                                                    setMsisdnDisplay(value.length > 3 ? value.slice(0, 3) + " " + value.slice(3) : value); // Format the display value with a space
                                                },
                                                error: msisdn.length !== 10 || !msisdn.startsWith("674"),
                                                helperText:
                                                    msisdn.length !== 10 || !msisdn.startsWith("674")
                                                        ? "MSISDN must be 10 digits starting with '674'."
                                                        : "",
                                                type: "text", // Use text to allow the enforced prefix logic to work
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
                                { label: 'Street Address', type: 'text', name: 'streetAddres1', required: true },
                                // { label: 'Postal Code', type: 'text', name: 'postalCode', required: true },
                                { label: 'First Name', type: 'text', name: 'firstName', required: true },
                                { label: 'Last Name', type: 'text', name: 'lastName' },
                                // { label: 'Phone Number', type: 'text', name: 'phonePhoneNumber' },
                                // { label: 'eKYC Token', type: 'text', name: 'ekycToken', required: true },
                                // { label: 'Alternate Number', type: 'text', name: 'alternateNumber' },
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
                            <Grid item xs={3}>
                                <TextField
                                    label="Postal Code"
                                    fullWidth
                                    name="postalCode"
                                    value={values.postalCode}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.postalCode && Boolean(errors.postalCode)}
                                    helperText={touched.postalCode && errors.postalCode}
                                    inputProps={{ maxLength: 5 }} // Limits to 5 characters
                                />


                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label="Alternate Number"
                                    type="text"
                                    fullWidth
                                    name="alternateNumber"
                                    required
                                    value={values.alternateNumber}
                                    onChange={(e) => {
                                        let value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numeric input
                                        if (value.startsWith("674")) {
                                            // Add space after "674" if it's not present
                                            value = value.length > 3 ? `674 ${value.slice(3)}` : value;
                                        } else if (value.length <= 3) {
                                            // Auto-fill "674" if user starts typing
                                            value = `674 ${value}`;
                                        }
                                        if (value.replace(/\s/g, "").length <= 10) { // Total length, excluding spaces, must be 13
                                            handleChange({
                                                target: { name: "alternateNumber", value },
                                            });
                                        }
                                    }}
                                    onBlur={handleBlur}
                                    error={touched.alternateNumber && !!errors.alternateNumber}
                                    helperText={touched.alternateNumber && errors.alternateNumber}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>






                            {/* City Dropdown */}
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel id="city-label">Locality</InputLabel>
                                    <Select
                                        value={values.city}
                                        onChange={handleChange}
                                        label="Locality"
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
                                        label="Gender"
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
                                        label="Marital Status"
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
                                    inputProps={{
                                        max: new Date().toISOString().split("T")[0]
                                    }}
                                    error={touched.dateOfBirth && !!errors.dateOfBirth}
                                    helperText={touched.dateOfBirth && errors.dateOfBirth}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                        </Grid>


                    </Paper>



                </Box>




            </Paper>
            <Grid
                padding={1}
                lg={4}
                md={4}
                sm={6}
                xs={12}
                sx={{ paddingTop: 4, textAlign: { lg: 'center', md: 'center', sm: 'center', xs: 'center' } }}
            >
                <Button
                    type="submit"
                    style={{
                        width: '100px',
                        backgroundColor: isValid && dirty ? '#253A7D' : '#B0B0B0', // Enable color when form is valid and dirty
                        color: 'white',
                    }}
                    disabled={!(isValid && dirty)} // Disable if form is invalid or not dirty
                    sx={{ mb: 5, textAlign: { sm: 'center' }, boxShadow: 15, mr: 2 }}
                >
                    Submit
                </Button>
                <Button
                    type="button"
                    style={{ backgroundColor: '#F6B625', color: 'black' }}
                    sx={{ mb: 5, boxShadow: 20 }}
                    onClick={() => navigate(-1)} // Navigates to the previous page
                >
                    Cancel
                </Button>
            </Grid>



        </Box>
    )
}