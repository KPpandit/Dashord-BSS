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


export default function AddSim() {
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
            specialNumber: "",
            imsi: "",
            pimsi: "",
            batchId: "",
            vendorId: "",
            status: "",
            provStatus: "",
            vendorName: "",
            vendorContact: "",
            vendorAddress: "",
            simType: "",
            buyingPriceUsd: "",
            sellingPriceUsd: "",
            vat: "",
            otherTaxes: "",
            minCommision: "",
            maxCommision: "",
            avgCommision: "",
            // activationDate:"",
            // allocationDate:""
            
        },
        onSubmit: async (values) => {
            // console.log(values);
            // setResult(values);
            const res = await axios.post('https://bssproxy01.neotel.nr/crm/api/savesiminventory',
                { ...values }, {
                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }


            }
            ).then(res => {
                console.log(res.status + "status code ")
              
                    toast.success('SIM/e-SIM Record Added Successfully', { autoClose: 2000 });
               

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
                console.log(err.response.data.status_code + "-------")

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
                        >Add SIM/e-SIM</Typography>
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
                                            label="msisdn"
                                            name='msisdn'
                                            type='text'
                                            value={values.msisdn}
                                            fullWidth
                                            required
                                            onChange={handleChange}
                                        />

                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} > {/* Padding for individual items */}
                                        <TextField
                                            label="category"
                                            name='category'
                                            type='text'
                                            value={values.category}
                                            fullWidth
                                            required
                                            onChange={handleChange}
                                        />

                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} > {/* Padding for individual items */}
                                        <TextField
                                            label="imsi"
                                            name='imsi'
                                            type='text'
                                            value={values.imsi}
                                            fullWidth
                                            required
                                            onChange={handleChange}
                                        />

                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} > {/* Padding for individual items */}
                                        <TextField
                                            label="pimsi"
                                            name='pimsi'
                                            type='text'
                                            value={values.pimsi}
                                            fullWidth
                                            required
                                            onChange={handleChange}
                                        />

                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} > {/* Padding for individual items */}
                                        <TextField
                                            label="batchId"
                                            name='batchId'
                                            type='number'
                                            value={values.batchId}
                                            fullWidth
                                            required
                                            onChange={handleChange}
                                        />

                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} > {/* Padding for individual items */}
                                        <TextField
                                            label="vendorId"
                                            name='vendorId'
                                            type='number'
                                            value={values.vendorId}
                                            fullWidth
                                            required
                                            onChange={handleChange}
                                        />

                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} > {/* Padding for individual items */}
                                        <TextField
                                            label="vendorName"
                                            name='vendorName'
                                            type='text'
                                            value={values.vendorName}
                                            fullWidth
                                            required
                                            onChange={handleChange}
                                        />

                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} > {/* Padding for individual items */}
                                        <TextField
                                            label="vendorContact"
                                            name='vendorContact'
                                            type='text'
                                            value={values.vendorContact}
                                            fullWidth
                                            required
                                            onChange={handleChange}
                                        />

                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} > {/* Padding for individual items */}
                                        <TextField
                                            label="vendorAddress"
                                            name='vendorAddress'
                                            type='text'
                                            value={values.vendorAddress}
                                            fullWidth
                                            required
                                            onChange={handleChange}
                                        />

                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} > {/* Padding for individual items */}
                                        <TextField
                                            label="simType"
                                            name='simType'
                                            type='text'
                                            value={values.simType}
                                            fullWidth
                                            required
                                            onChange={handleChange}
                                        />

                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} > {/* Padding for individual items */}
                                        <TextField
                                            label="vat"
                                            name='vat'
                                            type='text'
                                            value={values.vat}
                                            fullWidth
                                            required
                                            onChange={handleChange}
                                        />

                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} > {/* Padding for individual items */}
                                        <TextField
                                            label="buyingPriceUsd"
                                            name='buyingPriceUsd'
                                            type='number'
                                            value={values.buyingPriceUsd}
                                            fullWidth
                                            required
                                            onChange={handleChange}
                                        />

                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} > {/* Padding for individual items */}
                                        <TextField
                                            label="sellingPriceUsd"
                                            name='sellingPriceUsd'
                                            type='number'
                                            value={values.sellingPriceUsd}
                                            fullWidth
                                            required
                                            onChange={handleChange}
                                        />

                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} > {/* Padding for individual items */}
                                        <TextField
                                            label="otherTaxes"
                                            name='otherTaxes'
                                            type='number'
                                            value={values.otherTaxes}
                                            fullWidth
                                            required
                                            onChange={handleChange}
                                        />

                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} > {/* Padding for individual items */}
                                        <TextField
                                            label="minCommision"
                                            name='minCommision'
                                            type='number'
                                            value={values.minCommision}
                                            fullWidth
                                            required
                                            onChange={handleChange}
                                        />

                                    </Grid>
                                    
                                    <Grid item lg={4} md={4} sm={6} xs={12} > {/* Padding for individual items */}
                                        <TextField
                                            label="maxCommision"
                                            name='maxCommision'
                                            type='number'
                                            value={values.maxCommision}
                                            fullWidth
                                            required
                                            onChange={handleChange}
                                        />

                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} > {/* Padding for individual items */}
                                        <TextField
                                            label="avgCommision"
                                            name='avgCommision'
                                            type='number'
                                            value={values.avgCommision}
                                            fullWidth
                                            required
                                            onChange={handleChange}
                                        />

                                    </Grid>

                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel >specialNumber</InputLabel>
                                            <Select
                                                fullWidth
                                                label="specialNumber"
                                                name='specialNumber'
                                                value={values.specialNumber}
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
                                                <MenuItem value={false}>InActive</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    {/* <Grid item lg={4} md={4} sm={4} xs={6}>
                                    <TextField
                                            label="Activation Date"
                                            name='activationDate'
                                            type='date'
                                            value={values.activationDate}
                                            fullWidth
                                            required
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                    <TextField
                                            label="Allocation  Date"
                                            name='allocationDate'
                                            type='date'
                                            value={values.allocationDate}
                                            fullWidth
                                            required
                                            onChange={handleChange}
                                        />
                                    </Grid> */}
                                  
                                   
                                 
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