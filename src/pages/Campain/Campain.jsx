import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Campaign() {
  // State for form inputs
  const [msisdn, setMsisdn] = useState("");
  const [from, setFrom] = useState("121");
  const [text, setText] = useState("");
  const [configId, setConfigId] = useState("1");
  const [isFlash, setIsFlash] = useState(true);
  const [locale, setLocale] = useState("en");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (msisdn.length !== 10) {
      toast.error("MSISDN must be exactly 10 digits.");
      return;
    }

    if (text.length > 160) {
      toast.error("Message cannot exceed 160 characters.");
      return;
    }

    if (!from || !text) {
      toast.error("Please fill all required fields.");
      return;
    }

    // Construct API URL
    const apiUrl = `https://bssproxy01.neotel.nr/sms/smpp/api/send-sms?msisdn=${msisdn}&from=${from}&text=${encodeURIComponent(
      text
    )}&configId=${configId}&isFlash=${isFlash}&locale=${locale}`;

    try {
      // Call the API
      const response = await fetch(apiUrl, { method: "GET" });
      const data = await response.json();

      if (response.ok) {
        toast.success("SMS sent successfully!");
      } else {
        toast.error(`Failed to send SMS: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold", color: "#253A7D" }}
        >
          Send SMS Campaign
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* MSISDN Input */}
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="MSISDN (Phone Number)"
                variant="outlined"
                value={msisdn}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                  if (value.length <= 10) setMsisdn(value); // Restrict to 10 digits
                }}
                helperText="Must be exactly 10 digits."
                required
              />
            </Grid>

            {/* From Input */}
            {/* <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="From (Sender ID)"
                variant="outlined"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                required
              />
            </Grid> */}

            {/* Message Input */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message Text"
                variant="outlined"
                multiline
                rows={4}
                value={text}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 160) setText(value); // Restrict to 160 characters
                }}
                helperText={`${text.length}/160 characters`}
                required
              />
            </Grid>

            {/* Config ID Input */}
            {/* <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Config ID"
                variant="outlined"
                value={configId}
                onChange={(e) => setConfigId(e.target.value)}
                required
              />
            </Grid> */}

            {/* Flash SMS Toggle */}
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Flash SMS</InputLabel>
                <Select
                  value={isFlash}
                  onChange={(e) => setIsFlash(e.target.value)}
                  label="Flash SMS"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Locale Input */}
            {/* <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Locale"
                variant="outlined"
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                required
              />
            </Grid> */}

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SendIcon />}
                fullWidth
                sx={{ py: 1,bgcolor:"#253A7D"
                 }}
              >
                Send SMS
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* ToastContainer for notifications */}
      {/* <ToastContainer position="top-right" autoClose={5000} /> */}
      <ToastContainer position="bottom-left" autoClose={5000}/>
    </Container>
  );
}
