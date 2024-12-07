import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  MenuItem,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Notification from '../components/Notification/Notification';

export default function BuyVoucher({ selectedRecordId }) {
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const { handleChange, handleSubmit, handleBlur, values, setFieldValue } = useFormik({
    initialValues: {
      recipientId: '',
      msisdn: '',
      specialOfferId: selectedRecordId.id,
      totalUnits: '',
      totalAmount: '',
      paymentMode: '',
      paymentRefernceId: '',
    },
    onSubmit: async (values) => {
      if (values.paymentMode === 'Online') {
        navigate('/voucherPayment', {
          state: {
            record: selectedRecordId,
            formValues: { ...values, msisdn: values.msisdn }, // Pass msisdn explicitly here
            reciptentId: values.recipientId,
            pack_name: data.find(pack => pack.rating_profile_id === selectedRecordId.id)?.pack_name,
            rates_offer: data.find(pack => pack.rating_profile_id === selectedRecordId.id)?.rates_offer,
          },
        });
        
      } else if (values.paymentMode === 'Cash') {
        const result = {
          invoiceNumber: '12345', // Example value, replace with actual
          total: values.totalAmount,
        };
        try {
          const response = await axios.get(
            `https://bssproxy01.neotel.nr/crm/api/postpaid/bill/payment/invoiceNumber/${result.invoiceNumber}/amount/${result.total}/currency/1/paymentrsult/1/paymentmethod/1?creditCard=2&partner=1`
          );
          if (response.status === 200) {
            setNotify({
              isOpen: true,
              message: 'Cash Payment Successful',
              type: 'success',
            });
          }
        } catch (error) {
          setNotify({
            isOpen: true,
            message: 'Cash Payment Failed',
            type: 'error',
          });
        }
      }
    },
  });

  useEffect(() => {
    fetch('http://172.5.10.2:9696/api/rating/profile/get/all/postpaid')
      .then((resp) => resp.json())
      .then((resp) => {
        const formattedData = resp.map((item) => ({
          pack_name: item.pack_name,
          rating_profile_id: item.rating_profile_id,
        }));
        setData(formattedData);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  useEffect(() => {
    setFieldValue('specialOfferId', selectedRecordId.id);
  }, [selectedRecordId.id, setFieldValue]);

  useEffect(() => {
    const totalAmount = values.totalUnits * selectedRecordId.planPrice;
    setFieldValue('totalAmount', totalAmount);
  }, [values.totalUnits, selectedRecordId.planPrice, setFieldValue]);

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column' }}>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  label="Recipient ID"
                  fullWidth
                  name="recipientId"
                  value={values.recipientId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="MSISDN"
                  fullWidth
                  name="msisdn"
                  value={values.msisdn}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Special Offer ID"
                  fullWidth
                  name="specialOfferId"
                  value={values.specialOfferId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Total Units"
                  fullWidth
                  name="totalUnits"
                  value={values.totalUnits}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Total Amount"
                  fullWidth
                  name="totalAmount"
                  value={values.totalAmount}
                  onChange={handleChange}
                  disabled
                  onBlur={handleBlur}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Payment Mode"
                  fullWidth
                  select
                  name="paymentMode"
                  value={values.paymentMode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  <MenuItem value="Online">Online</MenuItem>
                  <MenuItem value="Cash">Cash</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Payment Reference ID"
                  fullWidth
                  name="paymentRefernceId"
                  value={values.paymentRefernceId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" fullWidth variant="contained" sx={{backgroundColor:'#253A7D'}}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Notification notify={notify} setNotify={setNotify} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
