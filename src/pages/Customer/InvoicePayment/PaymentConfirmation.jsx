import React, { useEffect } from 'react';
import { Container, Typography, Box, Paper, createTheme, CssBaseline, Grid, TextField, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { ThemeProvider } from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import axios from "axios";
export default function PaymentConfirmation() {
    const location = useLocation();
    const { transactionId, amount } = location.state || {}; // Safely access location.state
    console.log(transactionId, ' tarnsation number')
    const navigate=useNavigate();
    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            msisdn: "",
            email: "",
            postalcode: "",
            address: "",
            locality: "",
            amount: amount,
            invoicenumbe: transactionId,
            invoicedescription: "",
            invoicereference: ""
        },
        onSubmit: async (values) => {
            console.log('Submitted values:', values);
            try {
                // First API call to payment endpoint
                const paymentResponse = await axios.post(
                    'http://182.74.113.61/eway/payment_transparent.php', 
                    values, 
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }
                    }
                );
    
                console.log('Payment response:', paymentResponse);
    
                // Check if payment response is successful
                if (paymentResponse.status === 200) {
                           
                    const { accessCode, formUrl } = paymentResponse.data;
                    // console.log(packResponse," API Responsse")
            
                    
                    const paymentResponse1 = { accessCode, formUrl };
                    console.log(accessCode, 'Access code value');
                    console.log(formUrl, 'Form  URL value');
            
                    // Delay navigation by 2 seconds
                    setTimeout(() => {
                        navigate('/cardDetails', { state: { paymentResponse1 } });
                    }, 2000);
                }
            } catch (error) {
                console.error('Error during payment or pack allocation:', error);
                toast.error(error.response?.data?.message || 'An error occurred', { autoClose: 2000 });
            }
        }
    });
    
    // useEffect(() => {
    //     if (record) {
    //         formik.setValues({
    //             first_name: record.firstName,
    //             last_name: record.lastName,
    //             msisdn: record.simInventory.msisdn,
    //             email: record.email,
    //             postalcode: record.postalCode,
    //             address: record.streetAddres1,
    //             locality: record.streetAddres2,
    //             // card_holder_name: "",
    //             // card_number: "",
    //             // expiry_month: "",
    //             // expiry_year: "",
    //             // cvn: "",
    //             amount: rates_offer,
    //             invoicenumbe: "",
    //             invoicedescription: "",
    //             invoicereference: ""
    //         });
    //     }
    // }, [record]);
    const defaultTheme = createTheme();
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
