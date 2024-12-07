import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Grid, Typography, Box, Paper } from "@mui/material";
import { useSnackbar } from "notistack";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function AssignProducts() {
    const location = useLocation();
    const { record } = location.state || {}; // Get partnerId from location state

    const [product, setProduct] = useState("SIM");
    const [startingNumber, setStartingNumber] = useState("");
    const [endingNumber, setEndingNumber] = useState("");
    const [productType, setProductType] = useState("");
    const [totalUnits, setTotalUnits] = useState("");
    const [offeredDiscount, setOfferedDiscount] = useState("");

    // For payment
    const [invoiceNumber, setInvoiceNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [paymentMode, setPaymentMode] = useState("CASH");

    // State to toggle between steps
    const [isProductAssigned, setIsProductAssigned] = useState(false);

    // Snackbar for notifications
    const { enqueueSnackbar } = useSnackbar();

    const handleAssignProduct = async () => {
        const tokenValue = localStorage.getItem("token"); // Replace with actual token retrieval logic
        const assignProductApi = "https://bssproxy01.neotel.nr/crm/api/partner/order";

        const payload = {
            partnerId: record,
            product,
            startingNumber,
            endingNumber,
            productType,
            totalUnits: parseInt(totalUnits),
            offeredDiscount: parseFloat(offeredDiscount),
        };

        try {
            const response = await axios.post(assignProductApi, payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenValue}`,
                },
            });

            const { transactionID, payAmount } = response.data; // Extract invoiceNumber and amount from response
            console.log(response.data, '-- data');

            // Set the invoice number, amount, and payment mode
            setInvoiceNumber(transactionID);
            setAmount(payAmount);
            setPaymentMode("CASH"); // Always set to "CASH"

            setIsProductAssigned(true); // Move to payment step
            toast.success("Invoice Generated Succesfully", { autoClose: 2000 });
        } catch (error) {
            console.error("Error assigning product:", error);
            toast.error(error.message, { autoClose: 2000 });
        }
    };

    const handlePayment = async () => {
        const tokenValue = localStorage.getItem("token"); // Replace with actual token retrieval logic
        const paymentApi = `https://bssproxy01.neotel.nr/crm/api/save/partner/payment/currency/1?creditCard=1&startingNumber=${startingNumber}&endingNumber=${endingNumber}`;

        const payload = {
            partnerId: record,
            invoiceNumber,
            amount: parseFloat(amount),
            paymentMode,
        };

        try {
            const response = await axios.post(paymentApi, payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenValue}`,
                },
            });
            toast.success("Payment Saved Successfully", { autoClose: 2000 });
            enqueueSnackbar("Payment saved successfully!", { variant: "success" });
        } catch (error) {
            toast.error("Payment is already done", error);
            enqueueSnackbar("Failed to save payment", { variant: "error" });
        }
    };

    return (
        <Box p={2}>
            <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: '500', color: '#253A7D' }} mb={2}>
                Assign SIM to Partner (ID: {record})
            </Typography>
            <ToastContainer position="bottom-left" />
            <Paper sx={{ padding: 5, boxShadow: 24 }}>
                <Grid container spacing={2}>
                    {!isProductAssigned ? (
                        <>
                            {/* Product Assignment Form */}
                            <Grid item xs={12}>
                                <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: '500', color: '#253A7D' }}>Step 1: Assign Product</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Product"
                                    value={product}
                                    onChange={(e) => setProduct(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Starting Number"
                                    value={startingNumber}
                                    onChange={(e) => setStartingNumber(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Ending Number"
                                    value={endingNumber}
                                    onChange={(e) => setEndingNumber(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Product Type"
                                    value={productType}
                                    onChange={(e) => setProductType(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Total Units"
                                    value={totalUnits}
                                    type="number"
                                    onChange={(e) => setTotalUnits(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Offered Discount (%)"
                                    value={offeredDiscount}
                                    type="number"
                                    onChange={(e) => setOfferedDiscount(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAssignProduct}
                                >
                                    Assign Product
                                </Button>
                            </Grid>
                        </>
                    ) : (
                        <>
                            {/* Payment Form */}
                            <Grid item xs={12}>
                                <Typography variant="h6">Step 2: Make Payment</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Invoice Number"
                                    value={invoiceNumber}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Amount"
                                    value={amount}
                                    type="number"
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Payment Mode"
                                    value={paymentMode}
                                    disabled // Payment mode is always CASH
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handlePayment}
                                >
                                    Make Payment
                                </Button>
                            </Grid>
                        </>
                    )}
                </Grid>
            </Paper>
        </Box>
    );
}
