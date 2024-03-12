import React, { useState } from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddNewCustomer() {
  const [result, setResult] = useState([]);
  const navigate = useNavigate();

  const { handleChange, handleSubmit, handleBlur, values } = useFormik({
    initialValues: {
      rates_id: "",
      price: "",
      price_type: "",
      period: "",
      description: "",
      is_rates_active: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      setResult(values);

      try {
        const res = await axios.post('http://172.5.10.2:9696/api/rates/offer/save', { ...values }, {
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

  const toAddCustomerDetails = () => {
    navigate("/addCustomerDetails", { state: { accountType: values.is_rates_active } });
  };

  return (
    <Box
      sx={{
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Paper elevation={15} sx={{ margin: -2, paddingTop: 5, width: 500,paddingBottom: 2}}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} textAlign='center'>

            <Grid container display="flex" alignItems="center" justifyContent="center" paddingBottom={5} marginTop={-7}>
              <Paper elevation={10} sx={{ width: 500, paddingRight: 2, marginLeft: 2, marginTop: -3 }}>
                <Typography  color={'#253A7D'} sx={{fontSize:'22px',paddingLeft:2, textAlign: 'left', width: '100%' }}>Select Account Type</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <FormControl sx={{ width: 400 }}>
                <InputLabel id="neotel-label">Neotel</InputLabel>
                <Select
                  labelId="neotel-label"
                  id="neotel-select"
                  value={values.rates_id}
                  label="Neotel"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="rates_id"
                 
                >
                  <MenuItem value={'Neotel'}>Neotel</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl sx={{ width: 400 }}>
                <InputLabel id="account-type-label">Account Type</InputLabel>
                <Select
                  labelId="account-type-label"
                  id="account-type-select"
                  value={values.is_rates_active}
                  label="Rates Active"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="is_rates_active"
                >
                  <MenuItem value={'Pre-Paid'}>Pre Paid</MenuItem>
                  <MenuItem value={'Post-Paid'}>Post Paid</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} textAlign='center'>
              <Button
                type="submit"
                style={{ boxShadow: 20, backgroundColor: '#253A7D', color: 'white', marginTop: '16px' }}
                onClick={toAddCustomerDetails}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
