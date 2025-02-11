import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Snackbar, TextField, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { useEffect, useRef, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useFormik } from 'formik';
import { Label } from '@mui/icons-material';
import axios from "axios";

import MuiAlert from '@mui/material/Alert';
import { useLocation } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function EditSim() {
    const navigate = useNavigate();

    const location = useLocation();
    const selectObj = location.state && location.state.selectObj;
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



    const tosimmanagement = () => {
        navigate('/simManagement')
    }
    const tokenValue = localStorage.getItem('token');

    const { handleChange, handleSubmit, handleBlur, values, setValues } = useFormik({
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

        },

        onSubmit: async (values) => {
            // console.log(values);
            // setResult(values);
            const res = await axios.put('http://172.17.1.20:9696/api/sim/mgmt/detail/edit/' + selectObj.sim_id,
                { ...values }, {
                headers: {
                    "Authorization": `Bearer +${tokenValue}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }
            ).then(res => {
                console.log(res.status + "status code ")
                if (res.status === 200) {
                    toast.success('SIM / e-SIM Record Updated Successfully', { autoClose: 2000 });
                }
                // location.reload();
            }).catch(err => {
                console.log("-----------");
                if (err.response.data.status_code === 409) {
                    setNotify({
                        isOpen: true,
                        message: 'This Data is already Exist',
                        type: 'error'
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
                toast.error('Please try Again', { autoClose: 2000 });

            })


        }
    })
    useEffect(() => {
        if (selectObj) {
            setValues((prevValues) => ({
                ...prevValues,

                imsi: selectObj.imsi || '',
                msisdn: selectObj.msisdn || '',
                batch_no: selectObj.batchId || '',
                batch_date: selectObj.batch_date || '',
                allocation_date: selectObj.allocation_date || '',
                sim_type: selectObj.sim_type || '',
                key_id: selectObj.key_id || '',
                auth_id: selectObj.auth_id || '',
                vendor_name: selectObj.vendor_name || '',
                status: selectObj.status || '',
            }));
        }
    }, [selectObj]);
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
                        >Edit SIM/e-SIM</Typography>
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
                                            label="IMSI"
                                            name='imsi'
                                            type='text'
                                            value={values.imsi}
                                            fullWidth
                                            required
                                            onChange={handleChange}
                                        />

                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} >
                                        <TextField
                                            label="Batch No"
                                            type="number"
                                            fullWidth
                                            name='batch_no'
                                            value={values.batch_no}
                                            required
                                            onChange={handleChange}

                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} >
                                        <TextField
                                            label="Key Id"
                                            type="number"
                                            fullWidth
                                            required
                                            name='key_id'
                                            value={values.key_id}
                                            onChange={handleChange}


                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <TextField

                                            label="Vendor Name"
                                            type="text"
                                            required
                                            fullWidth
                                            request
                                            name='vendor_name'
                                            value={values.vendor_name}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <TextField

                                            label="Auth Id"
                                            type="text"
                                            required
                                            fullWidth
                                            name='auth_id'
                                            value={values.auth_id}
                                            onChange={handleChange}
                                        />
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
                                    <Grid item lg={4} md={4} sm={4} xs={6}>


                                        <TextField
                                            InputLabelProps={{ shrink: true }}
                                            label="Batch Date"
                                            type="date"
                                            required
                                            fullWidth
                                            name='batch_date'
                                            value={values.batch_date}
                                            onChange={handleChange}
                                            inputProps={{ max: new Date().toISOString().split('T')[0] }}
                                        />

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
                    Update
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