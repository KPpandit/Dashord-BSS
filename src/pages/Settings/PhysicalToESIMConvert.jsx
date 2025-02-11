import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  TextField,
  CircularProgress,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { SwapHoriz, ReportProblem } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const PhysicalToESIMConvert = () => {
  const [openModal, setOpenModal] = useState(false);
  const [conversionType, setConversionType] = useState("");
  const [msisdn, setMsisdn] = useState("");
  const [reason, setReason] = useState("");
  const [latestSimImsi, setLatestSimImsi] = useState("");
  const [ki, setKi] = useState("");
  const [opc, setOpc] = useState("");
  const [iccId, setIccId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [customerType, setCustomerType] = useState(""); // New state for Prepaid/Postpaid dropdown
  const tokenValue = localStorage.getItem("token");

  const handleOpenModal = (type) => {
    setConversionType(type);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setError("");
    setCustomerType(""); // Reset dropdown on modal close
  };

  const handleSubmit = async () => {
    if (!msisdn || !reason) {
      setError("MSISDN and Reason are required.");
      return;
    }

    if (conversionType === "E-SIM" && (!latestSimImsi || !ki || !opc || !iccId)) {
      setError("All fields are required for eSIM conversion.");
      return;
    }

    if (conversionType === "POSTPAID" && !customerType) {
      setError("Please select a customer type (Prepaid/Postpaid).");
      return;
    }

    if (conversionType === "STOLEN" && (!latestSimImsi || !ki || !opc || !iccId)) {
      setError("All fields are required for SIM Stolen.");
      return;
    }

    setLoading(true);
    try {
      let response;
      if (conversionType === "E-SIM") {
        response = await axios.put(
          "https://bssproxy01.neotel.nr/erp/api/sim/conversion",
          {
            msisdn,
            reason,
            convertionSimType: conversionType,
            latestSimImsi,
            ki,
            opc,
            iccId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenValue}`,
            },
          }
        );
      } else if (conversionType === "POSTPAID") {
        response = await axios.put(
          `https://bssproxy01.neotel.nr/erp/api/sim/coversion/msisdn/${msisdn}/customertype/${customerType}/reason/${reason}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenValue}`,
            },
          }
        );
      } else if (conversionType === "STOLEN") {
        response = await axios.put(
          "https://bssproxy01.neotel.nr/erp/api/sim/stolen/process",
          {
            msisdn,
            reason,
            latestSimImsi,
            ki,
            opc,
            iccId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenValue}`,
            },
          }
        );
      }

      if (response.status === 200) {
        toast.success("Processed successfully");
        handleCloseModal();
      }
    } catch (err) {
      setError("Failed to process request. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        padding: 2,
        paddingTop: 15,
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
      }}
    >
      <Typography variant="h4" sx={{ mb: 4, color: "#333", fontWeight: "bold", fontFamily: "Poppins, sans-serif" }}>
        SIM Conversion
      </Typography>

      <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        <Card
          sx={{
            width: 300,
            textAlign: "center",
            boxShadow: 3,
            borderRadius: 2,
            transition: "transform 0.3s",
            "&:hover": { transform: "scale(1.05)" },
            background: "linear-gradient(135deg, #6a11cb, #2575fc)",
            color: "#fff",
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", fontFamily: "Poppins, sans-serif" }}>
              Physical <IconButton color="inherit" onClick={() => handleOpenModal("E-SIM")} sx={{ fontSize: "3rem" }}>
                <SwapHoriz fontSize="inherit" />
              </IconButton> eSIM
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            width: 300,
            textAlign: "center",
            boxShadow: 3,
            borderRadius: 2,
            transition: "transform 0.3s",
            "&:hover": { transform: "scale(1.05)" },
            background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
            color: "#fff",
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", fontFamily: "Poppins, sans-serif" }}>
              Prepaid <IconButton color="inherit" onClick={() => handleOpenModal("POSTPAID")} sx={{ fontSize: "3rem" }}>
                <SwapHoriz fontSize="inherit" />
              </IconButton> Postpaid
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            width: 300,
            textAlign: "center",
            boxShadow: 3,
            borderRadius: 2,
            transition: "transform 0.3s",
            "&:hover": { transform: "scale(1.05)" },
            background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
            color: "#fff",
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", fontFamily: "Poppins, sans-serif" }}>
              SIM <IconButton color="inherit" onClick={() => handleOpenModal("STOLEN")} sx={{ fontSize: "3rem" }}>
                <ReportProblem fontSize="inherit" />
              </IconButton> Stolen
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            background: "linear-gradient(135deg, #ffffff, #f5f5f5)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", fontFamily: "Poppins, sans-serif" }}>
            {conversionType === "E-SIM"
              ? "Physical to eSIM Conversion"
              : conversionType === "POSTPAID"
              ? "Prepaid to Postpaid Conversion"
              : "SIM Stolen"}
          </Typography>

          <TextField label="MSISDN" fullWidth value={msisdn} onChange={(e) => setMsisdn(e.target.value)} sx={{ mb: 2 }} />
          <TextField label="Reason" fullWidth value={reason} onChange={(e) => setReason(e.target.value)} sx={{ mb: 2 }} />

          {(conversionType === "E-SIM" || conversionType === "STOLEN") && (
            <>
              <TextField label="Latest SIM IMSI" fullWidth value={latestSimImsi} onChange={(e) => setLatestSimImsi(e.target.value)} sx={{ mb: 2 }} />
              <TextField label="KI" fullWidth value={ki} onChange={(e) => setKi(e.target.value)} sx={{ mb: 2 }} />
              <TextField label="OPC" fullWidth value={opc} onChange={(e) => setOpc(e.target.value)} sx={{ mb: 2 }} />
              <TextField label="ICCID" fullWidth value={iccId} onChange={(e) => setIccId(e.target.value)} sx={{ mb: 2 }} />
            </>
          )}

          {conversionType === "POSTPAID" && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Customer Type</InputLabel>
              <Select value={customerType} onChange={(e) => setCustomerType(e.target.value)} label="Customer Type">
                <MenuItem value="PrePaid">Prepaid</MenuItem>
                <MenuItem value="PostPaid">Postpaid</MenuItem>
              </Select>
            </FormControl>
          )}

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            fullWidth
            sx={{
              background: "linear-gradient(135deg, #6a11cb, #2575fc)",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": {
                background: "linear-gradient(135deg, #2575fc, #6a11cb)",
              },
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </Box>
      </Modal>
      <ToastContainer position="bottom-left" />
    </Box>
  );
};

export default PhysicalToESIMConvert;