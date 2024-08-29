import React, { useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function CardDetails() {
  const location = useLocation();
  const { paymentResponse1, record } = location.state || {};
  const [formValues, setFormValues] = useState({
    EWAY_CARDNAME: "",
    EWAY_CARDNUMBER: "",
    EWAY_CARDEXPIRYMONTH: "",
    EWAY_CARDEXPIRYYEAR: "",
    EWAY_CARDCVN: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(paymentResponse1?.formUrl, {
        EWAY_ACCESSCODE: paymentResponse1?.accessCode,
        EWAY_PAYMENTTYPE: 'Credit Card',
        ...formValues
      });

      console.log('API response:', response.data);

      // Extract the callback URL from the response
      const callbackUrl = response.data.url || `http://182.74.113.61/eway/payment-callback.php?AccessCode=${paymentResponse1?.accessCode}`;
      console.log('Callback URL:', callbackUrl);

      // Validate the callback URL
      if (!callbackUrl) {
        throw new Error('Callback URL is missing in the API response');
      }

      // Make a request to the callback URL to fetch the final response
      const callbackResponse = await axios.get(callbackUrl);
      console.log('Callback Response:', callbackResponse.data);

      // Log other response details
      console.log('Invoice Number:', callbackResponse.data.InvoiceNumber);
      console.log('Total Amount:', callbackResponse.data.TotalAmount);
      console.log('Transaction Status:', callbackResponse.data.TransactionStatus);
      console.log('Authorization Code:', callbackResponse.data.authorisationcode);
      console.log('HTTP Status Code:', callbackResponse.data.httpstatus_code);
      console.log('Response Code:', callbackResponse.data.responsecode);
      console.log('Response Message:', callbackResponse.data.responsemessage);
      console.log('Status:', callbackResponse.data.status);
      console.log('Timestamp:', callbackResponse.data.timestamp);
      console.log('Transaction ID:', callbackResponse.data.transactionID);

    } catch (error) {
      console.error('Error during API call:', error);
      if (error.response) {
        // The request was made and the server responded with a status code outside of the range of 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request data:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
    }
  };

  return (
    <Box component="form" method="POST" action={paymentResponse1?.formUrl} id="payment_form">
      <input type="hidden" name="EWAY_ACCESSCODE" value={paymentResponse1?.accessCode} />
      <input type="hidden" name="EWAY_PAYMENTTYPE" value="Credit Card" />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <label className="text-uppercase fw-bold" style={{ fontSize: '12px' }}>Card Holder Name</label>
          <TextField
            fullWidth
            name="EWAY_CARDNAME"
            value={formValues.EWAY_CARDNAME}
            onChange={handleChange}
            placeholder="Enter Card Holder Name"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <label className="text-uppercase fw-bold" style={{ fontSize: '12px' }}>Card Number</label>
          <TextField
            fullWidth
            name="EWAY_CARDNUMBER"
            value={formValues.EWAY_CARDNUMBER}
            onChange={handleChange}
            type="tel"
            inputProps={{ maxLength: 16 }}
            placeholder="Valid Card Number"
            required
          />
        </Grid>
        <Grid item xs={4}>
          <label className="text-uppercase fw-bold" style={{ fontSize: '12px' }}>Expiry Month</label>
          <TextField
            fullWidth
            name="EWAY_CARDEXPIRYMONTH"
            value={formValues.EWAY_CARDEXPIRYMONTH}
            onChange={handleChange}
            inputProps={{ maxLength: 2 }}
            placeholder="Month"
            required
          />
        </Grid>
        <Grid item xs={4}>
          <label className="text-uppercase fw-bold" style={{ fontSize: '12px' }}>Expiry Year</label>
          <TextField
            fullWidth
            name="EWAY_CARDEXPIRYYEAR"
            value={formValues.EWAY_CARDEXPIRYYEAR}
            onChange={handleChange}
            inputProps={{ maxLength: 2 }}
            placeholder="Year"
            required
          />
        </Grid>
        <Grid item xs={4}>
          <label className="text-uppercase fw-bold" style={{ fontSize: '12px' }}>CVV</label>
          <TextField
            fullWidth
            name="EWAY_CARDCVN"
            value={formValues.EWAY_CARDCVN}
            onChange={handleChange}
            inputProps={{ maxLength: 3 }}
            placeholder="CVV"
            required
          />
        </Grid>
      </Grid>

      <hr />

      <Box mt={2}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={
            !formValues.EWAY_CARDNAME ||
            formValues.EWAY_CARDNUMBER.length !== 16 ||
            formValues.EWAY_CARDEXPIRYMONTH.length !== 2 ||
            formValues.EWAY_CARDEXPIRYYEAR.length !== 2 ||
            formValues.EWAY_CARDCVN.length !== 3 ||
            parseInt(formValues.EWAY_CARDEXPIRYMONTH) > 12
          }
        >
          Pay
        </Button>
      </Box>
    </Box>
  );
}
