import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Grid, Typography, Box, Paper } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function AssignProducts() {
    const location = useLocation();
    const { record } = location.state || {}; // Get partnerId from location state

    const [product, setProduct] = useState("SIM"); // Default to SIM
    const [startingNumber, setStartingNumber] = useState("");
    const [endingNumber, setEndingNumber] = useState("");
    const [productType, setProductType] = useState("");
    const [totalUnits, setTotalUnits] = useState("");
    const [offeredDiscount, setOfferedDiscount] = useState("");

    const [invoiceNumber, setInvoiceNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [paymentMode] = useState("CASH");

    const [isProductAssigned, setIsProductAssigned] = useState(false);

    const validateAssignProductFields = () => {
        if (!productType || !totalUnits || (product !== "Broadband" && !offeredDiscount)) {
            toast.error("All fields are required to assign the product.", { autoClose: 2000 });
            return false;
        }
        if (product === "SIM" && (!startingNumber || !endingNumber)) {
            toast.error("Starting and Ending numbers are required for SIM.", { autoClose: 2000 });
            return false;
        }
        return true;
    };

    const handleAssignProduct = async () => {
        if (!validateAssignProductFields()) return;

        const tokenValue = localStorage.getItem("token");
        const assignProductApi = "https://bssproxy01.neotel.nr/crm/api/partner/order";

        const payload = {
            partnerId: record,
            product,
            productType,
            totalUnits: parseInt(totalUnits),
            ...(product === "SIM" && { startingNumber, endingNumber }),
        };

        try {
            const response = await axios.post(assignProductApi, payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenValue}`,
                },
            });

            const { transactionID, payAmount } = response.data;
            if (product !== "Broadband") {
                setInvoiceNumber(transactionID);
                setAmount(payAmount);
                setIsProductAssigned(true);
            }


            // setIsProductAssigned(true);
            toast.success("Product Assigned Successfully", { autoClose: 2000 });
        } catch (error) {
            console.error("Error assigning product:", error);
            toast.error("Error assigning product. Please try again.", { autoClose: 2000 });
        }
    };

    const handlePayment = async () => {
        if (product === "SIM" && (!startingNumber || !endingNumber)) {
            toast.error("Starting and Ending numbers are required for SIM payment.", { autoClose: 2000 });
            return;
        }

        const tokenValue = localStorage.getItem("token");
        const paymentApi = `https://bssproxy01.neotel.nr/crm/api/save/partner/payment/currency/1?creditCard=1&startingNumber=${startingNumber}&endingNumber=${endingNumber}`;

        const payload = {
            partnerId: record,
            invoiceNumber,
            product,
            amount: parseFloat(amount),
            paymentMode,
        };

        try {
            await axios.post(paymentApi, payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenValue}`,
                },
            });
            toast.success("Payment Saved Successfully", { autoClose: 2000 });
        } catch (error) {
            console.error("Payment Error:", error);
            toast.error("Payment Failed. Please try again.", { autoClose: 2000 });
        }
    };


    return (
        <Box p={2}>
            <Typography
                variant="h4"
                sx={{
                    textAlign: "center",
                    fontWeight: "600",
                    color: "#253A7D",
                    marginBottom: "20px",
                }}
            >
                Assign {product} to Partner (ID: {record})
            </Typography>
            <ToastContainer position="bottom-left" />
            <Paper
                sx={{
                    padding: "30px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    borderRadius: "10px",
                    border: `2px solid ${isProductAssigned ? "#DBA818" : "#253A7D"}`,
                }}
            >
                <Grid container spacing={3}>
                    {!isProductAssigned ? (
                        <>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: "500",
                                        color: "#253A7D",
                                        marginBottom: "10px",
                                    }}
                                >
                                    Step 1: Assign Product
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant={product === "SIM" ? "contained" : "outlined"}
                                    sx={{
                                        backgroundColor: product === "SIM" ? "#253A7D" : "#fff",
                                        color: product === "SIM" ? "#fff" : "#253A7D",
                                        border: `2px solid #253A7D`,
                                        marginRight: "10px",
                                        "&:hover": {
                                            backgroundColor: "#253A7D",
                                            color: "#fff",
                                        },
                                    }}
                                    onClick={() => setProduct("SIM")}
                                >
                                    SIM
                                </Button>
                                <Button
                                    variant={product === "Mobile device" ? "contained" : "outlined"}
                                    sx={{
                                        backgroundColor: product === "Mobile device" ? "#253A7D" : "#fff",
                                        color: product === "Mobile device" ? "#fff" : "#253A7D",
                                        border: `2px solid #253A7D`,
                                        marginRight: "10px",
                                        "&:hover": {
                                            backgroundColor: "#253A7D",
                                            color: "#fff",
                                        },
                                    }}
                                    onClick={() => setProduct("Mobile device")}
                                >
                                    Device
                                </Button>
                                <Button
                                    variant={product === "Broadband" ? "contained" : "outlined"}
                                    sx={{
                                        backgroundColor: product === "Broadband" ? "#253A7D" : "#fff",
                                        color: product === "Broadband" ? "#fff" : "#253A7D",
                                        border: `2px solid #253A7D`,
                                        "&:hover": {
                                            backgroundColor: "#253A7D",
                                            color: "#fff",
                                        },
                                    }}
                                    onClick={() => setProduct("Broadband")}
                                >
                                    Broadband
                                </Button>
                            </Grid>

                            {product === "SIM" && (
                                <>
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
                                </>
                            )}

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
                            {product !== "Broadband" && (
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Offered Discount (%)"
                                        value={offeredDiscount}
                                        type="number"
                                        onChange={(e) => setOfferedDiscount(e.target.value)}
                                    />
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#DBA818",
                                        color: "#fff",
                                        "&:hover": {
                                            backgroundColor: "#253A7D",
                                        },
                                    }}
                                    onClick={handleAssignProduct}
                                >
                                    Assign Product
                                </Button>
                            </Grid>
                        </>
                    ) : (
                        product !== "Broadband" && (
                            <>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: "500",
                                            color: "#253A7D",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        Step 2: Make Payment
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth label="Invoice Number" value={invoiceNumber} disabled />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth label="Amount" value={amount} type="number" disabled />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth label="Payment Mode" value={paymentMode} disabled />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#DBA818",
                                            color: "#fff",
                                            "&:hover": {
                                                backgroundColor: "#253A7D",
                                            },
                                        }}
                                        onClick={handlePayment}
                                    >
                                        Make Payment
                                    </Button>
                                </Grid>
                            </>
                        )
                    )}
                </Grid>
            </Paper>
        </Box>
    );
}
