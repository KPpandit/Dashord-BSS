import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Container,
} from "@mui/material";

export default function BulkPackActivate() {
  const [packId, setPackId] = useState("");
  const [msisdnList, setMsisdnList] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleActivate = async () => {
    if (!packId || !msisdnList) {
      setResponseMessage("Please provide all required fields.");
      return;
    }

    setLoading(true);
    setResponseMessage("");

    const payload = {
      pack_id: parseInt(packId, 10),
      msisdn_list: msisdnList.split(",").map((num) => parseInt(num.trim(), 10)),
    };

    try {
      const response = await axios.post(
        "https://bssproxy01.neotel.nr/abmf-prepaid/api/prepaid/packs/activation/bulk",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      setResponseMessage("Success: " + JSON.stringify(response.data));
    } catch (error) {
      setResponseMessage(
        "Error: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6, p: 3, bgcolor: "#f9f9f9", borderRadius: 2 }}>
      <Typography variant="h4" align="center" color="#253A7D" sx={{fontWeight:'bold'}}   gutterBottom>
        Bulk Pack Activation
      </Typography>

      <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Pack ID"
          variant="outlined"
          value={packId}
          onChange={(e) => setPackId(e.target.value)}
          type="number"
          margin="normal"
        />

        <TextField
          fullWidth
          label="MSISDN List"
          variant="outlined"
          value={msisdnList}
          onChange={(e) => setMsisdnList(e.target.value)}
          placeholder="Enter comma-separated MSISDNs, e.g., 9520488660, 9520488661"
          multiline
          rows={3}
          margin="normal"
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleActivate}
          disabled={loading}
          sx={{ mt: 2, py: 1.5 ,bgcolor:'#253A7D'}}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Activate"}
        </Button>
      </Box>

      {responseMessage && (
        <Alert
          severity={responseMessage.startsWith("Success:") ? "success" : "error"}
          sx={{ mt: 3 }}
        >
          {responseMessage}
        </Alert>
      )}
    </Container>
  );
}
