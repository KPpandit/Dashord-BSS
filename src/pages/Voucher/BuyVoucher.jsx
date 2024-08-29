import {
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
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
        console.log(values);
        const res = await axios.post(
          'http://172.5.10.2:8082/voucher/1.0/voucher/batch/payment',
          { ...values },
          {
            headers: {
              Authorization: 'Bearer +00f35991-0de0-4f5c-a432-b5d20a7ce240',
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        ).then((res) => {
          if (res.status === 201) {
            setNotify({
              isOpen: true,
              message: 'Payment Done',
              type: 'success',
            });
            setTimeout(() => {
              navigate('/specialOffers');
            }, 1000);
          }
        }).catch((err) => {
          if (err.response.data.status_code === 409) {
            setNotify({
              isOpen: true,
              message: 'This Rate Plan already exists',
              type: 'info',
            });
            setTimeout(() => {
              navigate('/');
            }, 5000);
          } else if (err.response.data.status_code === 500) {
            setNotify({
              isOpen: true,
              message: 'Something went wrong',
              type: 'error',
            });
            setTimeout(() => {
              navigate('/');
            }, 2000);
          }
        });
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
                    name="paymentMode"
                    value={values.paymentMode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
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
                  <Button type="submit" fullWidth variant="contained" color="primary">
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
  