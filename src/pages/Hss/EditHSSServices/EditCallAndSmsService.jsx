import { Box, Button, Paper, Grid, TextField, Snackbar, FormControlLabel, Checkbox } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from "axios";
import MuiAlert from '@mui/material/Alert';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditCallAndSmsService(result) {
    const navigate = useNavigate();
    const tokenValue = localStorage.getItem('token');
    console.log(result.result, " value  of result")
    const imsi=result.result;
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
    };

    const { handleChange, handleSubmit, values, setFieldValue } = useFormik({
        initialValues: {
            "outgoing-calls": false,
            "incoming-calls": false,
            "outgoing-sms": false,
            "incoming-sms": false,

        },
        onSubmit: async (values) => {
            console.log("-----values----->", values);
            try {
                const res = await axios.put('http://172.5.10.2:9697/api/hss/detail/restriction/subscriber/services/'+imsi, { ...values }, {
                    headers: {
                        "Authorization": `Bearer +${tokenValue}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                });
                if (res.status === 200) {
                    toast.success('Record  Updated Successfully', { autoClose: 2000 });
                    setTimeout(() => { result.onClose(); }, 3000);
                }
            } catch (err) {
                setNotification({
                    open: true,
                    message: "Something went wrong",
                    severity: 'error'
                });
                console.error(err.response?.data?.status_code);
            }
        }
    });

    const tohss = () => {
        navigate('/hss');
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <ToastContainer position="bottom-left" />
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
            <Paper elevation={15} sx={{ paddingLeft: 2, paddingRight: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Grid2>
                        <Grid
                            container
                            spacing={6}
                            paddingBottom={2}
                            paddingTop={2}
                        >
                            <Grid item lg={12}>
                                <Grid container spacing={2}>


                                    <Grid item lg={6} md={6} sm={6} xs={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="outgoing-calls"
                                                    checked={values["outgoing-calls"]}
                                                    onChange={() => setFieldValue("outgoing-calls", !values["outgoing-calls"])}
                                                />
                                            }
                                            label="Outgoing Calls"
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={6} xs={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="incoming-calls"
                                                    checked={values["incoming-calls"]}
                                                    onChange={() => setFieldValue("incoming-calls", !values["incoming-calls"])}
                                                />
                                            }
                                            label="Incoming Calls"
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={6} xs={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="outgoing-sms"
                                                    checked={values["outgoing-sms"]}
                                                    onChange={() => setFieldValue("outgoing-sms", !values["outgoing-sms"])}
                                                />
                                            }
                                            label="Outgoing SMS"
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={6} xs={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="incoming-sms"
                                                    checked={values["incoming-sms"]}
                                                    onChange={() => setFieldValue("incoming-sms", !values["incoming-sms"])}
                                                />
                                            }
                                            label="Incoming SMS"
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
        </Box>
    );
}
