import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function AssignBalance() {
  const location = useLocation();
  const { record } = location.state || {};
  const [partnerId, setPartnerId] = useState(record || "");
  const [product, setProduct] = useState("CBM");
  const [productType, setProductType] = useState("Core Balance");
  const [totalUnits, setTotalUnits] = useState("");
  const [offeredDiscount, setOfferedDiscount] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [transactionID, setTransactionID] = useState("");
  const [payAmount, setPayAmount] = useState(0);

  const tokenValue = localStorage.getItem("token");

  const handleAssignBalance = async () => {
    setLoading(true);

    if (!tokenValue) {
      toast.error("Authentication token is missing. Please log in again.");
      setLoading(false);
      return;
    }

    const headers = {
      Authorization: `Bearer ${tokenValue.trim()}`,
      "Content-Type": "application/json",
    };

    const payload = {
      partnerId: parseInt(partnerId, 10),
      product,
      productType,
      totalUnits: parseInt(totalUnits, 10),
      offeredDiscount: parseInt(offeredDiscount, 10),
    };

    try {
      const response = await axios.post(
        "https://bssproxy01.neotel.nr/crm/api/partner/order",
        payload,
        { headers }
      );

      const { transactionID, payAmount } = response.data;

      setTransactionID(transactionID);
      setPayAmount(payAmount);
      setStep(2); // Move to the next step
      toast.success("Order is generated");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "An error occurred while processing the request."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleMakePayment = async () => {
    setLoading(true);

    if (!tokenValue) {
      toast.error("Authentication token is missing. Please log in again.");
      setLoading(false);
      return;
    }

    const headers = {
      Authorization: `Bearer ${tokenValue.trim()}`,
      "Content-Type": "application/json",
    };

    const paymentPayload = {
      partnerId: parseInt(partnerId, 10),
      invoiceNumber: transactionID,
      amount: payAmount,
      paymentMode: "CASH",
    };

    try {
      await axios.post(
        "https://bssproxy01.neotel.nr/crm/api/save/partner/payment/currency/1?creditCard=1",
        paymentPayload,
        { headers }
      );
      toast.success("Payment completed successfully!");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "An error occurred while processing the payment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: 500,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      {/* ToastContainer */}
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick
        pauseOnHover
        draggable
      />

      <Paper
        elevation={3}
        sx={{
          padding: 3,
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        {step === 1 && (
          <>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Assign Balance
            </Typography>
            <TextField
              label="Partner ID"
              type="number"
              value={partnerId}
              onChange={(e) => setPartnerId(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Product Type"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Total Units"
              type="number"
              value={totalUnits}
              onChange={(e) => setTotalUnits(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Offered Discount (%)"
              type="number"
              value={offeredDiscount}
              onChange={(e) => setOfferedDiscount(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="success"
              sx={{ marginTop: 3 }}
              onClick={handleAssignBalance}
              disabled={loading}
            >
              {loading ? "Processing..." : "Assign Balance"}
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Make Payment
            </Typography>
            <TextField
              label="Partner ID"
              type="number"
              value={partnerId}
              disabled
              fullWidth
              margin="normal"
            />
            <TextField
              label="Invoice Number"
              value={transactionID}
              disabled
              fullWidth
              margin="normal"
            />
            <TextField
              label="Amount"
              type="number"
              value={payAmount}
              disabled
              fullWidth
              margin="normal"
            />
            <TextField
              label="Payment Mode"
              value="CASH"
              disabled
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 3 }}
              onClick={handleMakePayment}
              disabled={loading}
            >
              {loading ? "Processing..." : "Make Payment"}
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
}
