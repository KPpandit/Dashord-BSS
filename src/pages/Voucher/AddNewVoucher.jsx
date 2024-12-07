import React, { useState } from 'react';
import { Box, Button, Grid, Paper, Snackbar, TextField, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

export default function AddNewVoucher() {
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success', // 'success', 'error', 'warning', 'info'
    });
    const navigate = useNavigate();

    const { handleChange, handleBlur, handleSubmit, resetForm, values } = useFormik({
        initialValues: {
            name: '',
            prefix: '',
            codeLength: '',
            discount: '',
            expiry: '',
            planId: ''
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                const tokenValue = localStorage.getItem('token');
                const res = await axios.post(
                    'http://172.17.1.20:8082/voucher/1.0/offer/generate',
                    {
                        header: {
                            function: "offer.generate",
                            version: "1.0",
                            requestMsgId: "163890C0104F4465B8EE69D10B618A23",
                            requestTime: "2024-05-01 10:53:05.490"
                        },
                        body: { ...values },
                        signature: "Neotel"
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${tokenValue}`,
                            "Content-Type": "application/json",
                            "Accept-Language": "en-US"
                        }
                    }
                );

                if (res.status === 200) {
                    console.log(res, '  ---- response ' )
                    setNotification({
                        open: true,
                        message: 'Voucher Generated successfully!',
                        severity: 'success',
                    });
                    // Reset form after successful submission
                    resetForm();
                }
            } catch (error) {
                setNotification({
                    open: true,
                    message: 'Voucher Generation failed',
                    severity: 'error',
                });
            }
        },
    });

    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotification({ ...notification, open: false });
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ flexGrow: 1, width: '100%' }}>
                <Paper elevation={10} sx={{ padding: 1, paddingLeft: 3, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0, marginRight: 0.2 }}>
                    <Grid>
                        <Typography
                            style={{
                                fontSize: '20px',
                                paddingLeft: 15,
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}
                        >
                            Add Voucher
                        </Typography>
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
            <Paper elevation={15} sx={{ paddingLeft: 5, paddingRight: 5, marginTop: 2 ,padding:5}}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Prefix"
                                name="prefix"
                                value={values.prefix}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Code Length"
                                name="codeLength"
                                value={values.codeLength}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="number"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Discount"
                                name="discount"
                                value={values.discount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="number"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Expiry"
                                name="expiry"
                                value={values.expiry}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="date"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Plan ID"
                                name="planId"
                                value={values.planId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="number"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            <Grid container justifyContent="center" sx={{ paddingTop: 4 }}>
                <Button
                    style={{ width: '100px', backgroundColor: '#253A7D', color: 'white' }}
                    sx={{ mb: 5, boxShadow: 15 }}
                    type="submit"
                >
                    Submit
                </Button>
                <Button
                    style={{ width: '100px', backgroundColor: '#253A7D', color: 'white', marginLeft: '16px' }}
                    sx={{ mb: 5, boxShadow: 15 }}
                    onClick={() => navigate("/customer")}
                >
                    Cancel
                </Button>
            </Grid>
        </Box>
    );
}
