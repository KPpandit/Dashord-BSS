import { Avatar, Box, Button, Container, CssBaseline, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useFormik } from 'formik';
import React, { Component, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
export default function PackDetails(selectedRecordId) {

    const location = useLocation();
    const { paymentResponse } = location.state || {};
    // console.log(paymentResponse ," payment response Value")
    const [category_name, setCategory_name_list] = useState();
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [result, setResult] = useState([]);
    const navigate = useNavigate();
    const [data, setdata] = useState([]);
    // console.log(selectedRecordId.selectedRecordId.id,'  id value')
    const [selectedPack, setSelectedPack] = useState({ pack_name: '', rates_offer: '' });

    const record = selectedRecordId.selectedRecordId;
    const id = selectedRecordId.selectedRecordId.simInventory.msisdn;
    const [showPaper, setShowPaper] = useState(false);
    const [pack_id, setpack_id] = useState('');
    const togglePaper = () => {
        setShowPaper(!showPaper);
    };
    const { handleChange, handleSubmit, handleBlur, values, setValues } = useFormik({
        initialValues: {

            msisdn: id,
            
            partner_msisdn: 0,

        },
        onSubmit: async (values) => {
            console.log(selectedRecordId.selectedRecordId,'  additional values');
            
           
            values.msisdn=selectedRecordId.selectedRecordId.simInventory.msisdn;
            setResult(values);
            const res = await axios.post('https://bssproxy01.neotel.nr/abmf-prepaid/api/pack/allocation/prepaid/customer',
                {
                    msisdn: values.msisdn,  // Only send msisdn
                    pack_id: pack_id,        // Add pack_id,
                    partner_msisdn:0
                }, {
                headers: {
                    "Authorization": "Bearer +00f35991-0de0-4f5c-a432-b5d20a7ce240 ",
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }


            }
            ).then(res => {
                // console.log(res.status + "status code ")
                
                    toast.success('Pack Updated  Successfully', { autoClose: 2000 });
                    setTimeout(() => { props.onClose(); }, 1000)
                
                // location.reload();
            }).catch(err => {
                console.log("-----------");
              
                // if (err.response.data.status_code === 500) {
                //     setNotify({
                //         isOpen: true,
                //         message: ' Some Thing is Wrong',
                //         type: 'error'
                //     })
                //     setTimeout(() => { props.onClose(); }, 2000)
                // }
                console.log(err.response.data.status_code + "-------")

            })
           




        }
    })
    useEffect(() => {
        fetch("https://bssproxy01.neotel.nr/abmf-rating/api/rating/profile/get/all/prepaid")
            .then((resp) => resp.json())
            .then((resp) => {
                const formattedData = resp.map((item) => ({
                    pack_name: item.pack_name,
                    rating_profile_id: item.rating_profile_id,
                    rates_offer: item.rates_offer,
                }));
                setdata(formattedData);
            })
            .catch((e) => {
                console.log(e.message);
            });
        getApi();
    }, []);

    const getApi = async (event) => {
        try {
            const response = await fetch(`https://bssproxy01.neotel.nr/abmf-prepaid/api/pack/allocation/assigned/prepaid/customer/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setResult(data);
          
            setValues({
                ...values,
                msisdn: record.simInventory.msisdn,
                imsi: record.simInventory.imsi,
                customer_id: record.id,


            });
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    // console.log(pack_id, '  selected pack value')
    // console.log(values.pack_id + "  customer id in formik")
    const defaultTheme = createTheme();
    return (

        <ThemeProvider theme={defaultTheme}>
              <ToastContainer position="bottom-left" />
            <Container component="main" maxWidth="lg" >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',

                    }}
                >


                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <TextField
                                    // margin="normal"
                                    label="MSISDN"


                                    fullWidth
                                    name="msisdn"
                                    value={values.msisdn}
                                    disabled
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                     disabled
                                    label="IMSI"
                                    type="text"
                                    required
                                    fullWidth
                                    name="imsi"
                                    value={values.imsi}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                     disabled
                                    label="Pack name"
                                    type="text"
                                    required
                                    fullWidth
                                    name="name"
                                    value={result.pack_name}

                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    disabled
                                    label="Activation Date"
                                    type="text"
                                    required
                                    fullWidth
                                    name="name"
                                    value={result.activation_date}
                                    
                                    InputLabelProps={{
                                        shrink: true,
                                    }}

                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                   disabled
                                    label="Expiration Date"
                                    type="text"
                                    required
                                    fullWidth
                                    name="name"
                                    value={result.expiration_date}

                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>


                            <Grid item xs={4}>
                                <TextField
                                    disabled
                                    label="Customer Id"
                                    type="text"
                                    required
                                    fullWidth
                                    name="customer_id"
                                    value={values.customer_id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    disabled
                                    label="Data Offered"
                                    type="text"
                                    required
                                    fullWidth
                                    name="offered_data"
                                    value={result.offered_data}

                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    disabled
                                    label="Data Used"
                                    type="text"
                                    required
                                    fullWidth
                                    name="used_data"
                                    value={result.used_data}

                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    disabled
                                    label="Calls Offered"
                                    type="text"
                                    required
                                    fullWidth
                                    name="offered_calls"
                                    value={result.offered_calls}

                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    disabled
                                    label="Calls Used"
                                    type="text"
                                    required
                                    fullWidth
                                    name="used_calls"
                                    value={result.used_calls}

                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    disabled
                                    label="SMS Offered"
                                    type="text"
                                    required
                                    fullWidth
                                    name="offered_sms"
                                    value={result.offered_sms}

                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    disabled
                                    label="Used SMS"
                                    type="text"
                                    required
                                    fullWidth
                                    name="used_sms"
                                    value={result.used_sms}

                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box  >

                                    <Box sx={{ backgroundColor: '#253A7D' }}>
                                        <Button onClick={togglePaper}>
                                            <Typography variant="body1" sx={{ marginRight: 1, color: 'white' }}>Change Pack</Typography>
                                            {showPaper ? < RemoveIcon sx={{ color: 'white' }} /> : <AddIcon sx={{ color: 'white' }} />}
                                        </Button>
                                    </Box>
                                    {showPaper && (
                                        <Paper sx={{ padding: 2, marginTop: 2 }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <FormControl fullWidth sx={{ paddingBottom: 1 }}>
                                                        <TextField
                                                            label="Select Pack"
                                                            select
                                                            required
                                                            value={pack_id}
                                                            onChange={(event) => {
                                                                const selectedPack = data.find(pack => pack.rating_profile_id === event.target.value);
                                                                setpack_id(event.target.value);
                                                                setSelectedPack({
                                                                    pack_name: selectedPack.pack_name,
                                                                    rates_offer: selectedPack.rates_offer
                                                                });
                                                            }}
                                                            InputProps={{
                                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                                            }}
                                                        >
                                                            {data.map((pack) => (
                                                                <MenuItem key={pack.rating_profile_id} value={pack.rating_profile_id}>
                                                                    {pack.pack_name} {"     "} {pack.rates_offer}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button
                                                    style={{ backgroundColor: '#F6B625' }}
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    disabled={!pack_id}
                                                    onClick={() => navigate('/packpayment', {
                                                        state: {
                                                            record,
                                                            formValues: values,
                                                            pack_id,
                                                            pack_name: selectedPack.pack_name,
                                                            rates_offer: selectedPack.rates_offer
                                                        }
                                                    })}
                                                    // onClick={handleSubmit}
                                                    sx={{ mt: 1, mb: 2 }}
                                                >
                                                    Submit
                                                </Button>
                                            </Grid>
                                        </Paper>
                                    )}
                                </Box>
                            </Grid>



                        </Grid>










                        <Grid container>
                            <Grid item xs>
                                {/* <Link href="#" variant="body2">
                        Forgot password?
                        </Link> */}
                            </Grid>
                            <Grid item>
                                {/* <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link> */}
                            </Grid>
                        </Grid>
                    </Box>
                   
                </Box>

            </Container>
        </ThemeProvider>



    )
}