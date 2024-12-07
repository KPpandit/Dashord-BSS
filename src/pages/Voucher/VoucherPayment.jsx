import { Box, Button, Container, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography, createTheme } from '@mui/material';
import { useFormik } from 'formik';
import React, { Component, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

import { ThemeProvider } from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
export default function VoucherPayment({ onPaymentSuccess }){
    const navigate=useNavigate();
    const location = useLocation();
    const { record ,formValues,reciptentId,rates_offer} = location.state || {};
    console.log(record, "  values from Voucher", formValues)
    const defaultTheme = createTheme();
   
    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            msisdn: "",
            email: "",
            postalcode: "",
            address: "",
            locality: "",
            
            amount: "",
            invoicenumbe: "",
            invoicedescription: "",
            invoicereference: ""
        },
        onSubmit: async (values) => {
            console.log(values);
            try {
                const paymentResponse = await axios.post('http://182.74.113.61/eway/payment_transparent.php', values, {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                });

                if (paymentResponse.status === 200) {
                    // toast.success('Payment Done', { autoClose: 2000 });
                    // console.log(paymentResponse.data.accessCode," API Access Code")
                    const { accessCode, formUrl } = paymentResponse.data;
                            // console.log(packResponse," API Responsse")
                    
                            
                            const paymentResponse1 = { accessCode, formUrl };
                            console.log(accessCode, 'Access code value');
                            console.log(formUrl, 'Form  URL value');
                    
                            // Delay navigation by 2 seconds
                            setTimeout(() => {
                                navigate('/cardDetails', { state: { paymentResponse1, record } });
                            }, 2000);
                }
            } catch (paymentError) {
                console.log(paymentError);
                toast.error(paymentError.response?.data?.message, { autoClose: 2000 });
            }
        }
    });
    useEffect(() => {
        if (record) {
            formik.setValues({
                first_name: record.firstName,
                last_name: record.lastName,
                msisdn: formValues.msisdn,
                email: record.email,
                postalcode: record.postalCode,
                address: record.streetAddres1,
                locality: record.streetAddres2,
                // card_holder_name: "",
                // card_number: "",
                // expiry_month: "",
                // expiry_year: "",
                // cvn: "",
                amount: formValues.totalAmount,
                invoicenumbe: formValues.paymentRefernceId,
                invoicedescription: "",
                invoicereference: "CRM"
            });
        }
    }, [record]);
    return (
        <ThemeProvider theme={defaultTheme}>
            <ToastContainer position="bottom-left" />
            <Container component="main" sx={{ marginTop: -3 }} >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box component="form"
                    onSubmit={formik.handleSubmit}

                    >
                        <Grid sx={{ width: 800 }}>
                            <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%', paddingBottom: 2 }}>
                                <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0.8, marginRight: -1 }}>
                                    <Grid>
                                        <Typography
                                            style={{

                                                fontSize: '20px',
                                                paddingLeft: 10,
                                                fontWeight: 'bold',
                                                paddingLeft: 32

                                            }}
                                        > Payment Details</Typography>
                                    </Grid>
                                </Paper>
                            </Box>
                            <form>
                            <Paper elevation={10} sx={{ padding: 2 }}>
                                    <Grid container spacing={2} padding={5}>
                                        {[
                                            { label: 'First Name', name: 'first_name' },
                                            { label: 'Last Name', name: 'last_name' },
                                            { label: 'msisdn', name: 'msisdn' },
                                            { label: 'email', name: 'email' },
                                            { label: 'postalcode', name: 'postalcode' },
                                            { label: 'address', name: 'address' },
                                            { label: 'locality', name: 'locality' },
                                            // { label: 'card_holder_name', name: 'card_holder_name' },
                                            // { label: 'card_number', name: 'card_number' },
                                            // { label: 'expiry_month', name: 'expiry_month' },
                                            // { label: 'expiry_year', name: 'expiry_year' },
                                            // { label: 'cvn', name: 'cvn' },
                                            { label: 'amount', name: 'amount' },
                                            { label: 'invoicenumbe', name: 'invoicenumbe' },
                                            { label: 'invoicedescription', name: 'invoicedescription' },
                                            { label: 'invoicereference', name: 'invoicereference' }
                                        ].map(({ label, name }) => (
                                            <Grid item lg={4} md={4} sm={6} xs={12} paddingBottom={1} key={name}>
                                                <TextField
                                                    label={label}
                                                    type="text"
                                                    fullWidth
                                                    name={name}
                                                    value={formik.values[name]}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Paper>

                                <Grid container>
                                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                        <Button
                                            type="submit"

                                            variant="contained"
                                             onClick={formik.handleSubmit}
                                            sx={{ boxShadow: 24, mt: 1.8, mb: 0.2, backgroundColor: '#253A7D' }}
                                        >
                                            Submit
                                        </Button>
                                        <Button
                                           

                                            variant="contained"
                                            onClick={() => navigate(-1)}
                                            sx={{ boxShadow: 24, mt: 1.8, mb: 0.2, backgroundColor: '#253A7D', marginLeft: 10 }}
                                        >
                                            Back
                                        </Button>
                                    </Grid>

                                </Grid>

                            </form>

                        </Grid>




                    </Box>
                </Box>

            </Container>

        </ThemeProvider>)
}