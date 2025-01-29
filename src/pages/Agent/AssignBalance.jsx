import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jsPDF } from "jspdf"; // Import jsPDF

export default function AssignBalance() {
  const { state: { record } = {} } = useLocation();
  const navigate = useNavigate();
  const [partnerId, setPartnerId] = useState(record || "");
  const [product] = useState("CBM");
  const [productType] = useState("Core Balance");
  const [totalUnits, setTotalUnits] = useState("");
  const [offeredDiscount, setOfferedDiscount] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [transactionID, setTransactionID] = useState("");
  const [payAmount, setPayAmount] = useState(0);

  const tokenValue = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${tokenValue?.trim()}`,
    "Content-Type": "application/json",
  };

  const handleAPI = async (url, payload, successMsg) => {
    try {
      const { data } = await axios.post(url, payload, { headers });
      if (successMsg) toast.success(successMsg);
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleAssignBalance = async () => {
    setLoading(true);
    if (!tokenValue) return toast.error("Token missing. Please log in.");

    const payload = {
      partnerId: parseInt(partnerId, 10),
      product,
      productType,
      totalUnits: parseFloat(totalUnits),
      offeredDiscount: parseFloat(offeredDiscount),
    };

    try {
      const { transactionID, payAmount } = await handleAPI(
        "https://bssproxy01.neotel.nr/crm/api/partner/order",
        payload,
        "Order is generated"
      );
      setTransactionID(transactionID);
      setPayAmount(payAmount);
      setStep(2);
    } catch { }
  };

  const handleMakePayment = async () => {
    setLoading(true);
    const paymentPayload = {
      partnerId: parseInt(partnerId, 10),
      invoiceNumber: transactionID,
      amount: parseFloat(payAmount),
      paymentMode: "CASH",
    };
    try {
      await handleAPI(
        "https://bssproxy01.neotel.nr/crm/api/save/partner/payment/currency/1?creditCard=1",
        paymentPayload,
        "Payment completed successfully!"
      );
      setStep(3);
    } catch { }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Set font style and size
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // Table data and headers
    const headers = ["Label", "Value"];
    const data = [
      ["Reseller ID", partnerId],
      ["Invoice Number", transactionID],
      ["Total Amount Paid", `$${payAmount}`],
      ["Product", product],
      ["Product Type", productType],
      ["Total Units", `${totalUnits} AUD`],
      ["Offered Discount", `${offeredDiscount}%`],
    ];

    // Title text before the table
    doc.text("Payment Invoice Details", 20, 20);

   
    doc.autoTable({
      startY: 30, 
      head: [headers], 
      body: data, 
      theme: 'grid', 
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 50 },
        1: { fontStyle: 'normal', cellWidth: 100 }, 
      },
      margin: { left: 20, right: 20 }, 
      styles: { fontSize: 12 }, 
      headStyles: { fillColor: [22, 160, 133] }, 
    });

    
    doc.save("payment.pdf");
  };

  const handleChange = (setter, maxValue = 100) => (e) => {
    let value = e.target.value;

    // Allow only digits and a single decimal point
    value = value.replace(/[^0-9.]/g, '');

    // Ensure there's only one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
      value = `${parts[0]}.${parts[1]}`;
    }

    // Allow only two digits after the decimal point
    if (parts[1] && parts[1].length > 2) {
      value = `${parts[0]}.${parts[1].slice(0, 2)}`;
    }

    // Convert to number and ensure it's less than or equal to maxValue (100)
    if (parseFloat(value) > maxValue) {
      return; // Do not allow the value to exceed maxValue (100)
    }

    // Set the value if it's valid
    setter(value);
  };

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: 500,
        margin: "0 auto",
        textAlign: "center",
        background:
          "linear-gradient(135deg, #e5b33d 0%, #f7c664 50%, #f9e0a7 100%)",
        borderRadius: "10px",
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
      }}
    >
      <ToastContainer position="bottom-left" autoClose={3000} hideProgressBar />
      <Paper elevation={5} sx={{ padding: 3, borderRadius: 4, background: "white" }}>
        {step === 1 && (
          <>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", color: "#253A7D" }}>
              Assign Core Balance
            </Typography>
            {[{ label: "Partner ID", value: partnerId, disabled: true },
            { label: "Product", value: product, disabled: true },
            { label: "Product Type", value: productType, disabled: true },
            {
              label: "Total $ AUD",
              value: totalUnits,
              onChange: handleChange(setTotalUnits, 99999),
              helperText: "Max 5 digits, decimals allowed",
            },
            {
              label: "Offered Discount (%)",
              value: offeredDiscount,
              onChange: handleChange(setOfferedDiscount, 100),
              helperText: "Max 3 digits, <100",
            }].map((field, i) => (
              <TextField key={i} fullWidth margin="normal" {...field} />
            ))}
            <Box display="flex" justifyContent="space-between" mt={0}>
              <Button
                variant="contained"
                sx={{
                  px: 4,
                  background: "#253A7D",
                  color: "white",
                  "&:hover": { background: "#253A7D" },
                }}
                onClick={handleAssignBalance}
                disabled={loading}
              >
                {loading ? <CircularProgress size={20} /> : "Assign Balance"}
              </Button>
              <Button
                variant="outlined"
                sx={{ px: 4, color: "black", borderColor: "black", backgroundColor: "#F3C25B" }}
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </Box>
          </>
        )}
        {step === 2 && (
          <>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#253A7D" }}>
              Make Payment
            </Typography>
            {[{ label: "Partner ID", value: partnerId },
            { label: "Invoice Number", value: transactionID },
            { label: "Amount", value: payAmount },
            { label: "Payment Mode", value: "CASH" }].map((field, i) => (
              <TextField key={i} fullWidth margin="normal" disabled {...field} />
            ))}
            <Box display="flex" justifyContent="space-between" mt={3}>
              <Button
                variant="contained"
                sx={{ px: 4, background: "#253A7D", color: "white", "&:hover": { background: "#0056b3" } }}
                onClick={handleMakePayment}
                disabled={loading}
              >
                {loading ? <CircularProgress size={20} /> : "Make Payment"}
              </Button>
              <Button
                variant="outlined"
                sx={{ px: 4, color: "black", borderColor: "black", backgroundColor: "#F3C25B" }}
                onClick={() => setStep(1)}
              >
                Back
              </Button>
            </Box>
          </>
        )}
        {step === 3 && (
          <>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#253A7D" }}>
              Payment Done Succesfully 
            </Typography>
            <TableContainer component={Paper}>
              <Table id="confirmation-table" sx={{ minWidth: 300 }}>
                <TableBody>
                  {[
                    { label: "Reseller ID", value: partnerId },
                    { label: "Invoice Number", value: transactionID },
                    { label: "Total Amount Paid", value: `$${payAmount}` },
                    { label: "Product", value: product },
                    { label: "Product Type", value: productType },
                    { label: "Total Units", value: `${totalUnits} AUD` },
                    { label: "Offered Discount", value: `${offeredDiscount}%` }
                  ].map((row, i) => (
                    <TableRow key={i}>
                      <TableCell><strong>{row.label}</strong></TableCell>
                      <TableCell>{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Buttons section */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button
                variant="contained"
                sx={{
                  px: 2,
                  background: "#253A7D",
                  color: "white",
                  "&:hover": { background: "#0056b3" }
                }}
                onClick={handleDownloadPDF}
              >
                Download PDF
              </Button>

              <Button
                variant="outlined"
                sx={{ px: 4, color: "black", borderColor: "black", backgroundColor: "#F3C25B" }}
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </Box>
          </>
        )}


      </Paper>
    </Box>
  );
}
