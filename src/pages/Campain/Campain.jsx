import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Tabs,
  Tab,
  Button,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SMSCampaign() {
  const [tab, setTab] = useState(0);
  const [singleMessage, setSingleMessage] = useState({ msisdn: "", text: "", isFlash: true });
  const [bulkMessage, setBulkMessage] = useState({ customerType: "Postpaid", text: "" });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Handle tab change
  const handleTabChange = (_, newValue) => setTab(newValue);

  // Handle form submissions
  const handleSingleSubmit = async (e) => {
    e.preventDefault();
    const { msisdn, text, isFlash } = singleMessage;

    if (msisdn.length !== 10) {
      toast.error("MSISDN must be exactly 10 digits.");
      return;
    }
    if (text.length > 160 || text.trim() === "") {
      toast.error("Message must be between 1 and 160 characters.");
      return;
    }

    setIsButtonDisabled(true); // Disable the button after API call
    const apiUrl = `https://bssproxy01.neotel.nr/sms/smpp/api/send-sms?msisdn=${msisdn}&from=121&text=${encodeURIComponent(
      text
    )}&configId=1&isFlash=${isFlash}&locale=en`;

    try {
      const response = await fetch(apiUrl, { method: "GET" });
      const data = await response.json();
      response.ok
        ? toast.success("Single SMS sent successfully!")
        : toast.error(`Error: ${data.message || "Unknown error"}`);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleBulkSubmit = async (e) => {
    e.preventDefault();
    const { customerType, text } = bulkMessage;

    if (text.length > 160 || text.trim() === "") {
      toast.error("Message must be between 1 and 160 characters.");
      return;
    }

    setIsButtonDisabled(true); // Disable the button after API call

    try {
      const response = await fetch("https://bssproxy01.neotel.nr/abmf-prepaid/api/send/bulk/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerType, msg: text }),
      });
      const data = await response.json();
      response.ok
        ? toast.success("Bulk SMS sent successfully!")
        : toast.error(`Error: ${data.text || "Unknown error"}`);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "bold", color: "#253A7D", mb: 3 }}
        >
          SMS Campaign
        </Typography>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          centered
          sx={{
            mb: 3,
            "& .MuiTabs-indicator": { backgroundColor: "#253A7D" },
            "& .MuiTab-root": { fontWeight: "bold" },
          }}
        >
          <Tab label="Single SMS" />
          <Tab label="Bulk SMS" />
        </Tabs>

        {/* Single SMS Form */}
        {tab === 0 && (
          <form onSubmit={handleSingleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="MSISDN (Phone Number)"
                  variant="outlined"
                  value={singleMessage.msisdn}
                  onChange={(e) =>
                    setSingleMessage({
                      ...singleMessage,
                      msisdn: e.target.value.replace(/\D/g, "").slice(0, 10),
                    })
                  }
                  helperText="Must be exactly 10 digits."
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message Text"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={singleMessage.text}
                  onChange={(e) =>
                    setSingleMessage({ ...singleMessage, text: e.target.value.slice(0, 160) })
                  }
                  helperText={`${singleMessage.text.length}/160 characters`}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Flash SMS</InputLabel>
                  <Select
                    value={singleMessage.isFlash}
                    onChange={(e) =>
                      setSingleMessage({ ...singleMessage, isFlash: e.target.value })
                    }
                    label="Flash SMS"
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<SendIcon />}
                  sx={{ py: 1, bgcolor: "#253A7D" }}
                  disabled={isButtonDisabled}
                >
                  Send SMS
                </Button>
              </Grid>
            </Grid>
          </form>
        )}

        {/* Bulk SMS Form */}
        {tab === 1 && (
          <form onSubmit={handleBulkSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Customer Type</InputLabel>
                  <Select
                    value={bulkMessage.customerType}
                    onChange={(e) =>
                      setBulkMessage({ ...bulkMessage, customerType: e.target.value })
                    }
                    label="Customer Type"
                  >
                    <MenuItem value="Postpaid">Postpaid</MenuItem>
                    <MenuItem value="Prepaid">Prepaid</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message Text"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={bulkMessage.text}
                  onChange={(e) =>
                    setBulkMessage({ ...bulkMessage, text: e.target.value.slice(0, 160) })
                  }
                  helperText={`${bulkMessage.text.length}/160 characters`}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<SendIcon />}
                  sx={{ py: 1, bgcolor: "#253A7D" }}
                  disabled={isButtonDisabled}
                >
                  Send Bulk SMS
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Paper>
      <ToastContainer position="bottom-left" autoClose={5000} />
    </Container>
  );
}
