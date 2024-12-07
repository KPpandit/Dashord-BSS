import { Avatar, Box, Button, Container, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddRatesOffer() {
    const navigate = useNavigate();
    const [result, setResult] = useState([]);

    const { handleChange, handleSubmit, handleBlur, values, errors, touched, resetForm } = useFormik({
        initialValues: {
            rates_id: "",
            price: "",
            price_type: "",
            period: "",
            description: "",
            is_rates_active: true,
        },
        validate: (values) => {
            const errors = {};
            // Price validation: ensure it is a number with at most 4 digits
            if (!/^\d{1,4}$/.test(values.price)) {
                errors.price = 'Price must be up to 4 digits.';
            }
            // Period validation: ensure it is a number with at most 4 digits
            if (!/^\d{1,4}$/.test(values.period)) {
                errors.period = 'Period must be up to 4 digits.';
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://172.17.1.11:9696/api/rates/offer/save',
                    { ...values }, {
                    headers: {
                        "Authorization": "Bearer +00f35991-0de0-4f5c-a432-b5d20a7ce240",
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                });
                if (response.status === 200) {
                    resetForm();
                    toast.success('Rates Added Successfully', { autoClose: 2000 });
                }
            } catch (e) {
                console.log(e);
                toast.error(e.response?.data?.message || 'Error occurred', { autoClose: 2000 });
            }
        }
    });

    return (
        <Box sx={{
            marginTop: -2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <ToastContainer position="bottom-left" />
            <form onSubmit={handleSubmit}>
                <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%', paddingBottom: 2 }}>
                    <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0.8, marginRight: 1 }}>
                        <Grid>
                            <Typography
                                style={{
                                    fontSize: '20px',
                                    paddingLeft: 10,
                                    fontWeight: 'bold',
                                    paddingLeft: 32
                                }}
                            >Add Rates Offer</Typography>
                        </Grid>
                    </Paper>
                </Box>
                <Paper elevation={15} sx={{ padding: 5, width: '550px' }}>
                    <Grid container spacing={5} paddingBottom={2} textAlign={'center'} alignContent={'center'} alignItems={'center'}>
                        <Grid item xs={6}>
                            <TextField
                                label="Price"
                                type="text"
                                required
                                fullWidth
                                name="price"
                                value={values.price}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.price && Boolean(errors.price)}
                                helperText={touched.price && errors.price}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Price Type"
                                type="text"
                                required
                                fullWidth
                                name="price_type"
                                value={values.price_type}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                label="Period"
                                type="text"
                                required
                                fullWidth
                                name="period"
                                value={values.period}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.period && Boolean(errors.period)}
                                helperText={touched.period && errors.period}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                label="Description"
                                type="text"
                                required
                                fullWidth
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Grid>

                        {/* <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Rates Active</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={values.is_rates_active}
                                    label="Rates Active"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="is_rates_active"
                                >
                                    <MenuItem value={true}>Enable</MenuItem>
                                    <MenuItem value={false}>Disable</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid> */}
                    </Grid>
                </Paper>

                <Grid padding={1} sx={{ textAlign: 'center' }}>
                    <Button
                        type="submit"
                        style={{ backgroundColor: '#253A7D', color: 'white' }}
                        sx={{ mt: 2, mb: 2 }}
                    >
                        Submit
                    </Button>
                    <Button
                        style={{ backgroundColor: '#253A7D', color: 'white', marginLeft: 30 }}
                        onClick={() => navigate(-1)}
                        sx={{ mt: 2, mb: 2 }}
                    >
                        Cancel
                    </Button>
                </Grid>
            </form>
        </Box>
    );
}
