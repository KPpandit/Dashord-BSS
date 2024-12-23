import React, { useEffect, useState } from 'react';
import {
  Avatar, Box, Button, Container, CssBaseline, FormControl,
  Grid, InputAdornment, MenuItem, Paper, TextField,
  ThemeProvider, Typography, createTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PackDetails(selectedRecordId) {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [result, setResult] = useState({});
  const [showPaper, setShowPaper] = useState(false);
  const [packId, setPackId] = useState('');
  const [selectedPack, setSelectedPack] = useState({ pack_name: '', rates_offer: '' });

  const record = selectedRecordId.selectedRecordId;
  const id = record.simInventory.msisdn;

  // Formik Configuration
  const formik = useFormik({
    initialValues: {
      msisdn: id,
      partner_msisdn: 0,
    },
    onSubmit: async (values) => {
      try {
        await axios.post(
          'https://bssproxy01.neotel.nr/abmf-prepaid/api/pack/allocation/prepaid/customer',
          {
            msisdn: values.msisdn,
            pack_id: packId,
            partner_msisdn: 0
          },
          {
            headers: {
              "Authorization": "Bearer +00f35991-0de0-4f5c-a432-b5d20a7ce240",
              "Accept": "application/json",
              "Content-Type": "application/json"
            }
          }
        );
        toast.success('Pack Updated Successfully!', { autoClose: 2000 });
        setTimeout(() => navigate('/packpayment', {
          state: {
            record,
            formValues: values,
            pack_id: packId,
            pack_name: selectedPack.pack_name,
            rates_offer: selectedPack.rates_offer
          }
        }), 1000);
      } catch (error) {
        toast.error('Something went wrong!');
        console.error(error);
      }
    }
  });

  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const response = await fetch("https://bssproxy01.neotel.nr/abmf-rating/api/rating/profile/get/all/prepaid");
        const data = await response.json();
        const formattedData = data.map(item => ({
          pack_name: item.pack_name,
          rating_profile_id: item.rating_profile_id,
          rates_offer: item.rates_offer
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching packs:', error);
      }
    };

    const fetchAvailableBalance = async () => {
      try {
        const response = await fetch(`https://bssproxy01.neotel.nr/abmf-prepaid-s/api/prepaid/customer/get/available/with/offered/balance?imsi=&msisdn=${id}`);
        const result = await response.json();
        setResult(result);
        formik.setValues({
          msisdn: record.simInventory.msisdn,
          imsi: record.simInventory.imsi,
          customer_id: record.id,
        });
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchPacks();
    fetchAvailableBalance();
  }, [id, record]);

  const togglePaper = () => setShowPaper(!showPaper);

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer position="bottom-left" />
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column' }}>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <Grid container spacing={2}>
              {/* MSISDN and IMSI */}
              <Grid item xs={4}>
                <TextField
                  label="MSISDN" fullWidth disabled value={formik.values.msisdn}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="IMSI" fullWidth disabled value={formik.values.imsi}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              {/* Customer Data */}
              <Grid item xs={4}>
                <TextField
                  label="Customer Id" fullWidth disabled value={formik.values.customer_id}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField label="Pack Name" fullWidth disabled value={result.pack_name || ''} InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Data Available"
                  fullWidth
                  disabled
                  value={result.total_data_available ? Math.floor(result.total_data_available / (1024 * 1024 * 1024)) + ' GB' : ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Data Offered"
                  fullWidth
                  disabled
                  value={result.offered_data ? Math.floor(result.offered_data / (1024 * 1024 * 1024)) + ' GB' : ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Voice ON NET Available"
                  fullWidth
                  disabled
                  value={result.total_onn_calls_available ? Math.floor(result.total_onn_calls_available / 60) + ' min' : ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Voice Off NET Available"
                  fullWidth
                  disabled
                  value={result.total_ofn_calls_available ? Math.floor(result.total_ofn_calls_available / 60) + ' min' : ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Voice ON NET Offered"
                  fullWidth
                  disabled
                  value={result.offered_onn_calls ? Math.floor(result.offered_onn_calls / 60) + ' min' : ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Voice OFF NET Offered"
                  fullWidth
                  disabled
                  value={result.offered_ofn_calls ? Math.floor(result.offered_ofn_calls / 60) + ' min' : ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>


              <Grid item xs={4}>
                <TextField label="SMS ON NET Available" fullWidth disabled value={result.total_onn_sms_available || ''} InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={4}>
                <TextField label="SMS OFF NET Available" fullWidth disabled value={result.total_ofn_sms_available || ''} InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={4}>
                <TextField label="SMS ON NET Offered" fullWidth disabled value={result.offered_onn_sms || ''} InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={4}>
                <TextField label="SMS OFF NET Offered" fullWidth disabled value={result.offered_ofn_sms || ''} InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={4}>
                <TextField label="Validity" fullWidth disabled value={result.pack_valid_for || ''} InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={4}>
                <TextField label="Expiration Date" fullWidth disabled value={result.expiration_date || ''} InputLabelProps={{ shrink: true }} />
              </Grid>
            </Grid>

            {/* Change Pack Section */}
            {/* <Box sx={{ marginTop: 2 }}>
              <Box sx={{ backgroundColor: '#253A7D' }}>
                <Button onClick={togglePaper}>
                  <Typography variant="body1" sx={{ marginRight: 1, color: 'white' }}>Change Pack</Typography>
                  {showPaper ? <RemoveIcon sx={{ color: 'white' }} /> : <AddIcon sx={{ color: 'white' }} />}
                </Button>
              </Box>

              {showPaper && (
                <Paper sx={{ padding: 2, marginTop: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <TextField
                          select label="Select Pack" required value={packId}
                          onChange={(event) => {
                            const selected = data.find(pack => pack.rating_profile_id === event.target.value);
                            setPackId(event.target.value);
                            setSelectedPack({
                              pack_name: selected.pack_name,
                              rates_offer: selected.rates_offer
                            });
                          }}
                        >
                          {data.map(pack => (
                            <MenuItem key={pack.rating_profile_id} value={pack.rating_profile_id}>
                              {`${pack.pack_name} - ${pack.rates_offer}`}
                            </MenuItem>
                          ))}
                        </TextField>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: 2 }}>
                    <Button
                      style={{ backgroundColor: '#F6B625' }}
                      fullWidth variant="contained"
                      disabled={!packId}
                      onClick={formik.handleSubmit}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Paper>
              )}
            </Box> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
