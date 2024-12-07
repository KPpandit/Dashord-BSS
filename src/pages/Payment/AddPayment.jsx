import { Box, Button, Card, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Snackbar, TextField, Typography } from '@mui/material';
import React, { Component, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useFormik } from 'formik';
import MuiAlert from '@mui/material/Alert';
import axios from "axios";
export default function AddPayment() {
    const location = useLocation();
    const { id, name } = location.state || {};
    const [showPaper, setShowPaper] = useState(false);
    const tokenValue = localStorage.getItem('token');
    const togglePaper = () => {
        setShowPaper(!showPaper);
    };
    const [billingCycle, setBillingCycle] = useState('');
    const [showCreditCardFields, setShowCreditCardFields] = useState(false);

    const handleBillingCycleChange = (event) => {
        const selectedBillingCycle = event.target.value;
        setBillingCycle(selectedBillingCycle);
        setShowCreditCardFields(selectedBillingCycle === 'Credit Card');
    };
    const navigate=useNavigate();
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success', // 'success', 'error', 'warning', 'info'
    });
    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotification({ ...notification, open: false });
    }
    const { handleChange, handleBlur, handleReset, handleSubmit, submitForm: SubmitForm, values } = useFormik({
        initialValues: {
            userId: "",
            attempt: "",
            amount: "",
            deleted: "",
            isRefund: "",
            isPreauth: "",
            payoutId: "",
            balance: "",
            paymentPeriod: "",
            paymentNotes: ""
        },
        onSubmit: async (values) => {
            console.log(values.amount + " amut value")
            // your submission logic for the second formik instance
            console.log("Form 2 submitted:", values);
            const res2 = await axios.post('http://172.17.1.20:9090/api/savepayment/currency/1/paymentrsult/1/paymentmethod/1?creditCard=1',
                { ...values }, {

                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }

            ).then(res => {
                if (res.status === 201) {

                    setNotification({
                        open: true,
                        message: 'Payment Added successfully!',
                        severity: 'success',
                    });
                    handleReset()


                }
            }).catch(e => {
                setNotification({
                    open: true,
                    message: 'Payment failed',
                    severity: 'error',
                });

            })

        },
    });
    return (

        <Box component="form" onSubmit={handleSubmit}>

            <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
                <Paper elevation={10} sx={{ padding: 1, margin: 1, backgroundColor: 'white', color: '#253A7D', marginLeft: -0, marginRight: 0.2 }}>
                    <Grid>
                        <Typography
                            style={{

                                fontSize: '20px',
                                paddingLeft: 15,
                                fontWeight: 'bold',

                            }}
                        >New Payment</Typography>
                    </Grid>
                </Paper>
            </Box>
            <Grid sx={{ paddingTop: 6 }}>

                <Grid>
                    <Paper elevation={20}>

                        <Grid container spacing={5} padding={2}>


                            {/* left side  */}
                            <Grid item xs={6}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} textAlign={'center'}>
                                        <TextField sx={{ width: 225 }} label="Payment ID" />
                                    </Grid>
                                    <Grid item xs={12} textAlign={'center'}>
                                        <FormControl sx={{ width: 225 }}>
                                            <InputLabel>Currency</InputLabel>
                                            <Select label="Currency">
                                                <MenuItem value={1}>Australian Dollar</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} textAlign={'center'}>
                                        <InputLabel>Payment Date</InputLabel>


                                        <TextField sx={{ width: 225 }}  type='date' />


                                    </Grid>
                                    <Grid item xs={12} textAlign={'center'}>
                                        <FormControlLabel
                                            control={<Checkbox />}
                                            label="Refund Payment"
                                            sx={{ marginBottom: 1 }}
                                        />
                                    </Grid>
                                    


                                </Grid>
                            </Grid>
                            {/* Right side */}
                            <Grid item xs={6}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField label="User ID" value={id} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label="Login Name" value={name} />
                                    </Grid>
                                   
                                    <Grid item xs={12} marginTop={11.8}>
                                        <FormControlLabel
                                            control={<Checkbox />}
                                            label="Process Payment in Real Time"
                                            sx={{ marginBottom: 1 }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Paper elevation={10} sx={{ margin: 1 }}>
                            <Paper elevation={10} sx={{ backgroundColor: '#253A7D' }}>
                                <Box >
                                    <Button onClick={togglePaper}>
                                        <Typography variant="body1" sx={{ marginRight: 1, paddingLeft: 1, color: 'white' }}>Contact</Typography>
                                        {showPaper ? < RemoveIcon sx={{ color: 'white' }} /> : <AddIcon sx={{ color: 'white' }} />}
                                    </Button>
                                </Box>
                            </Paper>
                            {
                                showPaper && (
                                    <Box sx={{ padding: 2, marginTop: 2, margin: 3 }} elevation={10}>
                                        <Grid container spacing={2}>
                                            {/* Left side (40% of the screen) */}
                                            <Grid item lg={5} md={5} sm={12} xs={12} paddingBottom={2} sx={{ marginRight: 2 }}>
                                                <Grid container spacing={2}>
                                                    <Grid item lg={12} md={12} sm={12} xs={12} paddingBottom={2}>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">Billing Cycle Unit</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                label="Billing Cycle Unit"
                                                                value={billingCycle}
                                                                onChange={handleBillingCycleChange}
                                                            >
                                                                <MenuItem value={'---'}> -- </MenuItem>
                                                                <MenuItem value={'payment_gate_way'}>Payment Gate Way</MenuItem>
                                                                <MenuItem value={'Credit Card'}>Credit Card</MenuItem>
                                                                <MenuItem value={'cash'}>Cash</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item lg={12} md={12} sm={12} xs={12} paddingBottom={2}>
                                                        <TextField
                                                            type="text"

                                                            fullWidth
                                                            name="description"
                                                            label='Processing Order'
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            {/* Right side (50% of the screen) */}
                                            <Grid item lg={6} md={6} sm={12} xs={12} paddingBottom={2}>
                                                {showCreditCardFields && (
                                                    <form >
                                                        <Grid item lg={12} md={7} sm={12} xs={12} paddingBottom={2} sx={{ justifyContent: 'flex-end', display: 'flex', flexDirection: 'column' }}>
                                                            <Grid container spacing={2}>
                                                                <Grid item lg={6}>
                                                                    <TextField label="userId"
                                                                        type="number"
                                                                        value={values.userId}
                                                                        fullWidth
                                                                        name="userId"
                                                                        required
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                    />
                                                                </Grid>
                                                                <Grid item lg={6}>
                                                                    <TextField
                                                                        label='attempt'
                                                                        type='number'
                                                                        fullWidth
                                                                        value={values.attempt}
                                                                        name='attempt'
                                                                        required
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}

                                                                    />
                                                                </Grid>
                                                                <Grid item lg={6}>
                                                                    <TextField
                                                                        label='Amount'
                                                                        type='number'
                                                                        fullWidth
                                                                        value={values.amount}
                                                                        name='amount'
                                                                        required
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}

                                                                    />
                                                                </Grid>
                                                                <Grid item lg={6}>
                                                                    <FormControl fullWidth>
                                                                        <InputLabel id="demo-simple-select-label">Delete</InputLabel>
                                                                        <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            label="Delete"
                                                                            value={values.deleted}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            name='deleted'
                                                                        >

                                                                            <MenuItem value={1}>Yes</MenuItem>
                                                                            <MenuItem value={0}>No</MenuItem>

                                                                        </Select>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item lg={6}>
                                                                    <FormControl fullWidth>
                                                                        <InputLabel id="demo-simple-select-label">Is Refund</InputLabel>
                                                                        <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            label="Is Refund"
                                                                            value={values.isRefund}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            name='isRefund'
                                                                        >

                                                                            <MenuItem value={1}>Yes</MenuItem>
                                                                            <MenuItem value={0}>No</MenuItem>

                                                                        </Select>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item lg={6}>
                                                                    <FormControl fullWidth>
                                                                        <InputLabel id="demo-simple-select-label">isPreauth</InputLabel>
                                                                        <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            label="isPreauth"
                                                                            value={values.isPreauth}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            name='isPreauth'
                                                                        >

                                                                            <MenuItem value={1}>Yes</MenuItem>
                                                                            <MenuItem value={0}>No</MenuItem>

                                                                        </Select>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item lg={6}>
                                                                    <TextField label='payout ID'
                                                                        type='number'
                                                                        value={values.payoutId}
                                                                        name='payoutId'
                                                                        required
                                                                        fullWidth
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}

                                                                    />
                                                                </Grid>
                                                                <Grid item lg={6}>
                                                                    <TextField label='balance'
                                                                        type='number'
                                                                        value={values.balance}
                                                                        name='balance'
                                                                        required
                                                                        fullWidth
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                    />
                                                                </Grid>
                                                                <Grid item lg={6}>
                                                                    <TextField label='payment pariod'
                                                                        type='number'
                                                                        value={values.paymentPeriod}
                                                                        name='paymentPeriod'
                                                                        required
                                                                        fullWidth
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                    />
                                                                </Grid>
                                                                <Grid item lg={6}>
                                                                    <TextField label='Payment Notes'
                                                                        fullWidth
                                                                        type='text'
                                                                        value={values.paymentNotes}
                                                                        name='paymentNotes'
                                                                        required
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                    />
                                                                </Grid>


                                                            </Grid>
                                                        </Grid>
                                                    </form>

                                                )}
                                            </Grid>
                                        </Grid>
                                    </Box>
                                )
                            }
                        </Paper>
                        <Grid container alignItems="center" justifyContent="center" spacing={2} padding={3}>
                            <Grid item xs={12} textAlign="center">
                                <TextField label="Description" />
                            </Grid>
                        </Grid>


                    </Paper>
                </Grid>

                <Grid
                    container
                    spacing={2}
                    textAlign="center"   // Center the content horizontally
                    marginTop={0}        // Adjust marginTop to center vertically
                >
                    <Grid item xs={12} spacing={2} >

                        <Button
                            sx={{margin:2}}
                            type="submit"
                            style={{ backgroundColor: '#253A7D', color: 'white',paddingRight:10 }}
                        // onClick={submitMainForm2}
                        >
                            Submit
                        </Button>
                        <Button
                        sx={{margin:2}}
                            // Change the type to "button" to prevent form submission
                            style={{ backgroundColor: '#253A7D', color: 'white' }}
                         onClick={()=>navigate("/customer")}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                       
                    </Grid>
                </Grid>

            </Grid>
            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleCloseNotification}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleCloseNotification}
                    severity={notification.severity}
                >
                    {notification.message}
                </MuiAlert>
            </Snackbar>
        </Box>
    )
}