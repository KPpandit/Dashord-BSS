import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Snackbar, TextField, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { useEffect, useRef, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useFormik } from 'formik';
import { Label } from '@mui/icons-material';
import axios from "axios";
// import Notification from '../Components/Notification/Notification';
import MuiAlert from '@mui/material/Alert';
import { useLocation } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


export default function AddMSISDN() {
    const navigate = useNavigate();

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


  



    const location = useLocation();
    const accountType = location.state?.accountType;
    const tokenValue = localStorage.getItem('token');

    


    const tosimmanagement = () => {
        navigate('/simManagement')
    }

    const commonInputLabelProps = { shrink: true, style: { fontFamily: 'Roboto', } };
    const { handleChange, handleSubmit, handleBlur, values } = useFormik({
        initialValues: {

            msisdn: "",
            category: "",
            series_id: "",
            is_prepaid: "",
            is_postpaid: '',
            is_m2m: '',
            is_special_no: '',
            allocation_date: '',
            status: '',


        },
        onSubmit: async (values) => {
            // console.log(values);
            // setResult(values);
            const res = await axios.post('http://172.5.10.2:9696/api/msisdn/mgmt/detail/save',
                { ...values }, {
                headers: {
                    "Authorization": "Bearer +00f35991-0de0-4f5c-a432-b5d20a7ce240 ",
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }


            }
            ).then(res => {
                console.log(res.status + "status code ")
                if (res.status === 200) {
                    toast.success('Msisdn Record Added Successfully', { autoClose: 2000 });

                }
                if (err.response.data.status_code === 500) {
                    setNotify({
                        isOpen: true,
                        message: ' Some Thing is Wrong',
                        type: 'error'
                    })
                    setTimeout(() => { props.onClose(); }, 2000)
                }
                // location.reload();
            }).catch(err => {
                console.log("-----------");
                if (err.response.data.status_code === 409) {
                    setNotify({
                        isOpen: true,
                        message: 'This Data is already Exist',
                        type: 'info'
                    })
                    setTimeout(() => { props.onClose(); }, 5000)
                }
                if (err.response.data.status_code === 500) {
                    setNotify({
                        isOpen: true,
                        message: ' Some Thing is Wrong',
                        type: 'error'
                    })
                    setTimeout(() => { props.onClose(); }, 2000)
                }
                if (err.response.data.status_code === 409) {
                    toast.error('MSISDN Already exists...', { autoClose: 2000 });
                }
               

            })


        }
    })
    return (
        <Box component="form"  >
              <ToastContainer position="bottom-left" />
            <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
                <Paper elevation={10} sx={{ padding: 1, paddingLeft: 3, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0, marginRight: 0.2 }}>
                    <Grid>
                        <Typography
                            style={{

                                fontSize: '20px',
                                paddingLeft: 15,
                                fontWeight: 'bold',
                                textAlign: 'center'

                            }}
                        >Add MSISDN</Typography>
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

                        <Grid
                            container
                            spacing={6} // Adjust the spacing between items as needed
                            paddingBottom={2} // Padding for the entire container
                            paddingTop={2} // Padding for the entire container
                        >
                            <Grid item lg={12} >
                                <Grid container spacing={2}>
                                    <Grid item lg={4} md={4} sm={6} xs={12} > {/* Padding for individual items */}
                                        <TextField
                                            label="MSISDN"
                                            fullWidth
                                            type='number'
                                            name='msisdn'
                                            value={values.msisdn}
                                            onChange={handleChange}
                                        />

                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} >
                                        <TextField
                                            label="Category"
                                            type="text"
                                            fullWidth
                                            name='category'
                                            value={values.category}
                                            onChange={handleChange}

                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} >
                                        <TextField
                                            label="Series ID"
                                            type="number"
                                            fullWidth
                                            name='series_id'
                                            value={values.series_id}
                                            onChange={handleChange}


                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel >Is Prepaid</InputLabel>
                                            <Select
                                                fullWidth
                                                label="is_prepaid"
                                                name='is_prepaid'
                                                value={values.is_prepaid}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={true}>Yes</MenuItem>
                                                <MenuItem value={false}>No</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel >Is Postpaid</InputLabel>
                                            <Select
                                                fullWidth
                                                label="is_postpaid"
                                                name='is_postpaid'
                                                value={values.is_postpaid}
                                                onChange={handleChange}
                                                disabled={values.is_prepaid === true}
                                            >
                                                <MenuItem value={true}>Yes</MenuItem>
                                                <MenuItem value={false}>No</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel >Is M2M</InputLabel>
                                            <Select
                                                fullWidth
                                                label="is_M2M"
                                                name='is_m2m'
                                                value={values.is_m2m}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={true}>Yes</MenuItem>
                                                <MenuItem value={false}>No</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel >Is Special Number</InputLabel>
                                            <Select
                                                fullWidth
                                                label="Is Special Number"
                                                name='is_special_no'
                                                value={values.is_special_no}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={true}>Yes</MenuItem>
                                                <MenuItem value={false}>No</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel >Status</InputLabel>
                                            <Select
                                                fullWidth
                                                label="Status"
                                                name='status'
                                                value={values.status}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={true}>Active</MenuItem>
                                                <MenuItem value={false}>Inactive</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Grid>


                                    <Grid item lg={4} md={4} sm={4} xs={6}>


                                        <TextField
                                            InputLabelProps={{ shrink: true }}
                                            label="Allocation Date"
                                            type="date"
                                            required
                                            fullWidth
                                            name='allocation_date'
                                            value={values.allocation_date}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            inputProps={{ max: new Date().toISOString().split('T')[0] }}
                                        />

                                    </Grid>

                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid2>

                </Box>


            </Paper>
            <Grid padding={1} lg={4} md={4} sm={6} xs={12} sx={{ paddingTop: 4, textAlign: { lg: 'center', md: 'center', sm: 'center', xs: 'center' } }}>
                <Button

                    style={{ width: '100px', backgroundColor: '#253A7D', color: 'white' }}
                    // onClick={submitMainForm2}
                    sx={{ mb: 5, textAlign: { sm: 'center' }, boxShadow: 15 }}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
                <Button
                    style={{ width: '100px', backgroundColor: '#FBB716', color: 'black', marginLeft: 30 }}
                    // onClick={submitMainForm2}
                    sx={{ mb: 5, textAlign: { sm: 'center' }, boxShadow: 20 }}
                    onClick={tosimmanagement}
                >
                    Back
                </Button>

            </Grid>


        </Box>
    )
}