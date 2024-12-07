import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditRatesOffer(props) {
    const location = useLocation();
    const { state } = location;
    const id = state?.id;

    const [values, setValues] = useState({
        id: id,
        period: '',
        price: '',
        price_type: '',
        description: '',
        is_rates_active: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://172.17.1.11:9696/api/rates/offer/get/' + id)
            .then(res => {
                setValues({
                    id: res.data.id,
                    period: res.data.period,
                    price: res.data.price,
                    price_type: res.data.price_type,
                    description: res.data.description,
                    is_rates_active: res.data.is_rates_active
                });
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation Logic
        const errors = {};
        if (!/^\d{1,4}$/.test(values.price)) {
            errors.price = 'Price must be up to 4 digits.';
        }
        if (!/^\d{1,4}$/.test(values.period)) {
            errors.period = 'Period must be up to 4 digits.';
        }

        if (Object.keys(errors).length > 0) {
            // Display validation errors if any
            Object.values(errors).forEach(err => toast.error(err, { autoClose: 2000 }));
            return;
        }

        await axios.put('http://172.17.1.11:9696/api/rates/offer/edit/' + id, values)
            .then(res => {
                if (res.status === 200) {
                    toast.success('Rates Updated Successfully', { autoClose: 2000 });
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <Box sx={{ display: 'flex-container' }} textAlign={'center'} justifyContent={'center'}>
            <ToastContainer position="bottom-left" />
            <form onSubmit={handleSubmit}>
                <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%', paddingBottom: 4 }}>
                    <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0.8, marginRight: 1 }}>
                        <Grid>
                            <Typography
                                style={{
                                    fontSize: '20px',
                                    paddingLeft: 10,
                                    fontWeight: 'bold',
                                    textAlign: 'left'
                                }}
                            >
                                Edit Rates
                            </Typography>
                        </Grid>
                    </Paper>
                </Box>

                <Paper elevation={15} sx={{ width: 600, padding: 3 }}>
                    <Grid container spacing={3} padding={4}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                                label="Price"
                                type="text"
                                required
                                fullWidth
                                name="price"
                                value={values.price}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d{0,4}$/.test(value)) {
                                        setValues({ ...values, price: value });
                                    }
                                }}
                                error={values.price.length > 4}
                                helperText={values.price.length > 4 ? "Price must be a maximum of 4 digits" : ""}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                                label="Period"
                                type="number"
                                required
                                fullWidth
                                name="period"
                                value={values.period}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value.length <= 4) {
                                        setValues({ ...values, period: value });
                                    }
                                }}
                                error={values.period.length > 4}
                                helperText={values.period.length > 4 ? "Period must be a maximum of 4 digits" : ""}
                            />

                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                                label="Description"
                                type="text"
                                required
                                fullWidth
                                name="description"
                                value={values.description}
                                onChange={e => setValues({ ...values, description: e.target.value })}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                                label="Price Type"
                                type="text"
                                required
                                fullWidth
                                name="price_type"
                                value={values.price_type}
                                onChange={e => setValues({ ...values, price_type: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                </Paper>

                <Grid container alignContent={'center'} textAlign={'center'} justifyContent={'center'}>
                    <Grid padding={3} textAlign={"center"} alignItems={'center'}>
                        <Button
                            type="submit"
                            sx={{ backgroundColor: '#253A7D', boxShadow: 24 }}
                            variant="contained"
                        >
                            Submit
                        </Button>
                        <Button
                            style={{ backgroundColor: '#253A7D', color: 'white', marginLeft: 30 }}
                            onClick={() => navigate(-1)}
                            sx={{ boxShadow: 24, mt: 2, mb: 2, textAlign: { sm: 'center' } }}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}
