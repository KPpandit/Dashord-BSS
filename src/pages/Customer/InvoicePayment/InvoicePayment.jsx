import {
    Box, Button, Container, CssBaseline, Grid, Paper,
    ThemeProvider, Typography, createTheme
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function InvoicePayment(selectedRecordId) {
    const location = useLocation();
    const { paymentResponse } = location.state || {};
    const [result, setResult] = useState(null); // null to differentiate between no data and loading
    const [loading, setLoading] = useState(true);
    const [showError, setShowError] = useState(false); // State to track if there's an error
    const tokenValue = localStorage.getItem('token');
    const record = selectedRecordId.selectedRecordId;
    const id = selectedRecordId.selectedRecordId.simInventory.msisdn;

    useEffect(() => {
        getApi();
    }, [id]); // Dependency on `id` only to call getApi once per unique id

    const getApi = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://bssproxy01.neotel.nr/crm/api/invoice/msisdn/${id}`, {
                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.message) {
                    setShowError(true);
                    setResult(data.message); // Set error message
                } else {
                    setResult(data); // Set actual data
                    setShowError(false);
                }
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setShowError(true);
            setResult('Invoice Information Does Not Exist');
        } finally {
            setLoading(false);
        }
    };

    const handlePayInCash = async () => {
        const paymentUrl = `https://bssproxy01.neotel.nr/crm/api/postpaid/bill/payment/invoiceNumber/${result.invoiceNumber}/amount/${result.total}/currency/1/paymentrsult/1/paymentmethod/1?creditCard=2&partner=1`;

        try {
            const response = await axios.post(paymentUrl, null, {
                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 201) {
                toast.success('Cash payment is done');
            } else {
                toast.error('Failed to complete cash payment');
            }
        } catch (error) {
            console.error('Payment API error:', error);
            toast.error('Error processing payment');
        }
    };

    const defaultTheme = createTheme();
    const navigate = useNavigate();

    const handlePayOnline = () => {
        const transactionId = result.invoiceNumber; // Assuming `invoiceNumber` can serve as transaction ID
        const amount = result.total;

        navigate('/payment-confirmation', { state: { transactionId, amount } });
    };
    return (
        <ThemeProvider theme={defaultTheme}>
            <ToastContainer position="bottom-left" />
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        {loading ? (
                            <Typography variant="h6" align="center">Loading...</Typography>
                        ) : showError ? (
                            <Typography variant="h6" color="error" align="center">
                                {result || "Your invoice does not exist!"}
                            </Typography>
                        ) : (
                            <Paper elevation={3} sx={{ p: 3, mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item xs={12}>
                                        <Typography variant="h6" align="center">
                                            Invoice Number:
                                        </Typography>
                                        <Typography align="center">{result.invoiceNumber}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" align="center">
                                            Total Amount:
                                        </Typography>
                                        <Typography align="center">{result.total}</Typography>
                                    </Grid>
                                    <Grid item xs={6} textAlign="center">
                                        <Button variant="contained" onClick={handlePayInCash} sx={{ mr: 2, backgroundColor: '#253A7D' }}>
                                            Pay in Cash
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} textAlign="center">
                                        <Button
                                            variant="contained"
                                            sx={{ backgroundColor: '#253A7D' }}
                                            onClick={handlePayOnline}
                                        >
                                            Pay Online
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        )}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
