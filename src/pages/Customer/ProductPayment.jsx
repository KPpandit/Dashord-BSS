import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function ProductPayment() {
  const location = useLocation();
  const { record } = location.state || {};
  const [orderData, setOrderData] = useState(null);
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const tokenValue = localStorage.getItem("token")?.trim();

  const showNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => setNotification({ ...notification, open: false });

  // Fetch Order Data
  const fetchOrderData = async () => {
    if (!record?.ekycToken) {
      showNotification("EKYC Token is missing. Please try again.", "error");
      return null;
    }

    if (!tokenValue) {
      showNotification("Authentication token is missing. Please log in again.", "error");
      return null;
    }

    try {
      const response = await axios.post(
        `https://bssproxy01.neotel.nr/crm/api/save/order/token/${record.ekycToken}`,
        {},
        { headers: { Authorization: `Bearer ${tokenValue}`, "Content-Type": "application/json" } }
      );
      showNotification("Order data retrieved successfully.", "success");
      return response.data;
    } catch (err) {
      showNotification(err.response?.data?.message || "Error retrieving order data.", "error");
      return null;
    }
  };

  // Fetch Invoice Data
  const fetchInvoiceData = async (orderNumber) => {
    if (!tokenValue || !orderNumber) {
      showNotification("Order number or token is missing. Unable to fetch invoice.", "error");
      return null;
    }

    try {
      const response = await axios.get(
        `https://bssproxy01.neotel.nr/crm/api/invoice/order/${orderNumber}`,
        { headers: { Authorization: `Bearer ${tokenValue}`, "Content-Type": "application/json" } }
      );
      showNotification("Invoice data retrieved successfully.", "success");
      return response.data;
    } catch (err) {
      showNotification(err.response?.data?.message || "Error retrieving invoice data.", "error");
      return null;
    }
  };

  // Handle Cash Payment
  const handleCashPayment = async () => {
    setLoading(true);
    console.log(invoiceData?.invoiceId,'-------->',invoiceData?.totalAmount);
    // if (!tokenValue || !invoiceData?.invoiceId || !invoiceData?.totalAmount) {
    //   showNotification("Required data is missing. Please try again.", "error");
    //   setLoading(false);
    //   return;
    // }

    try {
      const paymentPayload = {
        custInvoiceId: invoiceData.invoiceId,
        amount: invoiceData.totalAmount,
        paymentStatus: true,
      };

      await axios.post(
        `https://bssproxy01.neotel.nr/crm/api/savepayment/currency/1/paymentrsult/1/paymentmethod/1`,
        paymentPayload,
        { headers: { Authorization: `Bearer ${tokenValue}`, "Content-Type": "application/json" } }
      );

      showNotification("Payment completed successfully.", "success");
    } catch (err) {
      showNotification(err.response?.data?.message || "Error processing payment.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle Online Payment
  const handleOnlinePayment = async () => {
    setLoading(true);

    if (!tokenValue || !invoiceData?.invoiceId || !invoiceData?.totalAmount) {
      showNotification("Required data is missing. Please try again.", "error");
      setLoading(false);
      return;
    }

    try {
      const paymentPayload = {
        custInvoiceId: invoiceData.invoiceId,
        amount: invoiceData.totalAmount,
        paymentStatus: true,
      };

      await axios.post(
        `https://bssproxy01.neotel.nr/crm/api/savepayment/currency/1/paymentrsult/1/paymentmethod/2`,
        paymentPayload,
        { headers: { Authorization: `Bearer ${tokenValue}`, "Content-Type": "application/json" } }
      );

      showNotification("Online payment completed successfully.", "success");
    } catch (err) {
      showNotification(err.response?.data?.message || "Error processing online payment.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Automatically Fetch All Data
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      const order = await fetchOrderData();
      if (order?.orderNumber) {
        const invoice = await fetchInvoiceData(order.orderNumber);
        setOrderData(order);
        setInvoiceData(invoice);
      }
      setLoading(false);
    };

    fetchAllData();
  }, [record?.ekycToken, tokenValue]);

  return loading ? (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <CircularProgress />
    </Box>
  ) : (
    <Box sx={{ padding: 4, maxWidth: 800, margin: "0 auto" }}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: "center", color: "#253A7D", fontWeight: "bold" }}>
        Make Payment
      </Typography>
      {orderData && invoiceData ? (
        <>
          {/* Cash Payment Card */}
          <Card
            sx={{
              backgroundColor: "#253A7D",
              color: "white",
              borderRadius: "16px",
              border: "3px solid #DBAF1A",
              textAlign: "center",
              padding: 2,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              margin: "16px auto",
              maxWidth: 500,
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Cash Payment
              </Typography>
              <Typography variant="body1">Order Number: {invoiceData.orderNumber}</Typography>
              <Typography variant="body1">Amount: {invoiceData.totalAmount}</Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#DBAF1A",
                  color: "black",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
                onClick={handleCashPayment}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Pay Now"}
              </Button>
            </CardContent>
          </Card>

          {/* Online Payment Card */}
          <Card
            sx={{
              backgroundColor: "#253A7D",
              color: "white",
              borderRadius: "16px",
              border: "3px solid #DBAF1A",
              textAlign: "center",
              padding: 2,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              margin: "16px auto",
              maxWidth: 500,
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Online Payment
              </Typography>
              <Typography variant="body1">Order Number: {invoiceData.orderNumber}</Typography>
              <Typography variant="body1">Amount: {invoiceData.totalAmount}</Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#DBAF1A",
                  color: "black",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
                onClick={handleOnlinePayment}
                disabled={loading}
                
              >
                {loading ? <CircularProgress size={24} /> : "Pay Online"}
              </Button>
            </CardContent>
          </Card>
        </>
      ) : (
        <Typography variant="body1" color="error" textAlign="center">
          Failed to retrieve order or invoice data. Please try again.
        </Typography>
      )}
      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: "100%" }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
