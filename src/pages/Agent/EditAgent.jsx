import { useLocation } from 'react-router-dom';
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Snackbar, TextField, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useFormik } from 'formik';
import Notification from '../Components/Notification/Notification';
import axios from "axios";
import MuiAlert from '@mui/material/Alert';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
export default function EditAgent() {
    const location = useLocation();
    const { id } = location.state || {};
    const [showPaper, setShowPaper] = useState(false);
    const [showCommision, setShowCommision] = useState(false);
    console.log(id + " from Agent Edit id")
    const togglePaper = () => {
        setShowPaper(!showPaper);
    };
    const showCommissiomPaper = () => {
        setShowCommision(!showCommision);
    };
    const tokenValue = localStorage.getItem('token');
    const [paymentId, setPaymentID] = useState('');
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const { handleChange, handleSubmit, handleBlur, values, setValues: setValues1, submitForm: submaintAgentDetails } = useFormik({
        initialValues: {
            totalPayments: "",
            totalRefunds: "",
            totalPayouts: "",
            duePayout: "",
            type: "",
            parentId: "",
            commissionType: "",
            fristName: "",
            lastName: "",
            email: "",
            businessAddress: "",
            businessNature: "",
            contact: "",
            documentId: "",
            documentType: "",
            token: "",
            locallity: "",
            coordinate: "",
            reasonStatus: "",
            isActive: ""
        },
        onSubmit: async (values) => {
            const res = await axios.put(`http://172.5.10.2:9090/api/updatepartner/${id}`,
                { ...values }, {

                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }

            ).then(res => {
                if (res.status === 200) {
                    toast.success('Agent Updated Successfully', { autoClose: 2000 });
                    setTimeout(() => { props.onClose(); }, 3000)
                }
                else {
                    toast.error('Error! Please try again later', { autoClose: 2000 });
                }
            }).catch(e => {

                toast.error('Error! Please try again later', { autoClose: 2000 });
            })
        }
    })

    const { handleChange: handleChange2, handleSubmit: handleSubmit2, handleBlur: handleBlur2,
        resetForm: resetForm2,
        values: values2, setValues: setValues2, submitForm: submitMainForm2, } = useFormik({
            initialValues: {
                amount: "",
                type: "",
                partnerId: "",
                commissionProcessRunId: "",
            },
            onSubmit: async (values2) => {
                // your submission logic for the second formik instance
                console.log("Form 2 submitted:", values2);
                const res2 = await axios.put('http://172.5.10.2:9090/api/updatePartnerCommission/' + id,
                    { ...values2 }, {

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
                            message: 'Record Added successfully!',
                            severity: 'success',
                        });

                        submaintAgentDetails();

                    }
                }).catch(e => {
                    setNotification({
                        open: true,
                        message: 'Failed ! please try again',
                        severity: 'error',
                    });

                })

            },
        });
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

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                const customerId = id; // Replace 1 with the actual customer ID
                const response = await axios.get(`http://172.5.10.2:9090/api/partner/${customerId}`, {
                    headers: {
                        Authorization: `Bearer ${tokenValue}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                });

                if (response.status === 200) {
                    // Handle the customer details in the response data
                    const customerDetails = response.data;

                    console.log('Customer Details:', customerDetails);
                    setValues2({
                        amount: customerDetails.partnerCommission.amount,
                        type: customerDetails.partnerCommission.type,
                        partnerId: customerDetails.partnerCommission.partnerId,
                        commissionProcessRunId: customerDetails.partnerCommission.commissionProcessRunId
                    });
                    setValues1({
                        totalPayments: customerDetails.totalPayments,
                        totalRefunds: customerDetails.totalRefunds,
                        totalPayouts: customerDetails.totalPayouts,
                        duePayout: customerDetails.duePayout,
                        type: customerDetails.type,
                        parentId: customerDetails.parentId,
                        commissionType: customerDetails.commissionType,
                        fristName: customerDetails.fristName,
                        lastName: customerDetails.lastName,
                        email: customerDetails.email,
                        businessAddress: customerDetails.businessAddress,
                        businessNature: customerDetails.businessNature,
                        contact: customerDetails.contact,
                        documentId: customerDetails.documentId,
                        documentType: customerDetails.documentType,
                        token: customerDetails.token,
                        locallity: customerDetails.locallity,
                        coordinate: customerDetails.coordinate,
                        reasonStatus: customerDetails.reasonStatus,
                        isActive: customerDetails.isActive



                    })
                    setPaymentID(customerDetails.partnerCommission.id)



                } else {
                    console.error('Failed to fetch customer details.');
                }
            } catch (error) {
                console.error('Error during customer details fetch:', error.message);
            }


        };

        // Call the function to fetch customer details when the component mounts
        fetchCustomerDetails();
    }, [resetForm2, tokenValue]);
    return (
        <Box sx={{ marginTop: -2, marginRight: 3, marginLeft: 3 }}>

            <ToastContainer position="bottom-left" />
            <form onSubmit={handleSubmit2}>
                <Grid >
                    <Paper elevation={15}>
                        <Typography variant='h5' color={'grey'} sx={{ paddingLeft: 5, fontWeight: '500', fontSize: '30px', color: '#253A7D' }}>Edit Agent</Typography></Paper>
                </Grid>

                <Paper elevation={20} sx={{ paddingLeft: 5, paddingRight: 5 }}> {/* Adjust the padding as needed */}
                    <Box
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Grid2 >

                            <Divider />
                            <Grid
                                container
                                spacing={2} // Adjust the spacing between items as needed
                                paddingBottom={2} // Padding for the entire container
                                paddingTop={2} // Padding for the entire container
                                textAlign={'center'}
                                alignContent={'center'}
                                alignItems={'center'}
                            >


                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="First Name"
                                        type="text"
                                        required
                                        fullWidth
                                        name="fristName"
                                        value={values.fristName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="Last Name"
                                        type="text"
                                        required
                                        fullWidth
                                        name="lastName"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="Email"
                                        type="email"
                                        required
                                        fullWidth
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="businessAddress"
                                        type="text"
                                        required
                                        fullWidth
                                        name="businessAddress"
                                        value={values.businessAddress}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="businessNature"
                                        type="text"
                                        required
                                        fullWidth
                                        name="businessNature"
                                        value={values.businessNature}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="contact"
                                        type="text"
                                        required
                                        fullWidth
                                        name="contact"
                                        value={values.contact}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="documentId"
                                        type="text"
                                        required
                                        fullWidth
                                        name="documentId"
                                        value={values.documentId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>

                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="documentType"
                                        type="text"
                                        required
                                        fullWidth
                                        name="documentType"
                                        value={values.documentType}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid> <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="token"
                                        type="text"
                                        required
                                        fullWidth
                                        name="token"
                                        value={values.token}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>

                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="locallity"
                                        type="text"
                                        required
                                        fullWidth
                                        name="locallity"
                                        value={values.locallity}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="coordinate"
                                        type="text"
                                        required
                                        fullWidth
                                        name="coordinate"
                                        value={values.coordinate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>



                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="reasonStatus"
                                        type="text"
                                        required
                                        fullWidth
                                        name="reasonStatus"
                                        value={values.reasonStatus}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <FormControl fullWidth >
                                        <InputLabel id="demo-simple-select-label">isActive</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={values.isActive}
                                            label="isActive"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="isActive"
                                        >
                                            <MenuItem value={true}>Active</MenuItem>
                                            <MenuItem value={false}>In Active</MenuItem>


                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="totalPayments"
                                        type="number"
                                        required
                                        fullWidth
                                        name="totalPayments"
                                        value={values.totalPayments}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="totalRefunds"
                                        type="number"
                                        required
                                        fullWidth
                                        name="totalRefunds"
                                        value={values.totalRefunds}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="totalPayouts"
                                        type="number"
                                        required
                                        fullWidth
                                        name="totalPayouts"
                                        value={values.totalPayouts}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="duePayout"
                                        type="number"
                                        required
                                        fullWidth
                                        name="duePayout"
                                        value={values.duePayout}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="type"
                                        type="text"
                                        required
                                        fullWidth
                                        name="type"
                                        value={values.type}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="parentId"
                                        type="number"
                                        required
                                        fullWidth
                                        name="parentId"
                                        value={values.parentId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={2}> {/* Padding for individual items */}
                                    <TextField
                                        label="commissionType"
                                        type="text"
                                        required
                                        fullWidth
                                        name="commissionType"
                                        value={values.commissionType}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>





                            </Grid>






                        </Grid2>

                    </Box>
                    <Grid sx={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 5 }}>
                        <Button
                            sx={{
                                backgroundColor: '#253A7D'
                            }}
                            variant='contained' onClick={togglePaper}>
                            <Typography variant="body1" sx={{ marginRight: 1, color: 'white' }}>COMMISSION EXCEPTION</Typography>
                            {showPaper ? < RemoveIcon /> : <AddIcon />}
                        </Button>
                        {showPaper && (
                            <Paper elevation={5} sx={{ padding: 2, marginTop: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>

                                        <TextField
                                            type="number"
                                            required
                                            fullWidth
                                            label="Amount"
                                            name="amount"
                                            value={values2.amount}
                                            onChange={handleChange2}
                                            onBlur={handleBlur2}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>

                                        <TextField
                                            type="text"
                                            required
                                            fullWidth
                                            label="TYPE"
                                            name="type"
                                            value={values2.type}
                                            onChange={handleChange2}
                                            onBlur={handleBlur2}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>

                                        <TextField
                                            type="number"
                                            label="Parent ID"
                                            required
                                            fullWidth
                                            name="partnerId"
                                            value={values2.partnerId}
                                            onChange={handleChange2}
                                            onBlur={handleBlur2}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>

                                        <TextField
                                            type="number"
                                            required
                                            label="Commission Process Run Id"
                                            fullWidth
                                            name="commissionProcessRunId"
                                            value={values2.commissionProcessRunId}
                                            onChange={handleChange2}
                                            onBlur={handleBlur2}
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>
                        )}
                    </Grid>

                    <Grid sx={{ paddingBottom: 5 }}>

                        <Button sx={{
                            backgroundColor: '#253A7D'
                        }} variant='contained' onClick={showCommissiomPaper}>
                            <Typography variant="body1" sx={{ marginRight: 1, color: 'white' }}>REFERRAL COMMISSION</Typography>
                            {showCommision ? < RemoveIcon /> : <AddIcon />}
                        </Button>

                        {showCommision && (
                            <Paper elevation={5} sx={{ padding: 2, marginTop: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                        <InputLabel id="demo-simple-select-label">Agent ID</InputLabel>
                                        <TextField
                                            type="text"
                                            required
                                            fullWidth
                                            name="zipCode"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <InputLabel id="demo-simple-select-label">Start Date</InputLabel>
                                        <TextField
                                            type="date"
                                            required
                                            fullWidth
                                            name="field2"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <InputLabel id="demo-simple-select-label">End Date</InputLabel>
                                        <TextField
                                            type="date"
                                            required
                                            fullWidth
                                            name="field3"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <InputLabel id="demo-simple-select-label">Percentage</InputLabel>
                                        <TextField
                                            type="number"
                                            required
                                            fullWidth
                                            name="field3"
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>
                        )}
                    </Grid>

                </Paper>
                <Grid padding={1} paddingTop={5} lg={4} md={4} sm={6} xs={12} sx={{ textAlign: { lg: 'center', md: 'center', sm: 'center', xs: 'center' } }}>
                    <Button
                        type="submit"

                        style={{ backgroundColor: '#253A7D', color: 'white' }}

                        // onClick={()=> handleSubmit}
                        sx={{ mb: 5, textAlign: { sm: 'center' }, boxShadow: 20 }}
                    >
                        Submit
                    </Button>
                </Grid>
                <Notification
                    notify={notify}
                    setNotify={setNotify}

                />
            </form>
        </Box>
    )
}