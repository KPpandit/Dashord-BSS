import { Avatar, Box, Button, Container, CssBaseline, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useFormik } from 'formik';
import React, { Component, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PlanDetails({ selectedRecordId, onClose }) {
    const [category_name, setCategory_name_list] = useState();
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [result, setResult] = useState([]);
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    // Check if selectedRecordId and its simInventory property are defined
    const record = selectedRecordId && selectedRecordId.simInventory ? selectedRecordId : {};
    const msisdn = record.simInventory ? record.simInventory.msisdn : '';
    const imsi = record.simInventory ? record.simInventory.imsi : '';
    const const_id = record.id || '';
    
    const [showPaper, setShowPaper] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [plan_id, setPlanId] = useState('');
    const [planName, setPlanName] = useState('');
    const [planPrice, setPlanPrice] = useState('');
    const tokenValue1 = localStorage.getItem('token');
    const handlePackChange = (e) => {
        const selectedPlan = e.target.value;
        const selectedPack = data.find(pack => pack.rating_profile_id === selectedPlan);
        
        if (selectedPack) {
            console.log("Selected pack -->", selectedPack);
            setPlanId(selectedPlan);
            setPlanName(selectedPack.plan_name); // Store the selected plan name
            setPlanPrice(selectedPack.plan_price); // Store the selected plan price
        }
    };
    
    const { handleChange, handleSubmit, handleBlur, values, setValues } = useFormik({
        initialValues: {
            msisdn: msisdn,
            imsi: imsi,
            customer_id: const_id,
            plan_id: plan_id,
        },
        onSubmit: async (values) => {
            try {
               
        
                // First API call
                const amountApiResponse = await axios.post(
                    `https://bssproxy01.neotel.nr/crm/api/set/monthly/amount/msisdn/${values.msisdn}/amount/${planPrice}`,
                    { planName },
                    {
                        headers: {
                            Authorization: `Bearer ${tokenValue1}`,
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    }
                );
        
                if (amountApiResponse.status === 200) {
                    // Second API call
                    const packApiResponse = await axios.post(
                        `https://bssproxy01.neotel.nr/abmf-postpaid/api/postpaid/packs/activation?pack_id=${plan_id}&msisdn=${values.msisdn}`,
                        { ...values, plan_id },
                        {
                            headers: {
                                Authorization: "Bearer +00f35991-0de0-4f5c-a432-b5d20a7ce240",
                                Accept: "application/json",
                                "Content-Type": "application/json",
                            },
                        }
                    );
        
                    if (packApiResponse.status === 200) {
                        toast.success("Plan Updated Successfully", { autoClose: 2000 });
                        setTimeout(() => {
                            onClose();
                        }, 1000);
                    } else {
                        toast.error("Failed to activate the plan. Please try again later.", {
                            autoClose: 2000,
                        });
                    }
                } else {
                    toast.error("Failed to update the amount. Please try again later.", {
                        autoClose: 2000,
                    });
                }
            } catch (err) {
                // Detailed error handling for the first API call
                if (err.response) {
                    if (err.response.status === 400) {
                        toast.error(
                            "Cannot Change the Plan rght now",
                            { autoClose: 2000 }
                        );
                    } else if (err.response.status === 401) {
                        toast.error(
                            "Unauthorized request. Please log in again.",
                            { autoClose: 2000 }
                        );
                    } else if (err.response.status === 403) {
                        toast.error(
                            "Forbidden: You do not have permission to perform this action.",
                            { autoClose: 2000 }
                        );
                    } else if (err.response.status === 404) {
                        toast.error(
                            "The requested resource was not found.",
                            { autoClose: 2000 }
                        );
                    } else if (err.response.status === 500) {
                        toast.error(
                            "Server error. Please try again later.",
                            { autoClose: 2000 }
                        );
                    } else {
                        toast.error(
                            `Unexpected error occurred: ${err.response.statusText}`,
                            { autoClose: 2000 }
                        );
                    }
                } else if (err.request) {
                    toast.error(
                        "No response received from the server. Please check your network connection.",
                        { autoClose: 2000 }
                    );
                } else {
                    toast.error(
                        `An error occurred while making the request: ${err.message}`,
                        { autoClose: 2000 }
                    );
                }
            }
        },
        
        
    });
    

    const togglePaper = () => {
        setShowPaper(!showPaper);
    };

   

    useEffect(() => {
        fetch("https://bssproxy01.neotel.nr/abmf-postpaid/api/postpaid/packs?pack_status=Approved")
            .then((resp) => resp.json())
            .then((resp) => {
                const formattedData = resp.map((item) => ({
                    plan_name: item.plan_name, // Updated key
                    rating_profile_id: item.plan_id,
                    plan_price: item.plan_price, // Add plan_price to the formatted data
                }));
                setData(formattedData);
            })
            .catch((e) => {
                console.log(e.message);
            });
        getApi();
    }, []);

    const getApi = async (event) => {
        try {
            const response = await fetch(`https://bssproxy01.neotel.nr/abmf-postpaid/api/postpaid/customer/get/available/with/offered/balance?imsi=&msisdn=${msisdn}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setResult(data);
            setValues({
                ...values,
                msisdn: record.simInventory.msisdn,
                imsi: record.simInventory.imsi,
                partner_msisdn: record.partner_msisdn,
            });
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const defaultTheme = createTheme();

    return (
        <ThemeProvider theme={defaultTheme}>
        <ToastContainer position="bottom-left" />
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column' }}>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={1}>
                        {[
                            { label: "MSISDN", name: "msisdn", value: values.msisdn, disabled: true },
                            { label: "IMSI", name: "imsi", value: values.imsi, disabled: true },
                            { label: "Pack name", name: "name", value: result.plan_name, disabled: true },
                            { label: "Data Available", value: result.total_data_available ? `${Math.floor(result.total_data_available / (1024 * 1024 * 1024))} GB` : '', disabled: true },
                            { label: "Data Offered", value: result.offered_data ? `${Math.floor(result.offered_data / (1024 * 1024 * 1024))} GB` : '', disabled: true },
                            { label: "Voice ON NET Available", value: result.total_onn_calls_available === 99999 ? 'Unlimited' : result.total_onn_calls_available ? `${Math.floor(result.total_onn_calls_available / 60)} min` : '', disabled: true },
                            { label: "Voice Off NET Available", value: result.total_ofn_calls_available === 99999 ? 'Unlimited' : result.total_ofn_calls_available ? `${Math.floor(result.total_ofn_calls_available / 60)} min` : '', disabled: true },
                            { label: "Voice ON NET Offered", value: result.offered_onn_calls === 99999 ? 'Unlimited' : result.offered_onn_calls ? `${Math.floor(result.offered_onn_calls / 60)} min` : '', disabled: true },
                            { label: "Voice OFF NET Offered", value: result.offered_ofn_calls === 99999 ? 'Unlimited' : result.offered_ofn_calls ? `${Math.floor(result.offered_ofn_calls / 60)} min` : '', disabled: true },
                            { label: "SMS ON NET Available", value: result.total_onn_sms_available === 99999 ? 'Unlimited' : result.total_onn_sms_available || '', disabled: true },
                            { label: "SMS OFF NET Available", value: result.total_ofn_sms_available === 99999 ? 'Unlimited' : result.total_ofn_sms_available || '', disabled: true },
                            { label: "SMS ON NET Offered", value: result.offered_onn_sms === 99999 ? 'Unlimited' : result.offered_onn_sms || '', disabled: true },
                            { label: "SMS OFF NET Offered", value: result.offered_ofn_sms === 99999 ? 'Unlimited' : result.offered_ofn_sms || '', disabled: true },
                        ].map(({ label, name, value, disabled }, idx) => (
                            <Grid item xs={4} key={idx}>
                                <TextField
                                    label={label}
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <Box>
                                <Box sx={{ backgroundColor: '#253A7D' }}>
                                    <Button onClick={togglePaper}>
                                        <Typography variant="body1" sx={{ marginRight: 1, color: 'white' }}>Change Plan</Typography>
                                        {showPaper ? <RemoveIcon sx={{ color: 'white' }} /> : <AddIcon sx={{ color: 'white' }} />}
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
                                                        value={plan_id}
                                                        onChange={handlePackChange}
                                                    >
                                                        {data.map(pack => (
                                                            <MenuItem key={pack.rating_profile_id} value={pack.rating_profile_id}>
                                                                {pack.plan_name} 
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                style={{ backgroundColor: '#F6B625' }}
                                                type="button"
                                                fullWidth
                                                variant="contained"
                                                disabled={!plan_id}
                                                onClick={handleSubmit}
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
                </Box>
            </Box>
        </Container>
    </ThemeProvider>
    
    );
}
