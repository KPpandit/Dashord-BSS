import { Box, Button, Grid, Paper, Snackbar, TextField, Typography, FormControlLabel, Checkbox } from '@mui/material';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from "axios";
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Notification from '../Components/Notification/Notification';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Addhss(props) {
    const navigate = useNavigate();
    
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [errors, setErrors] = useState({ imsi: '', msisdn: '' });

    const tokenValue = localStorage.getItem('token');

    const { handleChange, handleSubmit, values, setValues } = useFormik({
        initialValues: {
            imsi: '',
            msisdn: '',
            orderId: '',
            serviceCapability: {
                Attach: { LTE: false, NR: false, IMS: false },
                Voice: { Outgoing: false, Incoming: false },
                SMS: { OutgoingSms: false, OutgoingServiceSms: false, IncomingSms: false },
                DataService: { LTE: false, NR: false }
            },
        },
        onSubmit: async (values) => {
            // Validate fields
            const imsiError = values.imsi.length !== 15 ? 'Please enter a valid IMSI (15 digits required)' : '';
            const msisdnError = values.msisdn.length !== 11 ? 'Please enter a valid MSISDN (11 digits required)' : '';
            
            if (imsiError || msisdnError) {
                setErrors({ imsi: imsiError, msisdn: msisdnError });
                return;
            }
            
            // Clear errors
            setErrors({ imsi: '', msisdn: '' });

            try {
                const res = await axios.post('http://172.17.1.11:9697/api/hss/detail/save/subscriber', values, {
                    headers: {
                        "Authorization": `Bearer ${tokenValue}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                });
                if (res.status === 200) {
                    toast.success('UDM Record Added Successfully', { autoClose: 2000 });
                    setTimeout(() => { props.onClose(); }, 3000);
                }
            } catch (err) {
                setNotify({ isOpen: true, message: "Something went Wrong", type: 'error' });
            }
        }
    });

    const tohss = () => {
        navigate('/hss');
    };

    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotification({ ...notification, open: false });
    };

    const handleCheckboxChange = (category, key) => {
        setValues((prevValues) => ({
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

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <ToastContainer position="bottom-left" />
            <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
                <Alert onClose={handleCloseNotification} severity={notification.severity}>
                    {notification.message}
                </Alert>
            </Snackbar>
            <Paper elevation={15} sx={{ paddingLeft: 2, paddingRight: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Grid container spacing={6} paddingBottom={2} paddingTop={2}>
                        <Grid item lg={12}>
                            <Grid container spacing={2}>
                                <Grid item lg={4} md={4} sm={4} xs={4}>
                                    <TextField
                                        label="IMSI"
                                        name='imsi'
                                        type='text'
                                        value={values.imsi}
                                        fullWidth
                                        onChange={handleChange}
                                        error={!!errors.imsi}
                                        helperText={errors.imsi}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={4} xs={4}>
                                    <TextField
                                        label="MSISDN"
                                        type="text"
                                        fullWidth
                                        name='msisdn'
                                        value={values.msisdn}
                                        onChange={handleChange}
                                        error={!!errors.msisdn}
                                        helperText={errors.msisdn}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={6} xs={12}>
                                    <TextField
                                        label="Order Id"
                                        type="text"
                                        fullWidth
                                        name='orderId'
                                        value={values.orderId}
                                        onChange={handleChange}
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
                </Box>
            </Paper>
            <Grid padding={1} lg={4} md={4} sm={6} xs={12} sx={{ paddingTop: 4, textAlign: { lg: 'center', md: 'center', sm: 'center', xs: 'center' } }}>
                <Button
                    style={{ width: '100px', backgroundColor: '#253A7D', color: 'white' }}
                    sx={{ mb: 5, textAlign: { sm: 'center' }, boxShadow: 15 }}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
                <Button
                    style={{ width: '100px', backgroundColor: '#FBB716', color: 'black', marginLeft: 30 }}
                    sx={{ mb: 5, textAlign: { sm: 'center' }, boxShadow: 20 }}
                    onClick={tohss}
                >
                    Back
                </Button>
            </Grid>
            <Notification notify={notify} setNotify={setNotify} />
        </Box>
    );
}
