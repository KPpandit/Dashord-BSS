import { Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography, createTheme } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import axios from 'axios'; // Import axios if not already imported
import { useNavigate } from 'react-router-dom';

export default function AddAccountType() {
  const [result, setResult] = useState([]);
  const navigate = useNavigate();

  const { handleChange, handleSubmit, handleBlur, values } = useFormik({
    initialValues: {
      
      invoiceDesign: "",
      creditLimit: "",
      
     
      creditNotificationLimit1: "",
      creditNotificationLimit2: "",
     
      nextInvoiceDayOfPeriod: "",
      notificationAitId: ""

    },
    onSubmit: async (values) => {
      console.log(values);
      setResult(values);
      // Your form submission logic here using axios
      try {
        const res = await axios.post('http://172.5.10.2:9090/api/saveaccount/currency/2/entity/1/language/2/orderperiod/1/invoicedelevery/2', { ...values }, {
          headers: {
            "Authorization": "Bearer +00f35991-0de0-4f5c-a432-b5d20a7ce240",
            "Accept": "application/json",
            "Content-Type": "application/json"
          }
        });
        if (res.status === 200) {
          // Handle success scenario here
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle error scenario here
      }
    }
  });

  const back = () => {
    navigate("/accounttype")
  }
  return (
    <Box sx={{
      marginTop: 5,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingLeft: 2
    }}>
      <form onSubmit={handleSubmit}>
        <Paper elevation={10} >
          <Grid container spacing={2} textAlign='center' sx={{ maxWidth: '80vw', marginLeft: 2, paddingRight: 5 }}>
            <Grid item lg={12}>
              <Typography variant='h4' paddingBottom={2} color={'grey'} sx={{ textAlign: 'center', width: '100%' }}>CREATE A NEW ACCOUNT TYPE</Typography>
              <Divider />
            </Grid>

            <Grid item lg={6}>
              <TextField
                label='Name'
                // name='name'
                // value={values.name}
                // onChange={handleChange}
                // onBlur={handleBlur}
                fullWidth
              />
            </Grid>
            <Grid item lg={6}>
              <Grid container spacing={3}>
                <Grid item >
                  <TextField
                    label='Billing Cycle'
                    // name='biling_cycle'
                    // value={values.biling_cycle}
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <FormControl fullWidth style={{ minWidth: 330 }}>
                    <InputLabel id="demo-simple-select-label">Billing Period</InputLabel>
                    <Select
                      fullWidth
                      // value={values.period}
                      label="Billing Period"
                      // onChange={handleChange}
                      // onBlur={handleBlur}
                      // name="period"
                    >
                      <MenuItem value={'Monthly'}>Monthly</MenuItem>
                      <MenuItem value={'Daily'}>Daily</MenuItem>


                    </Select>
                  </FormControl>
                </Grid>

              </Grid>

            </Grid>
            <Grid item lg={6}>
              <TextField
                label='Invoice Design'
                fullWidth
                value={values.invoiceDesign}
                required
                onChange={handleChange}
                onBlur={handleBlur}
                name="invoiceDesign"
                type='text'
              />
            </Grid>
            <Grid item lg={6}>
              <TextField
                label='Credit Limit'
                fullWidth
                required
                value={values.creditLimit}
                onChange={handleChange}
                onBlur={handleBlur}
                name="creditLimit"
                type='number'
              />
            </Grid>
            <Grid item lg={6}>
              <TextField
                label='Credit Limit Notification 1'
                fullWidth
                required
                value={values.creditNotificationLimit1}
                onChange={handleChange}
                onBlur={handleBlur}
                name="creditNotificationLimit1"
                type='number'
              />
            </Grid>
            <Grid item lg={6}>
              <TextField
                label='Credit Limit Notification 2'
                fullWidth
                required
                value={values.creditNotificationLimit2}
                onChange={handleChange}
                onBlur={handleBlur}
                name="creditNotificationLimit2"
                type='number'
              />
            </Grid>
            <Grid item lg={6}>
              <TextField
                label='nextInvoiceDayOfPeriod'
                fullWidth
                required
                value={values.nextInvoiceDayOfPeriod}
                onChange={handleChange}
                onBlur={handleBlur}
                name="nextInvoiceDayOfPeriod"
                type='number'
              />
            </Grid>
            <Grid item lg={6}>
              <TextField
                label='notificationAitId'
                fullWidth
                required
                value={values.notificationAitId}
                onChange={handleChange}
                onBlur={handleBlur}
                name="notificationAitId"
                type='number'
              />
            </Grid>
            <Grid item lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={values.rates_id}
                  label="Rates Active"
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  // name="is_rates_active"
                >
                  <MenuItem value={'United State Dollar'}>United State Dollar</MenuItem>
                  <MenuItem value={'Wset African CFA'}>Wset African CFA</MenuItem>


                </Select>
              </FormControl>
            </Grid>

            <Grid item lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Language</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={values.is_rates_active}
                  label="Rates Active"
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  // name="is_rates_active"
                >
                  <MenuItem value={'English'}>English</MenuItem>
                  <MenuItem value={'Portuguese'}>Portuguese</MenuItem>
                  <MenuItem value={'Deutsch'}>Deutsch</MenuItem>
                  <MenuItem value={'French'}>French</MenuItem>
                  <MenuItem value={'Hindi'}>Hindi</MenuItem>
                  <MenuItem value={'Chinese'}>Chinese</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Payment Method Types</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={values.payment_method}
                  label="Payment Method Type"
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  // name="payment_method"
                >
                  <MenuItem value={'Cheque'}>Cheque</MenuItem>
                  <MenuItem value={'ACH'}>ACH</MenuItem>
                  <MenuItem value={'Credit Card'}>Credit Card</MenuItem>

                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} textAlign='center'>

              <Grid container spacing={3} justifyContent="center" paddingBottom={2}>
                <Grid item sx={6}>
                  <Button
                    type="submit"
                    style={{ backgroundColor: '#00B5FF', color: 'white', marginTop: '16px', paddingRight: 5 }}

                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item sx={6}>
                  <Button
                    type="submit"
                    style={{ backgroundColor: '#00B5FF', color: 'white', marginTop: '16px', marginLeft: 5 }}
                    onClick={back}
                  >
                    Cancle
                  </Button>
                </Grid>
              </Grid>



            </Grid>
          </Grid>
        </Paper>
      </form>
    </Box>
  );
}
