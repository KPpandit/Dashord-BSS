import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import axios from 'axios';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from 'react-router-dom';

export default function BillingProcess() {
    const [showCheckbox, setShowCheckbox] = useState(false);
    const navigate = useNavigate();

    const { handleChange, handleSubmit, handleBlur, values } = useFormik({
        initialValues: {
            next_run_date: "",
            revire_report: "",
            days_review_report: "",
            billing_period: "",
            lastdayofMonth: "",
            dueDate: "",
            Language: "",
            credit_notification_limit1: "",
            credit_notification_limit2: "",
            invoice_delevery_method: "",
            payment_method: "",
            useParentPricing: "",
        },
        onSubmit: async (values) => {
            console.log(values);
            // Your form submission logic here using axios
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

    const back = () => {
        navigate("/accounttype")
    };

    const handleChangeforDropdown = (event) => {
        const selectedValue = event.target.value;
        setShowCheckbox(selectedValue === 'month');
        handleChange(event);
    };

    return (
        <Box sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={1} padding={2} textAlign='center' justifyContent="center" sx={{ marginX: 'auto', maxWidth: '80vw' }}>
                    
                    <Paper elevation={5} container >
                    <Grid item lg={12} paddingBottom={1} sx={{backgroundColor:'#1976D2',height:30}}>
                        <Typography variant='h6'  color={'grey'} sx={{ textAlign: 'left', width: '100%' ,color:'white', paddingLeft:2}}>BILLING PROCESS</Typography>
                       
                    </Grid>
                   
                        <Grid item lg={12} md={12} sm={12} paddingTop={2}>
                            <InputLabel id="demo-simple-select-label">
                                Next Run Date
                            </InputLabel>

                            <TextField
                                sx={{ width: 420 }}
                                type='date'
                                name="next_run_date"
                                value={values.next_run_date}
                                onChange={handleChange}
                            />
                            <Grid container>
                                <Grid item lg={12} md={12} sm={12}>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="Generate Review Report"
                                        sx={{ marginBottom: 1 }}
                                        name="revire_report"
                                        value={values.revire_report}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} >
                            <TextField
                                sx={{ width: 420 }}
                                label="Days to Review Report"
                            />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} paddingTop={1}>
                            <FormControl sx={{ width: 420 }}>
                                <InputLabel id="demo-simple-select-label">Billing Period</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={values.useParentPricing}
                                    label="Billing Period"
                                    onChange={(e) => {
                                        handleChangeforDropdown(e);
                                    }}
                                    onBlur={handleBlur}
                                    name="useParentPricing"
                                >
                                    <MenuItem value={'month'}>Month</MenuItem>
                                    <MenuItem value={'week'}>Week</MenuItem>
                                    <MenuItem value={'day'}>Day</MenuItem>
                                    <MenuItem value={'year'}>Year</MenuItem>
                                    <MenuItem value={'semi-month'}>Semi-Month</MenuItem>
                                </Select>
                            </FormControl>
                            <Grid container justifyContent="center">
                                <Grid item >
                                    {showCheckbox && (
                                        <FormControl sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, marginBottom: 2 }}>
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label="Last Day Of Month"
                                                name="days_review_report"
                                                value={values.days_review_report}
                                                onChange={handleChange}
                                            />
                                        </FormControl>
                                    )}
                                </Grid>

                            </Grid>


                        </Grid>
                        <Grid item lg={12} md={12} sm={12} marginTop={2}>
                            <FormControl>

                                <TextField
                                    label="Due Date"
                                    value={values.dueDate} // Use values.dueDate
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    name='dueDate'
                                    type='number'
                                    sx={{ width: 420 }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" sx={{ marginLeft: '-20px' }}>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={values.billing_period}
                                                    onChange={handleChangeforDropdown}
                                                    onBlur={handleBlur}
                                                    name="billing_period"
                                                >
                                                    <MenuItem value={'Month'}>Month</MenuItem>
                                                    <MenuItem value={'Week'}>Week</MenuItem>
                                                    <MenuItem value={'Day'}>Day</MenuItem>
                                                    <MenuItem value={'Year'}>Year</MenuItem>
                                                    <MenuItem value={'Semi Monthly'}>Semi Monthly</MenuItem>
                                                </Select>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} textAlign="center">
                            <FormControl sx={{ justifyContent: 'center', marginTop: 2, marginBottom: 2 }}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Require Recurring Order"
                                    name="days_review_report"
                                    value={values.days_review_report}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12}>
                            <FormControl sx={{ justifyContent: 'center', marginTop: 2, marginBottom: 2 }}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Use Customer Next Invoice Date for Invoice"
                                    name="days_review_report"
                                    value={values.days_review_report}
                                    onChange={handleChange}
                                />
                            </FormControl>

                        </Grid>

                        <Grid item lg={12} md={12} sm={12} >

                            <TextField
                                sx={{ width: 420 }}
                                label="Maximum period order to invoice"
                                type='text'
                                name="lastdayofMonth"
                                value={values.lastdayofMonth}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item lg={12} md={12} sm={12}>
                            <FormControl sx={{ justifyContent: 'center', marginTop: 2, marginBottom: 2 }}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Apply overpayments to Invoices"
                                    name="days_review_report"
                                    value={values.days_review_report}
                                    onChange={handleChange}
                                />
                            </FormControl>

                        </Grid>



                        <Grid item lg={12} md={12} sm={12} sx={{padding:2}}>
                            <Paper elevation={4} sx={{ padding:2 }}>
                                <Grid container justifyContent="center">
                                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Typography>
                                            Pro-Rating Options:
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', paddingBottom: 1 }}>
                                        <Grid container direction="column" alignItems="flex-start">
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label="Always enable prorating (Products and Plans)"
                                                name="proRatingOption1"
                                                checked={values.proRatingOption1}
                                                onChange={handleChange}
                                            />
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label="Never enable prorating"
                                                name="proRatingOption2"
                                                checked={values.proRatingOption2}
                                                onChange={handleChange}
                                            />
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label="Manually enable prorating (Products Only)"
                                                name="proRatingOption2"
                                                checked={values.proRatingOption2}
                                                onChange={handleChange}
                                            />
                                        </Grid>

                                    </Grid>
                                    <Typography sx={{ fontWeight: 'bold', paddingRight: 2 }}>
                                        Note:
                                    </Typography>
                                    <Typography> Prorating only occurs for orders with an order period that is equal to the customer's billing cycle</Typography>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid >

                        </Grid>

                    </Paper>

                    <Grid item xs={12} textAlign='center' sx={{ display: 'flex', flexDirection: 'column', minHeight: '10vh' }}>
                        <Grid container spacing={2} justifyContent="center" sx={{ flex: '1 1 auto' }}>
                            <Grid item xs={4}>
                                <Button
                                    type="submit"
                                    style={{ backgroundColor: '#1976D2', color: 'white', marginTop: '16px' }}
                                >
                                    <SaveAltIcon sx={{ paddingRight: 1 }} />
                                    Submit
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    type="submit"
                                    style={{ backgroundColor: '#1976D2', color: 'white', marginTop: '16px' }}
                                    onClick={back}
                                >
                                    <CancelIcon sx={{ paddingRight: 1 }} />
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    type="submit"
                                    style={{ backgroundColor: '#1976D2', color: 'white', marginTop: '16px' }}
                                >
                                    <DoneIcon sx={{ paddingRight: 1 }} />
                                    Run Billing
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </form>
        </Box>
    );
}
