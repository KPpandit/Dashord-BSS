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
        const response = await fetch(`https://bssproxy01.neotel.nr/abmf-prepaid/api/prepaid/customer/get/available/with/offered/balance?imsi=&msisdn=${id}`);
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
  const formatValue = (value, divisor, suffix, unlimitedCheck = 999999999999) =>
    value === unlimitedCheck ? 'Unlimited' : value ? Math.floor(value / divisor) + suffix : '';
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer position="bottom-left" />
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column' }}>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <Grid container spacing={2}>
              {[
                { label: 'MSISDN', value: formik.values.msisdn },
                { label: 'IMSI', value: formik.values.imsi },
                { label: 'Customer Id', value: formik.values.customer_id },
                { label: 'Pack Name', value: result.pack_name },
                { label: 'Data Available', value: formatValue(result.total_data_available, 1024 ** 3, ' GB') },
                { label: 'Data Offered', value: formatValue(result.offered_data, 1024 ** 3, ' GB') },
                { label: 'Voice ON NET Available', value: formatValue(result.total_onn_calls_available, 60, ' min') },
                { label: 'Voice Off NET Available', value: formatValue(result.total_ofn_calls_available, 60, ' min') },
                { label: 'Voice ON NET Offered', value: formatValue(result.offered_onn_calls, 60, ' min') },
                { label: 'Voice OFF NET Offered', value: formatValue(result.offered_ofn_calls, 60, ' min') },
                { label: 'SMS ON NET Available', value: result.total_onn_sms_available },
                { label: 'SMS OFF NET Available', value: result.total_ofn_sms_available },
                { label: 'SMS ON NET Offered', value: result.offered_onn_sms },
                { label: 'SMS OFF NET Offered', value: result.offered_ofn_sms },
                { label: 'Validity', value: result.pack_valid_for },
                { label: 'Expiration Date', value: result.expiration_date }
              ].map(({ label, value }, index) => (
                <Grid item xs={4} key={index}>
                  <TextField label={label} fullWidth disabled value={value || ''} InputLabelProps={{ shrink: true }} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
