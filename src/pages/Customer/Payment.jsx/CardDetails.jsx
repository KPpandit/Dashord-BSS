import React, { useState } from 'react';
import { Box, Button, Grid, TextField, MenuItem } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

// Helper functions
const validateCardNumber = (cardNumber) => {
  const cardTypes = {
    Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    MasterCard: /^5[1-5][0-9]{14}$/,
    Amex: /^3[47][0-9]{13}$/,
    Discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
  };

  let cardType = 'Unknown';
  for (const [type, regex] of Object.entries(cardTypes)) {
    if (regex.test(cardNumber)) {
      cardType = type;
      break;
    }
  }

  // Luhn Algorithm for card number validation
  let sum = 0;
  let shouldDouble = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i], 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }

  const isValid = sum % 10 === 0;
  return { isValid, cardType };
};

const getCurrentYear = () => new Date().getFullYear();

export default function CardDetails() {
  const location = useLocation();
  const { paymentResponse1 } = location.state || {};
  const [formValues, setFormValues] = useState({
    EWAY_CARDNAME: '',
    EWAY_CARDNUMBER: '',
    EWAY_CARDEXPIRYMONTH: '',
    EWAY_CARDEXPIRYYEAR: '',
    EWAY_CARDCVN: '',
  });

  const [cardInfo, setCardInfo] = useState({ isValid: false, cardType: 'Unknown' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    if (name === 'EWAY_CARDNUMBER') {
      const { isValid, cardType } = validateCardNumber(value);
      setCardInfo({ isValid, cardType });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(paymentResponse1?.formUrl, {
        EWAY_ACCESSCODE: paymentResponse1?.accessCode,
        EWAY_PAYMENTTYPE: 'Credit Card',
        ...formValues,
      });

      console.log('API response:', response.data);
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };

  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const years = Array.from({ length: 10 }, (_, i) => (getCurrentYear() + i).toString());

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
          <small style={{ color: cardInfo.isValid ? 'green' : 'red' }}>
            {cardInfo.isValid
              ? `${cardInfo.cardType} - Valid Card Number`
              : `${cardInfo.cardType} - Invalid Card Number`}
          </small>
        </Grid>
        <Grid item xs={6}>
          <label className="text-uppercase fw-bold" style={{ fontSize: '12px' }}>Expiry Month</label>
          <TextField
            select
            fullWidth
            name="EWAY_CARDEXPIRYMONTH"
            value={formValues.EWAY_CARDEXPIRYMONTH}
            onChange={handleChange}
            required
          >
            {months.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <label className="text-uppercase fw-bold" style={{ fontSize: '12px' }}>Expiry Year</label>
          <TextField
            select
            fullWidth
            name="EWAY_CARDEXPIRYYEAR"
            value={formValues.EWAY_CARDEXPIRYYEAR}
            onChange={handleChange}
            required
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <label className="text-uppercase fw-bold" style={{ fontSize: '12px' }}>CVV</label>
          <TextField
            fullWidth
            name="EWAY_CARDCVN"
            value={formValues.EWAY_CARDCVN}
            onChange={handleChange}
            type="password"
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
            !cardInfo.isValid ||
            !formValues.EWAY_CARDEXPIRYMONTH ||
            !formValues.EWAY_CARDEXPIRYYEAR ||
            formValues.EWAY_CARDCVN.length !== 3
          }
        >
          Pay
        </Button>
      </Box>
    </Box>
  );
}
