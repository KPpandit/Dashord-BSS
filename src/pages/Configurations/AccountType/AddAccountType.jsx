import { Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography, createTheme } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios if not already imported
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
export default function AddAccountType() {
  const [result, setResult] = useState([]);
  const navigate = useNavigate();
  const tokenValue = localStorage.getItem('token');
  useEffect(() => {
    axios.get('http://172.5.10.2:9090/api/alllanguage', {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        // Store language options (id and code) in state
        setLanguageOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching language options:', error);
        // Handle error as needed
      });
    // For All Currency
    axios.get('http://172.5.10.2:9090/api/allcurrency', {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        // Store language options (id and code) in state
        setcurrencyOption(response.data);
      })
      .catch(error => {
        console.error('Error fetching language options:', error);
        // Handle error as needed
      });
  }, [])
  const [seleectedCurrenyId, setSelectedCurrencyId] = useState('');
  const [currencyOption, setcurrencyOption] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [selectedLanguageId, setSelectedLanguageId] = useState('');
  const { handleChange, handleSubmit, handleBlur, values, resetForm } = useFormik({
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
        const res = await axios.post('http://172.5.10.2:9090/api/saveaccount/currency/'+seleectedCurrenyId+'/entity/1/language/'+selectedLanguageId+'/orderperiod/1/invoicedelevery/2', { ...values }, {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
          }
        });
        if (res.status === 201) {

          toast.success('Account Added Successfully', { autoClose: 2000 });
          resetForm();
          // Optionally, you can perform additional actions here
          // setTimeout(() => { props.onClose(); }, 100)
        } else {

        }
      } catch (error) {
        toast.error(error.data.message, { autoClose: 2000 });
        // Handle error scenario here
      }
    }
  });

  const back = () => {
    navigate("/accounttype")
  }
  
  const handleChangeLanguage = (event) => {
    setSelectedLanguageId(event.target.value);
  };
  const handleChangeCurrency = (event) => {
    setSelectedCurrencyId(event.target.value);
  };
  return (
    <Box sx={{
      marginTop: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingLeft: 2
    }}>
      <ToastContainer position="bottom-left" />
      <form onSubmit={handleSubmit}>
        <Paper elevation={10} >
          <Grid container spacing={2} textAlign='center' sx={{ maxWidth: '80vw', marginLeft: 2, paddingRight: 5 }}>
            <Grid item lg={12}>
              <Typography  paddingBottom={2} color={'#253A7D'} sx={{ textAlign: 'left', width: '100%',fontSize:'17px' }}>CREATE A NEW ACCOUNT TYPE</Typography>
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
                <Grid item xs={8}>
                  <TextField
                    label='Billing Cycle'
                    // name='biling_cycle'
                    // value={values.biling_cycle}
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth >
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
            <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" required>Currency</InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={seleectedCurrenyId}
                  name='currenyId'
                  onChange={handleChangeCurrency}
                  label="Language "
                >
                  {currencyOption.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.symbol}
                    </MenuItem>
                  ))}
                  {console.log(seleectedCurrenyId + "------selected Currency ID ID")}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={6} md={4} sm={6} xs={12} paddingBottom={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" required>Language</InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedLanguageId}
                  name='selectedLanguageId'
                  onChange={handleChangeLanguage}
                  label="Language "
                >
                  {languageOptions.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.code}
                    </MenuItem>
                  ))}
                  {console.log(selectedLanguageId + " selected language ID")}
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
                    style={{ backgroundColor: '#253A7D', color: 'white', marginTop: '16px', paddingRight: 5 }}

                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item sx={6}>
                  <Button
                    type="submit"
                    style={{ backgroundColor: '#253A7D', color: 'white', marginTop: '16px', marginLeft: 5 }}
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
