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

export default function EditVendor() {
    const navigate = useNavigate();

    const location = useLocation();
    const selectObj = location.state && location.state.selectObj;
    // console.log(selectObj+" value from this")
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




    const toVendorManagement = () => {
        navigate('/vendormanagement')
    }



    const tokenValue = localStorage.getItem('token');
    const { handleChange, handleSubmit, handleBlur, values, setValues } = useFormik({
        initialValues: {
            vendor_name: "",
            email: "",
            contact: "",
            address: "",
            type: '',
            identification: '',
            batch_prefix: '',
            // registration_date: '',
            status: '',


        },

        onSubmit: async (values) => {
            // console.log(values);
            // setResult(values);
            const res = await axios.put('http://172.5.10.2:9696/api/vendor/mgmt/detail/edit/' + selectObj.vendor_id,
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
                    toast.success('Vendor Record Updated Successfully', { autoClose: 2000 });
                }
                // location.reload();
            }).catch(err => {
                toast.error(err.response.data.message, { autoClose: 2000 });

            })


        }
    })
    useEffect(() => {
        if (selectObj) {
            setValues((prevValues) => ({
                ...prevValues,
                vendor_name: selectObj.vendor_name || '',
                email: selectObj.email || '',
                contact: selectObj.contact || '',
                address: selectObj.address || '',
                type: selectObj.type || '',
                identification: selectObj.identification || '',
                batch_prefix: selectObj.batch_prefix || '',
                // registration_date: selectObj.registration_date || '',
                status: selectObj.status || '',
               
            }));
        }
    }, [selectObj]);
    console.log(values)
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
                        >Edit Vendor </Typography>
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
                                            label="Vendor Name"
                                            fullWidth
                                            name='vendor_name'
                                            value={values.vendor_name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />

                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} >
                                        <TextField
                                            label="Email"
                                            type='email'
                                            required
                                            fullWidth
                                            name='email'
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}


                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} >
                                        <TextField
                                            label="Contact Number"
                                            required
                                            type="number"
                                            fullWidth
                                            name='contact'
                                            value={values.contact}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} >
                                        <TextField
                                            label="Address"
                                            required
                                            type="text"
                                            name='address'
                                            fullWidth
                                            value={values.address}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} >
                                        <TextField
                                            label="Type"
                                            required
                                            type="text"
                                            fullWidth
                                            name='type'
                                            value={values.type}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} >
                                        <TextField
                                            label="Batch"
                                            required
                                            type="text"
                                            name='batch_prefix'
                                            fullWidth
                                            value={values.batch_prefix}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} >
                                        <TextField
                                            label="Identification"
                                            required
                                            type="text"
                                            name='identification'
                                            fullWidth
                                            value={values.identification}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

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
                                                onBlur={handleBlur}
                                            >
                                                <MenuItem value={true}>Active</MenuItem>
                                                <MenuItem value={false}>Inactive</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Grid>


                                    {/* <Grid item lg={4} md={4} sm={4} xs={6}>


                                        <TextField
                                            InputLabelProps={{ shrink: true }}
                                            label="Registration Date"
                                            type="date"
                                            required
                                            fullWidth
                                            name='registration_date'
                                            value={values.registration_date}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            inputProps={{ max: new Date().toISOString().split('T')[0] }}
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
                    Update
                </Button>
                <Button
                    style={{ width: '100px', backgroundColor: '#FBB716', color: 'black', marginLeft: 30 }}
                    // onClick={submitMainForm2}
                    sx={{ mb: 5, textAlign: { sm: 'center' }, boxShadow: 20 }}
                    onClick={toVendorManagement}
                >
                    Back
                </Button>

            </Grid>


        </Box>

    )
}