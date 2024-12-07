import { Box, Button, Checkbox, FormControlLabel, Grid, Paper, Snackbar, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notification from '../Components/Notification/Notification';

export default function AddHssBulk(props) {
    const navigate = useNavigate();
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') return;
        setNotification({ ...notification, open: false });
    };

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const tokenValue = localStorage.getItem('token');

    const validationSchema = Yup.object({
        start_imsi: Yup.string()
            .matches(/^\d{15}$/, "IMSI must be exactly 15 digits")
            .required("IMSI is required"),
        start_msisdn: Yup.string()
            .matches(/^\d{11}$/, "MSISDN must be exactly 11 digits")
            .required("MSISDN is required"),
        subscriber_number: Yup.number()
            .required("Subscriber number is required"),
    });

    const { handleChange, handleSubmit, handleBlur, values, errors, touched, setValues } = useFormik({
        initialValues: {
            start_imsi: '',
            start_msisdn: '',
            subscriber_number: '',
            serviceCapability: {
                Attach: { LTE: false, NR: false, IMS: false },
                Voice: { Outgoing: false, Incoming: false },
                SMS: { OutgoingSms: false, OutgoingServiceSms: false, IncomingSms: false },
                DataService: { LTE: false, NR: false }
            },
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const res = await axios.post(
                    'http://172.17.1.11:9697/api/hss/detail/save/bulk/subscriber',
                    { ...values },
                    {
                        headers: {
                            "Authorization": `Bearer ${tokenValue}`,
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }
                    }
                );
                if (res.status === 200) {
                    toast.success('UDM Record Added Successfully', { autoClose: 2000 });
                    setTimeout(() => { props.onClose(); }, 3000);
                }
            } catch (err) {
                setNotify({
                    isOpen: true,
                    message: "Something went wrong",
                    type: 'error'
                });
            }
        }
    });

    const handleCheckboxChange = (category, key) => {
        setValues(prevValues => ({
            ...prevValues,
            serviceCapability: {
                ...prevValues.serviceCapability,
                [category]: {
                    ...prevValues.serviceCapability[category],
                    [key]: !prevValues.serviceCapability[category][key],
                },
            },
        }));
    };

    const tohss = () => navigate('/hss');

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <ToastContainer position="bottom-left" />
            <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseNotification} severity={notification.severity}>
                    {notification.message}
                </MuiAlert>
            </Snackbar>
            <Paper elevation={15} sx={{ paddingLeft: 2, paddingRight: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Grid2>
                        <Grid container spacing={6} paddingBottom={2} paddingTop={2}>
                            <Grid item lg={12}>
                                <Grid container spacing={2}>
                                    <Grid item lg={4} md={4} sm={4} xs={4}>
                                        <TextField
                                            label="Start IMSI"
                                            name='start_imsi'
                                            value={values.start_imsi}
                                            fullWidth
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.start_imsi && Boolean(errors.start_imsi)}
                                            helperText={touched.start_imsi && errors.start_imsi}
                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={4} xs={4}>
                                        <TextField
                                            label="Start MSISDN"
                                            name='start_msisdn'
                                            value={values.start_msisdn}
                                            fullWidth
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.start_msisdn && Boolean(errors.start_msisdn)}
                                            helperText={touched.start_msisdn && errors.start_msisdn}
                                        />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={6} xs={12}>
                                        <TextField
                                            label="Subscriber Number"
                                            name='subscriber_number'
                                            value={values.subscriber_number}
                                            fullWidth
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.subscriber_number && Boolean(errors.subscriber_number)}
                                            helperText={touched.subscriber_number && errors.subscriber_number}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Paper elevation={10}>
                                            <Grid lg={12}>
                                                <Paper sx={{ backgroundColor: 'blue' }}>
                                                    <Typography variant="h6" sx={{ paddingLeft: 2, color: '#253A7D', backgroundColor: '#FBB716' }} gutterBottom>Service Capability</Typography>
                                                </Paper>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={2}>
                                            {Object.keys(values.serviceCapability).map((category) => (
                                                <Grid item xs={12} key={category}>
                                                    <Paper sx={{ backgroundColor: 'blue' }}>
                                                        <Typography variant="h6" sx={{ paddingLeft: 2, color: '#253A7D', backgroundColor: '#FBB716' }} gutterBottom>{category}</Typography>
                                                    </Paper>
                                                    <Grid container spacing={1}>
                                                    {Object.entries(values.serviceCapability[category]).map(([key, value]) => (
                                                        <Grid item xs={6} key={key}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={value}
                                                                        onChange={() => handleCheckboxChange(category, key)}
                                                                    />
                                                                }
                                                                label={key.replace(/([a-z])([A-Z])/g, '$1 $2')}
                                                            />
                                                        </Grid>
                                                    ))}
                                                    </Grid>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid2>
                </Box>
            </Paper>
            <Grid padding={1} lg={4} md={4} sm={6} xs={12} sx={{ paddingTop: 4, textAlign: { lg: 'center', md: 'center', sm: 'center', xs: 'center' } }}>
                <Button style={{ width: '100px', backgroundColor: '#253A7D', color: 'white' }} sx={{ mb: 5, boxShadow: 15 }} type="submit">
                    Submit
                </Button>
                <Button style={{ width: '100px', backgroundColor: '#FBB716', color: 'black', marginLeft: 30 }} sx={{ mb: 5, boxShadow: 20 }} onClick={tohss}>
                    Back
                </Button>
            </Grid>
            <Notification notify={notify} setNotify={setNotify} />
        </Box>
    );
}
