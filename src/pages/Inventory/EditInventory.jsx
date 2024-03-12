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
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function Editinventory() {
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



    const toinventory = () => {
        navigate('/inventory')
    }



    const tokenValue = localStorage.getItem('token');
    const { handleChange, handleSubmit, handleBlur, values, setValues } = useFormik({
        initialValues: {
            inventory_id: '',
            imsi: '',
            p_imsi: '',
            batch_id: '',
            vendor_id: '',
            msisdn: '',
            status: '',
            prov_status: '',
            allocation_date: '',
            activation_date: '',


        },

        onSubmit: async (values) => {
            // console.log(values);
            // setResult(values);
            const res = await axios.put('http://172.5.10.2:9696/api/inventory/detail/edit/' + selectObj.inventory_id,
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
                    toast.success('Inventory Record Updated Successfully', { autoClose: 2000 });
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
                inventory_id: selectObj.inventory_id || '',
                imsi: selectObj.imsi || '',
                p_imsi: selectObj.p_imsi || '',
                batch_id: selectObj.batch_id || '',
                vendor_id: selectObj.vendor_id || '',
                msisdn: selectObj.msisdn || '',
                status: selectObj.status || '',
                prov_status: selectObj.prov_status || '',
                allocation_date: selectObj.allocation_date || '',
                activation_date: selectObj.activation_date || '',
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
                        >Edit Inventory</Typography>
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
                                            label="IMSI"
                                            name='imsi'
                                            fullWidth
                                            type='text'
                                            value={values.imsi}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />

                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} >
                                        <TextField
                                            label="MSISDN"
                                            fullWidth
                                            name='msisdn'
                                            type="text"
                                            value={values.msisdn}
                                            onBlur={handleBlur}
                                            onChange={handleChange}

                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12} >
                                        <TextField
                                            label="pIMSI"
                                            name="p_imsi"
                                            fullWidth
                                            type='number'
                                            value={values.p_imsi}
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                const numericValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                                handleChange({ target: { name: 'p_imsi', value: numericValue } });
                                            }}
                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <TextField
                                            label="Batch-ID"
                                            type="number"
                                            required
                                            fullWidth
                                            name="batch_id"

                                            value={values.batch_id}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <TextField

                                            label="Vendor-ID"
                                            type="text"
                                            required
                                            fullWidth
                                            name="vendor_id"

                                            value={values.vendor_id}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
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
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            inputProps={{ max: new Date().toISOString().split('T')[0] }}
                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel >Prov Status</InputLabel>
                                            <Select
                                                fullWidth
                                                label="Prov Status"
                                                value={values.prov_status}
                                                onBlur={handleBlur}
                                                onChange={handleChange}

                                                name="prov_status"
                                            >
                                                <MenuItem value={true}>Active</MenuItem>
                                                <MenuItem value={false}>InActive</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel >Status</InputLabel>
                                            <Select
                                                fullWidth

                                                label="Status"
                                                value={values.status}
                                                onBlur={handleBlur}
                                                onChange={handleChange}

                                                name="status"
                                            >
                                                <MenuItem value={true}>Active</MenuItem>
                                                <MenuItem value={false}>InActive</MenuItem>

                                            </Select>
                                        </FormControl>
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
                    onClick={toinventory}
                >
                    Back
                </Button>

            </Grid>


        </Box>

    )
}